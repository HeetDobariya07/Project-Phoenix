'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Filter, Zap, Activity, Waves, Signal, Eye, TrendingUp, Shield } from "lucide-react";
import { Compare } from "@/components/ui/compare";
import { Badge } from "@/components/ui/badge";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { cn } from "@/lib/utils";
// Cell class data with image paths
const cellClasses = [
  {
    name: "Dyskeratotic",
    description: "Abnormal cells with irregular keratinization",
    originalImage: "/images/Preprocessing/Dyskeratotic_processed.bmp",
    processedImage: "/images/Preprocessing/Dyskeratotic_Original.bmp",
    metrics: {
      psnr: "28.45 dB",
      ssim: "0.892",
      epiRatio: "1.34",
      cnrImprovement: "1.67x"
    }
  },
  {
    name: "Koilocytotic",
    description: "Cells showing HPV-induced changes with perinuclear halos",
    originalImage: "/images/Preprocessing/Koilocytotic_processed.bmp",
    processedImage: "/images/Preprocessing/Koilocytotic_Original.bmp",
    metrics: {
      psnr: "29.12 dB",
      ssim: "0.905",
      epiRatio: "1.28",
      cnrImprovement: "1.58x"
    }
  },
  {
    name: "Metaplastic",
    description: "Cells undergoing transformation from one type to another",
    originalImage: "/images/Preprocessing/Metaplastic_processed.bmp",
    processedImage: "/images/Preprocessing/Metaplastic_Original.bmp",
    metrics: {
      psnr: "27.89 dB",
      ssim: "0.878",
      epiRatio: "1.42",
      cnrImprovement: "1.73x"
    }
  },
  {
    name: "Parabasal",
    description: "Small, round cells from the basal layer",
    originalImage: "/images/Preprocessing/Parabasal_processed.bmp",
    processedImage: "/images/Preprocessing/Parabasal_Original.bmp",
    metrics: {
      psnr: "30.23 dB",
      ssim: "0.918",
      epiRatio: "1.25",
      cnrImprovement: "1.52x"
    }
  },
  {
    name: "Superficial-Intermediate",
    description: "Mature cells from upper epithelial layers",
    originalImage: "/images/Preprocessing/Superficial Intermediate_processed.bmp",
    processedImage: "/images/Preprocessing/Superficial Intermediate_Original.bmp",
    metrics: {
      psnr: "28.76 dB",
      ssim: "0.896",
      epiRatio: "1.31",
      cnrImprovement: "1.61x"
    }
  }
];

// Custom BarChart Component for Metrics
const MetricsBarChart = ({
  value,
  label,
  subtitle,
  className = "",
  delay = 0,
}: {
  value: number;
  label: string;
  subtitle: string;
  className?: string;
  delay?: number;
}) => {
  const css = `
  .candy-bg {
      background-color: hsl(0 0% 96%, 2%);
      background-image: linear-gradient(
        135deg,
        hsl(0 0% 96%) 25%,
        transparent 25.5%,
        transparent 50%,
        hsl(0 0% 96%) 50.5%,
        hsl(0 0% 96%) 75%,
        transparent 75.5%,
        transparent
      );
      background-size: 10px 10px;
    }`;

  return (
    <div className="group relative h-full w-full">
      <style>{css}</style>
      <div className="candy-bg relative h-full w-full overflow-hidden rounded-2xl border border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 100, height: 0 }}
          animate={{ opacity: 1, y: 0, height: `${value}%` }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          transition={{ 
            duration: 0.5, 
            type: "spring", 
            damping: 20, 
            delay,
            scale: { duration: 0.15 },
            opacity: { duration: 0.15 }
          }}
          className={cn(
            "absolute bottom-0 mt-auto w-full rounded-2xl p-3 cursor-pointer",
            className,
          )}
        >
          <div className="relative flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black/20 tracking-tighter backdrop-blur-sm transition-all duration-150 group-hover:bg-black/30">
            <NumberFlow value={value} format={{ notation: "compact" }} className="text-lg font-bold text-black" />
          </div>
        </motion.div>
      </div>
      <div className="mt-3 text-center transition-all duration-150 group-hover:translate-y-[-2px]">
        <p className="text-sm font-semibold text-white transition-colors duration-150 group-hover:text-white/90" style={{ fontFamily: "var(--font-poppins)" }}>
          {label}
        </p>
        <p className="text-xs text-white/60 transition-colors duration-150 group-hover:text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// Pipeline timeline data
const timelineData = [
  {
    id: 1,
    title: "Resize",
    date: "Step 1",
    content: "Standardize image dimensions to 224x224 pixels for consistent processing.",
    category: "preprocessing",
    icon: Activity,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "NLM Denoising",
    date: "Step 2",
    content: "Apply Non-Local Means filter to reduce noise while preserving cell structure.",
    category: "filtering",
    icon: Filter,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "CLAHE",
    date: "Step 3",
    content: "Enhance contrast using Contrast Limited Adaptive Histogram Equalization.",
    category: "enhancement",
    icon: Zap,
    relatedIds: [2],
    status: "completed" as const,
    energy: 95,
  },
];

// BentoCard Component
function BentoCard({ span = "", title, blurb, meta, children, className = "" }: { span?: string; title: string; blurb: string; meta?: string; children?: React.ReactNode; className?: string }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur p-4 md:p-5 lg:p-6 transition-all hover:border-white/40 hover:shadow-xl hover:shadow-white/10 cursor-pointer",
        span,
        className
      )}
    >
      <header className="mb-2 flex items-center gap-2 relative z-10">
        <h3 className="text-sm md:text-base lg:text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white" style={{ fontFamily: 'var(--font-michroma)' }}>
          {title}
        </h3>
        {meta && (
          <span className="ml-auto rounded-full border border-white/30 px-1.5 py-0.5 md:px-2 text-[9px] md:text-[10px] uppercase tracking-wide text-white/60 bg-white/10 transition-all group-hover:bg-white/20 group-hover:text-white/80">
            {meta}
          </span>
        )}
      </header>
      <p className="text-[11px] md:text-xs leading-relaxed text-white/70 max-w-prose relative z-10 transition-colors group-hover:text-white/90" style={{ fontFamily: 'var(--font-playfair)' }}>{blurb}</p>
      {children && <div className="mt-2 md:mt-3 relative z-10">{children}</div>}
    </motion.article>
  );
}

export default function Preprocessing() {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          {/* Back Button */}
          <Link href="/about" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 md:mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>Back to About</span>
          </Link>

          {/* Page Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: "var(--font-michroma)" }}>
            Data Preprocessing
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-12 md:mb-16 max-w-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Advanced image preprocessing pipeline using Non-Local Means Denoising and CLAHE enhancement 
            to optimize cervical cell images for accurate classification.
          </p>

          {/* Bento Grid Section */}
          <div className="relative mb-16 md:mb-24">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)]">
              {/* Top Row: NLM and CLAHE */}
              <BentoCard
                span="md:col-span-1"
                title="NLM Denoising"
                blurb="Cleans up grainy images while keeping important cell details sharp and clear."
                meta="Noise Reduction"
              >
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(255,255,255,0.2)",
                          "0 0 40px rgba(255,255,255,0.4)",
                          "0 0 20px rgba(255,255,255,0.2)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Waves className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-xl md:text-2xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-michroma)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      h=3, σ=7
                    </motion.div>
                    <p className="text-[10px] md:text-xs text-white/60 mt-1" style={{ fontFamily: 'var(--font-poppins)' }}>Filter Parameters</p>
                  </div>
                </div>
              </BentoCard>
              
              <BentoCard
                span="md:col-span-1"
                title="CLAHE Enhancement"
                blurb="Adaptive histogram equalization that enhances local contrast intelligently."
                meta="Contrast Boost"
              >
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                  <div className="relative w-full h-12 md:h-16 flex items-end justify-center gap-1">
                    {[30, 50, 70, 85, 95, 85, 70, 50, 30].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-full bg-gradient-to-t from-white/90 to-white/40 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ 
                          duration: 0.6, 
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-white">
                    <div className="text-center">
                      <div className="text-base md:text-lg font-bold" style={{ fontFamily: 'var(--font-michroma)' }}>1.2</div>
                      <p className="text-[9px] md:text-[10px] text-white/60" style={{ fontFamily: 'var(--font-poppins)' }}>Clip Limit</p>
                    </div>
                    <div className="w-px h-6 md:h-8 bg-white/30" />
                    <div className="text-center">
                      <div className="text-base md:text-lg font-bold" style={{ fontFamily: 'var(--font-michroma)' }}>6*6</div>
                      <p className="text-[9px] md:text-[10px] text-white/60" style={{ fontFamily: 'var(--font-poppins)' }}>Grid Size</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
              
              {/* Pipeline - 2x2 spanning rows 1-2 */}
              <BentoCard
                span="md:col-span-2 md:row-span-2"
                title="Preprocessing Pipeline"
                blurb="Interactive orbital view of our three-step preprocessing workflow."
                meta="Pipeline"
                className="min-h-[450px] md:min-h-[520px]"
              >
                <div className="w-full h-[400px] md:h-[460px] -mx-4 md:-mx-5 -mb-5 md:-mb-6 mt-2">
                  <RadialOrbitalTimeline timelineData={timelineData} />
                </div>
              </BentoCard>
              
              {/* Bottom Left: PSNR and SSIM */}
              <BentoCard
                span="md:col-span-1"
                title="PSNR Quality"
                blurb="Peak signal-to-noise ratio measures image quality preservation after processing."
                meta="29 dB"
              >
                <div className="flex flex-col items-center justify-center gap-2 md:gap-3 mt-4 md:mt-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <svg className="transform -rotate-90 w-20 h-20 md:w-24 md:h-24" viewBox="0 0 96 96">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="6"
                        fill="none"
                        className="md:stroke-[8]"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="white"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        className="md:stroke-[8]"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * 29) / 40 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ strokeDasharray: 251.2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <NumberFlow 
                          value={29} 
                          className="text-xl md:text-2xl font-bold text-white" 
                          style={{ fontFamily: 'var(--font-michroma)' }}
                        />
                        <p className="text-[9px] md:text-[10px] text-white/60" style={{ fontFamily: 'var(--font-poppins)' }}>dB</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-[10px] md:text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>Excellent Quality</span>
                  </div>
                </div>
              </BentoCard>
              
              <BentoCard
                span="md:col-span-1"
                title="SSIM Index"
                blurb="Structural similarity metric showing how well we preserve image structure and details."
                meta="0.89"
              >
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                  <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/60 via-white to-white/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '89%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <NumberFlow 
                      value={0.89} 
                      format={{ minimumFractionDigits: 2 }}
                      className="text-2xl md:text-3xl font-bold text-white" 
                      style={{ fontFamily: 'var(--font-michroma)' }}
                    />
                    <span className="text-base md:text-lg text-white/60" style={{ fontFamily: 'var(--font-michroma)' }}>/1.0</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Eye className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-[10px] md:text-xs" style={{ fontFamily: 'var(--font-poppins)' }}>89% Structure Preserved</span>
                  </div>
                </div>
              </BentoCard>
              
              {/* Row 3: CNR and EPI spanning full width */}
              <BentoCard
                span="md:col-span-2"
                title="Contrast-to-Noise Ratio"
                blurb="Our 1.62× improvement means cell details are 62% more visible and easier to distinguish from background."
                meta="CNR Enhancement"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-4 md:mt-6">
                  <div className="flex-1 flex flex-col items-center gap-2 md:gap-3">
                    <div className="flex items-end gap-2 md:gap-3">
                      <div className="text-center">
                        <div className="w-10 h-16 md:w-12 md:h-20 bg-white/20 rounded flex items-end overflow-hidden">
                          <motion.div 
                            className="w-full bg-white/40"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        <p className="text-[10px] md:text-xs text-white/60 mt-2" style={{ fontFamily: 'var(--font-poppins)' }}>Before</p>
                      </div>
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white/60 mb-4 md:mb-6" />
                      <div className="text-center">
                        <div className="w-10 h-24 md:w-12 md:h-32 bg-white/20 rounded flex items-end overflow-hidden">
                          <motion.div 
                            className="w-full bg-gradient-to-t from-white to-white/70"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                        <p className="text-[10px] md:text-xs text-white/60 mt-2" style={{ fontFamily: 'var(--font-poppins)' }}>After</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.div
                      className="text-4xl md:text-5xl font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-michroma)' }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      1.62×
                    </motion.div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-white/70">
                      <Signal className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Contrast Boost</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
              
              <BentoCard
                span="md:col-span-2"
                title="Edge Preservation Index"
                blurb="Values above 1.0 indicate edge enhancement. Our 1.32 ratio shows 32% sharper cell boundaries and structures."
                meta="EPI Ratio"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-4 md:mt-6">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="grid grid-cols-3 gap-1.5 md:gap-2 max-w-[240px] mx-auto">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="aspect-square rounded-lg border-2 border-white/30 relative overflow-hidden"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
                        >
                          <div className="absolute inset-1.5 md:inset-2 border border-white/50 rounded" />
                          <div className="absolute inset-3 md:inset-4 border border-white/70 rounded" />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-white/60 text-center mt-3" style={{ fontFamily: 'var(--font-poppins)' }}>Enhanced Cell Boundaries</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-4">
                      <motion.div
                        className="text-5xl font-bold text-white"
                        style={{ fontFamily: 'var(--font-michroma)' }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        1.32
                      </motion.div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-xs text-white/80" style={{ fontFamily: 'var(--font-poppins)' }}>Edge Sharpness</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>

          {/* Before & After Comparisons */}
          <div className="mt-16 md:mt-20 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-michroma)" }}>
              Before & After Comparison
            </h2>

            <div className="space-y-12 md:space-y-16">
              {cellClasses.map((cellClass, index) => (
                <div key={index} className="space-y-4 md:space-y-6">
                  {/* Cell Class Header - More Prominent */}
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                      {cellClass.name}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
                      {cellClass.description}
                    </p>
                  </div>

                  <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 items-start">
                    {/* Comparison Component */}
                    <div className="flex justify-center w-full">
                      <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-full">
                        <Compare
                          firstImage={cellClass.processedImage}
                          secondImage={cellClass.originalImage}
                          className="w-full aspect-square rounded-lg"
                          firstImageClassName="object-cover"
                          secondImageClassname="object-cover"
                          slideMode="drag"
                          showHandlebar={true}
                        />
                      </div>
                    </div>

                    {/* Metrics Display with Bar Charts */}
                    <div className="space-y-3 md:space-y-4 w-full">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
                        Quality Metrics
                      </h3>
                      <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-full mx-auto lg:mx-0">
                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 h-48 md:h-64">
                          <MetricsBarChart
                            value={parseFloat(cellClass.metrics.psnr)}
                            label="PSNR"
                            subtitle={cellClass.metrics.psnr}
                            className="bg-white"
                            delay={0.1}
                          />
                          <MetricsBarChart
                            value={parseFloat(cellClass.metrics.ssim) * 100}
                            label="SSIM"
                            subtitle={cellClass.metrics.ssim}
                            className="bg-white"
                            delay={0.2}
                          />
                          <MetricsBarChart
                            value={parseFloat(cellClass.metrics.epiRatio) * 50}
                            label="EPI Ratio"
                            subtitle={cellClass.metrics.epiRatio}
                            className="bg-white"
                            delay={0.3}
                          />
                          <MetricsBarChart
                            value={parseFloat(cellClass.metrics.cnrImprovement.replace('x', '')) * 50}
                            label="CNR Imp"
                            subtitle={cellClass.metrics.cnrImprovement}
                            className="bg-white"
                            delay={0.4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < cellClasses.length - 1 && (
                    <div className="border-t border-white/10 mt-12"></div>
                  )}
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
