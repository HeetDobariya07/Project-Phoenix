# Image Assets Directory

This directory contains cell classification images for the Phoenix application.

## Required Images

Place the following images in the `public/images/` directory:

### Cell Type Images (Required)

1. **metaplastic.jpg** - Metaplastic cell image
2. **dyskeratotic.jpg** - Dyskeratotic cell image  
3. **koilocytotic.jpg** - Koilocytotic cell image
4. **superficial-intermediate.jpg** - Superficial Intermediate cell image
5. **parabasal.jpg** - Parabasal cell image

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 400-800px width, maintaining aspect ratio
- **Aspect Ratio**: 4:5 or similar (portrait orientation works best)
- **Quality**: High resolution for medical accuracy

## File Structure

```
public/
└── images/
    ├── metaplastic.jpg
    ├── dyskeratotic.jpg
    ├── koilocytotic.jpg
    ├── superficial-intermediate.jpg
    └── parabasal.jpg
```

## Adding Images

1. Create the `public/images/` directory if it doesn't exist
2. Add your cell classification images with the exact filenames listed above
3. The images will be automatically optimized by Next.js Image component

## Fallback

If images are not found, the component will display a placeholder. Make sure to add all 5 images for the best user experience.
