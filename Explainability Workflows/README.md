# Model Explainability Workflows

This directory contains Jupyter notebooks for explainability analysis of the fine-tuned ConvNeXt models used in Project Phoenix.

## 📁 Contents

### ConvNeXt_Model_Explainability_GRADCAM.ipynb

A comprehensive notebook that provides multiple explainability techniques for analyzing the fine-tuned ConvNeXtV2 model on the SiPakMED cervical cancer cell dataset.

## 🚀 Features

### Explainability Techniques Included:

1. **GRAD-CAM (Gradient-weighted Class Activation Mapping)**
   - Classic gradient-based attention visualization
   - Shows which regions of the image influence the model's predictions
   - Best for general explainability analysis

2. **GRAD-CAM++**
   - Improved version of GRAD-CAM
   - Better localization for multiple instances of the same class
   - More accurate weight distribution

3. **Layer-CAM**
   - Layer-wise activation mapping
   - Provides fine-grained, detailed visualizations
   - Uses layer activations directly

4. **Multi-Class Analysis**
   - Visualize what the model looks for when predicting each class
   - Compare attention patterns across all 5 cell types
   - Understand distinctive features for each class

5. **Comparative Visualization**
   - Side-by-side comparison of different explainability methods
   - Helps identify the most informative technique for your use case

6. **Batch Processing**
   - Analyze multiple images at once
   - Generate summary reports
   - Export results for documentation

## 🔧 Setup Instructions

### Prerequisites

The notebook is designed to run in **Google Colab** with GPU acceleration for optimal performance.

### Required Files

You need the following files from your trained model checkpoint in Google Drive:

```
your_model_checkpoint/
├── config.json                    # Model configuration
├── model.safetensors             # Model weights
├── preprocessor_config.json      # Image preprocessing configuration
├── optimizer.pt                  # (Optional) Optimizer state
├── scheduler.pt                  # (Optional) Learning rate scheduler
├── trainer_state.json           # (Optional) Training state
├── training_args.bin            # (Optional) Training arguments
├── rng_state.pth                # (Optional) Random state
└── scaler.pt                    # (Optional) Mixed precision scaler
```

**Note**: Only `config.json`, `model.safetensors`, and `preprocessor_config.json` are required for inference and explainability. The other files are optional training artifacts.

## 📖 How to Use

### Step 1: Open in Google Colab

1. Upload the notebook to your Google Drive
2. Right-click the notebook → Open with → Google Colab
3. (Optional) Enable GPU: Runtime → Change runtime type → GPU

### Step 2: Configure Paths

Update the `MODEL_PATH` in **Section 4 (Configuration)** to point to your model checkpoint:

```python
MODEL_PATH = "/content/drive/MyDrive/path/to/your/model/checkpoint"
```

### Step 3: Run the Notebook

Execute cells in order:

1. **Sections 1-5**: Setup, imports, and model loading
2. **Section 13**: Upload a test image or specify an image path
3. **Sections 13.1-13.5**: Run different explainability analyses

### Step 4: Analyze Results

The notebook provides:
- Visual heatmaps showing model attention
- Overlay visualizations on original images
- Probability distributions across classes
- Comparative analysis of different methods

## 🎯 Key Functions

### Single Image Analysis

```python
# Basic prediction
results = predict_image(model, image_path, processor)
display_prediction_results(results)

# GRAD-CAM visualization
gradcam_results = apply_gradcam(model, image_path, processor)
display_gradcam_results(gradcam_results)

# Compare all methods
compare_explainability_methods(model, image_path, processor)

# Multi-class analysis
visualize_all_classes(model, image_path, processor, method='gradcam')
```

### Batch Analysis

```python
# Analyze multiple images from a directory
batch_analyze_images(model, image_dir, processor, method='gradcam', max_images=10)
```

### Save Results

```python
# Save all visualizations and predictions
save_explainability_results(model, image_path, processor, output_dir)
```

## 📊 Understanding the Visualizations

### Heatmap Colors

- **🔴 Red/Hot regions**: High importance for the predicted class
- **🔵 Blue/Cool regions**: Low importance for the predicted class

### What to Look For

1. **Clinically Relevant Regions**: Check if the model focuses on morphologically important features (nucleus, cytoplasm texture, cell boundaries)

2. **Class Consistency**: For each cell type, verify the model focuses on appropriate features:
   - **Dyskeratotic**: Irregular nucleus, keratin accumulation
   - **Koilocytotic**: Perinuclear halo (clear zone around nucleus)
   - **Metaplastic**: Irregular cell shape, dense cytoplasm
   - **Parabasal**: Small cells with high nucleus-to-cytoplasm ratio
   - **Superficial-Intermediate**: Large cells, abundant cytoplasm

3. **Artifacts**: Ensure the model doesn't focus on background or imaging artifacts

## 🧪 Example Workflow

### For a Single Image:

```python
# 1. Upload image
image_path = "/content/test_image.bmp"

# 2. Get prediction
results = predict_image(model, image_path, processor)
print(f"Predicted: {results['predicted_class']} ({results['confidence']:.2%})")

# 3. Apply GRAD-CAM
gradcam_results = apply_gradcam(model, image_path, processor)
display_gradcam_results(gradcam_results)

# 4. Compare with other methods
compare_explainability_methods(model, image_path, processor)

# 5. See what model looks for in each class
visualize_all_classes(model, image_path, processor)

# 6. Save results
save_explainability_results(model, image_path, processor, "/content/drive/MyDrive/results")
```

### For Multiple Images:

```python
# Batch process a directory
image_directory = "/content/drive/MyDrive/test_images"
df_results = batch_analyze_images(
    model,
    image_directory,
    processor,
    method='gradcam',
    max_images=20
)

# Results are saved as a DataFrame for further analysis
print(df_results)
```

## 🔬 Medical Interpretation Guidelines

When analyzing cervical cell images with explainability:

1. **Verify Clinical Relevance**: The model should focus on morphological features that pathologists use for diagnosis

2. **Check for Bias**: Ensure the model doesn't rely on staining artifacts, image borders, or technical variations

3. **Cross-Validation**: Compare multiple images from the same class to ensure consistent attention patterns

4. **False Positives**: Analyze misclassified images to understand model limitations

5. **Documentation**: Save visualizations for reports, presentations, or publications

## 📝 Output Files

When using `save_explainability_results()`, the following files are created:

```
output_directory/
├── {image_name}_original.png      # Original input image
├── {image_name}_gradcam.png       # GRAD-CAM visualization
├── {image_name}_layercam.png      # Layer-CAM visualization
└── {image_name}_results.json      # Prediction results and probabilities
```

The JSON file contains:
```json
{
  "image_name": "example_image",
  "predicted_class": "Dyskeratotic",
  "confidence": 0.9523,
  "top_3_predictions": [
    {"class": "Dyskeratotic", "probability": 0.9523},
    {"class": "Koilocytotic", "probability": 0.0321},
    {"class": "Metaplastic", "probability": 0.0089}
  ],
  "all_probabilities": {
    "Dyskeratotic": 0.9523,
    "Koilocytotic": 0.0321,
    ...
  }
}
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"Model path not found"**
   - Check that `MODEL_PATH` points to the correct directory in Google Drive
   - Ensure Google Drive is mounted (`drive.mount('/content/drive')`)

2. **"CUDA out of memory"**
   - Reduce batch size in batch processing
   - Use CPU by setting `use_cuda=False` in CAM functions
   - Restart runtime and clear outputs

3. **"Image loading error"**
   - Ensure image is in supported format (.bmp, .png, .jpg)
   - Check file path is correct
   - Verify image is not corrupted

4. **Slow performance**
   - Enable GPU acceleration in Colab (Runtime → Change runtime type)
   - Process images in smaller batches
   - Use GRAD-CAM (faster) instead of Layer-CAM for large-scale analysis

## 📚 References

### Papers:

1. **GRAD-CAM**: Selvaraju et al. "Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization" (ICCV 2017)

2. **GRAD-CAM++**: Chattopadhay et al. "Grad-CAM++: Generalized Gradient-Based Visual Explanations for Deep Convolutional Networks" (WACV 2018)

3. **Layer-CAM**: Jiang et al. "LayerCAM: Exploring Hierarchical Class Activation Maps for Localization" (TIP 2021)

4. **ConvNeXt**: Liu et al. "A ConvNet for the 2020s" (CVPR 2022)

### Libraries:

- **pytorch-grad-cam**: https://github.com/jacobgil/pytorch-grad-cam
- **Transformers**: https://huggingface.co/docs/transformers
- **PyTorch**: https://pytorch.org

## 🤝 Contributing

If you add new explainability techniques or improve the notebook:

1. Test thoroughly with multiple images
2. Document new functions clearly
3. Add usage examples
4. Update this README

## 📧 Support

For questions or issues:
- Check the troubleshooting section above
- Review the in-notebook documentation
- Consult the original research papers for technique details

---

**Last Updated**: 2025-11-21

**Compatibility**:
- Google Colab (Recommended)
- Jupyter Notebook (with modifications)
- Python 3.8+
- PyTorch 2.0+
- Transformers 4.30+
