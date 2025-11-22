'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InferencePage() {
  return (
    <PageLayout>
      <div className="relative min-h-screen w-full flex flex-col">
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

          {/* Page Header */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: "var(--font-michroma)" }}>
              Model Inference
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Run real-time cervical cancer cell classification using our ConvNeXt model deployed on Hugging Face
            </p>
          </div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 md:py-24"
          >
            <div className="flex flex-col items-center space-y-8 max-w-md">
              {/* Hugging Face Logo */}
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
                  alt="Hugging Face"
                  fill
                  className="object-contain opacity-80"
                />
              </div>

              {/* Coming Soon Text */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                  Coming Soon
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <StickyFooter />
      </div>
    </PageLayout>
  );
}
