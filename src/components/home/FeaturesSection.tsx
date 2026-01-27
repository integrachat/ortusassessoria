import { motion } from "framer-motion";
import { Check, User, LucideIcon } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const iconMap: Record<string, LucideIcon> = {
  Check,
  User,
  Sparkles: Check,
  Zap: Check,
  Shield: User,
};

const FeaturesSection = () => {
  const { data: sections } = useHomeSections();
  const features = sections?.features;

  const items = features?.items || [
    {
      icon: "Check",
      title: "Com Simplicidade",
      description: "Com dinamismo e praticidade, fazemos todo o trabalho duro por você de forma simples, rápida e interativa.",
    },
    {
      icon: "User",
      title: "Mais Praticidade",
      description: "Somos um Escritório de Contabilidade com profissionais capacitados para facilitar sua vida e de sua empresa.",
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
          >
            <h2 className="text-2xl md:text-3xl font-bold text-heading leading-tight">
              {features?.title || "Contabilidade digital completa e pensada para sua empresa."}
            </h2>
            <p className="text-body-text mt-4 text-sm leading-relaxed">
              {features?.subtitle || "Temos uma equipe totalmente dedicada a contabilidade da sua empresa que trabalha com rapidez e agilidade."}
            </p>
          </motion.div>

          {/* Feature cards */}
          {items.slice(0, 2).map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className="bg-card rounded-3xl p-8 card-shadow"
              >
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-3">{feature.title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
