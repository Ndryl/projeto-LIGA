"use client";

import { useState } from "react";
import { DisponibilidadeProps } from "@/app/types/convenio";
import { useEspecialidade } from "@/app/context/especialidade";
import { DisponibilidadeDialog } from "./dialogMarcacao";

interface CardDisponibilidadeProps {
  arrayDisponibilidade: DisponibilidadeProps[];
}

export default function CardDisponibilidade({
  arrayDisponibilidade,
}: CardDisponibilidadeProps) {
  const { especialidade } = useEspecialidade();
  const [especialidadeBusca, setEspecialidadeBusca] = useState("");
  const [horarioBusca, setHorarioBusca] = useState("");
  const [medicoBusca, setMedicoBusca] = useState("");
  const [selectedDisponibilidade, setSelectedDisponibilidade] =
    useState<DisponibilidadeProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isHorarioWithinRange = (
    horario: string,
    inicio: string,
    fim: string
  ) => {
    const [hora, minuto] = horario.split(":").map(Number);
    const [inicioHora, inicioMinuto] = inicio.split(":").map(Number);
    const [fimHora, fimMinuto] = fim.split(":").map(Number);

    const horarioMinutos = hora * 60 + minuto;
    const inicioMinutos = inicioHora * 60 + inicioMinuto;
    const fimMinutos = fimHora * 60 + fimMinuto;

    return horarioMinutos >= inicioMinutos && horarioMinutos <= fimMinutos;
  };

  const filteredDisponibilidade = arrayDisponibilidade.filter((disp) => {
    const especialidadeMatch =
      !especialidadeBusca || disp.especialidade.nome === especialidadeBusca;
    const horarioMatch =
      !horarioBusca ||
      isHorarioWithinRange(horarioBusca, disp.horarioInicio, disp.horarioFim);
    const medicoMatch = disp.medico
      .toLowerCase()
      .includes(medicoBusca.toLowerCase());

    return especialidadeMatch && horarioMatch && medicoMatch;
  });

  const handleCardClick = (disp: DisponibilidadeProps) => {
    setSelectedDisponibilidade(disp);
    setDialogOpen(true);
  };
  console.log(arrayDisponibilidade);

  return (
    <div className="bg-zinc-100 p-4 rounded-lg">
      {/* Campos de busca - AGORA COMPLETOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <span>Buscar Por Especialidade: </span>
          <select
            className="p-2 border border-zinc-300 rounded-lg"
            value={especialidadeBusca}
            onChange={(e) => setEspecialidadeBusca(e.target.value)}
          >
            <option value="">Todas as especialidades</option>
            {especialidade.map((esp) => (
              <option key={esp.id} value={esp.nome}>
                {esp.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <span>Buscar Por Disponibilidade: </span>
          <input
            type="text"
            className="p-2 border border-zinc-300 rounded-lg"
            placeholder="Buscar por horário (ex: 10:00)"
            value={horarioBusca}
            onChange={(e) => setHorarioBusca(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Buscar Por Médico: </span>
          <input
            type="text"
            className="p-2 border border-zinc-300 rounded-lg"
            placeholder="Buscar por médico"
            value={medicoBusca}
            onChange={(e) => setMedicoBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
        {filteredDisponibilidade.map((disp) => (
          <div
            key={disp.id}
            className="p-4 border border-zinc-300 rounded-xl bg-blue-100 shadow-sm cursor-pointer hover:bg-blue-200 transition-colors"
            onClick={() => handleCardClick(disp)}
          >
            <h3 className="font-semibold text-blue-900 truncate">
              {disp.medico}
            </h3>
            <p className="text-sm text-zinc-700 truncate">
              Especialidade: {disp.especialidade.nome}
            </p>
            <p className="text-sm text-zinc-700">Data: {disp.diaDisponivel}</p>
            <p className="text-sm text-zinc-700">
              Horário: {disp.horarioInicio} - {disp.horarioFim}
            </p>
          </div>
        ))}

        {filteredDisponibilidade.length === 0 && (
          <p className="text-center text-zinc-500">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>

      {/* Dialog */}
      {selectedDisponibilidade && (
        <DisponibilidadeDialog
          disponibilidade={selectedDisponibilidade}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
}
