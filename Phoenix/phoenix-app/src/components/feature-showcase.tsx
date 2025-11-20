"use client";

import * as React from "react";
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

  return (
    <section className={cn("w-full bg-transparent text-white", className)}>
      <div className={cn(
        "container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20 lg:gap-14",
        flip && "md:grid-flow-dense"
      )}>
        {/* Image column (now on left) */}
        <div className={cn("md:col-span-6", flip && "md:col-start-7")}>
          <Card
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-0 shadow-sm"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            <img
              src={image.src}
              alt={image.alt ?? title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </Card>
        </div>

        {/* Text column (now on right) */}
        <div className={cn("md:col-span-6", flip && "md:col-start-1 md:row-start-1")}>
          <Badge variant="outline" className="mb-6 border-white/20 text-white">
            {eyebrow}
          </Badge>

          <h2 className="text-balance text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-michroma)" }}>
            {title}
          </h2>

          {description ? (
            <p className="mt-6 max-w-xl text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>{description}</p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          <div className="mt-10 max-w-xl">
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step) => (
                <AccordionItem key={step.id} value={step.id} className="border-white/10">
                  <AccordionTrigger className="text-left text-base font-medium text-white hover:text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
                    {step.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href={learnMoreLink}>Learn More</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
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
