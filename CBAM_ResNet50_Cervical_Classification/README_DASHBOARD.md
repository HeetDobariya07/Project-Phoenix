# 🔬 Cervical Cancer Cell Classifier Dashboard

An interactive Streamlit dashboard for cervical cancer cell classification using CBAM-ResNet50 with explainable AI (GradCAM++).

## Features

- 🎯 **Multi-class Classification**: Classifies cervical cells into 5 categories
- 🔥 **Explainable AI**: GradCAM++ visualizations showing model decision-making
- 📊 **Confidence Scores**: Probability distribution across all classes
- 🎨 **Interactive Dashboard**: User-friendly interface for image upload and analysis
- 💾 **Export Results**: Download visualizations and prediction results

## Installation

### 1. Clone or Navigate to Project Directory

```bash
cd "D:\Minor Project\CBAM_ResNet50_Cervical_Classification"
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

Or install individually:

```bash
pip install streamlit torch torchvision opencv-python numpy matplotlib Pillow pandas grad-cam
```

## Usage

### Running the Dashboard

```bash
streamlit run app.py
```

The dashboard will open automatically in your default web browser at `http://localhost:8501`

### Using the Dashboard

1. **Configure Model Path** (Sidebar)
   - Default path: `D:\Minor Project\CBAM_ResNet50_Cervical_Classification\cbam_resnet50_cervical\best_model.pth`
   - Update if your model is in a different location

2. **Upload Image** (Sidebar)
   - Click "Browse files" or drag and drop
   - Supported formats: BMP, PNG, JPG, JPEG
   - Image should be a microscopy image of cervical cells

3. **View Results**
   - **Prediction**: See the predicted class and confidence score
   - **Probability Distribution**: Bar chart showing probabilities for all classes
   - **GradCAM++ Visualization**: Heatmap overlay showing important regions

4. **Advanced Options** (Sidebar)
   - ☑️ **Show Heatmap Only**: Display original, heatmap, and overlay separately
   - ☑️ **Show Class-Specific Activations**: See what features trigger each class

5. **Download Results**
   - Download GradCAM++ visualization as PNG
   - Download prediction results as JSON

## Model Information

- **Architecture**: CBAM-ResNet50
- **Attention Mechanism**: Convolutional Block Attention Module (CBAM)
- **Input Size**: 224x224 RGB images
- **Output Classes**: 5 cervical cell types

### Cell Classes

1. **Dyskeratotic**: Abnormal keratinization (pre-cancerous)
2. **Koilocytotic**: HPV-infected cells with perinuclear halos
3. **Metaplastic**: Transformed cells
4. **Parabasal**: Immature basal cells
5. **Superficial-Intermediate**: Normal mature cells

## Understanding GradCAM++ Visualizations

GradCAM++ highlights regions that influenced the model's decision:

- **Red/Yellow areas**: Regions strongly supporting the prediction
- **Blue/Purple areas**: Regions with minimal influence
- **Focus areas**: Typically nucleus, cytoplasm, and cell morphology

## Technical Details

### Model Loading
The app automatically loads:
- Model architecture (CBAM-ResNet50)
- Trained weights from checkpoint
- Class names and metadata

### Image Preprocessing
- Resize to 224x224
- Normalize with ImageNet statistics
- Convert to tensor format

### GradCAM++ Target Layer
- Targets: Last bottleneck of `layer4` in ResNet50
- Captures high-level semantic features
- Best for visualization quality

## Troubleshooting

### Model Not Found Error
```
❌ Model file not found at <path>
```
**Solution**: Update the model path in the sidebar to point to your `best_model.pth` file.

### Import Errors
```
ModuleNotFoundError: No module named 'pytorch_grad_cam'
```
**Solution**: Install the missing package:
```bash
pip install grad-cam
```

### CUDA Out of Memory
If running on GPU with limited memory:
```python
device = torch.device('cpu')  # Force CPU usage
```

### Streamlit Port Already in Use
```bash
streamlit run app.py --server.port 8502
```

## Performance Tips

1. **First Run**: Model loading takes a few seconds (cached afterward)
2. **GPU Acceleration**: Automatically uses CUDA if available
3. **Multiple Images**: Upload images one at a time for best performance

## Project Structure

```
CBAM_ResNet50_Cervical_Classification/
├── app.py                                    # Main Streamlit dashboard
├── requirements.txt                          # Python dependencies
├── README_DASHBOARD.md                       # This file
├── cbam_resnet50_cervical/
│   ├── best_model.pth                       # Trained model weights
│   ├── training_history.csv
│   └── per_class_metrics.csv
├── CBAM_ResNet50_Cervical_Classification.ipynb
└── CBAM_ResNet50_Explainability_GradCAM.ipynb
```

## Citation

If you use this dashboard in your research, please cite:

```
CBAM-ResNet50 Cervical Cancer Cell Classifier
Project Phoenix - Cervical Cancer Cell Classification
2025
```

## License

This project is for research and educational purposes only. Always consult medical professionals for clinical diagnosis.

## Contact

For issues or questions, please open an issue in the project repository.

---

**⚠️ Disclaimer**: This tool is designed for research purposes only and should not be used as a substitute for professional medical diagnosis.
