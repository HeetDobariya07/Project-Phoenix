# 🚀 Quick Start - Hugging Face Integration

## Automated Setup (Recommended)

Run this single command in PowerShell from the `phoenix-app` directory:

```powershell
.\setup-integration.ps1
```

Then start your dev server:

```powershell
npm run dev
```

Visit: `http://localhost:3000/inference`

---

## Manual Setup

### 1. Install Dependencies

```powershell
npm install @gradio/client
```

### 2. Create `.env.local`

Create a file named `.env.local` in the phoenix-app root with:

```env
NEXT_PUBLIC_HF_SPACE_URL=https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
```

Replace with your actual Hugging Face Space URL.

### 3. Start Dev Server

```powershell
npm run dev
```

### 4. Test

1. Go to `http://localhost:3000/inference`
2. Upload an image or select a sample
3. Click "Run Inference"
4. Wait for results (first request may take 30-60 seconds)

---

## 📖 Full Documentation

- **Detailed Guide**: See `INTEGRATION_GUIDE.md`
- **Deployment Guide**: See `../Project-Phoenix/DEPLOYMENT_GUIDE.md`

---

## ⚡ Quick Troubleshooting

**"Failed to get prediction"**
- Check your Space URL in `.env.local`
- Verify your Space is running on Hugging Face
- Wait 60 seconds (Space may be sleeping)

**"Module not found: @gradio/client"**
```powershell
npm install @gradio/client
rm -r -fo .next
npm run dev
```

**Environment variable not loading**
- Restart your dev server (Ctrl+C, then `npm run dev`)

---

## ✅ Success Indicators

- ✅ Dev server starts without errors
- ✅ Can select/upload images
- ✅ "Run Inference" button works
- ✅ See loading spinner
- ✅ Results appear with predictions
- ✅ Confidence scores show correctly

---

## 🆘 Need Help?

1. Check browser console (F12)
2. Read `INTEGRATION_GUIDE.md`
3. Verify Space is running at your Hugging Face URL
