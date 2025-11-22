/**
 * Hugging Face Gradio API Client
 * For Project Phoenix - Cervical Cancer Cell Classification
 */

import { Client } from "@gradio/client";

// Update this with your actual Hugging Face Space URL
// Format: https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
const SPACE_URL = process.env.NEXT_PUBLIC_HF_SPACE_URL || "https://meet2304-project-phoenix-cervical-classification.hf.space";

// Types
export interface PredictionResult {
  label: string;
  confidences: Array<{
    label: string;
    confidence: number;
  }>;
}

export interface ExplainabilityResult {
  probabilities: PredictionResult;
  gradcamImage: string;
  gradcamPlusPlusImage: string;
  layercamImage: string;
  info: string;
}

/**
 * Predict cervical cell classification (Basic mode)
 * @param imageFile - The image file to classify
 * @returns Prediction results with probabilities
 */
export async function predictBasic(imageFile: File | Blob): Promise<PredictionResult> {
  try {
    console.log('Connecting to Gradio Space:', SPACE_URL);
    const app = await Client.connect(SPACE_URL);
    
    console.log('Sending prediction request (basic mode)...');
    console.log('Image file:', imageFile);
    
    // Convert Blob to File if needed
    let file = imageFile;
    if (imageFile instanceof Blob && !(imageFile instanceof File)) {
      file = new File([imageFile], 'image.png', { type: imageFile.type || 'image/png' });
    }
    
    console.log('Calling /predict_basic endpoint...');
    const result = await app.predict('/predict_basic', [file]);
    
    console.log('Received response:', result);
    
    // Gradio returns data in result.data format
    const data = result.data as any;
    console.log('Response data:', data);
  
    // The Label component returns an object with class names as keys and probabilities as values
    let labelData = data;
    
    // If data is array, the Label output is the first element
    if (Array.isArray(data)) {
      labelData = data[0];
      console.log('Extracted label data from array:', labelData);
    }
    
    // Parse the Label component output
    if (labelData && typeof labelData === 'object') {
      // Convert object to array of confidences
      const confidences = Object.entries(labelData)
        .map(([label, confidence]) => ({
          label,
          confidence: confidence as number
        }))
        .sort((a, b) => b.confidence - a.confidence);
      
      console.log('Parsed confidences:', confidences);
      
      return {
        label: confidences[0]?.label || '',
        confidences
      };
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Prediction error:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('405')) {
        throw new Error('The Gradio Space returned 405 Method Not Allowed. Please check if the Space is running at ' + SPACE_URL);
      }
      if (error.message.includes('fetch')) {
        throw new Error('Failed to connect to the Gradio Space. Please check your internet connection and verify the Space is online.');
      }
      throw new Error(`Failed to get prediction: ${error.message}`);
    }
    throw new Error('Failed to get prediction: Unknown error');
  }
}

/**
 * Predict with GRAD-CAM explainability visualization
 * @param imageFile - The image file to classify
 * @returns Prediction results with GRAD-CAM heatmap
 */
export async function predictWithExplainability(imageFile: File | Blob): Promise<ExplainabilityResult> {
  try {
    console.log('Connecting to Gradio Space for explainability:', SPACE_URL);
    const app = await Client.connect(SPACE_URL);
    
    // Debug: View available API endpoints
    try {
      const apiInfo = await app.view_api();
      console.log('Available Gradio API endpoints:', apiInfo);
    } catch (e) {
      console.log('Could not fetch API info:', e);
    }
    
    console.log('Sending explainability prediction request...');
    console.log('Image file:', imageFile);
    
    // Convert Blob to File if needed
    let file = imageFile;
    if (imageFile instanceof Blob && !(imageFile instanceof File)) {
      file = new File([imageFile], 'image.png', { type: imageFile.type || 'image/png' });
    }
    
    console.log('Calling /predict_with_explainability endpoint...');
    const result = await app.predict('/predict_with_explainability', [file]);
    
    console.log('Received explainability response:', result);
    
    // Gradio returns array of outputs: [probabilities, gradcam_image, gradcam_plusplus_image, layercam_image, info_text]
    const data = result.data as any[];
    console.log('Response data:', data);
    console.log('Response data[0] (probabilities):', JSON.stringify(data[0], null, 2));
  
    if (Array.isArray(data) && data.length >= 5) {
      const probabilitiesData = data[0];
      const gradcamImageData = data[1];
      const gradcamPlusPlusImageData = data[2];
      const layercamImageData = data[3];
      const infoText = data[4];
      
      console.log('Explainability components:', {
        probabilitiesData: probabilitiesData,
        probabilitiesType: typeof probabilitiesData,
        probabilitiesKeys: probabilitiesData ? Object.keys(probabilitiesData) : [],
        gradcamType: typeof gradcamImageData,
        gradcamPlusPlusType: typeof gradcamPlusPlusImageData,
        layercamType: typeof layercamImageData,
        infoLength: infoText?.length
      });
      
      // Gradio Label component can return different formats:
      // Format 1: { "label": "Dyskeratotic", "confidences": [{label: "...", confidence: 0.8}, ...] }
      // Format 2: { "Dyskeratotic": 0.8758, "Koilocytotic": 0.05, ... }
      // Format 3: { "label": {"Dyskeratotic": 0.8758, ...} }
      
      let confidences: Array<{label: string, confidence: number}> = [];
      
      // Check Format 1: Has both 'label' and 'confidences' properties
      if (probabilitiesData && 
          typeof probabilitiesData === 'object' && 
          'label' in probabilitiesData && 
          'confidences' in probabilitiesData &&
          Array.isArray(probabilitiesData.confidences)) {
        
        console.log('Using Format 1 (label + confidences array)');
        confidences = probabilitiesData.confidences.map((item: any) => ({
          label: item.label,
          confidence: typeof item.confidence === 'number' ? item.confidence : parseFloat(item.confidence)
        }));
        
      } 
      // Check Format 3: Has 'label' property that contains an object
      else if (probabilitiesData && 
               typeof probabilitiesData === 'object' && 
               'label' in probabilitiesData &&
               typeof probabilitiesData.label === 'object') {
        
        console.log('Using Format 3 (wrapped in label property)');
        confidences = Object.entries(probabilitiesData.label)
          .map(([label, confidence]) => ({
            label,
            confidence: typeof confidence === 'number' ? confidence : parseFloat(confidence as string)
          }))
          .sort((a, b) => b.confidence - a.confidence);
        
      }
      // Format 2: Direct object with label: confidence pairs
      else if (probabilitiesData && typeof probabilitiesData === 'object') {
        
        console.log('Using Format 2 (direct object)');
        confidences = Object.entries(probabilitiesData)
          .map(([label, confidence]) => ({
            label,
            confidence: typeof confidence === 'number' ? confidence : parseFloat(confidence as string)
          }))
          .sort((a, b) => b.confidence - a.confidence);
      }
      
      console.log('Parsed confidences:', confidences);
      
      // Helper function to extract image URL from Gradio Image component response
      const extractImageUrl = (imageData: any): string => {
        if (typeof imageData === 'object' && imageData !== null) {
          // Gradio Image component returns {path: "...", url: "...", orig_name: "..."}
          // For temporary files, we need to use the /file/ endpoint
          const path = imageData.path;
          
          if (path) {
            // Get the base URL without replica suffix
            const baseUrl = SPACE_URL.split('/--replicas/')[0];
            // Construct the Gradio file serving URL - note: single slash before 'file='
            return `${baseUrl}/file=${path}`;
          }
        } else if (typeof imageData === 'string') {
          // If it's already a string path
          if (imageData.startsWith('/')) {
            const baseUrl = SPACE_URL.split('/--replicas/')[0];
            return `${baseUrl}/file=${imageData}`;
          } else {
            return imageData;
          }
        }
        return '';
      };
      
      // Extract image URLs for all three CAM methods
      const gradcamImageUrl = extractImageUrl(gradcamImageData);
      const gradcamPlusPlusImageUrl = extractImageUrl(gradcamPlusPlusImageData);
      const layercamImageUrl = extractImageUrl(layercamImageData);
      
      console.log('Processed CAM image URLs:', {
        gradcam: gradcamImageUrl,
        gradcamPlusPlus: gradcamPlusPlusImageUrl,
        layercam: layercamImageUrl
      });
      
      return {
        probabilities: {
          label: confidences[0]?.label || '',
          confidences
        },
        gradcamImage: gradcamImageUrl,
        gradcamPlusPlusImage: gradcamPlusPlusImageUrl,
        layercamImage: layercamImageUrl,
        info: infoText
      };
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Prediction with explainability error:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('405')) {
        throw new Error('The Gradio Space returned 405 Method Not Allowed. Please check if the Space is running at ' + SPACE_URL);
      }
      if (error.message.includes('fetch')) {
        throw new Error('Failed to connect to the Gradio Space. Please check your internet connection and verify the Space is online.');
      }
      throw new Error(`Failed to get prediction with explainability: ${error.message}`);
    }
    throw new Error('Failed to get prediction with explainability: Unknown error');
  }
}

/**
 * Health check for the Hugging Face Space
 * @returns Boolean indicating if the space is accessible
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const client = await Client.connect(SPACE_URL);
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}
