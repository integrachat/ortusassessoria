import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, RefreshCw, ArrowRight, Briefcase, Users } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const FeaturesSection = () => {
  const { data: sections } = useHomeSections();
  const features = sections?.features;

  const cards = [
    {
      title: "ABRA SUA EMPRESA",
      description: "Nosso time de especialistas dará todo direcionamento para você iniciar seu novo negócio de forma alinhada.",
      link: "/abrir-empresa",
      linkText: "ABRIR MINHA EMPRESA",
      icon: Building2,
      color: "bg-primary",
    },
    {
      title: "TRANSFORME SEU MEI",
      description: "Analisaremos a situação do seu MEI e apresentaremos um cenário de acordo com a sua situação.",
      link: "/servicos",
      linkText: "TRANSFORMAR MEU MEI",
      icon: Users,
      color: "bg-accent",
    },
    {
      title: "TROQUE DE CONTADOR",
      description: "Faremos toda a parte burocrática de migração. O processo será simples e tranquilo para você.",
      link: "/trocar-de-contador",
      linkText: "MIGRAR AGORA",
      icon: RefreshCw,
      color: "bg-primary",
    },
    {
      title: "ASSESSORIA COMPLETA",
      description: "Com nossa assessoria, você terá economia e segurança ao ter a sua empresa cuidada por especialistas.",
      link: "/servicos",
      linkText: "SAIBA MAIS",
      icon: Briefcase,
      color: "bg-accent",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">
            {features?.title || "O que faremos por você"}
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            {features?.subtitle || "Soluções completas para todas as necessidades da sua empresa."}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={card.link}
                  className="group block bg-card rounded-2xl p-6 card-shadow h-full border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-heading mb-3 font-heading group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-body-text text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    {card.linkText} <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
