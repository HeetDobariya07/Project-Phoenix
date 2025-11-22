# Gradio API Debugging Guide

## Current Issues

### 405 Method Not Allowed Error
The Gradio Space is returning a 405 error when trying to access the prediction endpoints.

### Possible Causes

1. **Space Not Running**: The Hugging Face Space might be in a sleeping state
2. **Wrong API Format**: The API calling format might not match the Gradio version
3. **CORS Issues**: Cross-origin request issues (though less likely with HF Spaces)

## Troubleshooting Steps

### 1. Check if Space is Running
Visit: https://Meet2304-Project-Phoenix.hf.space

- If you see "Building..." or "Starting...", wait for it to finish
- If you see "Runtime Error", check the Space logs
- If it loads successfully, the Space is running

### 2. View API Documentation
Visit: https://Meet2304-Project-Phoenix.hf.space/?view=api

This shows the exact API structure and how to call each endpoint.

### 3. Check Space Logs
In Hugging Face Space settings, check the logs for any errors during model loading or runtime.

## What We've Implemented

### Multi-Method API Calling
The code now tries 3 different methods to call the API:

1. **Named Endpoint**: `/predict_basic` or `/predict_with_explainability`
2. **Numeric Index**: `0` or `1` (button.click order)
3. **Generic API**: `/api/predict`

### Enhanced Error Messages
The code now provides specific error messages for:
- 405 errors (Space not running)
- Network errors (connection issues)
- API format errors

### API Info Logging
On first call, the code attempts to fetch and log the API structure using `view_api()`.

## Next Steps if Still Failing

1. **Restart the Space**: Go to HF Space settings and restart it
2. **Check Space Visibility**: Ensure the Space is public
3. **Update Gradio**: The Space might need a newer Gradio version
4. **Use Python Client**: Test with Python `gradio_client` to verify the Space works

## Example Working Code (Python)

```python
from gradio_client import Client

client = Client("https://Meet2304-Project-Phoenix.hf.space")
result = client.predict("image.jpg", api_name="/predict_with_explainability")
print(result)
```

If this works in Python but not in JavaScript, the issue is with the JS client integration.
