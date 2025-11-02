# 🔥 Project Phoenix - Cervical Cancer Cell Classification

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

Project Phoenix is an **Explainable AI Classification System** for cervical cancer cell detection. Built with cutting-edge web technologies, it provides an interactive interface to explore and understand different types of cervical cells identified through microscopic analysis.

## ✨ Features

- 🎨 **Interactive Cell Classification Showcase** - Explore 5 different cervical cell types with smooth animations
- 🔍 **Explainable AI** - Transparent AI-driven classification system for better diagnosis
- 📱 **Fully Responsive** - Seamless experience across all devices (mobile, tablet, desktop)
- 🎭 **Modern UI/UX** - Interactive gradient backgrounds, smooth transitions, and engaging animations
- 🧬 **Cell Type Visualization** - High-quality microscopic images with detailed descriptions
- 🎯 **Geometric Shape Icons** - Visual hierarchy using shapes with increasing sides (3-8 sides)

## 🔬 Cell Types Classified

1. **Metaplastic** (△ Triangle) - Normal cell transformation process
2. **Dyskeratotic** (□ Square) - Abnormal keratinization pattern
3. **Koilocytotic** (⬠ Pentagon) - HPV-related cellular changes
4. **Superficial Intermediate** (⬡ Hexagon) - Middle layer cell characteristics
5. **Parabasal** (⬢ Octagon) - Deep layer cell structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Meet2304/Project-Phoenix.git
cd Project-Phoenix/Phoenix/phoenix-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/) with App Router & Turbopack
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

### Fonts
- **Michroma** - Hero titles and headings
- **Poppins** - Body text and descriptions
- **Playfair Display** - Accent text

### Icons & Components
- [Lucide React](https://lucide.dev/) - Icon library
- Custom SVG geometric shapes for classification icons

## 📁 Project Structure

```
phoenix-app/
├── public/
│   └── images/
│       └── Landing Page/          # Cell classification images
│           ├── Metaplastic.jpg
│           ├── Dyskeratotic.jpg
│           ├── Koilocytotic.jpg
│           ├── Superficial Intermediate.jpg
│           └── Parabasal.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with font configuration
│   │   ├── page.tsx               # Main landing page
│   │   ├── globals.css            # Global styles
│   │   └── about/
│   │       └── page.tsx           # About page
│   ├── components/
│   │   ├── hero-section.tsx       # Hero section with PHOENIX title
│   │   ├── interactive-selector.tsx # Main classification showcase
│   │   ├── navigation-dock.tsx    # Bottom navigation
│   │   ├── page-layout.tsx        # Layout wrapper
│   │   ├── interactive-gradient-background.tsx
│   │   └── index.ts               # Component exports
│   ├── config/
│   │   └── constants.ts           # App configuration
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   └── lib/
│       └── utils.ts               # Utility functions
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Key Components

### Hero Section
- Large "PHOENIX" title with Michroma font
- Responsive clamp sizing
- Interactive gradient background with circular animation

### Interactive Selector
- Accordion-style cell type showcase
- Geometric shape icons (3-8 sides progression)
- Smooth expand/collapse animations
- Responsive sizing from 300px to 600px height
- Full-width support up to 1400px

### Navigation Dock
- Fixed bottom navigation
- Hover-activated tooltips
- Home and About page links

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

```css
Mobile:    < 640px
sm:        640px+
md:        768px+
lg:        1024px+
xl:        1280px+
2xl:       1536px+
```

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Code Quality
- ESLint configured for Next.js
- TypeScript strict mode enabled
- Modular component architecture

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Meet2304/Project-Phoenix)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📄 License

This project is part of a cervical cancer classification research initiative.

## 👥 Contributors

- **Meet Patel** - [Meet2304](https://github.com/Meet2304)

## 🙏 Acknowledgments

- Medical imaging data providers
- Open source community
- Next.js and React teams

## 📞 Contact

For questions or collaboration opportunities, please open an issue on GitHub.

---

**Built with ❤️ for advancing medical diagnostics through AI**
