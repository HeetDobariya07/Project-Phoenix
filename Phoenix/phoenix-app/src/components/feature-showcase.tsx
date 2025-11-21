"use client";

import * as React from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type TabMedia = {
  value: string; // unique value for Tabs
  label: string; // button label
  src: string;   // image url
  alt?: string;
};

export type ShowcaseStep = {
  id: string;
  title: string;
  text: string;
};

export type FeatureShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** small chips under the description */
  stats?: string[];
  /** accordion steps on the left */
  steps?: ShowcaseStep[];
  /** single image */
  image: {
    src: string;
    alt?: string;
  };
  /** fixed panel height in px (also applied as min-height) */
  panelMinHeight?: number;
  /** flip layout horizontally for left/right alternating */
  flip?: boolean;
  /** link for Learn More button */
  learnMoreLink?: string;
  className?: string;
};

export function FeatureShowcase({
  eyebrow = "Discover",
  title,
  description,
  stats = ["1 reference", "30s setup", "Share‑ready"],
  steps = [
    {
      id: "step-1",
      title: "Drop a reference",
      text:
        "Upload a single image. We read it like a brief and extract palette, texture and cues.",
    },
    {
      id: "step-2",
      title: "Pick the vibe",
      text:
        "Switch between mockup, screen, or abstract views and tune the mood instantly.",
    },
    {
      id: "step-3",
      title: "Export & share",
      text:
        "Get a moodboard ready for your team with consistent visuals and notes.",
    },
  ],
  image,
  panelMinHeight = 720,
  flip = false,
  learnMoreLink = "#",
  className,
}: FeatureShowcaseProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});

  // Mouse move handler for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / (height / 2) * -8;
    const rotateY = (x - width / 2) / (width / 2) * 8;

    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  // Mouse leave handler to reset
  const handleMouseLeave = () => {
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <section className={cn("w-full bg-transparent text-white", className)}>
      <div className={cn(
        "container mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 md:gap-10 md:px-6 md:py-16 lg:py-20 md:grid-cols-12 lg:gap-14",
        flip && "md:grid-flow-dense"
      )}>
        {/* Image column (now on left) */}
        <div className={cn("md:col-span-6", flip && "md:col-start-7")}>
          <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ minHeight: panelMinHeight * 0.6, ...cardStyle }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-0 shadow-sm cursor-pointer"
          >
            <div className="h-full w-full md:h-[600px]" style={{ minHeight: panelMinHeight * 0.6 }}>
              <img
                src={image.src}
                alt={image.alt ?? title}
                className="h-full w-full object-contain md:object-cover"
                loading="eager"
              />
            </div>
          </Card>
        </div>

        {/* Text column (now on right) */}
        <div className={cn("md:col-span-6", flip && "md:col-start-1 md:row-start-1")}>
          <Badge variant="outline" className="mb-3 md:mb-6 border-white/20 text-white text-xs md:text-sm">
            {eyebrow}
          </Badge>

          <h2 className="text-balance text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:leading-[0.95]" style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>

          {description ? (
            <p className="mt-3 md:mt-6 max-w-xl text-sm md:text-base text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>{description}</p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-3 md:mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 text-xs"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-6 md:mt-10 max-w-xl">
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step) => (
                <AccordionItem key={step.id} value={step.id} className="border-white/10">
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium text-white hover:text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
                    <div dangerouslySetInnerHTML={{ __html: step.text }} className="[&_a]:text-white/90 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTAs */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <Button asChild size="default" className="bg-white text-black hover:bg-white/90 md:text-base md:px-6 md:py-2 md:h-11">
                <Link href={learnMoreLink}>Learn More</Link>
              </Button>
              <Button
                asChild
                size="default"
                variant="secondary"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10 md:text-base md:px-6 md:py-2 md:h-11"
              >
                <Link href="#examples">Github</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
