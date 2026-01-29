import { motion } from "framer-motion";
import { Check, User, LucideIcon, Sparkles, Zap, Shield } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const iconMap: Record<string, LucideIcon> = {
  Check,
  User,
  Sparkles,
  Zap,
  Shield,
};

const FeaturesSection = () => {
  const { data: sections } = useHomeSections();
  const features = sections?.features;

  const items = features?.items?.length ? features.items : [
    {
      icon: "Check",
      title: "Visão Estratégica",
      description: "Transformamos obrigações em oportunidades de economia e potencializamos cada processo para gerar valor e inteligência para suas decisões.",
    },
    {
      icon: "User",
      title: "Tecnologia e Expertise",
      description: "Utilizamos ferramentas de ponta aliadas a um time multidisciplinar altamente especializado, garantindo eficiência e precisão.",
    },
    {
      icon: "Sparkles",
      title: "Atendimento Personalizado",
      description: "Cada cliente é único. Oferecemos soluções sob medida para atender às necessidades específicas do seu negócio.",
    },
  ];

  return (
    <section className="py-16 bg-background relative">
      {/* Decorative wave transition */}
      <div className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V20C240 40 480 50 720 35C960 20 1200 30 1440 20V60H0Z" className="fill-background"/>
        </svg>
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pr-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-heading leading-tight">
              {features?.title || "Contabilidade digital completa e pensada para sua empresa."}
            </h2>
            <p className="text-body-text mt-4 text-sm leading-relaxed">
              {features?.subtitle || "Temos uma equipe totalmente dedicada a contabilidade da sua empresa que trabalha com rapidez e agilidade."}
            </p>
          </motion.div>

          {/* Feature cards carousel */}
          <div className="lg:col-span-2">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {items.map((feature, index) => {
                  const Icon = iconMap[feature.icon] || Check;
                  return (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-card rounded-3xl p-8 card-shadow h-full"
                      >
                        <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-heading mb-3">{feature.title}</h3>
                        <p className="text-body-text text-sm leading-relaxed">{feature.description}</p>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
