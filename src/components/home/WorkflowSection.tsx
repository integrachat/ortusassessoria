import { motion } from "framer-motion";
import { useHomeSections } from "@/hooks/useHomeSections";
import { Building2 } from "lucide-react";

const WorkflowSection = () => {
  const { data: sections } = useHomeSections();
  const workflow = sections?.workflow;

  const steps = workflow?.steps || [
    {
      number: "1",
      title: "Comece Agora",
      description: "Inicie o cadastro preenchendo nosso formulário",
      color: "bg-primary",
    },
    {
      number: "2",
      title: "Buscamos as informações",
      description: "Entraremos em contato e analisaremos qual a sua necessidade",
      color: "bg-coral",
    },
    {
      number: "3",
      title: "Apoio Total",
      description: "Nós fazemos a transferência contábil com o seu contador para você!",
      color: "bg-coral",
    },
    {
      number: "4",
      title: "Parceria",
      description: "Pronto! Sua empresa sempre em dia e com uma contabilidade completa.",
      color: "bg-coral",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-coral opacity-30 blur-3xl" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-[350px] mx-auto lg:mx-0">
              {/* Circular image */}
              <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto bg-muted flex items-center justify-center">
                {workflow?.image_url ? (
                  <img src={workflow.image_url} alt="Workflow" className="w-full h-full object-cover" />
                ) : (
                  <Building2 size={64} className="text-foreground/20" />
                )}
              </div>
              
              {/* Decorative circle */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coral rounded-full" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="badge-primary mb-6">Passo a passo</span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-10">
              {workflow?.title || "Conheça o fluxo de trabalho e da otimização"}
            </h2>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-8 h-8 ${index === 0 ? 'bg-primary' : 'bg-coral'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-heading mb-1">{step.title}</h4>
                    <p className="text-body-text text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
