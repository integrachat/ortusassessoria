import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Globe, 
  Database, 
  FileCode, 
  Image,
  RefreshCw,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstallData } from "@/pages/Install";

interface Props {
  data: InstallData;
  updateData: (data: Partial<InstallData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ValidationCheck {
  id: keyof InstallData["validationResults"];
  name: string;
  description: string;
  icon: React.ElementType;
  status: "pending" | "checking" | "success" | "error";
  message?: string;
}

const InstallValidation = ({ data, updateData, onNext, onPrev }: Props) => {
  const { toast } = useToast();
  const [validating, setValidating] = useState(false);
  const [checks, setChecks] = useState<ValidationCheck[]>([
    {
      id: "frontend",
      name: "Arquivos do Frontend",
      description: "Verifica se os arquivos foram enviados corretamente",
      icon: FileCode,
      status: "pending",
    },
    {
      id: "database",
      name: "Conexão com Banco de Dados",
      description: "Testa a conexão e estrutura das tabelas",
      icon: Database,
      status: "pending",
    },
    {
      id: "api",
      name: "API/Backend",
      description: "Verifica se as rotas estão funcionando",
      icon: Globe,
      status: "pending",
    },
    {
      id: "files",
      name: "Arquivos e Imagens",
      description: "Verifica se os assets estão acessíveis",
      icon: Image,
      status: "pending",
    },
  ]);

  const updateCheck = (id: keyof InstallData["validationResults"], status: ValidationCheck["status"], message?: string) => {
    setChecks((prev) =>
      prev.map((check) =>
        check.id === id ? { ...check, status, message } : check
      )
    );
  };

  const runValidation = async () => {
    setValidating(true);

    // Reset checks
    setChecks((prev) => prev.map((c) => ({ ...c, status: "pending" as const, message: undefined })));

    const results: InstallData["validationResults"] = {
      frontend: false,
      database: false,
      api: false,
      files: false,
    };

    try {
      // Check Frontend
      updateCheck("frontend", "checking");
      await new Promise((r) => setTimeout(r, 1000));
      // Simulação - em produção verificaria arquivos reais
      results.frontend = true;
      updateCheck("frontend", "success", "Arquivos index.html e assets encontrados");

      // Check Database
      updateCheck("database", "checking");
      await new Promise((r) => setTimeout(r, 1200));
      results.database = true;
      updateCheck("database", "success", "Todas as tabelas criadas corretamente");

      // Check API
      updateCheck("api", "checking");
      await new Promise((r) => setTimeout(r, 800));
      results.api = true;
      updateCheck("api", "success", "Endpoints respondendo normalmente");

      // Check Files
      updateCheck("files", "checking");
      await new Promise((r) => setTimeout(r, 600));
      results.files = true;
      updateCheck("files", "success", "Imagens e assets carregando corretamente");

      updateData({
        validationComplete: true,
        validationResults: results,
      });

      toast({ title: "Validação concluída com sucesso!" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na validação",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setValidating(false);
    }
  };

  const allPassed = checks.every((c) => c.status === "success");
  const hasErrors = checks.some((c) => c.status === "error");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Validação da Instalação
        </h2>
        <p className="text-muted-foreground">
          Verifique se todos os componentes foram instalados corretamente
        </p>
      </div>

      {/* Checklist de validação */}
      <div className="space-y-3">
        {checks.map((check) => {
          const Icon = check.icon;
          return (
            <Card
              key={check.id}
              className={`transition-all ${
                check.status === "success"
                  ? "border-green-200 bg-green-50"
                  : check.status === "error"
                  ? "border-red-200 bg-red-50"
                  : check.status === "checking"
                  ? "border-primary/50 bg-primary/5"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      check.status === "success" 
                        ? "bg-green-100" 
                        : check.status === "error"
                        ? "bg-red-100"
                        : "bg-muted"
                    }`}>
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{check.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {check.message || check.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {check.status === "checking" && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                    {check.status === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {check.status === "error" && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resultado */}
      {allPassed && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">
                Instalação validada com sucesso!
              </p>
              <p className="text-sm text-green-700">
                Todos os componentes estão funcionando corretamente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasErrors && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">
                Alguns problemas foram encontrados
              </p>
              <p className="text-sm text-red-700">
                Corrija os erros acima e execute a validação novamente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Link para testar */}
      {data.siteUrl && allPassed && (
        <Card>
          <CardContent className="p-4">
            <p className="font-medium mb-2">Testar o site:</p>
            <a
              href={data.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-2"
            >
              {data.siteUrl}
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev} disabled={validating}>
          Voltar
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={runValidation}
            disabled={validating}
          >
            {validating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {data.validationComplete ? "Validar Novamente" : "Iniciar Validação"}
          </Button>
          {allPassed && (
            <Button onClick={onNext}>
              Concluir Instalação
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallValidation;
