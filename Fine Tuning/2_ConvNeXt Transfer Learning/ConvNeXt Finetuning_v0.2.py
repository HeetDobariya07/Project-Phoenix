# --- dependencies ---
from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset, DatasetDict, Features, ClassLabel, Image as HFImage
from transformers import AutoImageProcessor, ConvNextV2ForImageClassification, TrainingArguments, Trainer
import torch
from torchvision import transforms as T
from PIL import Image
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

DATASET_PARENT = Path(
    r"c:/Meet/Projects/Project_8_Phoenix_Cervical Cancer Image Classification/Project-Phoenix/Dataset/Augmented Dataset - Limited Enhancement"
)
# ----------------------------------------------

if not DATASET_PARENT.exists():
    raise FileNotFoundError(f"Dataset parent path not found: {DATASET_PARENT}")

# --- find all NLM_CLAHE directories (case-insensitive) ---
nlm_dirs = set()

# 1) immediate child search: look for X/<class>/NLM_CLAHE
for child in DATASET_PARENT.iterdir():
    if not child.is_dir():
        continue
    # search child for a folder named NLM_CLAHE (case-insensitive)
    for sub in child.iterdir():
        if sub.is_dir() and sub.name.lower() == "nlm_clahe":
            nlm_dirs.add(sub.resolve())
            break

# 2) recursive fallback: in case structure is deeper or different
for p in DATASET_PARENT.rglob("*"):
    if p.is_dir() and p.name.lower() == "nlm_clahe":
        nlm_dirs.add(p.resolve())

if not nlm_dirs:
    raise FileNotFoundError(
        "No 'NLM_CLAHE' directories found under DATASET_PARENT. "
        "Check folder names and capitalization."
    )

# --- collect BMP files from each NLM_CLAHE and map to class name (parent folder) ---
rows = []
seen_paths = set()   # dedupe absolute paths

for nlm in sorted(nlm_dirs, key=lambda x: str(x)):
    class_name = nlm.parent.name    # parent folder is the class label
    # gather BMP files (case-insensitive)
    bmp_files = [p.resolve() for p in nlm.iterdir() if p.is_file() and p.suffix.lower() == ".bmp"]
    if not bmp_files:
        # warn but continue
        print(f"Warning: no .bmp files found in: {nlm}  (class = '{class_name}')")
        continue
    for p in bmp_files:
        sp = str(p)
        if sp in seen_paths:
            continue
        seen_paths.add(sp)
        rows.append((sp, class_name))

# --- build DataFrame ---
df = pd.DataFrame(rows, columns=["image_path", "label_name"])
if df.empty:
    raise RuntimeError("No .bmp image files were found in any discovered NLM_CLAHE directories.")

# stable sorted class ordering -> map to integer labels
class_names = sorted(df["label_name"].unique().tolist())
label_to_id = {n: i for i, n in enumerate(class_names)}
df["label"] = df["label_name"].map(label_to_id)

# optional: shuffle rows (helps downstream splitting)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# summary prints
print("Dataset parent:", DATASET_PARENT)
print("Discovered NLM_CLAHE directories (count):", len(nlm_dirs))
for p in sorted(nlm_dirs):
    print("  -", p)
print("\nFound classes (alphabetical):", class_names)
print("Total images found:", len(df))
print("Counts per class:")
print(df.groupby("label_name").size().sort_values(ascending=False))

# save csv to dataset parent for convenience
csv_out = DATASET_PARENT / "sipakmed_file_list.csv"
df.to_csv(csv_out, index=False)
print(f"\nSaved file list to: {csv_out}")


# stratified split
train_df, temp_df = train_test_split(
    df, test_size=0.2, stratify=df['label'], random_state=42
)
val_df, test_df = train_test_split(
    temp_df, test_size=0.5, stratify=temp_df['label'], random_state=42
)

print("Train size:", len(train_df))
print("Validation size:", len(val_df))
print("Test size:", len(test_df))

# Optional: check class distribution
print("\nTrain class counts:\n", train_df['label_name'].value_counts())
print("\nValidation class counts:\n", val_df['label_name'].value_counts())
print("\nTest class counts:\n", test_df['label_name'].value_counts())

# Define features for HF dataset
features = Features({
    "image": HFImage(),                # image will be lazy-loaded
    "label": ClassLabel(names=sorted(df['label_name'].unique()))
})

def df_to_ds(dframe):
    d = Dataset.from_dict({
        "image": dframe["image_path"].tolist(),
        "label": dframe["label"].tolist()
    })
    return d.cast(features)

dataset = DatasetDict({
    "train": df_to_ds(train_df.reset_index(drop=True)),
    "validation": df_to_ds(val_df.reset_index(drop=True)),
    "test": df_to_ds(test_df.reset_index(drop=True))
})

# Quick check
print(dataset)
print(dataset['train'][0])

from transformers import ConvNextV2ForImageClassification, AutoImageProcessor

model_name = "facebook/convnextv2-tiny-22k-384"

processor = AutoImageProcessor.from_pretrained(model_name)

# Load the model WITHOUT classifier weights

model = ConvNextV2ForImageClassification.from_pretrained(
    model_name,
    num_labels=5,  # your 5 classes
    id2label={i: name for i, name in enumerate(dataset['train'].features['label'].names)},
    label2id={name: i for i, name in enumerate(dataset['train'].features['label'].names)},
    ignore_mismatched_sizes=True  # randomly initialize classifier
)

mean, std = processor.image_mean, processor.image_std

# Transformations remain the same
train_transform = T.Compose([
    T.Resize((224,224)),
    T.RandomHorizontalFlip(),
    T.RandomRotation(10),
    T.ToTensor(),
    T.Normalize(mean=mean, std=std)
])

val_transform = T.Compose([
    T.Resize((224,224)),
    T.ToTensor(),
    T.Normalize(mean=mean, std=std)
])

# Create functions to apply the transforms
def apply_train_transforms(examples):
    """Applies training transformations to a batch of images."""
    examples["pixel_values"] = [train_transform(image.convert("RGB")) for image in examples["image"]]
    return examples

def apply_val_transforms(examples):
    """Applies validation/testing transformations to a batch of images."""
    examples["pixel_values"] = [val_transform(image.convert("RGB")) for image in examples["image"]]
    return examples

# Use .map() to create the new processed datasets
train_ds = dataset["train"].map(apply_train_transforms, batched=True, remove_columns=["image"])
val_ds = dataset["validation"].map(apply_val_transforms, batched=True, remove_columns=["image"])
test_ds = dataset["test"].map(apply_val_transforms, batched=True, remove_columns=["image"])

def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=1)
    accuracy = accuracy_score(labels, predictions)
    precision = precision_score(labels, predictions, average='weighted')
    recall = recall_score(labels, predictions, average='weighted')
    f1 = f1_score(labels, predictions, average='weighted')
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1
    }

from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./convnextv2_cervical",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    eval_strategy="steps",  # <-- ADD THIS LINE
    save_strategy="steps",
    save_steps=200,
    eval_steps=200,
    logging_steps=50,
    num_train_epochs=5,
    learning_rate=5e-5,
    weight_decay=0.01,
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    fp16=True,
)
from transformers import Trainer

class CustomTrainer(Trainer):
    def compute_loss(self, model, inputs, return_outputs=False, num_items_in_batch=None):
        """
        Override compute_loss to filter out unexpected kwargs before passing to model.
        """
        # Filter out keys that the model doesn't expect
        filtered_inputs = {k: v for k, v in inputs.items() 
                          if k in ['pixel_values', 'labels']}
        
        # Call the model with filtered inputs
        outputs = model(**filtered_inputs)
        
        if self.args.past_index >= 0:
            self._past = outputs[self.args.past_index]

        if isinstance(outputs, dict) and "loss" not in outputs:
            raise ValueError(
                "The model did not return a loss from the inputs, only the following keys: "
                f"{','.join(outputs.keys())}. For reference, the inputs it received are {','.join(inputs.keys())}."
            )
        
        loss = outputs["loss"] if isinstance(outputs, dict) else outputs[0]

        return (loss, outputs) if return_outputs else loss

trainer = CustomTrainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,         # Use the new mapped train_ds
    eval_dataset=val_ds,          # Use the new mapped val_ds
    processing_class=processor,
    compute_metrics=compute_metrics
)
trainer.train()

# Evaluate on test set
print("\nEvaluating on test set...")
test_results = trainer.evaluate(test_ds)
print("Test Results:", test_results)

# Save the model and processor
model_save_path = "./saved_convnextv2_model"
trainer.save_model(model_save_path)
processor.save_pretrained(model_save_path)
print(f"Model and processor saved to {model_save_path}")