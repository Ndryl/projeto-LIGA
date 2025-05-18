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
import { ConvenioProps } from "../../../types/convenio";
import { useConvenio } from "../../../context/convenio";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DialogComponentProps {
  convenio: ConvenioProps;
}

export function DialogComponentDel({ convenio }: DialogComponentProps) {
  const { setConvenios, convenios } = useConvenio();
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNome(convenio.nome || "");
  }, [convenio]);

  const handleDelete = () => {
    const updatedConvenios = convenios.filter((c) => c.id !== convenio.id);
    setConvenios(updatedConvenios);
    toast.success("Convênio deletado com sucesso!");
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
          <DialogTitle>Excluir Convênio</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este convênio?
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
