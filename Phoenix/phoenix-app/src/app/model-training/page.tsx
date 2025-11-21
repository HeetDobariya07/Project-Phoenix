'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        <p className="text-[11px] md:text-xs leading-relaxed text-white/70 max-w-prose relative z-10 transition-colors group-hover:text-white/90" style={{ fontFamily: "var(--font-poppins)" }}>{blurb}</p>
      </header>
      {children && <div className="relative z-10">{children}</div>}
    </motion.article>
  );
}

// Evaluation metrics
const evaluationMetrics = {
  convnext: {
    accuracy: 97.2,
    precision: 96.8,
    recall: 97.5,
    f1Score: 97.1,
    testAccuracy: 96.9
  },
  efficientnet: {
    accuracy: 96.2,
    precision: 95.9,
    recall: 96.5,
    f1Score: 96.2,
    testAccuracy: 95.8
  }
};

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
            type: "spring" as const, 
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

export default function ModelTraining() {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto px-3 md:px-6 py-12 md:py-20">
          <Link href="/about" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 md:mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>Back to About</span>
          </Link>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-white" style={{ fontFamily: "var(--font-michroma)" }}>
            Model Fine-Tuning
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/80 mb-8 md:mb-12 max-w-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Transfer learning with state-of-the-art architectures for cervical cell classification
          </p>

          {/* Bento Grid Layout */}
          <div className="relative grid grid-cols-1 gap-3 md:grid-cols-6 auto-rows-[minmax(140px,auto)] mb-12 md:mb-16">
            
            {/* ConvNeXt V2 Architecture - Spans 4 cols x 2 rows */}
            <BentoCard 
              span="md:col-span-4 md:row-span-2"
              title="ConvNeXt V2 Architecture"
              blurb="State-of-the-art convolutional network with hierarchical feature extraction and global response normalization"
            >
              <div className="space-y-4">
                {/* Architecture Specs */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">
                      <NumberFlow value={83} suffix="M" />
                    </div>
                    <div className="text-xs text-white/60">Parameters</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">4</div>
                    <div className="text-xs text-white/60">Stages</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">224²</div>
                    <div className="text-xs text-white/60">Input Size</div>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2">
                  {["Global Response Normalization", "Inverted Bottleneck Design", "ImageNet-21K Pretrained", "Hierarchical Feature Maps"].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="flex items-center gap-2 text-xs md:text-sm text-white/70"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Training Strategy 1 */}
            <BentoCard 
              span="md:col-span-2 md:row-span-1"
              title="Baseline Training"
              blurb="Standard transfer learning with frozen backbone layers"
            >
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-2xl font-bold text-white">
                    <NumberFlow value={5} />
                  </div>
                  <div className="text-xs text-white/60">Epochs</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    <NumberFlow value={92.3} suffix="%" />
                  </div>
                  <div className="text-xs text-white/60">Val Accuracy</div>
                </div>
              </div>
            </BentoCard>

            {/* Training Strategy 2 */}
            <BentoCard 
              span="md:col-span-2 md:row-span-1"
              title="Extended Training"
              blurb="Cyclic learning rates with progressive layer unfreezing"
            >
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-2xl font-bold text-white">
                    <NumberFlow value={20} />
                  </div>
                  <div className="text-xs text-white/60">Epochs</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    <NumberFlow value={95.8} suffix="%" />
                  </div>
                  <div className="text-xs text-white/60">Val Accuracy</div>
                </div>
              </div>
            </BentoCard>

            {/* EfficientNet V2-S Architecture */}
            <BentoCard 
              span="md:col-span-3 md:row-span-1"
              title="EfficientNet V2-S"
              blurb="Optimized architecture balancing accuracy and computational efficiency with compound scaling"
            >
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    <NumberFlow value={21.5} suffix="M" />
                  </div>
                  <div className="text-xs text-white/60">Params</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">384²</div>
                  <div className="text-xs text-white/60">Input</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    <NumberFlow value={96.2} suffix="%" />
                  </div>
                  <div className="text-xs text-white/60">Accuracy</div>
                </div>
              </div>
            </BentoCard>

            {/* Hyperparameter Tuning */}
            <BentoCard 
              span="md:col-span-3 md:row-span-1"
              title="Hyperparameter Tuning"
              blurb="Grid search optimization across learning rates, batch sizes, optimizers, and dropout rates"
            >
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-xs text-white/60 mb-1">Learning Rates</div>
                  <div className="text-sm font-semibold text-white">1e-3, 2e-4</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-xs text-white/60 mb-1">Batch Sizes</div>
                  <div className="text-sm font-semibold text-white">16, 32</div>
                </div>
              </div>
            </BentoCard>

          </div>

          {/* Evaluation Metrics Section */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-michroma)" }}>
            Model Performance
          </h2>

          {/* ConvNeXt Metrics */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-michroma)" }}>
              ConvNeXt V2 Metrics
            </h3>

            <div className="grid grid-cols-5 gap-2 md:gap-4 h-48 md:h-64">
              <MetricsBarChart
                value={evaluationMetrics.convnext.accuracy}
                label="Accuracy"
                subtitle={`${evaluationMetrics.convnext.accuracy}%`}
                className="bg-white"
                delay={0.1}
              />
              <MetricsBarChart
                value={evaluationMetrics.convnext.precision}
                label="Precision"
                subtitle={`${evaluationMetrics.convnext.precision}%`}
                className="bg-white"
                delay={0.2}
              />
              <MetricsBarChart
                value={evaluationMetrics.convnext.recall}
                label="Recall"
                subtitle={`${evaluationMetrics.convnext.recall}%`}
                className="bg-white"
                delay={0.3}
              />
              <MetricsBarChart
                value={evaluationMetrics.convnext.f1Score}
                label="F1-Score"
                subtitle={`${evaluationMetrics.convnext.f1Score}%`}
                className="bg-white"
                delay={0.4}
              />
              <MetricsBarChart
                value={evaluationMetrics.convnext.testAccuracy}
                label="Test Acc"
                subtitle={`${evaluationMetrics.convnext.testAccuracy}%`}
                className="bg-white"
                delay={0.5}
              />
            </div>
          </div>

          {/* EfficientNet Metrics */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-michroma)" }}>
              EfficientNet V2-S Metrics
            </h3>

            <div className="grid grid-cols-5 gap-2 md:gap-4 h-48 md:h-64">
              <MetricsBarChart
                value={evaluationMetrics.efficientnet.accuracy}
                label="Accuracy"
                subtitle={`${evaluationMetrics.efficientnet.accuracy}%`}
                className="bg-white"
                delay={0.1}
              />
              <MetricsBarChart
                value={evaluationMetrics.efficientnet.precision}
                label="Precision"
                subtitle={`${evaluationMetrics.efficientnet.precision}%`}
                className="bg-white"
                delay={0.2}
              />
              <MetricsBarChart
                value={evaluationMetrics.efficientnet.recall}
                label="Recall"
                subtitle={`${evaluationMetrics.efficientnet.recall}%`}
                className="bg-white"
                delay={0.3}
              />
              <MetricsBarChart
                value={evaluationMetrics.efficientnet.f1Score}
                label="F1-Score"
                subtitle={`${evaluationMetrics.efficientnet.f1Score}%`}
                className="bg-white"
                delay={0.4}
              />
              <MetricsBarChart
                value={evaluationMetrics.efficientnet.testAccuracy}
                label="Test Acc"
                subtitle={`${evaluationMetrics.efficientnet.testAccuracy}%`}
                className="bg-white"
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </PageLayout>
      <StickyFooter />
    </>
  );
}
