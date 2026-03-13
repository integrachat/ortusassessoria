import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminConfig from "./pages/admin/AdminConfig";
import AdminServices from "./pages/admin/AdminServices";
import AdminNews from "./pages/admin/AdminNews";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminPages from "./pages/admin/AdminPages";
import AdminHome from "./pages/admin/AdminHome";
import AdminFooter from "./pages/admin/AdminFooter";
import AdminSeo from "./pages/admin/AdminSeo";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPartners from "./pages/admin/AdminPartners";
import NewsPage from "./pages/NewsPage";
import NewsDetail from "./pages/NewsDetail";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import PageDetail from "./pages/PageDetail";
import Install from "./pages/Install";
import SeoHead from "./components/layout/SeoHead";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <SeoHead />
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:slug" element={<NewsDetail />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/servicos/:slug" element={<ServiceDetail />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/institucional" element={<PageDetail />} />
          <Route path="/abrir-empresa" element={<PageDetail />} />
          <Route path="/trocar-de-contador" element={<PageDetail />} />
          <Route path="/:slug" element={<PageDetail />} />
          <Route path="/install" element={<Install />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="configuracoes" element={<AdminConfig />} />
            <Route path="rodape" element={<AdminFooter />} />
            <Route path="seo" element={<AdminSeo />} />
            <Route path="servicos" element={<AdminServices />} />
            <Route path="parceiros" element={<AdminPartners />} />
            <Route path="noticias" element={<AdminNews />} />
            <Route path="faq" element={<AdminFaq />} />
            <Route path="paginas" element={<AdminPages />} />
            <Route path="usuarios" element={<AdminUsers />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
