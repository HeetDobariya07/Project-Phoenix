'use client';

import { PageLayout, ClassificationShowcase, BottomNavBar } from "@/components";
import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

const containerVariants = {
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
  const title = "ABOUT";
  const titleLetters = title.split("");

  return (
    <PageLayout>
      {/* Main About Section - matches HeroSection height */}
      <section className="flex w-full flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-4xl">
          <h1
            className="font-bold leading-tight text-white drop-shadow-lg"
            style={{
              fontFamily: "var(--font-michroma)",
              fontSize: "clamp(2rem, 8vw, 6rem)",
            }}
          >
            {titleLetters.map((letter, i) => (
              <motion.span
                key={`letter-${i}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.div 
            className="space-y-6 text-white/80" 
            style={{ fontFamily: "var(--font-poppins)" }}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl leading-relaxed"
              custom={0}
              variants={wordVariants}
            >
              Phoenix is an advanced AI-powered system designed for cervical cancer cell classification.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              custom={1}
              variants={wordVariants}
            >
              Using cutting-edge machine learning algorithms and computer vision techniques, 
              Phoenix aims to assist medical professionals in early detection and accurate 
              classification of cervical cancer cells.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              custom={2}
              variants={wordVariants}
            >
              Our mission is to improve diagnostic accuracy and contribute to better patient 
              outcomes through innovative technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Additional Content Section - matches ParallaxGallery height */}
      <section className="flex w-full flex-col items-center justify-center h-[150vh] sm:h-[175vh] md:h-[200vh] py-16 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-center justify-center gap-12 text-center max-w-5xl">
          <motion.h2
            className="font-bold leading-tight text-white drop-shadow-lg"
            style={{
              fontFamily: "var(--font-michroma)",
              fontSize: "clamp(1.5rem, 6vw, 4rem)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            OUR APPROACH
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "Advanced AI",
                description: "Leveraging state-of-the-art deep learning models trained on extensive datasets to achieve high accuracy in cell classification."
              },
              {
                title: "Explainable AI",
                description: "Providing transparent insights into classification decisions to build trust and understanding among medical professionals."
              },
              {
                title: "Clinical Accuracy",
                description: "Validated against expert pathologist assessments to ensure reliable performance in real-world clinical settings."
              },
              {
                title: "Early Detection",
                description: "Enabling faster diagnosis and treatment planning to improve patient outcomes through timely intervention."
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10"
                variants={cardVariants}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-michroma)" }}>
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed" style={{ fontFamily: "var(--font-poppins)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-8 space-y-6 text-white/70 max-w-3xl" 
            style={{ fontFamily: "var(--font-poppins)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-base sm:text-lg leading-relaxed">
              Phoenix represents the intersection of cutting-edge artificial intelligence 
              and critical healthcare needs. By combining advanced computer vision with 
              explainable AI techniques, we're building a tool that doesn't just classify 
              cells—it empowers medical professionals with insights they can trust.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Our commitment extends beyond technology. We believe in creating solutions 
              that are accessible, transparent, and ultimately beneficial to patients 
              and healthcare providers alike.
            </p>
          </motion.div>
        </div>
      </section>

      <BottomNavBar />
    </PageLayout>
  );
}
