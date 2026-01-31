import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Loader2, 
  Database, 
  FileText, 
  Settings, 
  Image, 
  Copy, 
  Check, 
  Download,
  Users,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InstallData } from "@/pages/Install";

interface Props {
  data: InstallData;
  updateData: (data: Partial<InstallData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface MigrationStep {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "pending" | "running" | "complete" | "error";
  count?: number;
}

const InstallMigration = ({ data, updateData, onNext, onPrev }: Props) => {
  const { toast } = useToast();
  const [migrating, setMigrating] = useState(false);
  const [steps, setSteps] = useState<MigrationStep[]>([
    { id: "config", name: "Configurações do site", icon: Settings, status: "pending" },
    { id: "services", name: "Serviços", icon: FileText, status: "pending" },
    { id: "news", name: "Notícias", icon: FileText, status: "pending" },
    { id: "faq", name: "Perguntas frequentes", icon: HelpCircle, status: "pending" },
    { id: "pages", name: "Páginas", icon: FileText, status: "pending" },
    { id: "partners", name: "Parceiros", icon: Users, status: "pending" },
    { id: "home", name: "Seções da home", icon: Image, status: "pending" },
  ]);
  const [exportData, setExportData] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const completedSteps = steps.filter((s) => s.status === "complete").length;
  const progress = (completedSteps / steps.length) * 100;

  const updateStep = (id: string, status: MigrationStep["status"], count?: number) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, status, count } : step))
    );
  };

  const escapeSQL = (str: string | null | undefined): string => {
    if (str === null || str === undefined) return "NULL";
    return `'${String(str).replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
  };

  const exportAllData = async () => {
    setMigrating(true);
    
    try {
      let sql = `-- ============================================
-- Script de Migração de Dados
-- Gerado em: ${new Date().toLocaleString("pt-BR")}
-- Para: MySQL na Hostinger
-- ============================================

-- IMPORTANTE: Execute este script APÓS criar as tabelas

`;

      // Buscar configurações do site
      updateStep("config", "running");
      const { data: siteConfig } = await supabase.from("site_config").select("*");
      if (siteConfig && siteConfig.length > 0) {
        sql += `-- Configurações do Site (${siteConfig.length} registros)\n`;
        sql += `DELETE FROM site_config WHERE 1=1;\n`;
        siteConfig.forEach((item) => {
          sql += `INSERT INTO site_config (id, \`key\`, value) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.key)}, ${escapeSQL(item.value)});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("config", "complete", siteConfig?.length || 0);

      // Buscar serviços
      updateStep("services", "running");
      const { data: services } = await supabase.from("services").select("*");
      if (services && services.length > 0) {
        sql += `-- Serviços (${services.length} registros)\n`;
        sql += `DELETE FROM services WHERE 1=1;\n`;
        services.forEach((item) => {
          sql += `INSERT INTO services (id, title, slug, description, content, icon, order_index, is_active) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.title)}, ${escapeSQL(item.slug)}, ${escapeSQL(item.description)}, ${escapeSQL(item.content)}, ${escapeSQL(item.icon)}, ${item.order_index || 0}, ${item.is_active ? 1 : 0});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("services", "complete", services?.length || 0);

      // Buscar notícias
      updateStep("news", "running");
      const { data: news } = await supabase.from("news").select("*");
      if (news && news.length > 0) {
        sql += `-- Notícias (${news.length} registros)\n`;
        sql += `DELETE FROM news WHERE 1=1;\n`;
        news.forEach((item) => {
          sql += `INSERT INTO news (id, title, slug, excerpt, content, image_url, is_published) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.title)}, ${escapeSQL(item.slug)}, ${escapeSQL(item.excerpt)}, ${escapeSQL(item.content)}, ${escapeSQL(item.image_url)}, ${item.is_published ? 1 : 0});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("news", "complete", news?.length || 0);

      // Buscar FAQ
      updateStep("faq", "running");
      const { data: faq } = await supabase.from("faq").select("*");
      if (faq && faq.length > 0) {
        sql += `-- FAQ (${faq.length} registros)\n`;
        sql += `DELETE FROM faq WHERE 1=1;\n`;
        faq.forEach((item) => {
          sql += `INSERT INTO faq (id, question, answer, order_index, is_active) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.question)}, ${escapeSQL(item.answer)}, ${item.order_index || 0}, ${item.is_active ? 1 : 0});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("faq", "complete", faq?.length || 0);

      // Buscar páginas
      updateStep("pages", "running");
      const { data: pages } = await supabase.from("pages").select("*");
      if (pages && pages.length > 0) {
        sql += `-- Páginas (${pages.length} registros)\n`;
        sql += `DELETE FROM pages WHERE 1=1;\n`;
        pages.forEach((item) => {
          sql += `INSERT INTO pages (id, title, slug, content, meta_description, is_published) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.title)}, ${escapeSQL(item.slug)}, ${escapeSQL(item.content)}, ${escapeSQL(item.meta_description)}, ${item.is_published ? 1 : 0});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("pages", "complete", pages?.length || 0);

      // Buscar parceiros
      updateStep("partners", "running");
      const { data: partners } = await supabase.from("partners").select("*");
      if (partners && partners.length > 0) {
        sql += `-- Parceiros (${partners.length} registros)\n`;
        sql += `DELETE FROM partners WHERE 1=1;\n`;
        partners.forEach((item) => {
          sql += `INSERT INTO partners (id, name, logo_url, website_url, order_index, is_active) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.name)}, ${escapeSQL(item.logo_url)}, ${escapeSQL(item.website_url)}, ${item.order_index || 0}, ${item.is_active ? 1 : 0});\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("partners", "complete", partners?.length || 0);

      // Buscar seções da home
      updateStep("home", "running");
      const { data: homeSections } = await supabase.from("home_sections").select("*");
      if (homeSections && homeSections.length > 0) {
        sql += `-- Seções da Home (${homeSections.length} registros)\n`;
        sql += `DELETE FROM home_sections WHERE 1=1;\n`;
        homeSections.forEach((item) => {
          const contentJson = JSON.stringify(item.content).replace(/'/g, "''");
          sql += `INSERT INTO home_sections (id, section_key, content) VALUES (${escapeSQL(item.id)}, ${escapeSQL(item.section_key)}, '${contentJson}');\n`;
        });
        sql += "\n";
      }
      await new Promise((r) => setTimeout(r, 300));
      updateStep("home", "complete", homeSections?.length || 0);

      sql += `-- ============================================
-- FIM DA MIGRAÇÃO
-- Total de registros migrados: ${
        (siteConfig?.length || 0) +
        (services?.length || 0) +
        (news?.length || 0) +
        (faq?.length || 0) +
        (pages?.length || 0) +
        (partners?.length || 0) +
        (homeSections?.length || 0)
      }
-- ============================================
`;

      setExportData(sql);
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
    a.download = "hostinger_migration_data.sql";
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
          Exporte todos os conteúdos para migrar ao servidor Hostinger
        </p>
      </div>

      {/* Progress */}
      {(migrating || data.migrationComplete) && (
        <div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            {completedSteps} de {steps.length} etapas concluídas
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.id}
              className={`transition-all ${
                step.status === "complete"
                  ? "border-green-200 bg-green-50"
                  : step.status === "running"
                  ? "border-primary/50 bg-primary/5"
                  : step.status === "error"
                  ? "border-red-200 bg-red-50"
                  : ""
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{step.name}</span>
                    {step.count !== undefined && step.status === "complete" && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({step.count} registros)
                      </span>
                    )}
                  </div>
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
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold flex items-center gap-2">
                <Database className="h-4 w-4" />
                Script SQL de Migração
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  Copiar
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Baixar .sql
                </Button>
              </div>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto font-mono">
              {exportData}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Instruções */}
      {data.migrationComplete && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Próximos Passos</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Baixe o script SQL de migração</li>
              <li>Acesse o phpMyAdmin da Hostinger</li>
              <li>Selecione seu banco de dados</li>
              <li>Vá na aba "SQL" e cole o script</li>
              <li>Clique em "Executar"</li>
            </ol>
          </CardContent>
        </Card>
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
            <Button onClick={onNext}>Próximo Passo</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallMigration;
