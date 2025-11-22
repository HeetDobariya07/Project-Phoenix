"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Check, X, Play, FileImage, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Types
type ProcessingState = "idle" | "uploading" | "processing" | "complete"

const SAMPLE_IMAGES = [
  { id: 1, url: "/cat-sitting-on-couch.jpg", label: "Cat", classification: "Tabby Cat" },
  { id: 2, url: "/dog-running-in-park.jpg", label: "Dog", classification: "Golden Retriever" },
  { id: 3, url: "/coffee-cup-on-table.png", label: "Coffee", classification: "Espresso Cup" },
  { id: 4, url: "/sports-car-on-highway.jpg", label: "Car", classification: "Sports Car" },
  { id: 5, url: "/sunflower-in-garden.jpg", label: "Flower", classification: "Sunflower" },
]

export function ClassificationInference() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processingState, setProcessingState] = useState<ProcessingState>("idle")
  const [result, setResult] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSampleSelect = (url: string) => {
    setSelectedImage(url)
    setProcessingState("idle")
    setResult(null)
  }

  const simulateUpload = (url: string) => {
    setProcessingState("uploading")
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessingState("idle")
          setSelectedImage(url)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      simulateUpload(url)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      simulateUpload(url)
    }
  }

  const runInference = () => {
    if (!selectedImage) return

    setProcessingState("processing")

    // Determine result based on if it's a known sample or generic
    const foundSample = SAMPLE_IMAGES.find((s) => s.url === selectedImage)
    const prediction = foundSample ? foundSample.classification : "Unknown Object (Mock)"

    // Simulate processing time
    setTimeout(() => {
      setProcessingState("complete")
      setResult(prediction)
    }, 4000) // Increased slightly for better animation flow
  }

  const reset = () => {
    setProcessingState("idle")
    setResult(null)
    setSelectedImage(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-2rem)] md:h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 shrink-0 mb-4"
      >
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          Classification Inference
        </h1>
        <p className="text-sm text-muted-foreground max-w-[600px] mx-auto">
          Select a sample or upload your own image to analyze.
        </p>
      </motion.div>

      <div className="relative flex-1 min-h-0">
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
              <div className="grid gap-4 md:grid-cols-[1fr_280px] h-full pb-4">
                {/* Main Preview & Upload */}
                <Card
                  className="p-4 flex flex-col items-center justify-center h-full border-2 border-dashed relative overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/50 group bg-gradient-to-br from-background to-muted/30"
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
                          <Loader2 className="h-12 w-12 text-primary animate-spin" />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {progress}%
                          </span>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Uploading image...</p>
                      </motion.div>
                    ) : selectedImage ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-full h-full flex flex-col gap-4"
                      >
                        <div className="relative group/image w-full flex-1 min-h-0 flex justify-center items-center overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                          <motion.img
                            layoutId="preview-image"
                            src={selectedImage || "/placeholder.svg"}
                            alt="Selected"
                            className="w-full h-full object-contain max-h-full"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-destructive text-white rounded-full shadow-md backdrop-blur-sm transition-colors z-10"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedImage(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </motion.button>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="z-20 flex justify-center shrink-0 pt-2"
                        >
                          <Button
                            size="lg"
                            onClick={runInference}
                            className="relative overflow-hidden px-8 py-6 text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)] transition-all duration-500 group/btn bg-primary hover:scale-105"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Play className="w-5 h-5 fill-current" />
                              Run Analysis
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover/btn:ring-white/40 transition-all duration-500" />
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
                          className="mx-auto w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                        >
                          <Upload className="h-8 w-8 text-secondary-foreground group-hover:text-primary transition-colors" />
                        </motion.div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">Upload an Image</h3>
                          <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
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
                <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                  <h3 className="font-semibold text-base flex items-center gap-2 shrink-0">
                    <FileImage className="w-4 h-4" /> Choose sample
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
                          "relative aspect-[4/3] md:aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-md",
                          selectedImage === sample.url
                            ? "border-primary ring-4 ring-primary/20 scale-105 z-10"
                            : "border-transparent hover:border-primary/50",
                        )}
                      >
                        <img
                          src={sample.url || "/placeholder.svg"}
                          alt={sample.label}
                          className="w-full h-full object-cover"
                        />
                        {selectedImage === sample.url && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-background/90 rounded-full p-1.5 shadow-lg"
                            >
                              <Check className="h-5 w-5 text-primary" />
                            </motion.div>
                          </motion.div>
                        )}
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
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/80 backdrop-blur-sm"
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
              className="flex flex-col h-full w-full overflow-hidden pb-2"
            >
              <div className="flex flex-col md:flex-row items-center justify-between border-b pb-2 mb-2 gap-2 shrink-0">
                <div className="space-y-1">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                      {result}
                    </h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium">
                        <Check className="w-3 h-3 mr-1" /> 98.5% Confidence
                      </span>
                      <span className="text-muted-foreground text-sm">Inference time: 0.45s</span>
                    </div>
                  </motion.div>
                </div>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <Upload className="w-4 h-4" /> Analyze Another
                  </Button>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 flex-1 min-h-0">
                <ExplainabilityCard
                  title="Grad-CAM"
                  description="Visualizes which regions of the image were important for the prediction."
                  image={selectedImage}
                  overlayType="grad-cam"
                  delay={0.4}
                />
                <ExplainabilityCard
                  title="Grad-CAM++"
                  description="An improvement over Grad-CAM, providing better localization of objects."
                  image={selectedImage}
                  overlayType="grad-cam-plus"
                  delay={0.5}
                />
                <ExplainabilityCard
                  title="LayerCAM"
                  description="Captures fine-grained details from different layers of the model."
                  image={selectedImage}
                  overlayType="layer-cam"
                  delay={0.6}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ProcessingAnimation({ image }: { image: string | null }) {
  const [step, setStep] = useState(0)
  const steps = ["Preprocessing Image...", "Extracting Features...", "Analyzing Layers...", "Finalizing Prediction..."]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
      <div className="relative flex items-center justify-center w-[300px] h-[300px]">
        {/* Central Image with scanning effect */}
        <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-2xl z-10">
          {image && (
            <motion.img
              src={image}
              alt="Processing"
              className="w-full h-full object-cover grayscale opacity-50"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent w-full h-[20%]"
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Abstract Center Node */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-4 border border-dashed border-primary/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Orbiting Particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            initial={{ rotate: i * 120 }}
            animate={{ rotate: i * 120 + 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full shadow-[0_0_15px_currentColor] text-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <circle cx="50%" cy="50%" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="0"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="85%"
            y2="85%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="15%"
            y2="85%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary animate-pulse"
          />
        </svg>
      </div>

      <div className="space-y-2 text-center z-20">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-mono text-primary font-bold tracking-widest"
        >
          {steps[step]}
        </motion.div>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ExplainabilityCard({
  title,
  description,
  image,
  overlayType,
  delay,
}: {
  title: string
  description: string
  image: string
  overlayType: "grad-cam" | "grad-cam-plus" | "layer-cam"
  delay: number
}) {
  // Simulate heatmap overlays with CSS gradients
  const getOverlayStyle = () => {
    switch (overlayType) {
      case "grad-cam":
        return "bg-gradient-to-tr from-transparent via-red-500/40 to-yellow-500/40 mix-blend-overlay"
      case "grad-cam-plus":
        return "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/50 via-transparent to-blue-500/30 mix-blend-color-burn"
      case "layer-cam":
        return "bg-gradient-to-b from-transparent via-green-500/30 to-purple-500/30 mix-blend-hard-light"
      default:
        return ""
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden group h-full border-muted-foreground/20 hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl flex flex-col">
        <div className="relative flex-1 min-h-0 bg-muted overflow-hidden">
          <motion.img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 1 }}
            className={cn("absolute inset-0 transition-opacity duration-500", getOverlayStyle())}
          />

          {/* Hover Label */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 backdrop-blur-sm">
            <p className="text-white text-center text-sm font-medium leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {description}
            </p>
          </div>

          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {overlayType.replace("-", " ")}
          </div>
        </div>
        <div className="p-3 border-t bg-card shrink-0">
          <h3 className="font-semibold flex items-center text-card-foreground text-sm">
            <FileImage className="mr-2 h-4 w-4 text-primary" />
            {title}
          </h3>
        </div>
      </Card>
    </motion.div>
  )
}
