import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";

const ContactPage = () => {
  const { data: config } = useSiteConfig();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: config?.phone || "(00) 0000-0000",
      href: `tel:${config?.phone || ""}`,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: config?.email || "contato@empresa.com",
      href: `mailto:${config?.email || ""}`,
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: config?.address || "Rua Exemplo, 123 - Centro",
      href: "#",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="badge-primary mb-4">Contato</span>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-body-text max-w-2xl mx-auto">
              Estamos prontos para atender você. Entre em contato conosco por um dos canais abaixo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-heading mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-surface rounded-xl hover:bg-surface-hover transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-heading">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white gap-2 h-14"
                asChild
              >
                <a
                  href={`https://wa.me/${config?.whatsapp || "5500900000000"}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  Chamar no WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-background p-8 rounded-2xl card-shadow">
                <h2 className="text-2xl font-bold text-heading mb-6">
                  Envie uma Mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary h-12 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
