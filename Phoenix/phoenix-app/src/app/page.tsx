import { PageLayout, HeroSection, MissionStatement, ParallaxGallery } from "@/components";
import { HERO_CONFIG } from "@/config/constants";
import StickyFooter from "@/components/footer";
import CometHero from "@/components/comet-hero";
import { FlowButton } from "@/components/ui/flow-button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <>
      <PageLayout>
        <HeroSection 
          title={HERO_CONFIG.title}
        />
        <MissionStatement />
        <ParallaxGallery />
        
        {/* GitHub CTA Section with Comet Hero */}
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 my-12 sm:my-16 md:my-20">
          {/* Background - CometHero animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-40 pointer-events-none overflow-visible">
            <div className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl scale-100 md:scale-110">
              <CometHero />
            </div>
          </div>
          
          {/* Foreground - CTA content */}
          <div className="relative z-10 w-full px-8 sm:px-12 md:px-4">
            <div className="flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 max-w-3xl mx-auto">
              <Badge variant="outline" className="border-white/40 text-white bg-white/10 text-xs sm:text-sm">
                Open Source
              </Badge>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight w-full">
                Join Us on GitHub
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed w-full max-w-[280px] sm:max-w-md md:max-w-2xl">
                Contribute to the future of explainable AI in healthcare. Star, fork, or contribute to Project Phoenix.
              </p>
              
              <a href="https://github.com/Meet2304/project-phoenix" target="_blank" rel="noopener noreferrer" className="mt-2">
                <FlowButton text="View on GitHub" />
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
      <StickyFooter />
    </>
  );
}
