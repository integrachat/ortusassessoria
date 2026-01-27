import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNews } from "@/hooks/useNews";
import { useServices } from "@/hooks/useServices";
import { useFaq } from "@/hooks/useFaq";
import { Newspaper, Briefcase, HelpCircle, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { data: news } = useNews();
  const { data: services } = useServices();
  const { data: faqs } = useFaq();

  const stats = [
    {
      title: "Notícias",
      value: news?.length || 0,
      icon: Newspaper,
      color: "bg-blue-500",
    },
    {
      title: "Serviços",
      value: services?.length || 0,
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      title: "FAQs",
      value: faqs?.length || 0,
      icon: HelpCircle,
      color: "bg-amber-500",
    },
    {
      title: "Páginas",
      value: 4,
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-heading mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-heading">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use o menu lateral para gerenciar o conteúdo do seu site. Você pode:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Editar as configurações gerais do site</li>
              <li>• Gerenciar serviços oferecidos</li>
              <li>• Publicar e editar notícias</li>
              <li>• Atualizar perguntas frequentes (FAQ)</li>
              <li>• Editar páginas internas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
