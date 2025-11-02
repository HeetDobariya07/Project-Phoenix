"use client";

import React, { useState } from "react";
import Image from "next/image";

// --- Data for cervical cancer cell types ---
const cellTypes = [
  {
    id: 1,
    title: "Metaplastic",
    imageUrl: "/images/Landing%20Page/Metaplastic.jpg",
    description: "Normal cell transformation process",
  },
  {
    id: 2,
    title: "Dyskeratotic",
    imageUrl: "/images/Landing%20Page/Dyskeratotic.jpg",
    description: "Abnormal keratinization pattern",
  },
  {
    id: 3,
    title: "Koilocytotic",
    imageUrl: "/images/Landing%20Page/Koilocytotic.jpg",
    description: "HPV-related cellular changes",
  },
  {
    id: 4,
    title: "Superficial Intermediate",
    imageUrl: "/images/Landing%20Page/Superficial%20Intermediate.jpg",
    description: "Middle layer cell characteristics",
  },
  {
    id: 5,
    title: "Parabasal",
    imageUrl: "/images/Landing%20Page/Parabasal.jpg",
    description: "Deep layer cell structure",
  },
];

// --- Types ---
interface CellType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

interface AccordionItemProps {
  item: CellType;
  isActive: boolean;
  onMouseEnter: () => void;
}

interface ClassificationShowcaseProps {
  className?: string;
}

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isActive,
  onMouseEnter,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px]
        ${isActive 
          ? "w-[250px] xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px]" 
          : "w-[50px] xs:w-[55px] sm:w-[60px] md:w-[70px]"
        }
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-neutral-800">
        {!imageError ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 300px, 400px"
            priority={item.id === 3}
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900">
            <span className="text-white/50 text-sm">Image not found</span>
          </div>
        )}
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Caption Text */}
      <div
        className={`
          absolute text-white font-semibold
          transition-all duration-300 ease-in-out z-10
          ${
            isActive
              ? "bottom-4 xs:bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-center whitespace-normal px-2" 
              : "bottom-16 xs:bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 rotate-90 text-left whitespace-nowrap"
          }
        `}
      >
        <span className="text-sm xs:text-base sm:text-lg block drop-shadow-lg">
          {item.title}
        </span>
        {isActive && (
          <span className="text-xs sm:text-sm text-white/90 block mt-1 drop-shadow-md max-w-[250px] xs:max-w-[280px] sm:max-w-[320px]">
            {item.description}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Main Classification Showcase Component ---
export const ClassificationShowcase: React.FC<ClassificationShowcaseProps> = ({
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(2); // Default to Koilocytotic (middle)

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      className={`w-full py-12 sm:py-16 md:py-20 lg:py-24 px-3 xs:px-4 sm:px-6 md:px-8 ${className}`}
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <h2
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Explainable AI Classification
            </h2>
            <p className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Project Phoenix uses explainable AI to detect and understand cervical cancer cells — making diagnosis more transparent and accurate.
            </p>
            <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-xs xs:text-sm sm:text-base text-white/70">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full flex-shrink-0"></div>
                <span>Accurate multi-class detection</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full flex-shrink-0"></div>
                <span>Real-time classification results</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full flex-shrink-0"></div>
                <span>Clinical-grade precision</span>
              </div>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-7/12 overflow-x-hidden">
            <div className="flex flex-row items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 overflow-x-auto py-4 px-2 scrollbar-hide">
              {cellTypes.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassificationShowcase;
