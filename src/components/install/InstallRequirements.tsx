import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Server, Database, Globe, HardDrive, Cpu, MemoryStick } from "lucide-react";

interface Requirement {
  id: string;
  name: string;
  description: string;
  required: string;
  icon: React.ElementType;
  category: "server" | "database" | "php";
}

const requirements: Requirement[] = [
  {
    id: "php",
    name: "PHP",
    description: "Versão mínima do PHP necessária",
    required: "8.1+",
    icon: Server,
    category: "server",
  },
  {
    id: "pgsql",
    name: "PostgreSQL",
    description: "Banco de dados PostgreSQL",
    required: "14+",
    icon: Database,
    category: "database",
  },
  {
    id: "pdo",
    name: "PDO PostgreSQL",
    description: "Extensão PDO para PostgreSQL",
    required: "Habilitado",
    icon: Database,
    category: "php",
  },
  {
    id: "curl",
    name: "cURL",
    description: "Extensão para requisições HTTP",
    required: "Habilitado",
    icon: Globe,
    category: "php",
  },
  {
    id: "json",
    name: "JSON",
    description: "Extensão para manipulação de JSON",
    required: "Habilitado",
    icon: Server,
    category: "php",
  },
  {
    id: "mbstring",
    name: "Multibyte String",
    description: "Suporte a caracteres multibyte",
    required: "Habilitado",
    icon: Server,
    category: "php",
  },
  {
    id: "disk",
    name: "Espaço em Disco",
    description: "Espaço mínimo disponível",
    required: "500MB+",
    icon: HardDrive,
    category: "server",
  },
  {
    id: "memory",
    name: "Memória PHP",
    description: "memory_limit recomendado",
    required: "256MB+",
    icon: MemoryStick,
    category: "php",
  },
];

interface Props {
  onNext: () => void;
}

const InstallRequirements = ({ onNext }: Props) => {
  const [checked, setChecked] = useState(false);
  const [checkResults, setCheckResults] = useState<Record<string, boolean>>({});

  const handleCheck = () => {
    // Simulação de verificação - em produção isso seria feito via API
    const results: Record<string, boolean> = {};
    requirements.forEach((req) => {
      // Simula que todos passaram para demonstração
      results[req.id] = true;
    });
    setCheckResults(results);
    setChecked(true);
  };

  const allPassed = checked && Object.values(checkResults).every((v) => v);

  const groupedRequirements = {
    server: requirements.filter((r) => r.category === "server"),
    database: requirements.filter((r) => r.category === "database"),
    php: requirements.filter((r) => r.category === "php"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Requisitos do Sistema
        </h2>
        <p className="text-muted-foreground">
          Verifique se seu servidor atende aos requisitos mínimos para instalação
        </p>
      </div>

      {/* Aviso importante */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Importante</p>
            <p className="text-sm text-amber-700">
              Certifique-se de que seu servidor cPanel possui suporte a PostgreSQL. 
              Alguns planos de hospedagem compartilhada podem ter apenas MySQL disponível.
              Verifique com seu provedor antes de prosseguir.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Requisitos do Servidor */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          Servidor
        </h3>
        <div className="grid gap-3">
          {groupedRequirements.server.map((req) => (
            <RequirementItem
              key={req.id}
              requirement={req}
              status={checkResults[req.id]}
              checked={checked}
            />
          ))}
        </div>
      </div>

      {/* Requisitos do Banco */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Banco de Dados
        </h3>
        <div className="grid gap-3">
          {groupedRequirements.database.map((req) => (
            <RequirementItem
              key={req.id}
              requirement={req}
              status={checkResults[req.id]}
              checked={checked}
            />
          ))}
        </div>
      </div>

      {/* Extensões PHP */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          Extensões PHP
        </h3>
        <div className="grid gap-3">
          {groupedRequirements.php.map((req) => (
            <RequirementItem
              key={req.id}
              requirement={req}
              status={checkResults[req.id]}
              checked={checked}
            />
          ))}
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleCheck}>
          {checked ? "Verificar Novamente" : "Verificar Requisitos"}
        </Button>
        <Button onClick={onNext} disabled={!allPassed}>
          Próximo Passo
        </Button>
      </div>

      {checked && !allPassed && (
        <p className="text-sm text-destructive">
          Alguns requisitos não foram atendidos. Corrija-os antes de continuar.
        </p>
      )}
    </div>
  );
};

interface RequirementItemProps {
  requirement: Requirement;
  status?: boolean;
  checked: boolean;
}

const RequirementItem = ({ requirement, status, checked }: RequirementItemProps) => {
  const Icon = requirement.icon;

  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">{requirement.name}</p>
          <p className="text-sm text-muted-foreground">{requirement.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {requirement.required}
        </span>
        {checked && (
          status ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )
        )}
      </div>
    </div>
  );
};

export default InstallRequirements;
