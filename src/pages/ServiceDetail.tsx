import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsappCta from "@/components/home/WhatsappCta";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl font-bold text-heading mb-4">
            Serviço não encontrado
          </h1>
          <p className="text-body-text mb-8">
            O serviço que você procura não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/servicos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ver todos os serviços
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Ver todos os serviços
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-body-text">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {service.content ? (
              <div className="prose prose-lg max-w-none text-body-text">
                {service.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-body-text mb-6">
                  Entre em contato conosco para saber mais sobre este serviço.
                </p>
                <Button className="btn-primary" asChild>
                  <Link to="/contato">Entrar em contato</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <WhatsappCta />
    </Layout>
  );
};

export default ServiceDetail;
