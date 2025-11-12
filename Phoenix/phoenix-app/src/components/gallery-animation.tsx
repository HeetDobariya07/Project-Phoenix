"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableGalleryProps {
  images: { src: string; label: string }[];
  className?: string;
}

const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ images, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2 : 0.5;
  };

  return (
    <div className={className}>
      {/* Horizontal Expandable Gallery */}
      <div className="flex gap-2 h-[400px] md:h-[500px] w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-md group"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Cell Type Label on Hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
            >
              <p 
                className="text-white font-semibold text-base md:text-lg text-center"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {image.label}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black bg-white bg-opacity-95 p-4"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              onClick={closeImage}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
                onClick={goToPrev}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].label}
                className="w-full h-full object-contain rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Label in Modal */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/70 px-6 py-3 rounded-md"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {images[selectedIndex].label}
              </div>
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
                onClick={goToNext}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm dark:bg-black bg-white bg-opacity-50 px-4 py-2 rounded-md">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableGallery;

// Cell Classification Gallery Component
export function CellClassificationGallery() {
  const images = [
    { src: "/images/Landing Page/Metaplastic.jpg", label: "Metaplastic Cell" },
    { src: "/images/Landing Page/Dyskeratotic.jpg", label: "Dyskeratotic Cell" },
    { src: "/images/Landing Page/Koilocytotic.jpg", label: "Koilocytotic Cell" },
    { src: "/images/Landing Page/Superficial Intermediate.jpg", label: "Superficial Intermediate Cell" },
    { src: "/images/Landing Page/Parabasal.jpg", label: "Parabasal Cell" },
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Explainable AI Classification
          </h2>
          <p 
            className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Explore different cervical cancer cell types through our interactive gallery
          </p>
        </div>
        <ExpandableGallery images={images} className="w-full" />
      </div>
    </div>
  );
}