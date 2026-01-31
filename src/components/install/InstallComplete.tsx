import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Download, 
  Copy, 
  Check,
  Rocket,
  Home,
  Settings,
  BookOpen,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstallData } from "@/pages/Install";

interface Props {
  data: InstallData;
}

const InstallComplete = ({ data }: Props) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const htaccessContent = `# Configurações do Apache para React SPA
# Coloque este arquivo na raiz do public_html

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
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Segurança
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Bloquear acesso a arquivos sensíveis
<FilesMatch "^\\.(htaccess|htpasswd|env|git|gitignore)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>
`;

  const configPhpContent = `<?php
// config.php - Configurações de conexão com o banco de dados
// Coloque este arquivo fora do public_html por segurança

define('DB_HOST', '${data.dbHost || "localhost"}');
define('DB_PORT', '${data.dbPort || "3306"}');
define('DB_NAME', '${data.dbName || "ortus_site"}');
define('DB_USER', '${data.dbUser || "seu_usuario"}');
define('DB_PASS', '${data.dbPassword ? "***SENHA_OCULTA***" : "sua_senha"}');

define('SITE_URL', '${data.siteUrl || "https://seudominio.com.br"}');
define('ADMIN_EMAIL', '${data.adminEmail || "admin@seudominio.com.br"}');

// Conexão PDO
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]
    );
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}
?>
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <Rocket className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-heading mb-2">
          🎉 Parabéns! Instalação Concluída!
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Seu site está pronto para ser publicado na Hostinger. 
          Siga o checklist abaixo para finalizar a publicação.
        </p>
      </div>

      {/* Checklist Final */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Checklist de Publicação na Hostinger
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, text: "Faça o build do projeto:", code: "npm run build" },
              { step: 2, text: "Acesse o hPanel da Hostinger" },
              { step: 3, text: "Vá em Gerenciador de Arquivos" },
              { step: 4, text: "Navegue até a pasta public_html" },
              { step: 5, text: "Envie todos os arquivos da pasta dist/" },
              { step: 6, text: "Crie o arquivo .htaccess (veja abaixo)" },
              { step: 7, text: "Execute o script SQL de criação das tabelas" },
              { step: 8, text: "Execute o script SQL de migração dos dados" },
              { step: 9, text: "Teste o site acessando seu domínio" },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <span>{item.text}</span>
                  {item.code && (
                    <code className="ml-2 bg-muted px-2 py-1 rounded text-sm">
                      {item.code}
                    </code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arquivo .htaccess */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Arquivo .htaccess
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
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-48 overflow-y-auto font-mono">
            {htaccessContent}
          </pre>
        </CardContent>
      </Card>

      {/* Config PHP (opcional) */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              config.php (para API backend)
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(configPhpContent, "config")}
              >
                {copied === "config" ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copiar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(configPhpContent, "config.php")}
              >
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-40 overflow-y-auto font-mono">
            {configPhpContent}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">
            * Use este arquivo se precisar criar uma API PHP para o site
          </p>
        </CardContent>
      </Card>

      {/* Links importantes */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Links Úteis
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a
              href="https://www.hostinger.com.br/tutoriais/como-acessar-hpanel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-muted transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-primary" />
              <span className="text-sm">Tutorial: Acessar hPanel</span>
            </a>
            <a
              href="https://www.hostinger.com.br/tutoriais/como-usar-gerenciador-de-arquivos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-muted transition-colors"
            >
              <Upload className="h-4 w-4 text-primary" />
              <span className="text-sm">Tutorial: Gerenciador de Arquivos</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Ações Finais */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Site
        </Button>
        {data.siteUrl && (
          <Button onClick={() => window.open(data.siteUrl, "_blank")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir Site Publicado
          </Button>
        )}
        <Button variant="secondary" onClick={() => window.location.href = "/admin"}>
          <Settings className="h-4 w-4 mr-2" />
          Acessar Admin
        </Button>
      </div>
    </div>
  );
};

export default InstallComplete;
