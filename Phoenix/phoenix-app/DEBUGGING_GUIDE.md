# 🔍 How to Check Hugging Face Inference Logs & Debug

## 📊 Viewing Logs on Hugging Face Spaces

### Step 1: Navigate to Your Space

1. Go to: `https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME`
2. Example: `https://huggingface.co/spaces/Meet2304/Project-Phoenix`

### Step 2: Access the Logs Tab

1. On your Space page, look for the tabs at the top:
   - **App** (default view showing your Gradio interface)
   - **Files** (your code files)
   - **Settings** (configuration)
   - **Logs** ⭐ **(This is what you need!)**

2. Click on the **"Logs"** tab

### Step 3: Monitor Real-time Logs

The Logs tab shows:
- **Build logs** (when Space is starting)
- **Runtime logs** (console output from your app.py)
- **Error messages** (any Python errors)
- **Request logs** (incoming API calls)

**What to look for:**
```
Loading model from Hugging Face...
✓ Processor loaded
✓ Model loaded and set to evaluation mode
Running on local URL:  http://0.0.0.0:7860
```

---

## 🐛 Debugging API Endpoint Names

### Method 1: Check Gradio API Info

Your Space automatically generates an API documentation page:

**URL Format:**
```
https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/?view=api
```

**Example:**
```
https://meet2304-project-phoenix.hf.space/?view=api
```

This page shows:
- All available API endpoints
- Endpoint names (e.g., `/predict`, `/predict_1`)
- Input/output formats
- Example code

### Method 2: Inspect from Browser

1. Open your Space in browser
2. Open Developer Tools (F12)
3. Go to **Network** tab
4. Click a button in the Gradio interface
5. Look for the API call - it will show the endpoint name

---

## 🔧 Current Fix Applied

I've updated the API to use the correct Gradio endpoint names:

### For Basic Prediction:
```typescript
// Endpoint: /predict
// Input parameter name: input_image_basic
const result = await client.predict("/predict", {
  input_image_basic: imageFile,
});
```

### For Explainability:
```typescript
// Endpoint: /predict_1
// Input parameter name: input_image_explain
const result = await client.predict("/predict_1", {
  input_image_explain: imageFile,
});
```

### How These Map to Your Gradio App:

In your `app.py`:
```python
# First button.click = /predict
predict_btn_basic.click(
    fn=predict_basic,
    inputs=input_image_basic,  # This becomes "input_image_basic" in API
    outputs=output_label_basic
)

# Second button.click = /predict_1
predict_btn_explain.click(
    fn=predict_with_explainability,
    inputs=input_image_explain,  # This becomes "input_image_explain" in API
    outputs=[output_label_explain, output_gradcam, output_info]
)
```

---

## ✅ Testing the Fix

### Step 1: Clear Everything
```powershell
# Stop dev server (Ctrl+C)

# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Restart
npm run dev
```

### Step 2: Hard Refresh Browser
- Press `Ctrl+Shift+R` (Windows)
- Or `Ctrl+F5`

### Step 3: Test with Console Open

1. Open browser to `http://localhost:3000/inference`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Upload or select an image
5. Click "Run Inference"

**You should now see helpful console logs:**
```
Connecting to Gradio Space: https://...
Sending prediction request...
Received response: {...}
Label data: {...}
Parsed confidences: [...]
```

---

## 🔍 Debugging Checklist

### If You Still Get Errors:

#### 1. **Verify Space URL**
```powershell
Get-Content .env.local
```
Should show: `NEXT_PUBLIC_HF_SPACE_URL=https://your-space.hf.space`

#### 2. **Check Space Status**
- Go to your Space URL in browser
- Should show "Running" status
- Try uploading an image directly in the Gradio interface

#### 3. **View Space Logs**
- Click "Logs" tab on your Space
- Look for errors when you trigger inference
- Check if model is loaded

#### 4. **Test API Endpoint**
Visit: `https://your-space.hf.space/?view=api`

Look for:
- Endpoint names (should be `/predict` and `/predict_1`)
- Input parameter names
- Expected data types

#### 5. **Check Browser Console**
Press F12, look for:
- Connection errors
- CORS errors
- Network failures
- Our new console.log messages

---

## 📝 Common Log Messages

### On Hugging Face (Python logs):

**Success:**
```
Loading model from Hugging Face...
✓ Model loaded and set to evaluation mode
Running on local URL: http://0.0.0.0:7860
```

**During Inference:**
```
(Tensor shapes, predictions, confidence scores)
```

**Errors:**
```
Error: ...
Traceback: ...
```

### In Browser (JavaScript logs):

**Success:**
```
Connecting to Gradio Space: https://...
Sending prediction request...
Received response: { data: [...] }
Parsed confidences: [{ label: "Dyskeratotic", confidence: 0.94 }, ...]
```

**Errors:**
```
Error: No value provided for required parameter
Failed to get prediction: ...
```

---

## 🎯 Quick Verification Steps

### 1. Test Space Directly
```
1. Go to your Space URL
2. Upload an image in Gradio interface
3. Click "Classify"
4. Should work perfectly
```

### 2. Check API Documentation
```
1. Add ?view=api to your Space URL
2. See list of endpoints
3. Verify endpoint names match our code
```

### 3. Test from Browser Console
```javascript
// Open browser console (F12) and paste:
fetch('https://your-space.hf.space/?view=api')
  .then(r => r.text())
  .then(console.log)
```

---

## 🆘 If Still Failing

### Get More Information:

**1. Console Logs (Browser):**
- Open F12 → Console tab
- Copy ALL error messages
- Look for the full stack trace

**2. Network Tab (Browser):**
- Open F12 → Network tab
- Filter by "Fetch/XHR"
- Look for requests to your Space
- Check request/response details

**3. Space Logs (Hugging Face):**
- Go to Logs tab
- Copy recent logs
- Look for Python errors

**4. API Documentation:**
- Visit `your-space.hf.space/?view=api`
- Screenshot the endpoint info
- Compare with our code

---

## 💡 Pro Tips

### Enable Verbose Logging

The updated code now includes `console.log` statements. You'll see:
- Connection status
- Request being sent
- Response received
- Data parsing steps

This helps identify exactly where things fail.

### Keep Space Awake

Free tier Spaces sleep after 48 hours. When sleeping:
- First request takes 30-60 seconds
- Subsequent requests are fast

To keep awake:
- Upgrade to paid tier
- Or send periodic requests

### Test in Stages

1. ✅ Space loads in browser
2. ✅ Can upload image in Gradio
3. ✅ Direct Gradio interface works
4. ✅ Browser console shows connection
5. ✅ Request is sent
6. ✅ Response is received
7. ✅ Data is parsed correctly
8. ✅ Results display in UI

---

## 📸 Screenshots to Check

### Hugging Face Logs Tab:
- Should show "Running" status
- Console output from Python
- Any error messages

### Browser Developer Tools:
- Console: JavaScript logs
- Network: API requests
- Application: Environment variables

### Gradio API Page:
- List of endpoints
- Input/output schemas
- Example requests

---

**After applying these fixes, restart your dev server and test again!** The console logs will help us identify exactly what's happening. 🔍
