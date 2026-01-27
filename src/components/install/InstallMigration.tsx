import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Loader2, Database, FileText, Settings, Image, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  data: {
    migrationComplete: boolean;
  };
  updateData: (data: Partial<Props["data"]>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface MigrationStep {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "pending" | "running" | "complete";
}

const InstallMigration = ({ data, updateData, onNext, onPrev }: Props) => {
  const { toast } = useToast();
  const [migrating, setMigrating] = useState(false);
  const [steps, setSteps] = useState<MigrationStep[]>([
    { id: "config", name: "Configurações do site", icon: Settings, status: "pending" },
    { id: "services", name: "Serviços", icon: FileText, status: "pending" },
    { id: "news", name: "Notícias", icon: FileText, status: "pending" },
    { id: "faq", name: "Perguntas frequentes", icon: FileText, status: "pending" },
    { id: "pages", name: "Páginas institucionais", icon: FileText, status: "pending" },
    { id: "home", name: "Seções da home", icon: Image, status: "pending" },
  ]);
  const [exportData, setExportData] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const completedSteps = steps.filter((s) => s.status === "complete").length;
  const progress = (completedSteps / steps.length) * 100;

  const updateStep = (id: string, status: MigrationStep["status"]) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, status } : step))
    );
  };

  const exportAllData = async () => {
    setMigrating(true);
    
    try {
      // Buscar configurações do site
      updateStep("config", "running");
      const { data: siteConfig } = await supabase.from("site_config").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("config", "complete");

      // Buscar serviços
      updateStep("services", "running");
      const { data: services } = await supabase.from("services").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("services", "complete");

      // Buscar notícias
      updateStep("news", "running");
      const { data: news } = await supabase.from("news").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("news", "complete");

      // Buscar FAQ
      updateStep("faq", "running");
      const { data: faq } = await supabase.from("faq").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("faq", "complete");

      // Buscar páginas
      updateStep("pages", "running");
      const { data: pages } = await supabase.from("pages").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("pages", "complete");

      // Buscar seções da home
      updateStep("home", "running");
      const { data: homeSections } = await supabase.from("home_sections").select("*");
      await new Promise((r) => setTimeout(r, 500));
      updateStep("home", "complete");

      // Gerar script SQL de inserção
      const sqlScript = generateInsertSQL({
        site_config: siteConfig || [],
        services: services || [],
        news: news || [],
        faq: faq || [],
        pages: pages || [],
        home_sections: homeSections || [],
      });

      setExportData(sqlScript);
      updateData({ migrationComplete: true });
      toast({ title: "Dados exportados com sucesso!" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao exportar dados",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setMigrating(false);
    }
  };

  const generateInsertSQL = (data: Record<string, any[]>) => {
    let sql = "-- Script de migração de dados\n-- Execute após criar as tabelas\n\n";

    // Site Config
    if (data.site_config.length > 0) {
      sql += "-- Configurações do Site\n";
      data.site_config.forEach((item) => {
        sql += `INSERT INTO site_config (id, key, value, created_at, updated_at) VALUES ('${item.id}', '${item.key}', '${(item.value || "").replace(/'/g, "''")}', '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    // Services
    if (data.services.length > 0) {
      sql += "-- Serviços\n";
      data.services.forEach((item) => {
        sql += `INSERT INTO services (id, title, slug, description, content, icon, order_index, is_active, created_at, updated_at) VALUES ('${item.id}', '${(item.title || "").replace(/'/g, "''")}', '${item.slug}', '${(item.description || "").replace(/'/g, "''")}', '${(item.content || "").replace(/'/g, "''")}', '${item.icon || "briefcase"}', ${item.order_index || 0}, ${item.is_active}, '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    // News
    if (data.news.length > 0) {
      sql += "-- Notícias\n";
      data.news.forEach((item) => {
        sql += `INSERT INTO news (id, title, slug, excerpt, content, image_url, is_published, published_at, created_at, updated_at) VALUES ('${item.id}', '${(item.title || "").replace(/'/g, "''")}', '${item.slug}', '${(item.excerpt || "").replace(/'/g, "''")}', '${(item.content || "").replace(/'/g, "''")}', '${item.image_url || ""}', ${item.is_published}, '${item.published_at}', '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    // FAQ
    if (data.faq.length > 0) {
      sql += "-- FAQ\n";
      data.faq.forEach((item) => {
        sql += `INSERT INTO faq (id, question, answer, order_index, is_active, created_at, updated_at) VALUES ('${item.id}', '${(item.question || "").replace(/'/g, "''")}', '${(item.answer || "").replace(/'/g, "''")}', ${item.order_index || 0}, ${item.is_active}, '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    // Pages
    if (data.pages.length > 0) {
      sql += "-- Páginas\n";
      data.pages.forEach((item) => {
        sql += `INSERT INTO pages (id, title, slug, content, meta_description, is_published, created_at, updated_at) VALUES ('${item.id}', '${(item.title || "").replace(/'/g, "''")}', '${item.slug}', '${(item.content || "").replace(/'/g, "''")}', '${(item.meta_description || "").replace(/'/g, "''")}', ${item.is_published}, '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    // Home Sections
    if (data.home_sections.length > 0) {
      sql += "-- Seções da Home\n";
      data.home_sections.forEach((item) => {
        const contentJson = JSON.stringify(item.content).replace(/'/g, "''");
        sql += `INSERT INTO home_sections (id, section_key, content, created_at, updated_at) VALUES ('${item.id}', '${item.section_key}', '${contentJson}'::jsonb, '${item.created_at}', '${item.updated_at}');\n`;
      });
      sql += "\n";
    }

    return sql;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportData);
    setCopied(true);
    toast({ title: "Script copiado!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "migration_data.sql";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Migração de Dados
        </h2>
        <p className="text-muted-foreground">
          Exporte todos os conteúdos cadastrados para migrar ao novo servidor
        </p>
      </div>

      {/* Progress */}
      {migrating && (
        <div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            {completedSteps} de {steps.length} etapas concluídas
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.id}
              className={
                step.status === "complete"
                  ? "border-green-200 bg-green-50"
                  : step.status === "running"
                  ? "border-primary/50 bg-primary/5"
                  : ""
              }
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{step.name}</span>
                </div>
                {step.status === "running" && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {step.status === "complete" && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Export Result */}
      {exportData && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Script SQL de Migração</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copiar
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                Baixar .sql
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto">
            {exportData}
          </pre>
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev} disabled={migrating}>
          Voltar
        </Button>
        <div className="flex gap-3">
          {!data.migrationComplete && (
            <Button onClick={exportAllData} disabled={migrating}>
              {migrating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Exportar Dados
            </Button>
          )}
          {data.migrationComplete && (
            <Button onClick={onNext}>Concluir Instalação</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallMigration;
