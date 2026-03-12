import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CtaSection from "@/components/home/CtaSection";
import ServicesSection from "@/components/home/ServicesSection";
import NewsSection from "@/components/home/NewsSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import FaqSection from "@/components/home/FaqSection";
import PartnersSection from "@/components/home/PartnersSection";
import StatsSection from "@/components/home/StatsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <WorkflowSection />
      <CtaSection />
      <StatsSection />
      <NewsSection />
      <FaqSection />
      <PartnersSection />
    </Layout>
  );
};

export default Index;
