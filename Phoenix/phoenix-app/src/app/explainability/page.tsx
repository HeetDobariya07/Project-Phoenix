'use client';

import { PageLayout } from "@/components";
import StickyFooter from "@/components/footer";

export default function Explainability() {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto px-4 py-20">
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
