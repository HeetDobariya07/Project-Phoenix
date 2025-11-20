'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Explainability() {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto px-4 py-20">
          <Link href="/about" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontFamily: "var(--font-poppins)" }}>Back to About</span>
          </Link>
          <h1 className="text-6xl font-bold mb-8 text-white" style={{ fontFamily: "var(--font-michroma)" }}>
            Explainability
          </h1>
          <div className="max-w-4xl space-y-6 text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
            <p className="text-lg">
              This page will contain detailed information about our explainability techniques, 
              including Grad-CAM visualizations, attention maps, and feature attribution methods.
            </p>
            <p className="text-lg">
              Content coming soon...
            </p>
          </div>
        </div>
      </PageLayout>
      <StickyFooter />
    </>
  );
}
