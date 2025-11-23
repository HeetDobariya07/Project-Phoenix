# CBAM-ResNet50 Cervical Classification

This folder contains the code and notebooks for training, evaluating and explaining a CBAM-ResNet50 model for cervical cell image classification. The language used here is intentionally simple so that both technical and non-technical readers can follow the workflow.

## Folder Contents

- `CBAM_ResNet50_Cervical_Classification.ipynb` – main training and evaluation notebook
- `CBAM_ResNet50_Explainability_GradCAM.ipynb` – explainability and visualisation notebook
- `app.py` – script for running the trained model in an application/dashboard setting
- `cbam_resnet50_cervical/` – saved model weights and metric outputs
- `gradcam_outputs/`, `gradcam_specific_class_outputs/` – saved Grad-CAM heatmaps
- `sample_image/` – example image used for demos
- `requirements.txt` – Python dependencies for this module
- `README_DASHBOARD.md` – separate documentation for the dashboard application

---

## 1. CBAM_ResNet50_Cervical_Classification.ipynb

This is the main notebook where the CBAM-ResNet50 model is built, trained and evaluated on cervical cell images.

At a high level, the notebook walks through:

1. **Project overview and motivation**  
   Explains why cervical cell classification is important and how attention mechanisms (CBAM) can help the model focus on the nucleus and other relevant regions.

2. **Dataset setup**  
   - Describes the folder structure of the dataset (one folder per cell type).  
   - Shows how image paths and labels are loaded.  
   - Applies standard image preprocessing and augmentation (resize, normalization, flips, etc.).

3. **CBAM-ResNet50 model definition**  
   - Starts from a ResNet50 model pretrained on ImageNet.  
   - Adds Convolutional Block Attention Modules (CBAM) that learn **what** features and **where** in the image to focus on.  
   - Modifies the final layer to predict the five cervical cell classes.

4. **Training pipeline**  
   - Defines loss function (for example cross-entropy) and optimizer.  
   - Sets training hyperparameters such as learning rate, batch size and number of epochs.  
   - Trains the model over multiple epochs, printing progress for training and validation.

5. **Evaluation and metrics**  
   - Computes overall accuracy and per-class accuracy.  
   - Saves detailed per-class metrics to `per_class_metrics.csv`.  
   - Plots and saves a confusion matrix (`confusion_matrix.png`) and training curves (`training_history.png`).

6. **Saving results**  
   - Saves the best-performing model weights to `cbam_resnet50_cervical/best_model.pth`.  
   - Exports predictions to `test_predictions.csv`.  
   - Stores training history in `training_history.csv` for later analysis.

If you want to reproduce the training, open this notebook, adjust the dataset paths to your environment, install the dependencies listed in `requirements.txt`, and run the cells from top to bottom.

---

## 2. CBAM_ResNet50_Explainability_GradCAM.ipynb

This notebook focuses on making the CBAM-ResNet50 model more interpretable using Grad-CAM based visual explanations.

The main steps are:

1. **Environment setup**  
   - Installs and imports the required libraries, including `pytorch-grad-cam`, `torch`, `torchvision`, `opencv-python` and `matplotlib`.  
   - Detects whether the notebook is running in Google Colab or locally.

2. **Model reconstruction and weight loading**  
   - Re-creates the same CBAM-ResNet50 architecture used during training.  
   - Loads the trained weights from `cbam_resnet50_cervical/best_model.pth`.  
   - Moves the model to CPU or GPU depending on availability.

3. **Image preprocessing**  
   - Defines transforms to resize, normalize and convert images to tensors in the same way as during training.  
   - Loads either a `sample_image` from this folder or user-specified test images.

4. **Grad-CAM and Grad-CAM++ generation**  
   - Sets up Grad-CAM / Grad-CAM++ on the chosen model layers.  
   - Generates class-specific heatmaps that highlight which parts of the image influenced the model’s decision.  
   - Overlays these heatmaps on the original images for intuitive visualisation.

5. **Saving and organising outputs**  
   - Saves attention and Grad-CAM maps into `gradcam_outputs/`.  
   - Optionally organises examples per class under `gradcam_specific_class_outputs/`.  
   - Helps you visually inspect how the model attends to different cervical cell types.

You can use this notebook to understand and validate the behaviour of the trained model, especially whether it is focusing on the nucleus and other medically relevant regions.

---

## 3. app.py

`app.py` is a Python script intended to expose the trained CBAM-ResNet50 model as an interactive application (for example, a web dashboard). While details are documented in `README_DASHBOARD.md`, at a high level it typically:

- Loads the trained model weights from `cbam_resnet50_cervical/best_model.pth`.  
- Preprocesses uploaded cervical cell images to match the training pipeline.  
- Runs inference and returns the predicted cell class and confidence scores.  
- Optionally displays attention maps or Grad-CAM overlays to improve interpretability for end users.

This script is useful if you want to present the model to clinicians or other stakeholders in a user-friendly way without requiring them to run the notebooks.

---

## 4. How to Get Started

1. **Install dependencies** using the provided `requirements.txt` (ideally inside a virtual environment):

```bash
pip install -r requirements.txt
```

2. **Run the training notebook** `CBAM_ResNet50_Cervical_Classification.ipynb` to train or fine-tune the model on your dataset, or load the already provided `best_model.pth` if you only want to run inference.

3. **Use the explainability notebook** `CBAM_ResNet50_Explainability_GradCAM.ipynb` to generate visual explanations for model predictions.

4. **Launch the application** using `app.py` (see `README_DASHBOARD.md` for specific run instructions) to provide an interactive interface for predictions.

This structure allows you to go from raw cervical cell images to a trained attention-based classifier, interpret its decisions, and deploy it in an application-oriented setting from within this single folder.