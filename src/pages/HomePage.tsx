import { PageKey } from "@/lib/site";
import {
  HeroSection,
  PillarsSection,
  AboutPreviewSection,
  StatsSection,
  FeaturedProductsSection,
  IndustriesSection,
  ServicesPreviewSection,
  CustomersSection,
  TestimonialSection,
  CtaSection,
} from "@/components/home";

export const HomePage = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  return (
    <div className="page-fade">
      <HeroSection onNavigate={onNavigate} />
      <PillarsSection />
      <AboutPreviewSection onNavigate={onNavigate} />
      <StatsSection />
      <ServicesPreviewSection onNavigate={onNavigate} />
      <FeaturedProductsSection onNavigate={onNavigate} />
      <IndustriesSection />
      <CustomersSection />
      <TestimonialSection />
      <CtaSection onNavigate={onNavigate} />
    </div>
  );
};
