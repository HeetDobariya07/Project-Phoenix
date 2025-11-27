"""
Streamlit Dashboard for CBAM-ResNet50 Cervical Cancer Cell Classification
with Explainable AI (GradCAM++)

This dashboard allows users to:
1. Upload cervical cell images
2. Get model predictions with confidence scores
3. Visualize GradCAM++ explanations
4. View per-class probability distributions
"""

import streamlit as st
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, models
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from pathlib import Path
import pandas as pd

# Grad-CAM libraries
from pytorch_grad_cam import GradCAMPlusPlus
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image

# ============================================================================
# MODEL ARCHITECTURE DEFINITION
# ============================================================================

class ChannelAttention(nn.Module):
    """Channel Attention Module - focuses on 'what' is meaningful."""
    def __init__(self, in_channels, reduction_ratio=16):
        super(ChannelAttention, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
        self.fc = nn.Sequential(
            nn.Conv2d(in_channels, in_channels // reduction_ratio, 1, bias=False),
            nn.ReLU(inplace=True),
            nn.Conv2d(in_channels // reduction_ratio, in_channels, 1, bias=False)
        )
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        out = self.sigmoid(avg_out + max_out)
        return x * out


class SpatialAttention(nn.Module):
    """Spatial Attention Module - focuses on 'where' is meaningful."""
    def __init__(self, kernel_size=7):
        super(SpatialAttention, self).__init__()
        padding = 3 if kernel_size == 7 else 1
        self.conv = nn.Conv2d(2, 1, kernel_size, padding=padding, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = torch.mean(x, dim=1, keepdim=True)
        max_out, _ = torch.max(x, dim=1, keepdim=True)
        out = torch.cat([avg_out, max_out], dim=1)
        out = self.sigmoid(self.conv(out))
        return x * out


class CBAM(nn.Module):
    """Convolutional Block Attention Module (CBAM)."""
    def __init__(self, in_channels, reduction_ratio=16, kernel_size=7):
        super(CBAM, self).__init__()
        self.channel_attention = ChannelAttention(in_channels, reduction_ratio)
        self.spatial_attention = SpatialAttention(kernel_size)

    def forward(self, x):
        x = self.channel_attention(x)
        x = self.spatial_attention(x)
        return x


class CBAM_ResNet50(nn.Module):
    """ResNet50 with CBAM attention modules."""
    def __init__(self, num_classes=5, pretrained=False):
        super(CBAM_ResNet50, self).__init__()
        
        resnet = models.resnet50(weights=None)

        self.conv1 = resnet.conv1
        self.bn1 = resnet.bn1
        self.relu = resnet.relu
        self.maxpool = resnet.maxpool

        self.layer1 = resnet.layer1
        self.cbam1 = CBAM(256)

        self.layer2 = resnet.layer2
        self.cbam2 = CBAM(512)

        self.layer3 = resnet.layer3
        self.cbam3 = CBAM(1024)

        self.layer4 = resnet.layer4
        self.cbam4 = CBAM(2048)

        self.avgpool = resnet.avgpool
        self.fc = nn.Linear(2048, num_classes)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)

        x = self.layer1(x)
        x = self.cbam1(x)

        x = self.layer2(x)
        x = self.cbam2(x)

        x = self.layer3(x)
        x = self.cbam3(x)

        x = self.layer4(x)
        x = self.cbam4(x)

        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        logits = self.fc(x)
        return logits


# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

@st.cache_resource
def load_model(model_path, device):
    """Load the trained CBAM-ResNet50 model."""
    if not Path(model_path).exists():
        st.error(f"❌ Model file not found at {model_path}")
        st.stop()
    
    checkpoint = torch.load(model_path, map_location=device)
    
    class_names = checkpoint['class_names']
    num_classes = len(class_names)
    
    model = CBAM_ResNet50(num_classes=num_classes, pretrained=False)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    
    return model, class_names, checkpoint


def preprocess_image(image, device):
    """Preprocess uploaded image for model input."""
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    img_tensor = transform(image).unsqueeze(0).to(device)
    return img_tensor


def predict(model, img_tensor, class_names):
    """Get model prediction."""
    with torch.no_grad():
        outputs = model(img_tensor)
        probs = F.softmax(outputs, dim=1)
        pred_idx = torch.argmax(probs, dim=1).item()
        pred_class = class_names[pred_idx]
        confidence = probs[0, pred_idx].item()
        
        # Get all probabilities
        all_probs = {class_names[i]: probs[0, i].item() for i in range(len(class_names))}
    
    return pred_class, confidence, all_probs


def generate_gradcam(model, img_tensor, target_layers, rgb_img):
    """Generate GradCAM++ visualization."""
    cam = GradCAMPlusPlus(model=model, target_layers=target_layers)
    
    grayscale_cam = cam(input_tensor=img_tensor, targets=None)
    grayscale_cam = grayscale_cam[0, :]
    
    visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)
    
    return grayscale_cam, visualization


def generate_class_specific_gradcam(model, img_tensor, target_layers, rgb_img, target_class_idx):
    """Generate GradCAM++ for a specific class."""
    cam = GradCAMPlusPlus(model=model, target_layers=target_layers)
    
    targets = [ClassifierOutputTarget(target_class_idx)]
    grayscale_cam = cam(input_tensor=img_tensor, targets=targets)
    grayscale_cam = grayscale_cam[0, :]
    
    visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)
    
    return visualization


# ============================================================================
# STREAMLIT APP
# ============================================================================

def main():
    # Page configuration
    st.set_page_config(
        page_title="Cervical Cancer Cell Classifier",
        page_icon="🔬",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Custom CSS
    st.markdown("""
        <style>
        .main-header {
            font-size: 2.5rem;
            font-weight: bold;
            color: #1f77b4;
            text-align: center;
            margin-bottom: 1rem;
        }
        .sub-header {
            font-size: 1.2rem;
            color: #555;
            text-align: center;
            margin-bottom: 2rem;
        }
        .metric-card {
            background-color: #f0f2f6;
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 0.5rem 0;
        }
        .prediction-box {
            background-color: #e8f4f8;
            padding: 1.5rem;
            border-radius: 0.5rem;
            border-left: 5px solid #1f77b4;
            margin: 1rem 0;
        }
        </style>
    """, unsafe_allow_html=True)
    
    # Header
    st.markdown('<div class="main-header">🔬 Cervical Cancer Cell Classifier</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">CBAM-ResNet50 with Explainable AI (GradCAM++)</div>', unsafe_allow_html=True)
    
    # Sidebar
    with st.sidebar:
        st.header("⚙️ Configuration")
        
        # Model path
        model_path = st.text_input(
            "Model Path",
            value=r"D:\Minor Project\CBAM_ResNet50_Cervical_Classification\cbam_resnet50_cervical\best_model.pth"
        )
        
        st.markdown("---")
        
        # Upload image
        st.header("📤 Upload Image")
        uploaded_file = st.file_uploader(
            "Choose a cervical cell image",
            type=["bmp", "png", "jpg", "jpeg"],
            help="Upload a microscopy image of cervical cells"
        )
        
        st.markdown("---")
        
        # Visualization options
        st.header("🎨 Visualization Options")
        show_heatmap = st.checkbox("Show Heatmap Only", value=False)
        show_class_specific = st.checkbox("Show Class-Specific Activations", value=False)
        
        st.markdown("---")
        
        # Info
        st.info("""
        **About:**
        This dashboard uses a CBAM-ResNet50 model trained for cervical cancer cell classification.
        
        **Cell Types:**
        - Dyskeratotic
        - Koilocytotic
        - Metaplastic
        - Parabasal
        - Superficial-Intermediate
        """)
    
    # Main content
    if uploaded_file is None:
        st.info("👈 Please upload a cervical cell image using the sidebar to get started.")
        
        # Display sample information
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.markdown("### 📊 Features & Techniques")
            st.markdown("""
            - **Model:** CBAM-ResNet50  
            - **Attention Modules:** Channel + Spatial  
            - **Explainability:** GradCAM++  
            - **Optimized Training:** Early-stopping  
            - **High-resolution preprocessing**  
            - **Real-time inference pipeline**
            """)

        with col2:
            st.markdown("### 🎯 Capabilities")
            st.markdown("""
            - Multi-class classification (**5 classes**)  
            - Confidence score generation  
            - Visual heatmaps for lesion focus 
            - Class-wise activation insights
            """)

        with col3:
            st.markdown("### 📈 Stats & Performance")
            st.markdown("""
            **Model Statistics**  
            - Total Parameters: **24,214,989**  
            - Dataset Size: **4049 images**  
            • Train: 3239  
            • Validation: 405  
            • Test: 405  

            **Training**  
            - Trained for 10 epochs  
            - Best Epoch: **3**  
            - Best Val Accuracy: **95.31%**

            **Test Performance**  
            - Accuracy: **94.32%**  
            - Precision: **94.40%**  
            - Recall: **94.32%**  
            - F1-Score: **94.34%**
            """)


        return
    
    # Load model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    with st.spinner("🔄 Loading model..."):
        model, class_names, checkpoint = load_model(model_path, device)
    
    st.success(f"✅ Model loaded successfully! (Epoch {checkpoint['epoch']}, Val Acc: {checkpoint['best_val_acc']:.2%})")
    
    # Process uploaded image
    image = Image.open(uploaded_file).convert('RGB')
    
    # Create columns for layout
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### 📷 Uploaded Image")
        st.image(image, use_container_width=True)
    
    # Preprocess image
    img_tensor = preprocess_image(image, device)
    
    # Prepare RGB image for GradCAM
    rgb_img = np.array(image.resize((224, 224)))
    rgb_img = np.float32(rgb_img) / 255.0
    
    # Make prediction
    with st.spinner("🔮 Making prediction..."):
        pred_class, confidence, all_probs = predict(model, img_tensor, class_names)
    
    with col2:
        st.markdown("### 🎯 Prediction Results")
        
        # Display prediction
        st.markdown(f"""
        <div class="prediction-box">
            <h2 style="color: #1f77b4; margin: 0;">Predicted Class</h2>
            <h1 style="color: #1f77b4; margin: 0.5rem 0;">{pred_class}</h1>
            <h3 style="color: #555;">Confidence: {confidence:.2%}</h3>
        </div>
        """, unsafe_allow_html=True)
        
        # Display probability distribution
        st.markdown("#### 📊 Class Probabilities")
        prob_df = pd.DataFrame({
            'Class': list(all_probs.keys()),
            'Probability': list(all_probs.values())
        })
        prob_df = prob_df.sort_values('Probability', ascending=False)
        
        # Create bar chart
        fig, ax = plt.subplots(figsize=(8, 4))
        colors = ['#1f77b4' if cls == pred_class else '#d3d3d3' for cls in prob_df['Class']]
        ax.barh(prob_df['Class'], prob_df['Probability'], color=colors)
        ax.set_xlabel('Probability', fontsize=12)
        ax.set_xlim([0, 1])
        ax.grid(axis='x', alpha=0.3)
        plt.tight_layout()
        st.pyplot(fig)
    
    # GradCAM++ Visualization
    st.markdown("---")
    st.markdown("### 🔥 Explainable AI: GradCAM++ Visualization")
    st.markdown("*GradCAM++ highlights the regions of the image that most influenced the model's decision.*")
    
    target_layers = [model.layer4[-1]]
    
    with st.spinner("🎨 Generating GradCAM++ visualization..."):
        heatmap, overlay = generate_gradcam(model, img_tensor, target_layers, rgb_img)
    
    # Display GradCAM results
    if show_heatmap:
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.markdown("#### Original Image")
            st.image(rgb_img, use_container_width=True)
        
        with col2:
            st.markdown("#### Heatmap")
            fig, ax = plt.subplots(figsize=(4, 4))
            ax.imshow(heatmap, cmap='jet')
            ax.axis('off')
            plt.tight_layout()
            st.pyplot(fig)
        
        with col3:
            st.markdown("#### Overlay")
            st.image(overlay, use_container_width=True)
    else:
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("#### Original Image")
            st.image(rgb_img, use_container_width=True)
        
        with col2:
            st.markdown("#### GradCAM++ Overlay")
            st.image(overlay, use_container_width=True)
    
    # Class-specific GradCAM
    if show_class_specific:
        st.markdown("---")
        st.markdown("### 🎨 Class-Specific Activations")
        st.markdown("*See what features the model associates with each specific class.*")
        
        cols = st.columns(len(class_names))
        
        with st.spinner("Generating class-specific visualizations..."):
            for idx, (col, class_name) in enumerate(zip(cols, class_names)):
                with col:
                    specific_viz = generate_class_specific_gradcam(
                        model, img_tensor, target_layers, rgb_img, idx
                    )
                    st.markdown(f"**{class_name}**")
                    st.image(specific_viz, use_container_width=True)
    
    # Interpretation guide
    st.markdown("---")
    with st.expander("ℹ️ How to Interpret GradCAM++ Results"):
        st.markdown("""
        ### Understanding the Visualization
        
        **GradCAM++ (Gradient-weighted Class Activation Mapping)** highlights the regions that are most important for the model's prediction.
        
        - **Red/Yellow regions**: Areas that strongly support the predicted class
        - **Blue/Purple regions**: Areas with minimal influence on the decision
        - **Focus areas**: The model typically focuses on cell nucleus, cytoplasm, and morphological features
        
        ### Clinical Relevance
        
        For cervical cancer cell classification:
        - **Dyskeratotic**: Look for abnormal keratinization patterns
        - **Koilocytotic**: HPV-related perinuclear halos
        - **Metaplastic**: Cell transformation indicators
        - **Parabasal**: Immature cell characteristics
        - **Superficial-Intermediate**: Normal mature cell features
        
        ### Model Confidence
        
        - **>90%**: High confidence - strong match to training data
        - **70-90%**: Good confidence - typical prediction
        - **50-70%**: Moderate confidence - may require review
        - **<50%**: Low confidence - uncertain classification
        """)
    
    # Download section
    st.markdown("---")
    col1, col2 = st.columns(2)
    
    with col1:
        # Save overlay as bytes for download
        overlay_pil = Image.fromarray(overlay)
        
        from io import BytesIO
        buf = BytesIO()
        overlay_pil.save(buf, format='PNG')
        byte_im = buf.getvalue()
        
        st.download_button(
            label="📥 Download GradCAM++ Visualization",
            data=byte_im,
            file_name=f"gradcam_{pred_class}_{uploaded_file.name}",
            mime="image/png"
        )
    
    with col2:
        # Create results JSON
        results_json = {
            "predicted_class": pred_class,
            "confidence": float(confidence),
            "probabilities": {k: float(v) for k, v in all_probs.items()}
        }
        
        st.download_button(
            label="📥 Download Prediction Results (JSON)",
            data=str(results_json),
            file_name=f"results_{uploaded_file.name}.json",
            mime="application/json"
        )
    
    # Footer
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; color: #888; padding: 1rem;">
        <p>CBAM-ResNet50 Cervical Cancer Cell Classifier | Powered by PyTorch & Streamlit</p>
        <p>⚠️ This tool is for research purposes only. Always consult medical professionals for diagnosis.</p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()
