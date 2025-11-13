import { PageLayout, HeroSection, ParallaxGallery } from "@/components";
import { HERO_CONFIG } from "@/config/constants";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection 
        title={HERO_CONFIG.title}
        subtitle={HERO_CONFIG.subtitle}
      />
      <ParallaxGallery />
    </PageLayout>
  );
}
