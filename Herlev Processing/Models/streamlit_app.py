
"""
Cervical Cancer Cell Classification Dashboard
Project Phoenix - Streamlit Application

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
import os

# Page configuration
st.set_page_config(
    page_title="Project Phoenix - Cell Classification",
    page_icon="🔬",
    layout="wide"
)

# Constants
IMG_SIZE = 224
MODELS_DIR = "./saved_models"

# Load models
@st.cache_resource
def load_models():
    """Load the feature extractor and classifier."""
    
    # Feature extractor
    class FeatureExtractor(nn.Module):
        def __init__(self):
            super(FeatureExtractor, self).__init__()
            resnet = models.resnet50(weights=None)
            self.features = nn.Sequential(*list(resnet.children())[:-1])
        
        def forward(self, x):
            x = self.features(x)
            x = x.view(x.size(0), -1)
            return x
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    feature_extractor = FeatureExtractor()
    feature_extractor.load_state_dict(torch.load(
        os.path.join(MODELS_DIR, "resnet50_feature_extractor.pth"),
        map_location=device
    ))
    feature_extractor.eval()
    feature_extractor.to(device)
    
    # Classifier and scaler
    with open(os.path.join(MODELS_DIR, "logistic_classifier.pkl"), 'rb') as f:
        classifier = pickle.load(f)
    
    with open(os.path.join(MODELS_DIR, "scaler.pkl"), 'rb') as f:
        scaler = pickle.load(f)
    
    with open(os.path.join(MODELS_DIR, "class_mapping.pkl"), 'rb') as f:
        class_mapping = pickle.load(f)
    
    return feature_extractor, classifier, scaler, class_mapping, device

# Image preprocessing
def preprocess_image(image):
    """Preprocess image for model input."""
    transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0)

# Prediction function
def predict(image, feature_extractor, classifier, scaler, class_mapping, device):
    """Make prediction on an image."""
    
    # Preprocess
    img_tensor = preprocess_image(image).to(device)
    
    # Extract features
    with torch.no_grad():
        features = feature_extractor(img_tensor).cpu().numpy()
    
    # Scale and predict
    features_scaled = scaler.transform(features)
    prediction = classifier.predict(features_scaled)[0]
    probabilities = classifier.predict_proba(features_scaled)[0]
    
    # Get class names
    idx_to_class = {v: k for k, v in class_mapping.items()}
    
    return idx_to_class[prediction], probabilities, idx_to_class

# Main app
def main():
    st.title("🔬 Project Phoenix")
    st.subheader("Cervical Cancer Cell Classification")
    st.markdown("---")
    
    # Sidebar
    st.sidebar.title("About")
    st.sidebar.info(
        "This application uses a hybrid deep learning model "
        "(ResNet50 + Logistic Regression) to classify cervical cells "
        "into 7 categories based on the Herlev dataset."
    )
    
    st.sidebar.title("Cell Classes")
    st.sidebar.markdown("""
    - Carcinoma in situ
    - Light dysplastic
    - Moderate dysplastic
    - Normal columnar
    - Normal intermediate
    - Normal superficial
    - Severe dysplastic
    """)
    
    # Load models
    try:
        feature_extractor, classifier, scaler, class_mapping, device = load_models()
        st.success("Models loaded successfully!")
    except Exception as e:
        st.error(f"Error loading models: {e}")
        st.stop()
    
    # File upload
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Upload Cell Image")
        uploaded_file = st.file_uploader(
            "Choose an image...",
            type=['bmp', 'png', 'jpg', 'jpeg']
        )
        
        if uploaded_file is not None:
            image = Image.open(uploaded_file).convert('RGB')
            st.image(image, caption="Uploaded Image", use_column_width=True)
    
    with col2:
        st.subheader("Classification Results")
        
        if uploaded_file is not None:
            if st.button("Classify", type="primary"):
                with st.spinner("Analyzing..."):
                    pred_class, probs, idx_to_class = predict(
                        image, feature_extractor, classifier, scaler, class_mapping, device
                    )
                
                # Display prediction
                st.success(f"**Predicted Class:** {pred_class.replace('_', ' ').title()}")
                
                # Probability chart
                st.subheader("Class Probabilities")
                prob_data = {
                    idx_to_class[i].replace('_', ' ').title(): probs[i]
                    for i in range(len(probs))
                }
                st.bar_chart(prob_data)
                
                # Risk assessment
                abnormal_classes = ['carcinoma_in_situ', 'light_dysplastic', 
                                   'moderate_dysplastic', 'severe_dysplastic']
                
                if pred_class in abnormal_classes:
                    st.warning("⚠️ **Abnormal cell detected.** Please consult a medical professional.")
                else:
                    st.info("✅ Cell appears normal.")
        else:
            st.info("Please upload an image to classify.")
    
    # Footer
    st.markdown("---")
    st.markdown(
        "**Disclaimer:** This tool is for research purposes only. "
        "Always consult qualified medical professionals for diagnosis."
    )

if __name__ == "__main__":
    main()
