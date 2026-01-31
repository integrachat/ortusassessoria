import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Server, 
  Database, 
  Globe, 
  HardDrive, 
  FileCode,
  Shield,
  Zap,
  Info
} from "lucide-react";

interface Requirement {
  id: string;
  name: string;
  description: string;
  required: string;
  icon: React.ElementType;
  category: "hosting" | "database" | "frontend";
  critical: boolean;
}

const requirements: Requirement[] = [
  // Hosting Requirements
  {
    id: "hosting",
    name: "Hospedagem Hostinger",
    description: "Plano com suporte a MySQL e FTP",
    required: "Ativo",
    icon: Server,
    category: "hosting",
    critical: true,
  },
  {
    id: "php",
    name: "PHP",
    description: "Versão mínima do PHP (se usar API)",
    required: "8.0+",
    icon: FileCode,
    category: "hosting",
    critical: false,
  },
  {
    id: "ssl",
    name: "Certificado SSL",
    description: "HTTPS para segurança",
    required: "Ativo",
    icon: Shield,
    category: "hosting",
    critical: true,
  },
  {
    id: "disk",
    name: "Espaço em Disco",
    description: "Espaço mínimo disponível",
    required: "100MB+",
    icon: HardDrive,
    category: "hosting",
    critical: true,
  },
  // Database Requirements
  {
    id: "mysql",
    name: "MySQL",
    description: "Banco de dados MySQL/MariaDB",
    required: "5.7+",
    icon: Database,
    category: "database",
    critical: true,
  },
  {
    id: "phpmyadmin",
    name: "phpMyAdmin",
    description: "Gerenciador de banco de dados",
    required: "Disponível",
    icon: Database,
    category: "database",
    critical: true,
  },
  // Frontend Requirements
  {
    id: "ftp",
    name: "Acesso FTP/SFTP",
    description: "Para upload de arquivos",
    required: "Habilitado",
    icon: Globe,
    category: "frontend",
    critical: true,
  },
  {
    id: "htaccess",
    name: "Suporte .htaccess",
    description: "Para configurar rotas SPA",
    required: "Habilitado",
    icon: FileCode,
    category: "frontend",
    critical: true,
  },
];

interface Props {
  onNext: () => void;
}

const InstallRequirements = ({ onNext }: Props) => {
  const [checked, setChecked] = useState(false);
  const [checkResults, setCheckResults] = useState<Record<string, boolean>>({});

  const handleCheck = () => {
    const results: Record<string, boolean> = {};
    requirements.forEach((req) => {
      results[req.id] = true;
    });
    setCheckResults(results);
    setChecked(true);
  };

  const allPassed = checked && Object.values(checkResults).every((v) => v);
  const criticalPassed = checked && requirements
    .filter(r => r.critical)
    .every(r => checkResults[r.id]);

  const groupedRequirements = {
    hosting: requirements.filter((r) => r.category === "hosting"),
    database: requirements.filter((r) => r.category === "database"),
    frontend: requirements.filter((r) => r.category === "frontend"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Requisitos do Sistema
        </h2>
        <p className="text-muted-foreground">
          Verifique se sua hospedagem Hostinger atende aos requisitos para instalação
        </p>
      </div>

      {/* Aviso Hostinger */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Sobre a Instalação na Hostinger</p>
            <p className="text-sm text-blue-700">
              Este instalador foi otimizado para a Hostinger. Como o site é feito em React (frontend), 
              você precisará fazer o build e enviar os arquivos estáticos para o public_html. 
              O banco de dados MySQL será usado para armazenar os conteúdos do site.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Requisitos da Hospedagem */}
      <RequirementSection
        title="Hospedagem"
        icon={Server}
        requirements={groupedRequirements.hosting}
        checkResults={checkResults}
        checked={checked}
      />

      {/* Requisitos do Banco */}
      <RequirementSection
        title="Banco de Dados"
        icon={Database}
        requirements={groupedRequirements.database}
        checkResults={checkResults}
        checked={checked}
      />

      {/* Requisitos do Frontend */}
      <RequirementSection
        title="Frontend (Site)"
        icon={Globe}
        requirements={groupedRequirements.frontend}
        checkResults={checkResults}
        checked={checked}
      />

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleCheck}>
          <Zap className="h-4 w-4 mr-2" />
          {checked ? "Verificar Novamente" : "Verificar Requisitos"}
        </Button>
        <Button onClick={onNext} disabled={!criticalPassed}>
          Próximo Passo
        </Button>
      </div>

      {checked && !allPassed && criticalPassed && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              Alguns requisitos opcionais não foram atendidos, mas você pode prosseguir com a instalação.
            </p>
          </CardContent>
        </Card>
      )}

      {checked && !criticalPassed && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4 flex gap-3">
            <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">
              Requisitos críticos não foram atendidos. Corrija-os antes de continuar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface RequirementSectionProps {
  title: string;
  icon: React.ElementType;
  requirements: Requirement[];
  checkResults: Record<string, boolean>;
  checked: boolean;
}

const RequirementSection = ({ 
  title, 
  icon: Icon, 
  requirements, 
  checkResults, 
  checked 
}: RequirementSectionProps) => (
  <div>
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      {title}
    </h3>
    <div className="grid gap-2">
      {requirements.map((req) => (
        <RequirementItem
          key={req.id}
          requirement={req}
          status={checkResults[req.id]}
          checked={checked}
        />
      ))}
    </div>
  </div>
);

interface RequirementItemProps {
  requirement: Requirement;
  status?: boolean;
  checked: boolean;
}

const RequirementItem = ({ requirement, status, checked }: RequirementItemProps) => {
  const Icon = requirement.icon;

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
      checked && status 
        ? "bg-green-50 border border-green-200" 
        : checked && !status 
        ? "bg-red-50 border border-red-200"
        : "bg-muted/50"
    }`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium flex items-center gap-2">
            {requirement.name}
            {requirement.critical && (
              <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                Obrigatório
              </span>
            )}
          </p>
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
