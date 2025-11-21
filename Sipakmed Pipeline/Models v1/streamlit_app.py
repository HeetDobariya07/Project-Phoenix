
"""
SiPakMED Cervical Cell Classification Dashboard
Run with: streamlit run streamlit_app.py
"""
import streamlit as st
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import pickle
import cv2
import matplotlib.pyplot as plt

# Page configuration
st.set_page_config(
    page_title="SiPakMED Cell Classifier",
    page_icon="🔬",
    layout="wide"
)

# Constants
CLASS_NAMES = ["Dyskeratotic", "Koilocytotic", "Metaplastic", "Parabasal", "Superficial-Intermediate"]
IMG_SIZE = 224

# Feature extractor class
class FeatureExtractor(nn.Module):
    def __init__(self):
        super(FeatureExtractor, self).__init__()
        resnet = models.resnet50(weights=None)
        self.features = nn.Sequential(*list(resnet.children())[:-1])
    
    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        return x

# Preprocessing functions
def apply_nlm_denoising(image):
    return cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)

def apply_clahe(image):
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l_clahe = clahe.apply(l)
    lab_clahe = cv2.merge([l_clahe, a, b])
    return cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2BGR)

@st.cache_resource
def load_models():
    """Load all required models."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # Load feature extractor
    feature_extractor = FeatureExtractor()
    feature_extractor.load_state_dict(torch.load("models/resnet50_feature_extractor.pth", map_location=device))
    feature_extractor.to(device)
    feature_extractor.eval()
    
    # Load classifier and scaler
    with open("models/logistic_classifier.pkl", "rb") as f:
        classifier = pickle.load(f)
    with open("models/feature_scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    
    return feature_extractor, classifier, scaler, device

def predict(image, feature_extractor, classifier, scaler, device, apply_preprocessing=True):
    """Make prediction on an image."""
    # Preprocessing
    img_array = np.array(image)
    if len(img_array.shape) == 2:
        img_array = cv2.cvtColor(img_array, cv2.COLOR_GRAY2RGB)
    elif img_array.shape[2] == 4:
        img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)
    
    img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    
    if apply_preprocessing:
        img_bgr = apply_nlm_denoising(img_bgr)
        img_bgr = apply_clahe(img_bgr)
    
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    processed_image = Image.fromarray(img_rgb)
    
    # Transform
    transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    img_tensor = transform(processed_image).unsqueeze(0).to(device)
    
    # Extract features
    with torch.no_grad():
        features = feature_extractor(img_tensor)
    
    # Scale and predict
    features_np = features.cpu().numpy()
    features_scaled = scaler.transform(features_np)
    
    prediction = classifier.predict(features_scaled)[0]
    probabilities = classifier.predict_proba(features_scaled)[0]
    
    return prediction, probabilities, processed_image

# Main app
def main():
    st.title("🔬 SiPakMED Cervical Cell Classifier")
    st.markdown("**Hybrid Model: ResNet50 Feature Extractor + Logistic Regression**")
    st.markdown("---")
    
    # Sidebar
    st.sidebar.header("Settings")
    apply_preprocessing = st.sidebar.checkbox("Apply NLM + CLAHE preprocessing", value=True)
    
    st.sidebar.markdown("---")
    st.sidebar.header("About")
    st.sidebar.info(
        "This dashboard classifies cervical cell images into 5 categories:\n"
        "- Dyskeratotic\n"
        "- Koilocytotic\n"
        "- Metaplastic\n"
        "- Parabasal\n"
        "- Superficial-Intermediate"
    )
    
    # Load models
    try:
        feature_extractor, classifier, scaler, device = load_models()
        st.success(f"Models loaded successfully! (Device: {device})")
    except Exception as e:
        st.error(f"Error loading models: {e}")
        st.info("Please ensure model files exist in the 'models' directory.")
        return
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Upload a cervical cell image",
        type=["bmp", "png", "jpg", "jpeg"]
    )
    
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("Original Image")
            st.image(image, use_container_width=True)
        
        # Make prediction
        with st.spinner("Analyzing image..."):
            prediction, probabilities, processed = predict(
                image, feature_extractor, classifier, scaler, device, apply_preprocessing
            )
        
        with col2:
            st.subheader("Processed Image")
            st.image(processed, use_container_width=True)
        
        # Results
        st.markdown("---")
        st.subheader("Classification Results")
        
        predicted_class = CLASS_NAMES[prediction]
        confidence = probabilities[prediction] * 100
        
        st.success(f"**Predicted Class:** {predicted_class}")
        st.info(f"**Confidence:** {confidence:.2f}%")
        
        # Probability chart
        st.subheader("Class Probabilities")
        fig, ax = plt.subplots(figsize=(10, 4))
        colors = ["#ff6b6b" if i == prediction else "#4dabf7" for i in range(len(CLASS_NAMES))]
        ax.barh(CLASS_NAMES, probabilities * 100, color=colors)
        ax.set_xlabel("Probability (%)")
        ax.set_xlim(0, 100)
        for i, v in enumerate(probabilities * 100):
            ax.text(v + 1, i, f"{v:.1f}%", va="center")
        plt.tight_layout()
        st.pyplot(fig)

if __name__ == "__main__":
    main()
