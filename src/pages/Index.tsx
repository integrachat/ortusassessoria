import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CtaSection from "@/components/home/CtaSection";
import ServicesSection from "@/components/home/ServicesSection";
import NewsSection from "@/components/home/NewsSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import FaqSection from "@/components/home/FaqSection";
import WhatsappCta from "@/components/home/WhatsappCta";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <ServicesSection />
      <NewsSection />
      <WorkflowSection />
      <FaqSection />
      <WhatsappCta />
    </Layout>
  );
};

export default Index;
