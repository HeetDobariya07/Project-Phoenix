# Components Directory

This directory contains all reusable UI components for the Phoenix application.

## Component Structure

### Layout Components
- **`page-layout.tsx`** - Main page wrapper with interactive gradient background
- **`interactive-gradient-background.tsx`** - Animated gradient background that responds to mouse movement

### Section Components
- **`hero-section.tsx`** - Hero section with title and subtitle
- **`footer.tsx`** - Footer with hover effects and navigation links

### UI Components
- **`hover-footer.tsx`** - Text hover effect and footer background gradient components

## Usage

All components are exported through `index.ts` for clean imports:

```tsx
import { PageLayout, HeroSection, Footer } from "@/components";
```

## Component Props

All components accept props for customization. See individual component files for TypeScript interfaces and available props.

## Styling

Components use:
- Tailwind CSS for styling
- CSS variables for custom fonts (defined in `layout.tsx`)
- Responsive design patterns for all screen sizes

## Best Practices

1. Keep components modular and reusable
2. Use TypeScript interfaces for type safety
3. Extract configuration to constants
4. Use semantic HTML elements
5. Ensure accessibility with ARIA labels where needed
