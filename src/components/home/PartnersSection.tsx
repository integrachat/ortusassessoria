import { motion } from "framer-motion";
import { usePartners } from "@/hooks/usePartners";

const PartnersSection = () => {
  const { data: partners, isLoading } = usePartners();

  if (isLoading || !partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-6">Parceiros</span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              Conheça nossos parceiros
            </h2>
            
            <h3 className="text-xl font-semibold text-heading/80 mb-6">
              Empresas e pessoas que acreditam em nossos valores
            </h3>
            
            <p className="text-body-text leading-relaxed">
              Reunimos aqui alguns de nossos parceiros que acreditam e confiam em nossos serviços.
            </p>
          </motion.div>

          {/* Partner logos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {partners.map((partner, index) => (
              <motion.a
                key={partner.id}
                href={partner.website_url || "#"}
                target={partner.website_url ? "_blank" : undefined}
                rel={partner.website_url ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-32 h-20 bg-muted rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all overflow-hidden p-2"
              >
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-foreground/30 font-medium text-sm text-center">
                    {partner.name}
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
