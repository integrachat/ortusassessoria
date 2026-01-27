import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, RefreshCw, ArrowRight } from "lucide-react";
import { useHomeSections } from "@/hooks/useHomeSections";

const CtaSection = () => {
  const { data: sections } = useHomeSections();
  const cta = sections?.cta;

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-primary mb-4">
              {cta?.badge || "Venha para Escritório Contábil"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
              {cta?.title || "Escolha nosso escritório e dê adeus às preocupações com contabilidade."}
            </h2>
            <p className="text-body-text leading-relaxed mb-8">
              {cta?.description || "Traga já a sua empresa para o nosso escritório e você aproveitará todos os benefícios de uma boa contabilidade. Atenderemos todas as suas necessidades contábeis com muita agilidade, presteza e de forma econômica para sua empresa."}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to="/abrir-empresa"
                className="block bg-background p-6 rounded-2xl card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Building2 size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">
                  {cta?.card1_title || "Abrir Empresa"}
                </h3>
                <p className="text-body-text text-sm mb-4">
                  {cta?.card1_description || "Como abrir uma empresa? Passo a passo para tirar as ideias do papel"}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/trocar-de-contador"
                className="block bg-background p-6 rounded-2xl card-shadow hover:shadow-card-hover transition-all duration-300 group h-full"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <RefreshCw size={28} className="text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">
                  {cta?.card2_title || "Trocar de Contador"}
                </h3>
                <p className="text-body-text text-sm mb-4">
                  {cta?.card2_description || "Conosco você aproveitará todos os benefícios do melhor escritório de contabilidade."}
                </p>
                <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                  Saiba mais <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
