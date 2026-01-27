import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFaq } from "@/hooks/useFaq";

const FaqSection = () => {
  const { data: faqs, isLoading } = useFaq();

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">Dúvidas Frequentes</span>
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-subtitle">
              Confira as principais dúvidas dos nossos clientes. Se ainda tiver alguma pergunta, entre em contato conosco.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-background p-4 rounded-xl animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {faqs?.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-background border-none rounded-xl overflow-hidden card-shadow"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-semibold text-heading">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-body-text">
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
