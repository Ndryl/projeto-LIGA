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
import { EspecialidadeProps } from "../../../types/convenio";
import { toast } from "sonner";
import { useEspecialidade } from "@/app/context/especialidade";

interface DialogComponentProps {
  Especialidade: EspecialidadeProps;
}

export function DialogComponentEsp({ Especialidade }: DialogComponentProps) {
  const { especialidade, setespecialidade } = useEspecialidade();
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNome(Especialidade.nome || "");
  }, [Especialidade]);

  const handleSave = () => {
    const updatedEspecialidades = especialidade.map((c) =>
      c.id === Especialidade.id ? { ...c, nome } : c
    );
    setespecialidade(updatedEspecialidades);
    toast.success("Especialidade atualizada com sucesso!");
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
          <DialogTitle>Editar Especialidade</DialogTitle>
          <DialogDescription>
            Edite os dados da especialidade. Clique em salvar ao finalizar.
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
