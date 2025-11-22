'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Target, TrendingUp, Activity, Zap, BarChart3, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/bar-chart";

// Bento Card Component
function BentoCard({ span = "", title, blurb, children }: { span?: string; title: string; blurb: string; children?: React.ReactNode }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur p-4 md:p-5 lg:p-6 transition-all hover:border-white/40 hover:shadow-xl hover:shadow-white/10 cursor-pointer w-full max-w-full box-border",
        "before:absolute before:inset-0 before:z-0 before:opacity-100 before:pointer-events-none before:bg-[url('/noise.png')] before:bg-repeat before:bg-[length:60px_60px]",
        span
      )}
    >
      <header className="mb-3 md:mb-4 relative z-10">
        <h3 className="text-sm md:text-base lg:text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white mb-2 break-words" style={{ fontFamily: "var(--font-michroma)" }}>
          {title}
        </h3>
        <p className="text-[11px] md:text-xs leading-relaxed text-white/70 max-w-prose relative z-10 transition-colors group-hover:text-white/90 break-words" style={{ fontFamily: "var(--font-playfair)" }}>{blurb}</p>
      </header>
      {children && <div className="relative z-10 w-full max-w-full overflow-hidden box-border">{children}</div>}
    </motion.article>
  );
}

// Metrics data from model evaluation
const overallMetrics = {
  accuracy: 96.30,
  precision: 96.33,
  recall: 96.32,
  f1Score: 96.32,
  cohensKappa: 95.37,
  mcc: 95.38,
  balancedAccuracy: 96.32,
  rocAuc: 99.58,
  avgPrecision: 98.52,
};

const classMetrics = [
  { name: "Dyskeratotic", precision: 99.20, recall: 99.20, f1: 99.20, support: 126 },
  { name: "Koilocytotic", precision: 96.00, recall: 92.31, f1: 94.12, support: 78 },
  { name: "Metaplastic", precision: 95.24, recall: 95.24, f1: 95.24, support: 63 },
  { name: "Parabasal", precision: 93.48, recall: 97.14, f1: 95.28, support: 70 },
  { name: "Superficial-Intermediate", precision: 97.73, recall: 97.73, f1: 97.73, support: 88 }
];

const topKAccuracy = [
  { k: 1, accuracy: 96.30 },
  { k: 2, accuracy: 99.01 },
  { k: 3, accuracy: 99.75 }
];

// Chart data
const metricsComparisonData = [
  { metric: "Accuracy", value: 96.30 },
  { metric: "Precision", value: 96.33 },
  { metric: "Recall", value: 96.32 },
  { metric: "F1-Score", value: 96.32 },
];

const classPerformanceData = classMetrics.map(c => ({
  class: c.name.replace("Superficial", "Superficial-Int"),
  precision: c.precision,
  recall: c.recall,
  f1: c.f1
}));

const advancedMetricsData = [
  { metric: "Cohen's κ", value: 95.37 },
  { metric: "MCC", value: 95.38 },
  { metric: "Balanced Acc", value: 96.32 },
  { metric: "ROC AUC", value: 99.58 },
];

const chartConfig = {
  value: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
  precision: {
    label: "Precision",
    color: "hsl(var(--chart-2))",
  },
  recall: {
    label: "Recall",
    color: "hsl(var(--chart-3))",
  },
  f1: {
    label: "F1-Score",
    color: "hsl(var(--chart-4))",
  },
};

export default function Evaluation() {
  return (
    <>
      <PageLayout>
        <div className="w-screen max-w-[100vw] overflow-x-hidden box-border px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4 sm:mb-6 md:mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-white leading-tight break-words" style={{ fontFamily: "var(--font-michroma)" }}>
          Performance Evaluation
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-playfair)" }}>
          96.3% accuracy across 405 test samples - the model correctly identifies 390 out of every 405 cervical cells
        </p>

        {/* Bento Grid - Key Metrics Overview */}
        <div className="w-full max-w-[100vw] overflow-hidden box-border">
        <div className="relative grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6 auto-rows-[minmax(120px,auto)] sm:auto-rows-[minmax(140px,auto)] mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-full box-border">
          
          {/* Overall Accuracy - Large card */}
          <BentoCard 
            span="md:col-span-3 md:row-span-2"
            title="Overall Accuracy"
            blurb="96 out of every 100 cells correctly classified across all five cell types"
          >
            <div className="flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-michroma)" }}>
                <NumberFlow value={overallMetrics.accuracy} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm md:text-base text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
                405 test samples evaluated
              </p>
              
              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-full mt-4 sm:mt-5 md:mt-6 box-border">
                <div className="text-center p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                    390
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>Correct</div>
                </div>
                <div className="text-center p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                    15
                  </div>
                  <div className="text-xs text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>Missed</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ROC AUC */}
          <BentoCard 
            span="md:col-span-3 md:row-span-1"
            title="ROC AUC Score"
            blurb="Near-perfect discrimination - the model almost never confuses different cell types"
          >
            <div className="flex items-center justify-between py-3 sm:py-4 w-full overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                    <NumberFlow value={overallMetrics.rocAuc} suffix="%" />
                  </div>
                  <p className="text-xs text-white/60 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                    Discrimination ability
                  </p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Balanced Performance */}
          <BentoCard 
            span="md:col-span-3 md:row-span-1"
            title="Balanced Performance"
            blurb="All cell types detected with 93-99% accuracy - no cell type left behind"
          >
            <div className="space-y-1.5 sm:space-y-2 py-2 w-full overflow-hidden">
              {classMetrics.map((cell, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 w-full min-w-0">
                  <div className="text-[9px] sm:text-[10px] text-white/60 w-12 sm:w-14 md:w-16 truncate flex-shrink-0" style={{ fontFamily: "var(--font-poppins)" }}>
                    {cell.name.split('-')[0]}
                  </div>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${cell.f1}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="text-xs font-bold text-white w-12 text-right flex-shrink-0" style={{ fontFamily: "var(--font-michroma)" }}>
                    {cell.f1}%
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Top-K Confidence */}
          <BentoCard 
            span="md:col-span-2 md:row-span-1"
            title="Model Confidence"
            blurb="99% accurate when considering top 2 predictions"
          >
            <div className="space-y-3 py-2 w-full overflow-hidden">
              {topKAccuracy.map((item, i) => (
                <div key={i} className="flex items-center justify-between w-full min-w-0">
                  <span className="text-xs text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
                    Top-{item.k}
                  </span>
                  <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                    <NumberFlow value={item.accuracy} suffix="%" />
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* F1 Score */}
          <BentoCard 
            span="md:col-span-2 md:row-span-1"
            title="F1-Score"
            blurb="Perfect balance between precision and recall"
          >
            <div className="flex flex-col items-center justify-center py-4 sm:py-5 md:py-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                <NumberFlow value={overallMetrics.f1Score} suffix="%" />
              </div>
              <div className="w-full bg-white/10 h-1.5 sm:h-2 rounded-full mt-3 sm:mt-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallMetrics.f1Score}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </BentoCard>

          {/* Advanced Stats */}
          <BentoCard 
            span="md:col-span-2 md:row-span-1"
            title="Statistical Reliability"
            blurb="Cohen's κ and MCC confirm model consistency"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 py-2 w-full max-w-full box-border">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                  <NumberFlow value={overallMetrics.cohensKappa} suffix="%" />
                </div>
                <p className="text-[10px] text-white/60 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                  Cohen's κ
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                  <NumberFlow value={overallMetrics.mcc} suffix="%" />
                </div>
                <p className="text-[10px] text-white/60 mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                  MCC
                </p>
              </div>
            </div>
          </BentoCard>

        </div>
        </div>

        {/* Analysis Sections */}
        
        {/* Confusion Matrix Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-[100vw] overflow-hidden box-border">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight break-words" style={{ fontFamily: "var(--font-michroma)" }}>
            Where Does the Model Make Mistakes?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-3 sm:mb-4 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
            This heatmap shows actual vs predicted classifications. The darker the diagonal, the more accurate the predictions. Off-diagonal cells show confusion between cell types.
          </p>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[11px] sm:text-xs md:text-sm text-white/80 italic leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
              <strong>Key Insight:</strong> Strong diagonal pattern indicates the model rarely confuses one cell type for another. Most errors are minor and occur in visually similar cell types.
            </p>
          </div>
          <div className="w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur box-border"
            style={{
              backgroundImage: "url('/noise.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "60px 60px"
            }}
          >
            <div className="relative w-full" style={{ paddingBottom: '45%' }}>
              <Image
                src="/images/Eval/confusion_matrices.png"
                alt="Confusion Matrix"
                fill
                className="object-contain p-2 sm:p-3 md:p-4 lg:p-6"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
            </div>
          </div>
        </section>

        {/* Per-Class Performance Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-[100vw] overflow-hidden box-border">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight break-words" style={{ fontFamily: "var(--font-michroma)" }}>
            How Well Does It Detect Each Cell Type?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-3 sm:mb-4 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
            Breaking down precision, recall, and F1-score for each of the five cell types to ensure balanced performance.
          </p>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[11px] sm:text-xs md:text-sm text-white/80 italic leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
              <strong>Key Insight:</strong> All cell types achieve 93-99% accuracy, proving the model doesn't favor any particular type. This balanced performance is crucial for clinical reliability.
            </p>
          </div>
          <div className="w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur p-3 sm:p-4 md:p-6 box-border"
            style={{
              backgroundImage: "url('/noise.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "60px 60px"
            }}
          >
            <div className="w-full max-w-full overflow-x-auto box-border">
              <ChartContainer config={chartConfig} className="h-[280px] sm:h-[320px] md:h-[380px] lg:h-[400px] w-full min-w-[280px]">
                <BarChart data={classPerformanceData} margin={{ top: 20, right: 20, bottom: 60, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis 
                    dataKey="class" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[90, 100]}
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                  <Bar dataKey="precision" fill="rgba(59, 130, 246, 0.8)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recall" fill="rgba(34, 197, 94, 0.8)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="f1" fill="rgba(168, 85, 247, 0.8)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </section>

        {/* ROC & PR Curves Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-[100vw] overflow-hidden box-border">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight break-words" style={{ fontFamily: "var(--font-michroma)" }}>
            Discrimination & Precision Analysis
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-3 sm:mb-4 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
            ROC curves show how well the model separates different classes, while Precision-Recall curves reveal the trade-off between finding all cases and being accurate.
          </p>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[11px] sm:text-xs md:text-sm text-white/80 italic leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
              <strong>Key Insight:</strong> The curves hug the top-left corner, indicating excellent discrimination with minimal false positives and false negatives. This is ideal for medical diagnostics.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-full box-border">
            {/* ROC Curves */}
            <div className="w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur box-border"
              style={{
                backgroundImage: "url('/noise.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "60px 60px"
              }}
            >
              <div className="p-3 sm:p-4 border-b border-white/10">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: "var(--font-michroma)" }}>
                  ROC Curves
                </h3>
                <p className="text-xs text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
                  AUC: 99.58% - Near perfect
                </p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '90%' }}>
                <Image
                  src="/images/Eval/roc_curves.png"
                  alt="ROC Curves"
                  fill
                  className="object-contain p-2 sm:p-3 md:p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Precision-Recall */}
            <div className="w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur box-border"
              style={{
                backgroundImage: "url('/noise.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "60px 60px"
              }}
            >
              <div className="p-3 sm:p-4 border-b border-white/10">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1" style={{ fontFamily: "var(--font-michroma)" }}>
                  Precision-Recall
                </h3>
                <p className="text-xs text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
                  Avg Precision: 98.52% - Excellent balance
                </p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '90%' }}>
                <Image
                  src="/images/Eval/precision_recall_curves.png"
                  alt="Precision-Recall Curves"
                  fill
                  className="object-contain p-2 sm:p-3 md:p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Top-K Accuracy Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full max-w-[100vw] overflow-hidden box-border">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight break-words" style={{ fontFamily: "var(--font-michroma)" }}>
            Model Confidence Analysis
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-3 sm:mb-4 max-w-3xl leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
            When the model gives its top predictions (not just the #1 choice), accuracy improves dramatically - showing high confidence even when uncertain.
          </p>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[11px] sm:text-xs md:text-sm text-white/80 italic leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
              <strong>Key Insight:</strong> 99% accuracy with top-2 predictions means even when the model isn't 100% sure, the correct answer is almost always in its top two choices. This demonstrates exceptional confidence and reliability.
            </p>
          </div>
          
          {/* Top-K Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 w-full max-w-full box-border">
            {topKAccuracy.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-lg sm:rounded-xl border-2 border-white/20 bg-black/40 backdrop-blur p-3 sm:p-4 md:p-6 text-center"
                style={{
                  backgroundImage: "url('/noise.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "60px 60px"
                }}
              >
                <div className="text-xs sm:text-sm text-white/60 mb-1 sm:mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  Top-{item.k}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white truncate" style={{ fontFamily: "var(--font-michroma)" }}>
                  <NumberFlow value={item.accuracy} suffix="%" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-full max-w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-white/20 bg-black/40 backdrop-blur p-3 sm:p-4 md:p-6 box-border"
            style={{
              backgroundImage: "url('/noise.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "60px 60px"
            }}
          >
            <div className="w-full max-w-full overflow-x-auto box-border">
              <ChartContainer config={chartConfig} className="h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] w-full min-w-[280px]">
                <LineChart data={topKAccuracy} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="k" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Top-K', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.7)' }}
                />
                <YAxis 
                  domain={[95, 100]}
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.7)' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="rgba(34, 197, 94, 1)"
                  strokeWidth={3}
                  dot={{ fill: 'rgba(34, 197, 94, 1)', r: 6 }}
                  activeDot={{ r: 8 }}
                >
                  <LabelList 
                    dataKey="accuracy" 
                    position="top" 
                    fill="white"
                    fontSize={12}
                    formatter={(value: unknown) => `${typeof value === 'number' ? value.toFixed(2) : value}%`}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
            </div>
          </div>
        </section>

      </div>
      </PageLayout>
      
      <StickyFooter />
    </>
  );
}
