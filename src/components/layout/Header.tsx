import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { data: config } = useSiteConfig();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/institucional", label: "Institucional" },
    { href: "/servicos", label: "Serviços" },
    { href: "/noticias", label: "Informativo" },
    { href: "/contato", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${config?.phone || ""}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={14} />
              <span className="hidden sm:inline">{config?.phone || "(00) 0000-0000"}</span>
            </a>
            <a href={`mailto:${config?.email || ""}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={14} />
              <span className="hidden sm:inline">{config?.email || "contato@empresa.com"}</span>
            </a>
          </div>
          <Link to="/admin" className="hover:opacity-80 transition-opacity">
            Área do Cliente
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-background sticky top-0 z-50 border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">EC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-heading">
                  {config?.company_name || "Escritório Contábil"}
                </h1>
                <p className="text-xs text-muted-foreground">Contabilidade Digital</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/abrir-empresa">Abrir empresa</Link>
              </Button>
              <Button className="btn-primary" asChild>
                <Link to="/trocar-de-contador">Trocar de contador</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border"
            >
              <nav className="container-custom py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/abrir-empresa">Abrir empresa</Link>
                  </Button>
                  <Button className="btn-primary w-full" asChild>
                    <Link to="/trocar-de-contador">Trocar de contador</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
