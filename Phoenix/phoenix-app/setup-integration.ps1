# Quick Setup Script for Hugging Face Integration
# Run this in PowerShell from the phoenix-app directory

Write-Host "🚀 Project Phoenix - Hugging Face Integration Setup" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
$currentPath = Get-Location
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the phoenix-app directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Found package.json" -ForegroundColor Green
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Step 1: Installing @gradio/client..." -ForegroundColor Yellow
try {
    npm install @gradio/client
    Write-Host "✓ @gradio/client installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install @gradio/client" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Create .env.local if it doesn't exist
Write-Host "🔧 Step 2: Setting up environment variables..." -ForegroundColor Yellow

if (Test-Path ".env.local") {
    Write-Host "⚠️  .env.local already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Skipping .env.local setup" -ForegroundColor Yellow
        Write-Host ""
    }
}

if (-not (Test-Path ".env.local") -or $overwrite -eq "y") {
    Write-Host ""
    Write-Host "Please enter your Hugging Face Space URL" -ForegroundColor Cyan
    Write-Host "Example: https://meet2304-project-phoenix.hf.space" -ForegroundColor Gray
    $spaceUrl = Read-Host "Space URL"
    
    if ([string]::IsNullOrWhiteSpace($spaceUrl)) {
        Write-Host "❌ Space URL cannot be empty!" -ForegroundColor Red
        exit 1
    }
    
    # Remove trailing slash if present
    $spaceUrl = $spaceUrl.TrimEnd('/')
    
    $envContent = @"
# Hugging Face Space Configuration
# Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# Your Hugging Face Space URL (required)
NEXT_PUBLIC_HF_SPACE_URL=$spaceUrl

# Optional: Hugging Face API Token (only if your Space is private)
# Get your token from: https://huggingface.co/settings/tokens
# NEXT_PUBLIC_HF_TOKEN=hf_your_token_here
"@
    
    Set-Content -Path ".env.local" -Value $envContent
    Write-Host "✓ .env.local created successfully" -ForegroundColor Green
    Write-Host "  Space URL: $spaceUrl" -ForegroundColor Gray
}
Write-Host ""

# Step 3: Verify files exist
Write-Host "📋 Step 3: Verifying integration files..." -ForegroundColor Yellow

$requiredFiles = @(
    "src/lib/inference-api.ts",
    "src/app/inference/page.tsx"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "❌ Some required files are missing!" -ForegroundColor Red
    Write-Host "Please ensure all integration files are present." -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 4: Test Space connectivity
Write-Host "🌐 Step 4: Testing Space connectivity..." -ForegroundColor Yellow

if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match 'NEXT_PUBLIC_HF_SPACE_URL=(.+)') {
        $testUrl = $matches[1].Trim()
        
        try {
            Write-Host "  Testing: $testUrl" -ForegroundColor Gray
            $response = Invoke-WebRequest -Uri $testUrl -Method HEAD -TimeoutSec 10 -ErrorAction Stop
            Write-Host "✓ Space is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Could not reach Space" -ForegroundColor Yellow
            Write-Host "  This might be normal if the Space is sleeping" -ForegroundColor Gray
            Write-Host "  The first request may take 30-60 seconds" -ForegroundColor Gray
        }
    }
}
Write-Host ""

# Summary
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "📌 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Start the development server:" -ForegroundColor White
Write-Host "     npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Open your browser to:" -ForegroundColor White
Write-Host "     http://localhost:3000/inference" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Test the inference:" -ForegroundColor White
Write-Host "     - Upload an image or select a sample" -ForegroundColor Gray
Write-Host "     - Click 'Run Inference'" -ForegroundColor Gray
Write-Host "     - Wait for results (first request may be slow)" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For detailed instructions, see INTEGRATION_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🆘 Having issues? Check:" -ForegroundColor Yellow
Write-Host "  - Browser console (F12) for errors" -ForegroundColor Gray
Write-Host "  - Your Space is running on Hugging Face" -ForegroundColor Gray
Write-Host "  - .env.local has the correct Space URL" -ForegroundColor Gray
Write-Host ""
