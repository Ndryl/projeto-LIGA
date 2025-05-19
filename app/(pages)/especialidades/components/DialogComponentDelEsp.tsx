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
import { EspecialidadeProps } from "../../../types/convenio";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useEspecialidade } from "@/app/context/especialidade";

interface DialogComponentProps {
  Especialidade: EspecialidadeProps;
}

export function DialogComponentDelEsp({ Especialidade }: DialogComponentProps) {
  const { especialidade, setespecialidade } = useEspecialidade();
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNome(Especialidade.nome || "");
  }, [Especialidade]);

  const handleDelete = () => {
    const updatedEspecialidades = especialidade.filter(
      (c) => c.id !== Especialidade.id
    );
    setespecialidade(updatedEspecialidades);
    toast.success("Especialidade deletada com sucesso!");
    setOpen(false); // fecha o dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir especialidade</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar esta especialidade?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input id="nome" value={nome} className="col-span-3" disabled />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Voltar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
