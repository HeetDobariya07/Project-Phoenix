"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FeatureShowcase } from "./feature-showcase";

const processSteps = [
  {
    position: "right",
    yPosition: "top-[100vh]",
    title: "Data Preprocessing",
    description: "Transform raw microscopy images into analysis-ready data through advanced preprocessing techniques.",
    stats: ["Image Enhancement", "Noise Reduction", "Standardization"],
    steps: [
      {
        id: "preprocessing-1",
        title: "Image Acquisition",
        text: "High-resolution cervical cell images captured through microscopy imaging systems."
      },
      {
        id: "preprocessing-2",
        title: "Enhancement Pipeline",
        text: "Apply contrast adjustment, color normalization, and artifact removal to improve image quality."
      },
      {
        id: "preprocessing-3",
        title: "Data Augmentation",
        text: "Generate diverse training samples through rotation, flipping, and scaling transformations."
      }
    ],
    image: {
      src: "/images/About/Test_v0.1.png",
      alt: "Data preprocessing pipeline"
    },
    learnMoreLink: "/preprocessing"
  },
  {
    position: "left",
    yPosition: "top-[200vh]",
    title: "Model Fine-Tuning",
    description: "Leverage transfer learning with state-of-the-art ConvNeXt architecture for precise cell classification.",
    stats: ["Transfer Learning", "95%+ Accuracy", "Real-time Inference"],
    steps: [
      {
        id: "training-1",
        title: "Architecture Selection",
        text: "ConvNeXt model chosen for superior performance in medical image classification tasks."
      },
      {
        id: "training-2",
        title: "Fine-Tuning Strategy",
        text: "Progressive unfreezing and layer-wise learning rate optimization for domain adaptation."
      },
      {
        id: "training-3",
        title: "Validation & Testing",
        text: "Rigorous cross-validation ensuring model generalization across diverse cell populations."
      }
    ],
    image: {
      src: "/api/placeholder/800/600",
      alt: "Model fine-tuning process"
    },
    learnMoreLink: "/model-training"
  },
  {
    position: "right",
    yPosition: "top-[325vh]",
    title: "Explainability",
    description: "Build trust through transparent AI decision-making with advanced visualization techniques.",
    stats: ["Grad-CAM", "Attention Maps", "Feature Attribution"],
    steps: [
      {
        id: "explain-1",
        title: "Activation Mapping",
        text: "Visualize which regions of the cell influenced the classification decision."
      },
      {
        id: "explain-2",
        title: "Feature Importance",
        text: "Identify key cellular characteristics that drive model predictions."
      },
      {
        id: "explain-3",
        title: "Clinical Validation",
        text: "Align AI insights with pathologist expertise for reliable diagnostic support."
      }
    ],
    image: {
      src: "/api/placeholder/800/600",
      alt: "Explainability visualization"
    },
    learnMoreLink: "/explainability"
  },
  {
    position: "left",
    yPosition: "top-[450vh]",
    title: "Performance Evaluation",
    description: "Comprehensive assessment using clinical-grade metrics and real-world validation.",
    stats: ["Multi-Class Metrics", "Confusion Matrix", "ROC Analysis"],
    steps: [
      {
        id: "eval-1",
        title: "Accuracy Metrics",
        text: "Precision, recall, F1-score across all five cervical cell classifications."
      },
      {
        id: "eval-2",
        title: "Clinical Validation",
        text: "Benchmark against expert pathologist annotations for real-world reliability."
      },
      {
        id: "eval-3",
        title: "Continuous Monitoring",
        text: "Track model performance over time with ongoing evaluation and refinement."
      }
    ],
    image: {
      src: "/api/placeholder/800/600",
      alt: "Performance evaluation metrics"
    },
    learnMoreLink: "/evaluation"
  }
];

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section
      ref={ref}
      className="relative mx-auto flex h-[550vh] w-screen flex-col items-center overflow-visible bg-transparent px-4 text-white"
    >
      <LinePath
        className="absolute left-1/2 -translate-x-1/2 top-0 z-0 w-[90vw] max-w-[1200px]"
        scrollYProgress={scrollYProgress}
      />
      <div className="mt-42 relative flex w-fit flex-col items-center justify-center gap-5 text-center mb-32">
        <h1 className="relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl" style={{ fontFamily: "var(--font-michroma)" }}>
          ABOUT
        </h1>
        <p className="relative z-10 max-w-2xl text-xl font-medium text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
          Scroll down to explore our mission
        </p>
      </div>

      {/* Introduction paragraph */}
      <div className="absolute top-[50vh] w-full z-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xl text-white/80 leading-relaxed font-medium" style={{ fontFamily: "var(--font-poppins)" }}>
            Project Phoenix leverages cutting-edge deep learning to revolutionize cervical cancer detection. 
            Our innovative approach combines advanced image preprocessing, state-of-the-art ConvNeXt architecture, 
            and explainable AI techniques to provide accurate, trustworthy diagnostic support for medical professionals.
          </p>
          <p className="text-lg text-white/70 leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
            Through meticulous data preprocessing, transfer learning with ConvNeXt models, and transparent explainability features, 
            we empower healthcare professionals with reliable AI-driven insights for improved patient outcomes in cervical cancer screening.
          </p>
        </div>
      </div>

      {/* Feature showcases at each curve */}
      {processSteps.map((step, index) => (
        <div
          key={index}
          className={`absolute ${step.yPosition} w-full z-10 px-4 md:px-8`}
        >
          <div className={`max-w-6xl mx-auto ${step.position === "left" ? "mr-auto" : "ml-auto"}`}>
            <FeatureShowcase
              eyebrow={`Step ${index + 1}`}
              title={step.title}
              description={step.description}
              stats={step.stats}
              steps={step.steps}
              image={step.image}
              learnMoreLink={step.learnMoreLink}
              panelMinHeight={600}
              className="bg-transparent"
              flip={step.position === "left"}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      width="100%"
      height="550vh"
      viewBox="0 0 1000 5000"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMin meet"
      style={{ pointerEvents: 'none' }}
    >
      <motion.path
        d="M500 0 C550 50, 600 100, 700 200 C850 350, 900 500, 800 700 C700 900, 500 1000, 300 1200 C100 1400, 150 1600, 350 1800 C550 2000, 750 2100, 850 2300 C950 2500, 900 2700, 700 2900 C500 3100, 300 3300, 400 3600 C500 3900, 650 4200, 750 4500 C850 4800, 700 4900, 500 5000"
        stroke="rgba(255, 255, 255, 0.9)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1"
        strokeDashoffset="1"
        style={{
          pathLength,
        }}
      />
    </svg>
  );
};

