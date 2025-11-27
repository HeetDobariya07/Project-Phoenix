'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Eye, Zap, Layers, Activity, Focus, GitBranch } from "lucide-react";
import { Compare } from "@/components/ui/compare";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { useState, useEffect } from "react";
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator } from "@/components/ui/stepper";

// Bento Card Component
function BentoCard({ span = "", title, blurb, children }: { span?: string; title: string; blurb: string; children?: React.ReactNode }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur p-4 md:p-5 lg:p-6 transition-all hover:border-white/40 hover:shadow-xl hover:shadow-white/10 cursor-pointer",
        "before:absolute before:inset-0 before:z-0 before:opacity-100 before:pointer-events-none before:bg-[url('/noise.png')] before:bg-repeat before:bg-[length:60px_60px]",
        span
      )}
    >
      <header className="mb-3 md:mb-4 relative z-10">
        <h3 className="text-sm md:text-base lg:text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white mb-2" style={{ fontFamily: "var(--font-michroma)" }}>
          {title}
        </h3>
        <p className="text-[11px] md:text-xs leading-relaxed text-white/70 max-w-prose relative z-10 transition-colors group-hover:text-white/90" style={{ fontFamily: "var(--font-playfair)" }}>{blurb}</p>
      </header>
      {children && <div className="relative z-10">{children}</div>}
    </motion.article>
  );
}

// Animated Visualization Pipeline with Stepper
function VisualizationPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Forward Pass",
      description: "Image processed through ConvNeXt layers"
    },
    {
      title: "Gradient Flow",
      description: "Backpropagate to compute feature importance"
    },
    {
      title: "Heatmap Generation",
      description: "Weighted activation maps create visualization"
    }
  ];

  return (
    <div className="py-2 md:py-4 px-2 md:px-4">
      <Stepper value={activeStep} className="w-full justify-between">
        {steps.map((step, index) => (
          <StepperItem key={index} step={index} completed={index < activeStep} className="flex-1">
            <StepperTrigger className="flex flex-col items-center gap-2 md:gap-3 w-full pointer-events-none">
              <StepperIndicator className="w-10 h-10 md:w-12 md:h-12 text-base md:text-lg bg-white/5 border-2 border-white/20 text-white data-[state=active]:bg-white/10 data-[state=active]:border-white/40 data-[state=completed]:bg-white/10 data-[state=completed]:border-white/30 transition-all duration-300" />
              <div className="text-center space-y-0.5 md:space-y-1 w-full px-1">
                <StepperTitle className="text-[10px] md:text-xs font-semibold text-white/80 data-[state=active]:text-white transition-colors" style={{ fontFamily: "var(--font-poppins)" }}>
                  {step.title}
                </StepperTitle>
                <StepperDescription className="text-[9px] md:text-[10px] text-white/50 leading-tight hidden sm:block" style={{ fontFamily: "var(--font-poppins)" }}>
                  {step.description}
                </StepperDescription>
              </div>
            </StepperTrigger>
            {index < steps.length - 1 && (
              <StepperSeparator className="mx-2 md:mx-3 bg-white/10 data-[state=completed]:bg-white/30 transition-all duration-500 flex-1" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}

// XAI comparison data - Two examples per technique
const gradcamComparisons = [
  {
    cellType: "Dyskeratotic",
    description: "Abnormal cells with irregular keratinization patterns.",
    originalImage: "/images/Explanability/Dyskeratotic_processed.bmp",
    heatmapImage: "/images/Explanability/Dyskeratotic_gradcam.png",
    confidence: 94.2
  },
  {
    cellType: "Koilocytotic",
    description: "HPV-induced cells with characteristic perinuclear halos.",
    originalImage: "/images/Explanability/Koilocytotic_processed.bmp",
    heatmapImage: "/images/Explanability/Koilocytotic_gradcam.png",
    confidence: 96.8
  }
];

const gradcamPlusPlusComparisons = [
  {
    cellType: "Dyskeratotic",
    description: "Abnormal cells with irregular keratinization patterns.",
    originalImage: "/images/Explanability/Dyskeratotic_processed.bmp",
    heatmapImage: "/images/Explanability/Dyskeratotic_gradcam_pp.png",
    confidence: 94.2
  },
  {
    cellType: "Koilocytotic",
    description: "HPV-induced cells with characteristic perinuclear halos.",
    originalImage: "/images/Explanability/Koilocytotic_processed.bmp",
    heatmapImage: "/images/Explanability/Koilocytotic_gradcam_pp.png",
    confidence: 96.8
  }
];

const layercamComparisons = [
  {
    cellType: "Dyskeratotic",
    description: "Abnormal cells with irregular keratinization patterns.",
    originalImage: "/images/Explanability/Dyskeratotic_processed.bmp",
    heatmapImage: "/images/Explanability/Dyskeratotic_layercam.png",
    confidence: 94.2
  },
  {
    cellType: "Koilocytotic",
    description: "HPV-induced cells with characteristic perinuclear halos.",
    originalImage: "/images/Explanability/Koilocytotic_processed.bmp",
    heatmapImage: "/images/Explanability/Koilocytotic_layercam.png",
    confidence: 96.8
  }
];

export default function Explainability() {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20">
          <Link href="/about" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 md:mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>Back to About</span>
          </Link>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white" style={{ fontFamily: "var(--font-michroma)" }}>
            Model Explainability
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/80 mb-8 md:mb-12 max-w-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Understanding model decisions through gradient-based visualization techniques
          </p>

          {/* Bento Grid Layout */}
          <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6 auto-rows-[minmax(140px,auto)] mb-12 md:mb-16">
            
            {/* Grad-CAM - Spans 4 cols x 2 rows */}
            <BentoCard 
              span="md:col-span-4 md:row-span-1"
              title="Gradient-weighted Class Activation Mapping"
              blurb="Visualizes where the model focuses by highlighting important regions. Works with any CNN architecture without modifications."
            >
              <div className="space-y-4">
                {/* Interactive Heatmap Simulation */}
                <div className="relative h-32 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-1 p-2">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="rounded bg-white/10"
                        animate={{ 
                          opacity: [0.1, Math.random() * 0.5 + 0.2, 0.1],
                        }}
                        transition={{ 
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                  {/* Center focus indicator */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Focus className="w-8 h-8 text-white/50" />
                  </motion.div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-white/70" />
                      <div className="text-lg font-bold text-white">Visual</div>
                    </div>
                    <div className="text-xs text-white/60">Heatmaps</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg font-bold text-white mb-1">
                      <NumberFlow value={97} suffix="%" />
                    </div>
                    <div className="text-xs text-white/60">Accuracy</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg font-bold text-white mb-1">Conv</div>
                    <div className="text-xs text-white/60">Layer Target</div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Grad-CAM++ */}
            <BentoCard 
              span="md:col-span-2 md:row-span-1"
              title="Grad-CAM++"
              blurb="Enhanced version with better localization using weighted gradients. Excels at complex cellular structures."
            >
              <div className="space-y-3">
                {/* Weighted gradient bars visualization */}
                <div className="space-y-2">
                  {[0.9, 0.7, 0.5, 0.3].map((weight, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="text-xs text-white/40 w-8">w{i+1}</div>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white/30"
                          initial={{ width: 0 }}
                          animate={{ width: `${weight * 100}%` }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      <NumberFlow value={95.8} suffix="%" />
                    </div>
                    <div className="text-xs text-white/60">Multi-Instance</div>
                  </div>
                  <Zap className="w-5 h-5 text-white/50" />
                </div>
              </div>
            </BentoCard>

            {/* Layer-CAM */}
            <BentoCard 
              span="md:col-span-2 md:row-span-1"
              title="Layer-CAM"
              blurb="Combines multiple network layers for detailed feature visualization. Provides hierarchical insights."
            >
              <div className="space-y-3">
                {/* Stacked layers visualization */}
                <div className="relative h-24 md:h-28 flex items-center justify-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 bg-white/10 border border-white/20 rounded left-1/2 -translate-x-1/2"
                      style={{ 
                        bottom: `${10 + i * 12}px`,
                        width: `${Math.max(40, 80 - i * 10)}%`,
                        maxWidth: '180px'
                      }}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-white">
                      <NumberFlow value={96.5} suffix="%" />
                    </div>
                    <div className="text-xs text-white/60">Layer-wise</div>
                  </div>
                  <div className="text-xs text-white/40">5 Layers</div>
                </div>
              </div>
            </BentoCard>

            {/* Visualization Pipeline */}
            <BentoCard 
              span="md:col-span-4 md:row-span-1"
              title="Visualization Pipeline"
              blurb="Automated heatmap generation and overlay process for model interpretability"
            >
              <VisualizationPipeline />
            </BentoCard>

          </div>

          {/* GradCAM Visualizations */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: "var(--font-michroma)" }}>
              GradCAM Visualizations
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-8 md:mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
              Drag the slider to see where the model looks. Red regions show high importance, blue shows low importance.
            </p>

            <div className="space-y-12 md:space-y-16">
              {gradcamComparisons.map((comparison, index) => (
                <div key={index} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                        {comparison.cellType}
                      </h3>
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/20">
                        <span className="text-sm font-semibold text-white">
                          <NumberFlow value={comparison.confidence} suffix="%" /> Confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                      {comparison.description}
                    </p>
                  </div>

                  <div className="flex justify-center w-full px-2 sm:px-0">
                    <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px]">
                      <Compare
                        firstImage={comparison.heatmapImage}
                        secondImage={comparison.originalImage}
                        className="w-full aspect-square rounded-lg"
                        firstImageClassName="object-cover"
                        secondImageClassname="object-cover"
                        slideMode="drag"
                        showHandlebar={true}
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">GradCAM Heatmap</span>
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">Original Image</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GradCAM++ Visualizations */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: "var(--font-michroma)" }}>
              GradCAM++ Enhanced Localization
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-8 md:mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
              Improved localization with weighted gradients. Better at identifying multiple important regions at once.
            </p>

            <div className="space-y-12 md:space-y-16">
              {gradcamPlusPlusComparisons.map((comparison, index) => (
                <div key={index} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                        {comparison.cellType}
                      </h3>
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/20">
                        <span className="text-sm font-semibold text-white">
                          <NumberFlow value={comparison.confidence} suffix="%" /> Confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                      {comparison.description}
                    </p>
                  </div>

                  <div className="flex justify-center w-full px-2 sm:px-0">
                    <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px]">
                      <Compare
                        firstImage={comparison.heatmapImage}
                        secondImage={comparison.originalImage}
                        className="w-full aspect-square rounded-lg"
                        firstImageClassName="object-cover"
                        secondImageClassname="object-cover"
                        slideMode="drag"
                        showHandlebar={true}
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">GradCAM++ Heatmap</span>
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">Original Image</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LayerCAM Visualizations */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: "var(--font-michroma)" }}>
              LayerCAM Multi-Layer Analysis
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-8 md:mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
              Analyzes multiple network layers together. Shows both detailed features and high-level patterns.
            </p>

            <div className="space-y-12 md:space-y-16">
              {layercamComparisons.map((comparison, index) => (
                <div key={index} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                        {comparison.cellType}
                      </h3>
                      <div className="px-4 py-2 rounded-full bg-white/5 border border-white/20">
                        <span className="text-sm font-semibold text-white">
                          <NumberFlow value={comparison.confidence} suffix="%" /> Confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                      {comparison.description}
                    </p>
                  </div>

                  <div className="flex justify-center w-full px-2 sm:px-0">
                    <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[600px]">
                      <Compare
                        firstImage={comparison.heatmapImage}
                        secondImage={comparison.originalImage}
                        className="w-full aspect-square rounded-lg"
                        firstImageClassName="object-cover"
                        secondImageClassname="object-cover"
                        slideMode="drag"
                        showHandlebar={true}
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">LayerCAM Heatmap</span>
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20">
                        <span className="text-[10px] sm:text-xs font-semibold text-white">Original Image</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
      <StickyFooter />
    </>
  );
}
