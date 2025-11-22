# ⚡ EXECUTE THESE COMMANDS NOW

Copy and paste these commands one by one into PowerShell:

---

## 1️⃣ Navigate to Project Directory

```powershell
cd "C:\Meet\Projects\Project_8_Phoenix_Cervical Cancer Image Classification\Project-Phoenix\Phoenix\phoenix-app"
```

---

## 2️⃣ Install Gradio Client

```powershell
npm install @gradio/client
```

**Wait for:** ✅ "added 1 package..."

---

## 3️⃣ Create Environment File

**Replace `YOUR_SPACE_URL` with your actual Hugging Face Space URL!**

```powershell
@"
NEXT_PUBLIC_HF_SPACE_URL=https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
"@ | Out-File -FilePath ".env.local" -Encoding utf8
```

**Example (replace with yours):**
```powershell
@"
NEXT_PUBLIC_HF_SPACE_URL=https://meet2304-project-phoenix-cervical-classification.hf.space
"@ | Out-File -FilePath ".env.local" -Encoding utf8
```

---

## 4️⃣ Verify Environment File

```powershell
Get-Content .env.local
```

**Expected output:**
```
NEXT_PUBLIC_HF_SPACE_URL=https://your-space-url.hf.space
```

---

## 5️⃣ Start Development Server

```powershell
npm run dev
```

**Wait for:** ✅ "Ready in X.Xs"

---

## 6️⃣ Open in Browser

Navigate to: **http://localhost:3000/inference**

---

## 7️⃣ Test Inference

1. **Select a sample image** or **upload your own**
2. Click **"Run Inference"**
3. **Wait 30-60 seconds** (first time only)
4. ✅ See results!

---

## ✅ Success Looks Like:

- Predicted class name appears
- Confidence percentage shows
- Progress bars animate
- Image displays

---

## ❌ If You Get Errors:

**Check your Space URL:**
```powershell
Get-Content .env.local
```

**Verify Space is running:**
Open your Space URL in a browser - should show Gradio interface

**Restart dev server:**
Press `Ctrl+C` then run `npm run dev` again

---

## 📚 More Help:

- **Quick Start:** `QUICKSTART.md`
- **Full Guide:** `INTEGRATION_GUIDE.md`
- **Implementation Details:** `IMPLEMENTATION_COMPLETE.md`

---

**That's it!** 🎉 Your model is integrated!
