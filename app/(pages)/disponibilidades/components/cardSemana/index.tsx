"use client";
import { useEffect, useState } from "react";
import { useDisponibilidade } from "@/app/context/disponibilidade";
import { DisponibilidadeProps } from "@/app/types/convenio";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CardSemana() {
  const [disponiveisHoje, setDisponiveisHoje] = useState<
    DisponibilidadeProps[]
  >([]);
  const [diaSelecionado, setDiaSelecionado] = useState<{
    semana: string;
    data: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  const { disponibilidades } = useDisponibilidade();

  useEffect(() => {
    if (diaSelecionado) {
      const filtrados = disponibilidades.filter(
        (d) => normaliza(d.diaDisponivel) === normaliza(diaSelecionado.semana)
      );
      setDisponiveisHoje(filtrados);
    } else {
      setDisponiveisHoje([]);
    }
  }, [disponibilidades, diaSelecionado]);

  function getProximosSeteDias(): {
    id: string;
    semana: string;
    data: string;
  }[] {
    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const hoje = new Date();
    const dias: { id: string; semana: string; data: string }[] = [];

    for (let i = 0; i < 7; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);

      dias.push({
        id: `${i}`,
        semana: diasSemana[data.getDay()],
        data: data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        }),
      });
    }

    return dias;
  }

  function normaliza(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const diasComDatas = getProximosSeteDias();

  return (
    <div className="bg-zinc-100 p-4 overflow-x-auto">
      <div className="grid grid-cols-7 min-w-[700px]">
        {diasComDatas.map((dia) => (
          <Dialog
            key={dia.id}
            open={open && diaSelecionado?.data === dia.data}
            onOpenChange={(value) => {
              setOpen(value);
              if (!value) setDiaSelecionado(null);
            }}
          >
            <DialogTrigger asChild>
              <div
                onClick={() => {
                  setDiaSelecionado(dia);
                  setOpen(true);
                }}
                className={`p-4 text-center border min-h-30 shadow-sm cursor-pointer ${
                  diaSelecionado?.data === dia.data
                    ? "bg-blue-200 border-blue-500"
                    : "bg-white border-blue-200 hover:bg-zinc-100"
                }`}
              >
                <h3 className="font-semibold text-zinc-700">{dia.semana}</h3>
                <p className="text-sm text-zinc-500 mt-1">{dia.data}</p>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Disponibilidades</DialogTitle>
                <DialogDescription>
                  {dia.semana} ({dia.data})
                </DialogDescription>
              </DialogHeader>

              {disponiveisHoje.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {disponiveisHoje.map((disp) => (
                    <div
                      key={disp.id}
                      className="p-4 bg-white shadow-md rounded-xl border border-zinc-200"
                    >
                      <h3 className="text-lg font-medium text-zinc-700">
                        {disp.medico}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        Especialidade: {disp.especialidade.nome}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1">
                        {disp.horarioInicio} - {disp.horarioFim}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 mt-4">
                  Nenhuma disponibilidade encontrada.
                </p>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
