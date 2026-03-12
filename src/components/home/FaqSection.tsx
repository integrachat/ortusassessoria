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
import { Link } from "react-router-dom";

const FaqSection = () => {
  const { data: faqs, isLoading } = useFaq();
  const { data: config } = useSiteConfig();
  const whatsappNumber = config?.whatsapp || "5500900000000";

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Dúvidas Frequentes</h2>
          <p className="section-subtitle mx-auto mt-4">
            Clique em sua principal dúvida
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="btn-outline h-12 px-6" asChild>
              <Link to="/trocar-de-contador">Migre sua empresa</Link>
            </Button>
            <Button className="btn-primary h-12 px-6" asChild>
              <Link to="/abrir-empresa">Abra sua empresa</Link>
            </Button>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
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
                  <AccordionTrigger className="px-6 py-5 hover:no-underline text-left font-semibold text-heading text-base font-heading">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-body-text text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* CTA */}
          <div className="text-center mt-10">
            <Button className="btn-primary h-13 px-8 gap-2 text-base shadow-lg" asChild>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, tenho uma dúvida!")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
