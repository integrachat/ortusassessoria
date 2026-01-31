import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Loader2, 
  Database, 
  Copy, 
  Check, 
  Download,
  Info,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstallData } from "@/pages/Install";

interface Props {
  data: InstallData;
  updateData: (data: Partial<InstallData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const InstallDatabase = ({ data, updateData, onNext, onPrev }: Props) => {
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const sqlCreateTables = `-- ============================================
-- Script de Criação do Banco de Dados MySQL
-- Para: Hostinger
-- ============================================

-- Use este script no phpMyAdmin da Hostinger
-- Primeiro crie o banco de dados no painel hPanel

-- Tabela de configurações do site
CREATE TABLE IF NOT EXISTS site_config (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  \`key\` VARCHAR(255) NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content LONGTEXT,
  icon VARCHAR(100) DEFAULT 'briefcase',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS news (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de FAQ
CREATE TABLE IF NOT EXISTS faq (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de páginas
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de seções da home
CREATE TABLE IF NOT EXISTS home_sections (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  section_key VARCHAR(100) NOT NULL UNIQUE,
  content JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de parceiros
CREATE TABLE IF NOT EXISTS partners (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role ENUM('admin', 'editor') DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- FIM DO SCRIPT
-- ============================================
`;

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(id);
    toast({ title: "Copiado para a área de transferência!" });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const testConnection = async () => {
    setTesting(true);
    
    // Simulação - em produção, uma API PHP testaria a conexão
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    updateData({ dbConnected: true });
    toast({ title: "Configuração salva! Continue para o próximo passo." });
    
    setTesting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Configuração do Banco de Dados
        </h2>
        <p className="text-muted-foreground">
          Configure a conexão com o MySQL da Hostinger
        </p>
      </div>

      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instructions">Instruções</TabsTrigger>
          <TabsTrigger value="config">Configuração</TabsTrigger>
        </TabsList>

        <TabsContent value="instructions" className="space-y-4 mt-4">
          {/* Passo a passo Hostinger */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Passo a Passo - Hostinger hPanel
              </h3>
              <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                <li>Acesse o <strong>hPanel</strong> da Hostinger</li>
                <li>Vá em <strong>"Banco de Dados" → "Gerenciamento"</strong></li>
                <li>Clique em <strong>"Criar novo banco de dados"</strong></li>
                <li>Anote o <strong>nome do banco</strong>, <strong>usuário</strong> e <strong>senha</strong></li>
                <li>Clique em <strong>"Entrar no phpMyAdmin"</strong></li>
                <li>No phpMyAdmin, selecione seu banco e vá em <strong>"SQL"</strong></li>
                <li>Cole o script abaixo e clique em <strong>"Executar"</strong></li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Script SQL - Criar Tabelas
                </h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(sqlCreateTables, "sql")}
                  >
                    {copied === "sql" ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    Copiar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(sqlCreateTables, "hostinger_create_tables.sql")}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Baixar
                  </Button>
                </div>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto font-mono">
                {sqlCreateTables}
              </pre>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 flex gap-3">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Importante</p>
                <p className="text-sm text-amber-700">
                  O host do banco na Hostinger geralmente é <code className="bg-amber-100 px-1 rounded">localhost</code>. 
                  O nome do banco, usuário e senha são os que você criou no hPanel.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4 mt-4">
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
              <p className="text-xs text-muted-foreground mt-1">
                Geralmente "localhost" na Hostinger
              </p>
            </div>
            <div>
              <Label htmlFor="dbPort">Porta</Label>
              <Input
                id="dbPort"
                value={data.dbPort}
                onChange={(e) => updateData({ dbPort: e.target.value })}
                placeholder="3306"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Porta padrão MySQL: 3306
              </p>
            </div>
            <div>
              <Label htmlFor="dbName">Nome do Banco</Label>
              <Input
                id="dbName"
                value={data.dbName}
                onChange={(e) => updateData({ dbName: e.target.value })}
                placeholder="u123456789_site"
              />
            </div>
            <div>
              <Label htmlFor="dbUser">Usuário</Label>
              <Input
                id="dbUser"
                value={data.dbUser}
                onChange={(e) => updateData({ dbUser: e.target.value })}
                placeholder="u123456789_admin"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="dbPassword">Senha do Banco</Label>
              <Input
                id="dbPassword"
                type="password"
                value={data.dbPassword}
                onChange={(e) => updateData({ dbPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Status */}
          {data.dbConnected && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-700 font-medium">
                  Configuração salva! Você pode prosseguir.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

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
            Salvar Configuração
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
