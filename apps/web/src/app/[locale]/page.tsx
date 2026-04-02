import { HeroSection } from '@/components/sections/hero';
import { MarqueeSection } from '@/components/sections/marquee';
import { StatsSection } from '@/components/sections/stats';
import { AboutSection } from '@/components/sections/about-section';
import { ExpertiseSection } from '@/components/sections/expertise';
import { TeamPreviewSection } from '@/components/sections/team-preview';
import { DistinctionsSection } from '@/components/sections/distinctions';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { GalleryStrip } from '@/components/sections/gallery-strip';
import { FoundationSection } from '@/components/sections/foundation';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <AboutSection />
      <ExpertiseSection />
      <TeamPreviewSection />
      <DistinctionsSection />
      <TestimonialsSection />
      <GalleryStrip />
      <FoundationSection />
    </>
  );
}
