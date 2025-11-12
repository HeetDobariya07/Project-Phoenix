"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  label: string;
}

const images: ImageData[] = [
  { src: "/images/Landing Page/Metaplastic.jpg", label: "Metaplastic Cell" },
  { src: "/images/Landing Page/Dyskeratotic.jpg", label: "Dyskeratotic Cell" },
  { src: "/images/Landing Page/Koilocytotic.jpg", label: "Koilocytotic Cell" },
  { src: "/images/Landing Page/Superficial Intermediate.jpg", label: "Superficial Intermediate Cell" },
  { src: "/images/Landing Page/Parabasal.jpg", label: "Parabasal Cell" },
  { src: "/images/Landing Page/Metaplastic.jpg", label: "Metaplastic Cell" },
  { src: "/images/Landing Page/Dyskeratotic.jpg", label: "Dyskeratotic Cell" },
  { src: "/images/Landing Page/Koilocytotic.jpg", label: "Koilocytotic Cell" },
  { src: "/images/Landing Page/Superficial Intermediate.jpg", label: "Superficial Intermediate Cell" },
  { src: "/images/Landing Page/Parabasal.jpg", label: "Parabasal Cell" },
  { src: "/images/Landing Page/Metaplastic.jpg", label: "Metaplastic Cell" },
  { src: "/images/Landing Page/Dyskeratotic.jpg", label: "Dyskeratotic Cell" },
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  
  // Adjust parallax speeds based on screen size - use more conservative multipliers for desktop
  const parallaxMultiplier = isMobile ? 0.5 : 0.75;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2 * parallaxMultiplier]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3 * parallaxMultiplier]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25 * parallaxMultiplier]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.8 * parallaxMultiplier]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="w-full bg-transparent text-white overflow-hidden">
      <div
        ref={gallery}
        className="relative box-border flex h-[150vh] sm:h-[175vh] md:h-[200vh] gap-[1.5vw] sm:gap-[2vw] md:gap-[2.5vw] lg:gap-[3vw] overflow-hidden bg-transparent p-[1.5vw] sm:p-[2vw] md:p-[2.5vw] lg:p-[3vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} top={-45} />
        <Column images={[images[3], images[4], images[5]]} y={y2} top={-95} />
        <Column images={[images[6], images[7], images[8]]} y={y3} top={-45} />
        <Column images={[images[9], images[10], images[11]]} y={y4} top={-75} />
      </div>
    </section>
  );
};

type ColumnProps = {
  images: ImageData[];
  y: MotionValue<number>;
  top: number;
};

const Column = ({ images, y, top }: ColumnProps) => {
  return (
    <motion.div
      className="relative flex h-full w-1/4 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-col gap-[1.5vw] sm:gap-[2vw] md:gap-[2.5vw] lg:gap-[3vw]"
      style={{ y, top: `${top}%` }}
    >
      {images.map((imageData, i) => (
        <div 
          key={`${imageData.label}-${i}`} 
          className="relative h-full w-full overflow-hidden rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl lg:shadow-2xl group"
        >
          <img
            src={imageData.src}
            alt={imageData.label}
            loading="lazy"
            className="pointer-events-none object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-1.5 pb-2 sm:p-2 sm:pb-3 md:p-3 md:pb-4 lg:p-4 lg:pb-6">
            <p 
              className="text-white font-semibold text-[0.65rem] sm:text-xs md:text-sm lg:text-base xl:text-lg text-center leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {imageData.label}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
