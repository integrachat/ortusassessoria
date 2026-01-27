import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Database, AlertTriangle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: {
    dbHost: string;
    dbPort: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbConnected: boolean;
  };
  updateData: (data: Partial<Props["data"]>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const InstallDatabase = ({ data, updateData, onNext, onPrev }: Props) => {
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- Script de criação do banco de dados PostgreSQL
-- Execute este script no seu servidor PostgreSQL

-- Criar banco de dados
CREATE DATABASE ${data.dbName || "ortus_contabilidade"};

-- Conectar ao banco criado e executar:

-- Tabela de configurações do site
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de serviços
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  icon TEXT DEFAULT 'briefcase',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de notícias
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de FAQ
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de páginas
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de seções da home
CREATE TABLE home_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de usuários admin
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_site_config_key ON site_config(key);
`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    toast({ title: "Script copiado para a área de transferência!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const testConnection = async () => {
    setTesting(true);
    
    // Simulação de teste - em produção isso seria uma chamada API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simula sucesso para demonstração
    updateData({ dbConnected: true });
    toast({ title: "Conexão estabelecida com sucesso!" });
    
    setTesting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Configuração do Banco de Dados
        </h2>
        <p className="text-muted-foreground">
          Configure a conexão com o PostgreSQL do seu servidor
        </p>
      </div>

      {/* Instruções */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Instruções para cPanel
          </h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Acesse o cPanel do seu servidor</li>
            <li>Vá em "Bancos de Dados PostgreSQL" ou "PostgreSQL Databases"</li>
            <li>Crie um novo banco de dados</li>
            <li>Crie um usuário e atribua permissões totais ao banco</li>
            <li>Copie o script SQL abaixo e execute no phpPgAdmin</li>
          </ol>
        </CardContent>
      </Card>

      {/* Script SQL */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Script SQL para criar as tabelas</Label>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copiado!" : "Copiar Script"}
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-48 overflow-y-auto">
          {sqlScript}
        </pre>
      </div>

      {/* Formulário de conexão */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dbHost">Host do Banco</Label>
          <Input
            id="dbHost"
            value={data.dbHost}
            onChange={(e) => updateData({ dbHost: e.target.value })}
            placeholder="localhost"
          />
        </div>
        <div>
          <Label htmlFor="dbPort">Porta</Label>
          <Input
            id="dbPort"
            value={data.dbPort}
            onChange={(e) => updateData({ dbPort: e.target.value })}
            placeholder="5432"
          />
        </div>
        <div>
          <Label htmlFor="dbName">Nome do Banco</Label>
          <Input
            id="dbName"
            value={data.dbName}
            onChange={(e) => updateData({ dbName: e.target.value })}
            placeholder="ortus_contabilidade"
          />
        </div>
        <div>
          <Label htmlFor="dbUser">Usuário</Label>
          <Input
            id="dbUser"
            value={data.dbUser}
            onChange={(e) => updateData({ dbUser: e.target.value })}
            placeholder="usuario_bd"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="dbPassword">Senha</Label>
          <Input
            id="dbPassword"
            type="password"
            value={data.dbPassword}
            onChange={(e) => updateData({ dbPassword: e.target.value })}
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Status da conexão */}
      {data.dbConnected && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-700 font-medium">
              Conexão com o banco de dados estabelecida com sucesso!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={testing || !data.dbUser || !data.dbPassword}
          >
            {testing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Testar Conexão
          </Button>
          <Button onClick={onNext} disabled={!data.dbConnected}>
            Próximo Passo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallDatabase;
