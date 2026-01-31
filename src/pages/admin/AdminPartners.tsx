import { useState } from "react";
import {
  usePartners,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
} from "@/hooks/usePartners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface PartnerFormData {
  name: string;
  logo_url: string;
  website_url: string;
  order_index: number;
  is_active: boolean;
}

const AdminPartners = () => {
  const { toast } = useToast();
  const { data: partners, isLoading } = usePartners();
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PartnerFormData>({
    name: "",
    logo_url: "",
    website_url: "",
    order_index: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      logo_url: "",
      website_url: "",
      order_index: 0,
      is_active: true,
    });
    setEditingId(null);
  };

  const handleEdit = (partner: typeof partners extends (infer T)[] ? T : never) => {
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url || "",
      website_url: partner.website_url || "",
      order_index: partner.order_index || 0,
      is_active: partner.is_active ?? true,
    });
    setEditingId(partner.id);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePartner.mutateAsync({ id: editingId, ...formData });
        toast({ title: "Parceiro atualizado com sucesso!" });
      } else {
        await createPartner.mutateAsync(formData);
        toast({ title: "Parceiro criado com sucesso!" });
      }
      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: (error as Error).message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este parceiro?")) return;

    try {
      await deletePartner.mutateAsync(id);
      toast({ title: "Parceiro excluído com sucesso!" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: (error as Error).message,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Parceiros</h1>
          <p className="text-muted-foreground">
            Gerencie os parceiros exibidos no site
          </p>
        </div>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Novo Parceiro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Editar Parceiro" : "Novo Parceiro"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Parceiro *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <ImageUpload
                label="Logo do Parceiro"
                value={formData.logo_url}
                onChange={(url) => setFormData({ ...formData, logo_url: url })}
                folder="partners"
              />

              <div>
                <Label htmlFor="website_url">Link do Site</Label>
                <Input
                  id="website_url"
                  type="url"
                  placeholder="https://exemplo.com"
                  value={formData.website_url}
                  onChange={(e) =>
                    setFormData({ ...formData, website_url: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="order_index">Ordem de Exibição</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createPartner.isPending || updatePartner.isPending}
                >
                  {(createPartner.isPending || updatePartner.isPending) && (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  )}
                  {editingId ? "Salvar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Parceiros</CardTitle>
        </CardHeader>
        <CardContent>
          {partners && partners.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="h-10 w-auto object-contain"
                        />
                      ) : (
                        <div className="h-10 w-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                          Sem logo
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>
                      {partner.website_url ? (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visitar
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{partner.order_index}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          partner.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {partner.is_active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(partner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(partner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Nenhum parceiro cadastrado. Clique em "Novo Parceiro" para adicionar.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartners;
