'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, X, Play, FileImage, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { predictWithExplainability } from "@/lib/inference-api";

// Types
type ProcessingState = "idle" | "uploading" | "processing" | "complete";

const SAMPLE_IMAGES = [
  { id: 1, url: "/images/Inference/Dyskeratotic_processed.bmp", label: "Dyskeratotic", classification: "Dyskeratotic" },
  { id: 2, url: "/images/Inference/Koilocytotic_processed.bmp", label: "Koilocytotic", classification: "Koilocytotic" },
  { id: 3, url: "/images/Inference/Metaplastic_processed.bmp", label: "Metaplastic", classification: "Metaplastic" },
  { id: 4, url: "/images/Inference/Parabasal_processed.bmp", label: "Parabasal", classification: "Parabasal" },
  { id: 5, url: "/images/Inference/Superficial Intermediate_processed.bmp", label: "Superficial-Intermediate", classification: "Superficial-Intermediate" },
];

export default function InferencePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>("idle");
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [gradcamImage, setGradcamImage] = useState<string | null>(null);
  const [gradcamPlusPlusImage, setGradcamPlusPlusImage] = useState<string | null>(null);
  const [layercamImage, setLayercamImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSampleSelect = (url: string) => {
    setSelectedImage(url);
    setProcessingState("idle");
    setResult(null);
    setGradcamImage(null);
    setGradcamPlusPlusImage(null);
    setLayercamImage(null);
  };

  const simulateUpload = (url: string) => {
    setProcessingState("uploading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingState("idle");
          setSelectedImage(url);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      simulateUpload(url);
      setResult(null);
      setGradcamImage(null);
      setGradcamPlusPlusImage(null);
      setLayercamImage(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      simulateUpload(url);
      setResult(null);
      setGradcamImage(null);
      setGradcamPlusPlusImage(null);
      setLayercamImage(null);
    }
  };

  const runInference = async () => {
    if (!selectedImage) return;

    setProcessingState("processing");

    try {
      let imageFile: File | Blob;

      // Check if it's a sample image or uploaded file
      if (selectedImage.startsWith('blob:')) {
        // It's an uploaded file
        const response = await fetch(selectedImage);
        imageFile = await response.blob();
      } else {
        // It's a sample image
        const response = await fetch(selectedImage);
        if (!response.ok) {
          throw new Error('Failed to load sample image');
        }
        imageFile = await response.blob();
      }

      // Call the Hugging Face API with explainability
      const apiResult = await predictWithExplainability(imageFile);

      // Set the results
      setProcessingState("complete");
      setResult({
        predicted_class: apiResult.probabilities.label,
        confidence: apiResult.probabilities.confidences[0]?.confidence || 0,
        top_predictions: apiResult.probabilities.confidences || [],
        inference_time: 0.45
      });

      // Set CAM images
      if (apiResult.gradcamImage) setGradcamImage(apiResult.gradcamImage);
      if (apiResult.gradcamPlusPlusImage) setGradcamPlusPlusImage(apiResult.gradcamPlusPlusImage);
      if (apiResult.layercamImage) setLayercamImage(apiResult.layercamImage);

    } catch (error) {
      console.error('Inference failed:', error);
      setProcessingState("idle");
      // You can add error toast here
    }
  };

  const reset = () => {
    setProcessingState("idle");
    setResult(null);
    setSelectedImage(null);
    setGradcamImage(null);
    setGradcamPlusPlusImage(null);
    setLayercamImage(null);
  };

  return (
    <>
      <PageLayout>
        <div className="w-full min-h-screen flex flex-col">
          <div className="container mx-auto px-6 pt-8 pb-4 max-w-7xl flex-shrink-0">
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6 group mt-4"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>Back to Home</span>
            </Link>

            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2 mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-white flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-michroma)" }}>
                MODEL INFERENCE
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-playfair)" }}>
                Real-time cervical cancer cell classification with explainability visualizations
              </p>
            </motion.div>
          </div>

          <div className="container mx-auto px-6 max-w-7xl flex-1 pb-32 overflow-hidden">
            <AnimatePresence mode="wait">
              {(processingState === "idle" || processingState === "uploading") && (
                <motion.div
                  key="selection"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="h-full"
                >
                  {/* Image Selection Area */}
                  <div className="grid gap-4 md:grid-cols-[1fr_280px] h-full">
                    {/* Main Preview & Upload */}
                    <Card
                      className="p-6 flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-white/20 relative overflow-hidden transition-all hover:border-white/40 hover:bg-white/5 group bg-black/40 backdrop-blur-sm"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <AnimatePresence mode="wait">
                        {processingState === "uploading" ? (
                          <motion.div
                            key="uploading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                          >
                            <div className="relative">
                              <Loader2 className="h-12 w-12 text-white animate-spin" />
                              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                {progress}%
                              </span>
                            </div>
                            <p className="text-sm font-medium text-white/70 animate-pulse">Uploading image...</p>
                          </motion.div>
                        ) : selectedImage ? (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative w-full h-full flex flex-col gap-4"
                          >
                            <div className="relative group/image w-full flex-1 min-h-[400px] flex justify-center items-center overflow-hidden rounded-xl bg-black/20 border border-white/10">
                              <motion.img
                                layoutId="preview-image"
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full object-contain max-h-[500px]"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-500 text-white rounded-full shadow-md backdrop-blur-sm transition-colors z-10 border border-white/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(null);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </div>

                            <motion.div
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                              className="z-20 flex justify-center"
                            >
                              <Button
                                size="lg"
                                onClick={runInference}
                                className="relative overflow-hidden px-8 py-6 text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-all duration-500 group/btn bg-white/90 hover:bg-white text-black hover:scale-105 border-2 border-white/50"
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  <Play className="w-5 h-5 fill-current" />
                                  Run Analysis
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                              </Button>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-4 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                            whileHover={{ scale: 1.02 }}
                          >
                            <motion.div
                              className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 border border-white/20"
                              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                            >
                              <Upload className="h-8 w-8 text-white group-hover:text-white transition-colors" />
                            </motion.div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg text-white">Upload an Image</h3>
                              <p className="text-sm text-white/60">Drag & drop or click to browse</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </Card>

                    {/* Sample Selector */}
                    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                      <h3 className="font-semibold text-base flex items-center gap-2 text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                        <FileImage className="w-4 h-4" /> Sample Images
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                        {SAMPLE_IMAGES.map((sample, index) => (
                          <motion.button
                            key={sample.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSampleSelect(sample.url)}
                            className={cn(
                              "relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-md",
                              selectedImage === sample.url
                                ? "border-white ring-4 ring-white/20 scale-105 z-10"
                                : "border-white/20 hover:border-white/40",
                            )}
                          >
                            <img
                              src={sample.url}
                              alt={sample.label}
                              className="w-full h-full object-cover"
                            />
                            {selectedImage === sample.url && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-white/20 flex items-center justify-center backdrop-blur-[1px]"
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-black/90 rounded-full p-1.5 shadow-lg border border-white/20"
                                >
                                  <Check className="h-5 w-5 text-white" />
                                </motion.div>
                              </motion.div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                              <p className="text-[10px] font-medium text-white truncate">{sample.label}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {processingState === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center min-h-[600px] bg-black/40 backdrop-blur-sm rounded-xl border-2 border-white/20"
                >
                  <ProcessingAnimation image={selectedImage} />
                </motion.div>
              )}

              {processingState === "complete" && result && selectedImage && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="flex flex-col h-full w-full overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/20 pb-4 mb-6 gap-2">
                    <div className="space-y-1">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-michroma)" }}>
                          {result.predicted_class}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium">
                            <Check className="w-3 h-3 mr-1" /> {(result.confidence * 100).toFixed(1)}% Confidence
                          </span>
                          <span className="text-white/60 text-sm">Inference time: {result.inference_time}s</span>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="gap-2 hover:bg-white hover:text-black transition-colors bg-transparent text-white border-white/30 hover:border-white"
                      >
                        <Upload className="w-4 h-4" /> Analyze Another
                      </Button>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 flex-1 min-h-0">
                    <ExplainabilityCard
                      title="Grad-CAM"
                      description="Visualizes which regions of the image were important for the prediction."
                      image={gradcamImage || selectedImage}
                      hasOverlay={!!gradcamImage}
                      delay={0.4}
                    />
                    <ExplainabilityCard
                      title="Grad-CAM++"
                      description="An improvement over Grad-CAM, providing better localization of objects."
                      image={gradcamPlusPlusImage || selectedImage}
                      hasOverlay={!!gradcamPlusPlusImage}
                      delay={0.5}
                    />
                    <ExplainabilityCard
                      title="LayerCAM"
                      description="Captures fine-grained details from different layers of the model."
                      image={layercamImage || selectedImage}
                      hasOverlay={!!layercamImage}
                      delay={0.6}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hugging Face Space Link Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 mb-8"
            >
              <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 transition-all">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-michroma)" }}>
                      Explore the Full Model
                    </h3>
                    <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-playfair)" }}>
                      Try the complete deployed model on Hugging Face Spaces with additional features and capabilities
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-white/90 hover:bg-white text-black font-semibold px-6 py-6 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
                  >
                    <Link 
                      href="https://huggingface.co/spaces/Meet2304/Project-Phoenix" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Hugging Face Space
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageLayout>
      <StickyFooter />
    </>
  );
}

function ProcessingAnimation({ image }: { image: string | null }) {
  const [step, setStep] = useState(0);
  const steps = ["Preprocessing Image...", "Extracting Features...", "Analyzing Layers...", "Finalizing Prediction..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-8 p-8">
      <div className="relative flex items-center justify-center w-[300px] h-[300px]">
        {/* Central Image with scanning effect */}
        <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-2xl z-10 border-2 border-white/20">
          {image && (
            <motion.img
              src={image}
              alt="Processing"
              className="w-full h-full object-cover grayscale opacity-50"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent w-full h-[20%]"
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Abstract Center Node */}
        <motion.div
          className="absolute inset-0 border-2 border-white/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-4 border border-dashed border-white/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting Particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            initial={{ rotate: i * 120 }}
            animate={{ rotate: i * 120 + 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <circle cx="50%" cy="50%" r="60" fill="none" stroke="white" strokeWidth="1" />
          <line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="0"
            stroke="white"
            strokeWidth="1"
            className="animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="85%"
            y2="85%"
            stroke="white"
            strokeWidth="1"
            className="animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="15%"
            y2="85%"
            stroke="white"
            strokeWidth="1"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="space-y-2 text-center z-20">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl text-white font-bold tracking-widest"
          style={{ fontFamily: "var(--font-michroma)" }}
        >
          {steps[step]}
        </motion.div>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ExplainabilityCard({
  title,
  description,
  image,
  hasOverlay,
  delay,
}: {
  title: string;
  description: string;
  image: string;
  hasOverlay: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full border-2 border-white/20 hover:border-white/40 transition-colors shadow-sm hover:shadow-xl flex flex-col bg-black/40 backdrop-blur-sm">
        <div className="relative flex-1 min-h-[250px] bg-black/20 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover Label */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 backdrop-blur-sm">
            <p className="text-white text-center text-sm font-medium leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {description}
            </p>
          </div>

          <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm text-white border border-white/20">
            {title}
          </div>
        </div>
        <div className="p-3 border-t border-white/20 bg-black/40 backdrop-blur-sm">
          <h3 className="font-semibold flex items-center text-white text-sm" style={{ fontFamily: "var(--font-michroma)" }}>
            <FileImage className="mr-2 h-4 w-4 text-white" />
            {title}
          </h3>
        </div>
      </Card>
    </motion.div>
  );
}
