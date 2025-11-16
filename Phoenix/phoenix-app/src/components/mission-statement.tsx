"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { FlowButton } from "@/components/ui/flow-button";
import { useInView } from "framer-motion";
import { useRef } from "react";


const lines = [
  "We’re giving AI the ability to truly understand cervical cancer cells.",
  "And the voice to explain its reasoning openly and honestly.",
  "So diagnosis becomes clearer, safer, and impossible to misinterpret."
];

const Line = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div 
      ref={ref}
      className="h-[70vh] sm:h-[80vh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-0"
    >
      <div className="max-w-[92vw] sm:max-w-[88vw] md:max-w-[85vw] lg:max-w-[82vw] xl:max-w-[80vw] w-full">
        <TextEffect
          per="word"
          as="p"
          preset="blur"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-playfair font-medium text-white text-center leading-relaxed"
          trigger={isInView}
          segmentWrapperClassName="inline-block whitespace-nowrap mx-0"
        >
          {text}
        </TextEffect>
      </div>
    </div>
  );
};

export const MissionStatement = () => {
  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, { once: false, amount: 0.5 });

  return (
    <section className="relative w-full">
      {lines.map((line, index) => (
        <Line key={index} text={line} index={index} />
      ))}
      <div 
        ref={buttonRef}
        className="h-auto flex items-start justify-center px-4 sm:px-6 -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32 pb-50"
      >
        <div 
          onClick={() => window.location.href = '/about'}
          className={`transition-opacity duration-1000 ${isButtonInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <FlowButton text="Learn How" />
        </div>
      </div>
    </section>
  );
};
