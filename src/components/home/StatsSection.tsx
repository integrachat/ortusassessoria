import { motion } from "framer-motion";
import { useHomeSections } from "@/hooks/useHomeSections";

const StatsSection = () => {
  const { data: sections } = useHomeSections();

  const stats = [
    { value: "97%", label: "Comentários Positivos" },
    { value: "+500", label: "Suportes Solucionados" },
    { value: "+100", label: "Clientes Satisfeitos" },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground font-heading mb-2">
                {stat.value}
              </h3>
              <p className="text-primary-foreground/70 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
