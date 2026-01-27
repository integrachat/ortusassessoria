import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, LucideIcon } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Shield,
};

const FeaturesSection = () => {
  const { data: sections } = useHomeSections();
  const features = sections?.features;

  const items = features?.items || [
    {
      icon: "Sparkles",
      title: "Com Simplicidade",
      description: "Com dinamismo e praticidade, fazemos todo o trabalho duro por você de forma simples, rápida e interativa.",
    },
    {
      icon: "Zap",
      title: "Mais Praticidade",
      description: "Somos um Escritório de Contabilidade com profissionais capacitados para facilitar sua vida e de sua empresa.",
    },
    {
      icon: "Shield",
      title: "Segurança Total",
      description: "Seus dados e informações são tratados com a máxima segurança e confidencialidade.",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {features?.title || "Contabilidade digital completa e pensada para sua empresa."}
          </h2>
          <p className="section-subtitle mx-auto">
            {features?.subtitle || "Temos uma equipe totalmente dedicada a contabilidade da sua empresa que trabalha com rapidez e agilidade."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon size={36} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-3">{feature.title}</h3>
                <p className="text-body-text leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
