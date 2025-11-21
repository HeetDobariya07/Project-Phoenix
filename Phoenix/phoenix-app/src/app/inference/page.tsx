'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Brain, Rocket, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function InferencePage() {
  return (
    <PageLayout>
      <div className="relative min-h-screen w-full flex flex-col">
        {/* Background with noise texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1420]" />
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px"
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto w-full">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-8 md:mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Coming Soon Hero Section */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8
              }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 blur-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full"
              />
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm md:text-base text-yellow-400/90 font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-michroma)" }}>
                  Coming Soon
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-michroma)" }}>
                Model Inference
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
                Experience real-time cervical cancer cell classification powered by our ConvNeXt model deployed on Hugging Face
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 w-full max-w-4xl"
            >
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description: "Advanced ConvNeXt architecture for accurate classification"
                },
                {
                  icon: Rocket,
                  title: "Cloud Deployment",
                  description: "Hosted on Hugging Face for global accessibility"
                },
                {
                  icon: Clock,
                  title: "Real-Time Results",
                  description: "Instant predictions with explainability heatmaps"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={cn(
                    "relative overflow-hidden rounded-xl border-2 border-white/20 bg-black/40 backdrop-blur p-6 transition-all hover:border-white/40 hover:shadow-xl hover:shadow-white/10",
                    "before:absolute before:inset-0 before:z-0 before:opacity-100 before:pointer-events-none before:bg-[url('/noise.png')] before:bg-repeat before:bg-[length:60px_60px]"
                  )}
                >
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 px-6 py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm"
            >
              <p className="text-sm text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                We're working hard to bring you this feature. Stay tuned!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <StickyFooter />
      </div>
    </PageLayout>
  );
}
