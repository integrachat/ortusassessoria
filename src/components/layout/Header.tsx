import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Moon, Settings } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { data: config } = useSiteConfig();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/institucional", label: "INSTITUCIONAL" },
    { href: "/servicos", label: "SERVIÇOS" },
    { href: "/noticias", label: "INFORMATIVO" },
    { href: "/contato", label: "CONTATO" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {config?.logo_url ? (
              <img
                src={config.logo_url}
                alt={config?.company_name || "Logo"}
                className="h-14 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 border-2 border-foreground rounded-lg flex items-center justify-center relative">
                  <span className="text-foreground font-bold text-xl">EC</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-heading tracking-tight">
                    ESCRITÓRIO
                  </h1>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    DE CONTABILIDADE
                  </p>
                </div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-semibold tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <Moon size={18} className="text-foreground" />
            </button>
            <Link 
              to="/admin"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Settings size={18} className="text-foreground" />
            </Link>
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
            className="lg:hidden bg-white border-t border-border"
          >
            <nav className="container-custom py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Link 
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3 px-4 rounded-lg text-sm font-medium text-center hover:bg-muted transition-colors"
                >
                  Área do Cliente
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
