import { PageLayout, NavigationDock } from "@/components";

export default function About() {
  return (
    <PageLayout>
      <section className="flex w-full flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-4xl">
          <h1
            className="font-bold leading-tight text-white drop-shadow-lg"
            style={{
              fontFamily: "var(--font-michroma)",
              fontSize: "clamp(2rem, 8vw, 6rem)",
            }}
          >
            ABOUT
          </h1>
          <div className="space-y-6 text-white/80" style={{ fontFamily: "var(--font-poppins)" }}>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
              Phoenix is an advanced AI-powered system designed for cervical cancer cell classification.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Using cutting-edge machine learning algorithms and computer vision techniques, 
              Phoenix aims to assist medical professionals in early detection and accurate 
              classification of cervical cancer cells.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Our mission is to improve diagnostic accuracy and contribute to better patient 
              outcomes through innovative technology.
            </p>
          </div>
        </div>
      </section>
      <NavigationDock />
    </PageLayout>
  );
}
