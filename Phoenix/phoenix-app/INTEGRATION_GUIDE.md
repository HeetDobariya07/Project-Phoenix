# Hugging Face Integration Setup Guide

This guide will walk you through integrating your deployed Hugging Face model with the Next.js inference page.

---

## 📋 Prerequisites

✅ Your model is deployed on Hugging Face Spaces and running
✅ You have the Space URL (e.g., `https://meet2304-project-phoenix.hf.space`)
✅ Node.js and npm are installed
✅ You're in the phoenix-app directory

---

## 🚀 Step-by-Step Integration

### Step 1: Install Required Dependencies

Open PowerShell in your phoenix-app directory and run:

```powershell
cd "C:\Meet\Projects\Project_8_Phoenix_Cervical Cancer Image Classification\Project-Phoenix\Phoenix\phoenix-app"

npm install @gradio/client
```

**What this does:** Installs the official Gradio client library that allows your Next.js app to communicate with your Hugging Face Space.

---

### Step 2: Create Environment Variables File

Create a new file called `.env.local` in the phoenix-app root:

```powershell
# Create .env.local file
New-Item -Path ".env.local" -ItemType File -Force
```

Then open `.env.local` and add your Hugging Face Space URL:

```env
# Your Hugging Face Space URL
NEXT_PUBLIC_HF_SPACE_URL=https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
```

**Replace with your actual Space URL.** For example:
```env
NEXT_PUBLIC_HF_SPACE_URL=https://meet2304-project-phoenix-cervical-classification.hf.space
```

**Important Notes:**
- The URL should NOT have a trailing slash
- Use `NEXT_PUBLIC_` prefix so it's accessible in the browser
- If your Space is private, add your Hugging Face token:
  ```env
  NEXT_PUBLIC_HF_TOKEN=hf_your_token_here
  ```

---

### Step 3: Verify Your Hugging Face Space is Running

Before testing the integration, make sure your Space is active:

1. Go to your Space URL in a browser
2. You should see the Gradio interface
3. Test that you can upload an image and get predictions
4. Verify both tabs work:
   - Basic Prediction
   - Prediction + Explainability

---

### Step 4: Test the Integration Locally

Start your Next.js development server:

```powershell
npm run dev
```

Then open your browser to `http://localhost:3000/inference`

---

### Step 5: Test the Inference Flow

**Upload Mode:**
1. Click the "Upload Image" tab
2. Drag and drop an image or click to browse
3. Click "Run Inference"
4. Wait for results (first request may take 10-20 seconds as Space wakes up)
5. Verify you see:
   - Predicted class name
   - Confidence percentage
   - Top predictions with probability bars

**Sample Mode:**
1. Click the "Sample Images" tab
2. Select one of the 5 sample images
3. Click "Run Inference"
4. Verify results appear correctly

---

### Step 6: Troubleshooting Common Issues

#### Issue 1: "Failed to get prediction" Error

**Possible Causes:**
- Space URL is incorrect
- Space is sleeping (free tier)
- Space hasn't finished building

**Solutions:**
```powershell
# Check your .env.local file
Get-Content .env.local

# Verify the URL in your browser
# It should show the Gradio interface
```

If the Space is sleeping, the first request will be slow. Wait 30-60 seconds.

#### Issue 2: CORS Errors in Console

This shouldn't happen with Gradio Spaces, but if you see CORS errors:

**Solution:** Gradio automatically handles CORS. Make sure you're using `@gradio/client` and not direct fetch calls.

#### Issue 3: Module Not Found Error

```
Error: Cannot find module '@gradio/client'
```

**Solution:**
```powershell
# Reinstall the package
npm install @gradio/client --save

# Clear cache and restart
Remove-Item -Recurse -Force .next
npm run dev
```

#### Issue 4: Environment Variable Not Loading

**Solution:**
```powershell
# Restart your dev server
# Press Ctrl+C to stop
npm run dev
```

Environment variables in `.env.local` are only loaded on server start.

#### Issue 5: Slow Initial Response

**This is normal!** Free Hugging Face Spaces go to sleep after inactivity.

**What happens:**
1. First request wakes up the Space (15-30 seconds)
2. Model loads into memory (5-10 seconds)
3. Inference runs (1-2 seconds)

**Subsequent requests are fast (~1-2 seconds).**

To keep your Space awake (paid feature):
- Upgrade to a persistent hardware tier
- Or implement a keep-alive ping

---

### Step 7: Verify API Response Format

If you're getting unexpected results, check the console for the raw API response:

Open your browser's Developer Tools (F12) and check the Console tab when you run inference.

Expected response format:
```javascript
{
  label: "Dyskeratotic",
  confidences: [
    { label: "Dyskeratotic", confidence: 0.94 },
    { label: "Koilocytotic", confidence: 0.03 },
    // ... more predictions
  ]
}
```

---

## 🔧 Advanced Configuration

### Option 1: Use Explainability Mode (GRAD-CAM)

The current implementation uses basic prediction. To add GRAD-CAM:

1. Update `handleAnalyze` to use `predictWithExplainability` instead
2. Display the GRAD-CAM heatmap image
3. Show the explanation text

Example modification in `page.tsx`:

```typescript
import { predictBasic, predictWithExplainability } from "@/lib/inference-api";

// In handleAnalyze:
const result = await predictWithExplainability(imageFile);

setAnalysisResult({
  predicted_class: result.probabilities.label,
  confidence: result.probabilities.confidences[0]?.confidence || 0,
  top_predictions: result.probabilities.confidences.slice(0, 5).map(c => ({
    class: c.label,
    probability: c.confidence
  })),
  gradcamImage: result.gradcamImage, // Display this!
  explanation: result.info
});
```

### Option 2: Add Loading States with Progress

```typescript
const [loadingStage, setLoadingStage] = useState<string>('');

const handleAnalyze = async () => {
  setIsAnalyzing(true);
  
  setLoadingStage('Connecting to model...');
  // ... connection logic
  
  setLoadingStage('Preprocessing image...');
  // ... preprocessing
  
  setLoadingStage('Running inference...');
  // ... inference
  
  setLoadingStage('');
  setIsAnalyzing(false);
};
```

### Option 3: Implement Retry Logic

```typescript
async function retryWithBackoff(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
}

// In handleAnalyze:
const result = await retryWithBackoff(() => predictBasic(imageFile));
```

---

## 📊 Performance Optimization

### Caching Strategy

For sample images that are used repeatedly:

```typescript
const resultCache = new Map<string, any>();

const handleAnalyze = async () => {
  const cacheKey = selectedSample || 'upload';
  
  if (resultCache.has(cacheKey)) {
    setAnalysisResult(resultCache.get(cacheKey));
    return;
  }
  
  // ... normal inference flow
  
  resultCache.set(cacheKey, analysisResult);
};
```

### Preload Sample Images

Add this to prefetch sample images on page load:

```typescript
useEffect(() => {
  // Preload sample images
  SAMPLE_IMAGES.forEach(sample => {
    const img = new window.Image();
    img.src = sample.path;
  });
}, []);
```

---

## 🔐 Production Checklist

Before deploying to production:

- [ ] **Environment Variables**: Set `NEXT_PUBLIC_HF_SPACE_URL` in Vercel/hosting platform
- [ ] **Error Handling**: Verify all error messages are user-friendly
- [ ] **Loading States**: Ensure loading indicators work correctly
- [ ] **Rate Limiting**: Consider implementing client-side rate limiting
- [ ] **Analytics**: Add tracking for successful/failed predictions
- [ ] **Fallback**: Show helpful message if Space is down
- [ ] **Timeout**: Implement request timeout (60 seconds recommended)
- [ ] **Validation**: Verify image format before sending to API

---

## 🌐 Deploying to Production

### Vercel Deployment

1. Push your code to GitHub
2. Connect Vercel to your repository
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_HF_SPACE_URL`: Your Space URL

4. Deploy!

### Environment Variable in Vercel:

```
Project Settings → Environment Variables → Add New

Name: NEXT_PUBLIC_HF_SPACE_URL
Value: https://your-username-your-space.hf.space
Environment: Production, Preview, Development
```

---

## 📈 Monitoring

### Track Inference Metrics

Add logging to track:
- Response times
- Success/failure rates
- Most common predictions
- Error types

```typescript
const handleAnalyze = async () => {
  const startTime = Date.now();
  
  try {
    const result = await predictBasic(imageFile);
    
    // Log success
    console.log('Inference success', {
      duration: Date.now() - startTime,
      prediction: result.label,
      confidence: result.confidences[0].confidence
    });
    
  } catch (error) {
    // Log error
    console.error('Inference failed', {
      duration: Date.now() - startTime,
      error: error.message
    });
  }
};
```

---

## 🎯 Quick Reference Commands

```powershell
# Navigate to project
cd "C:\Meet\Projects\Project_8_Phoenix_Cervical Cancer Image Classification\Project-Phoenix\Phoenix\phoenix-app"

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Check environment variables
Get-Content .env.local

# Clear cache
Remove-Item -Recurse -Force .next
```

---

## ✅ Integration Checklist

- [ ] Installed `@gradio/client` package
- [ ] Created `.env.local` with Space URL
- [ ] Verified Space is running on Hugging Face
- [ ] Started Next.js dev server
- [ ] Tested image upload and inference
- [ ] Tested sample image selection and inference
- [ ] Verified error handling works
- [ ] Checked results display correctly
- [ ] Tested on different screen sizes
- [ ] Ready for production deployment

---

## 🆘 Need Help?

### Check These First:

1. **Browser Console (F12)**: Check for JavaScript errors
2. **Network Tab**: Verify API requests are being sent
3. **Hugging Face Logs**: Check your Space logs for errors
4. **Environment Variables**: Verify they're set correctly

### Common Success Indicators:

✅ Dev server starts without errors
✅ Inference page loads without console errors  
✅ Can upload/select images
✅ "Run Inference" button enables when image is selected
✅ Loading spinner shows during inference
✅ Results appear after 5-30 seconds (first request)
✅ Subsequent requests are faster (1-3 seconds)

---

**Congratulations!** 🎉 Your Hugging Face model is now integrated with your Next.js application!
