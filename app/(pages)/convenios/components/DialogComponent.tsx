"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";
import { ConvenioProps } from "../../../types/convenio";
import { useConvenio } from "../../../context/convenio";
import { toast } from "sonner";

interface DialogComponentProps {
  convenio: ConvenioProps;
}

export function DialogComponent({ convenio }: DialogComponentProps) {
  const { setConvenios, convenios } = useConvenio();
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNome(convenio.nome || "");
  }, [convenio]);

  const handleSave = () => {
    const updatedConvenios = convenios.map((c) =>
      c.id === convenio.id ? { ...c, nome } : c
    );
    setConvenios(updatedConvenios);
    toast.success("Convênio atualizado com sucesso!");
    setOpen(false); // fecha o dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Convênio</DialogTitle>
          <DialogDescription>
            Edite os dados do convênio. Clique em salvar ao finalizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Voltar
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
