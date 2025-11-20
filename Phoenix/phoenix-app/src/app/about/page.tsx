'use client';

import { PageLayout } from "@/components";
import { Skiper19 } from "@/components/svg-follow-scroll";
import { motion, type Variants } from "framer-motion";
import StickyFooter from "@/components/footer";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as any,
    }
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function About() {
  return (
    <>
    <PageLayout>
      {/* SVG Follow Scroll Component - starts with title */}
      <Skiper19 />
    </PageLayout>
    <StickyFooter />
    </>
  );
}
