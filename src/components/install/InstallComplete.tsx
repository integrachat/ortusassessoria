import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ExternalLink, FileText, Download, AlertTriangle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: {
    siteUrl: string;
    adminEmail: string;
  };
}

const InstallComplete = ({ data }: Props) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const envContent = `# Configurações do Site
SITE_URL=${data.siteUrl || "https://seudominio.com.br"}

# Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ortus_contabilidade
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# Admin
ADMIN_EMAIL=${data.adminEmail || "admin@seudominio.com.br"}

# Segurança (gere uma chave única)
APP_SECRET_KEY=gere_uma_chave_secreta_aqui_32_caracteres
JWT_SECRET=gere_outra_chave_secreta_para_jwt
`;

  const htaccessContent = `# Configurações do Apache para React SPA
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Se o arquivo ou diretório existir, servir diretamente
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Redirecionar todas as requisições para index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache de arquivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Segurança
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
`;

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(id);
    toast({ title: "Copiado para a área de transferência!" });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          Instalação Preparada!
        </h2>
        <p className="text-muted-foreground">
          Siga os passos finais abaixo para completar a instalação no seu servidor
        </p>
      </div>

      {/* Checklist Final */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Checklist de Instalação
          </h3>
          <ol className="space-y-3 list-decimal list-inside text-sm">
            <li className="p-2 bg-muted/50 rounded">
              Faça o build do projeto React: <code className="bg-muted px-1 rounded">npm run build</code>
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Envie a pasta <code className="bg-muted px-1 rounded">dist/</code> para a pasta public_html do cPanel via FTP ou Gerenciador de Arquivos
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Crie o arquivo <code className="bg-muted px-1 rounded">.htaccess</code> na raiz do public_html (veja abaixo)
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Configure o arquivo <code className="bg-muted px-1 rounded">.env</code> com as credenciais do banco
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Execute o script SQL de criação das tabelas no PostgreSQL
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Execute o script SQL de migração dos dados
            </li>
            <li className="p-2 bg-muted/50 rounded">
              Acesse o site e teste o painel administrativo
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Arquivo .env */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              Arquivo .env (configurações)
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(envContent, "env")}
              >
                {copied === "env" ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(envContent, ".env.example")}
              >
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
            {envContent}
          </pre>
        </CardContent>
      </Card>

      {/* Arquivo .htaccess */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              Arquivo .htaccess (Apache)
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(htaccessContent, "htaccess")}
              >
                {copied === "htaccess" ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(htaccessContent, ".htaccess")}
              >
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-48 overflow-y-auto">
            {htaccessContent}
          </pre>
        </CardContent>
      </Card>

      {/* Aviso Importante */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Importante</p>
            <p className="text-sm text-amber-700">
              Este site foi desenvolvido com React + Vite e usa o Lovable Cloud como backend. 
              Para uma instalação completa em servidor próprio com backend local, você precisará 
              criar uma API PHP/Node.js para substituir as chamadas ao Supabase. 
              Entre em contato com um desenvolvedor para essa adaptação.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações Finais */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Voltar ao Site
        </Button>
        <Button onClick={() => window.location.href = "/admin"}>
          Acessar Admin
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default InstallComplete;
