import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFaq } from "@/hooks/useFaq";
import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const FaqSection = () => {
  const { data: faqs, isLoading } = useFaq();
  const { data: config } = useSiteConfig();
  const whatsappNumber = config?.whatsapp || "5500900000000";

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-6">Dúvidas</span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Como Funciona
            </h2>
            
            <h3 className="text-xl font-semibold text-heading/80 mb-6">
              Veja com funciona os processos do Escritório Contábil
            </h3>
            
            <p className="text-body-text mb-8 leading-relaxed">
              Reunimos abaixo as perguntas mais comuns que recebemos sobre abertura de empresas, documentos necessários e outras dúvidas legais. Confira para esclarecer suas dúvidas rapidamente!
            </p>

            <Button className="btn-primary h-12 px-6 gap-2" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, estou entrando em contato pelo site!")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Alguma dúvida? Fale conosco
              </a>
            </Button>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-muted/50 p-5 rounded-xl animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-3">
                {faqs?.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline text-left font-semibold text-heading text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-body-text text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
