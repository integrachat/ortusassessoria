import { motion } from "framer-motion";
import { usePartners } from "@/hooks/usePartners";

const PartnersSection = () => {
  const { data: partners, isLoading } = usePartners();

  if (isLoading || !partners || partners.length === 0) {
    return null;
  }

  // Duplicate for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-surface overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-heading font-heading">
            Conheça alguns dos nossos clientes
          </h2>
        </motion.div>
      </div>

      {/* Marquee scroll */}
      <div className="relative">
        <div className="flex animate-marquee">
          {duplicatedPartners.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.website_url || "#"}
              target={partner.website_url ? "_blank" : undefined}
              rel={partner.website_url ? "noopener noreferrer" : undefined}
              className="flex-shrink-0 mx-6 w-36 h-20 bg-card rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all overflow-hidden p-3 border border-border/50"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground font-medium text-sm text-center">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
