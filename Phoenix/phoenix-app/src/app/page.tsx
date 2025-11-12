import { PageLayout, HeroSection, ParallaxGallery, BottomNavBar } from "@/components";
import { HERO_CONFIG } from "@/config/constants";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection 
        title={HERO_CONFIG.title}
        subtitle={HERO_CONFIG.subtitle}
      />
      <ParallaxGallery />
      <BottomNavBar />
    </PageLayout>
  );
}
