"use client";

import { TableDemo } from "@/app/component/Table";
import { useConvenio } from "@/app/context/convenio";
import { ConvenioProps } from "@/app/types/convenio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PageConvenioContent = () => {
  const { convenios, setConvenios } = useConvenio();
  const [convenio, setConvenio] = useState<string>("");
  const [convenioSelected, setConvenioSelected] = useState<
    ConvenioProps | undefined
  >({
    id: "",
    nome: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    if (convenio.trim() === "") {
      alert("Campo vazio");
      return;
    }
    const newConvenio = {
      nome: convenio,
      id: (convenios.length + 1).toString(),
    };
    setConvenios((prev) => [...prev, newConvenio]);

    setConvenio("");
    toast.success("Convênio adicionado com sucesso!");
    setDisabled(false);
  };
  console.log(convenioSelected);
  return (
    <Card>
      <CardHeader className="px-4">
        <CardTitle>Meus convênios</CardTitle>
        <CardDescription>Tabela de convênios</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do convênio"
            className="border border-gray-300 rounded p-2 w-full h-[48px]"
            value={convenio}
            onChange={(e) => setConvenio(e.target.value)}
          />
          <button
            className="flex justify-center items-center border  text-white bg-green-400 h-[48px] px-4 rounded cursor-pointer hover:bg-green-400/80"
            type="submit"
            disabled={disabled}
          >
            <Plus />
          </button>
        </form>

        <TableDemo array={convenios} setSelected={setConvenioSelected} />
      </CardContent>
    </Card>
  );
};

export default PageConvenioContent;
