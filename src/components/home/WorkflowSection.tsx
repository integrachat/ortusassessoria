import { motion } from "framer-motion";
import { useHomeSections } from "@/hooks/useHomeSections";
import { ClipboardCheck, Headphones, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const WorkflowSection = () => {
  const { data: sections } = useHomeSections();
  const { data: config } = useSiteConfig();
  const workflow = sections?.workflow;
  const whatsappNumber = config?.whatsapp || "5500900000000";

  const steps = [
    {
      number: "01",
      title: "ONBOARDING",
      subtitle: "Seja Bem-Vindo!",
      description: "Todo novo cliente passa por um processo de onboarding que inclui orientações iniciais e rotina mensal da sua empresa conosco.",
      icon: ClipboardCheck,
      label: "Primeiro Passo",
    },
    {
      number: "02",
      title: "SUPORTE",
      subtitle: "Atendimento!",
      description: "Sua empresa terá acesso ao nosso suporte rápido e prático dentro do horário comercial pelos canais online.",
      icon: Headphones,
      label: "Segundo Passo",
    },
    {
      number: "03",
      title: "SUCESSO DO CLIENTE",
      subtitle: "Sua experiência",
      description: "Nosso time de sucesso do cliente vai constantemente avaliar seu atendimento e satisfação para garantir a melhor experiência.",
      icon: Star,
      label: "Terceiro Passo",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {workflow?.title || "Como será a sua Jornada"}
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Conheça nosso passo a passo para cuidar da sua empresa.
          </p>
        </motion.div>

        {/* Timeline steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-8 card-shadow border border-border/50 text-center h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-xs">{step.number}</span>
                  </div>

                  <div className="w-16 h-16 mx-auto mb-5 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon size={28} className="text-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-1 font-heading">{step.title}</h3>
                  <h4 className="text-base font-semibold text-heading mb-3">{step.subtitle}</h4>
                  <p className="text-body-text text-sm leading-relaxed">{step.description}</p>

                  <div className="mt-5 pt-4 border-t border-border">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{step.label}</span>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button className="btn-primary h-13 px-8 gap-2 text-base shadow-lg" asChild>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a jornada.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              Chamar no WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowSection;
