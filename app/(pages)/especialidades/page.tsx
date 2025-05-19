"use client";

import { useEspecialidade } from "@/app/context/especialidade";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TableDemoEspecialidade } from "./components/tableEspecialidade";

const PageEspecialidadeContent = () => {
  const { especialidade, setespecialidade } = useEspecialidade();
  const [Especialidade, setEspecialidade] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    if (Especialidade.trim() === "") {
      toast.error("Campo vazio!");
      setDisabled(false);
      return;
    }
    const newEspecialidade = {
      nome: Especialidade,
      id: (especialidade.length + 1).toString(),
    };
    setespecialidade((prev) => [...prev, newEspecialidade]);

    setEspecialidade("");
    toast.success("Especialidade adicionada com sucesso!");
    setDisabled(false);
  };

  return (
    <Card>
      <CardHeader className="px-4">
        <CardTitle>Especialidades</CardTitle>
        <CardDescription>Tabela de especialidades</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da especialidade"
            className="border border-gray-300 rounded p-2 w-full h-[48px]"
            value={Especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
          <button
            className="flex justify-center items-center border  text-white bg-green-400 h-[48px] px-4 rounded cursor-pointer hover:bg-green-400/80"
            type="submit"
            disabled={disabled}
          >
            <Plus />
          </button>
        </form>

        <TableDemoEspecialidade array={especialidade} />
      </CardContent>
    </Card>
  );
};

export default PageEspecialidadeContent;
