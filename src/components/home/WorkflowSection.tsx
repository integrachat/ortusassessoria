import { motion } from "framer-motion";
import { FileText, Send, CheckCircle2, Headphones, LucideIcon } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Send,
  CheckCircle2,
  Headphones,
};

const WorkflowSection = () => {
  const { data: sections } = useHomeSections();
  const workflow = sections?.workflow;

  const steps = workflow?.steps || [
    {
      icon: "FileText",
      number: "01",
      title: "Análise",
      description: "Analisamos sua situação atual e identificamos as melhores soluções para seu negócio.",
    },
    {
      icon: "Send",
      number: "02",
      title: "Proposta",
      description: "Enviamos uma proposta personalizada com todos os serviços necessários.",
    },
    {
      icon: "CheckCircle2",
      number: "03",
      title: "Execução",
      description: "Executamos todos os processos de forma ágil e eficiente.",
    },
    {
      icon: "Headphones",
      number: "04",
      title: "Suporte",
      description: "Oferecemos suporte contínuo para todas as suas necessidades.",
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
          <span className="badge-primary mb-4">
            {workflow?.badge || "Passo a passo"}
          </span>
          <h2 className="section-title">
            {workflow?.title || "Conheça o fluxo de trabalho e da otimização"}
          </h2>
          <p className="section-subtitle mx-auto">
            {workflow?.subtitle || "Comece agora mesmo! Veja como é simples trabalhar com nossa equipe."}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] || FileText;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
                )}
                
                <div className="text-center relative">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                      <Icon size={36} className="text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-2">{step.title}</h3>
                  <p className="text-body-text text-sm">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
