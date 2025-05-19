"use client";

import { useAgendamento } from "@/app/context/AgendamentoContext";
import { useConvenio } from "@/app/context/convenio";
import { useEspecialidade } from "@/app/context/especialidade";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Toaster, toast } from "sonner";

type Status = "Pendente" | "Andamento" | "Concluído";

export default function PageConsultas() {
  const { agendamentos, atualizarAgendamento } = useAgendamento();
  const { convenios } = useConvenio();
  const { especialidade } = useEspecialidade();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [observacao, setObservacao] = useState("");
  const [targetStatus, setTargetStatus] = useState<Status | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Estados para os filtros
  const [filtroConvenio, setFiltroConvenio] = useState<string>("");
  const [filtroEspecialidade, setFiltroEspecialidade] = useState<string>("");
  const [filtroPaciente, setFiltroPaciente] = useState<string>("");
  const [filtroData, setFiltroData] = useState<string>("");

  // Função para filtrar os agendamentos
  const filtrarAgendamentos = () => {
    return agendamentos.filter((agendamento) => {
      const matchesConvenio =
        filtroConvenio === "" || agendamento.convenioId === filtroConvenio;
      const matchesEspecialidade =
        filtroEspecialidade === "" ||
        agendamento.especialidadeId === filtroEspecialidade;
      const matchesPaciente =
        filtroPaciente === "" ||
        agendamento.paciente
          .toLowerCase()
          .includes(filtroPaciente.toLowerCase());
      const matchesData =
        filtroData === "" || agendamento.dataHora.includes(filtroData);

      return (
        matchesConvenio &&
        matchesEspecialidade &&
        matchesPaciente &&
        matchesData
      );
    });
  };

  const agendamentosFiltrados = filtrarAgendamentos();

  // Agrupar agendamentos por status
  const groupedAgendamentos: Record<Status, typeof agendamentos> = {
    Pendente: [],
    Andamento: [],
    Concluído: [],
  };

  agendamentosFiltrados.forEach((agendamento) => {
    const status = agendamento.status as Status;
    if (groupedAgendamentos[status]) {
      groupedAgendamentos[status].push(agendamento);
    }
  });

  const handleDrop = (status: Status) => {
    if (!draggedId) return;

    const agendamento = agendamentos.find((a) => a.id === draggedId);
    if (!agendamento) return;

    if (agendamento.status === "Pendente" && status === "Concluído") {
      setTargetStatus(status);
      setIsDialogOpen(true);
      return;
    }

    if (agendamento.status !== status) {
      atualizarAgendamento(agendamento.id, { status });
      toast.success(`Status alterado para ${status}`, {
        description: `Consulta de ${agendamento.paciente} atualizada`,
      });
    }
    setDraggedId(null);
  };

  const handleConcluir = () => {
    if (draggedId && targetStatus) {
      const agendamento = agendamentos.find((a) => a.id === draggedId);
      if (agendamento) {
        atualizarAgendamento(draggedId, {
          status: targetStatus,
          observacao: observacao,
        });
        toast.success(`Consulta concluída`, {
          description: `Consulta de ${agendamento.paciente} foi concluída com observações`,
        });
      }
      setIsDialogOpen(false);
      setObservacao("");
      setDraggedId(null);
      setTargetStatus(null);
    }
  };

  // Objeto para mapear cores para cada status
  const statusColors = {
    Pendente: "bg-blue-100 border-blue-300",
    Andamento: "bg-yellow-100 border-yellow-300",
    Concluído: "bg-green-100 border-green-300",
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" richColors />
      <h1 className="text-2xl font-bold mb-6">Área de Consultas</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filtroConvenio}
          onChange={(e) => setFiltroConvenio(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todos os Convênios</option>
          {convenios.map((convenio) => (
            <option key={convenio.id} value={convenio.id}>
              {convenio.nome}
            </option>
          ))}
        </select>

        <select
          value={filtroEspecialidade}
          onChange={(e) => setFiltroEspecialidade(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todas as Especialidades</option>
          {especialidade.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
          placeholder="Filtrar por paciente"
          className="p-2 border rounded-md"
        />

        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Dialog de Observação */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Observação</DialogTitle>
            <DialogDescription>
              Insira as observações para concluir a consulta.
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Digite as observações da consulta..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4 h-32"
          />
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={handleConcluir}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Concluir
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Área dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(
          Object.entries(groupedAgendamentos) as [Status, typeof agendamentos][]
        ).map(([status, items]) => (
          <div
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
            className={`p-4 rounded-lg shadow min-h-[200px] border-2 ${statusColors[status]}`}
          >
            <h2
              className={`text-lg font-semibold text-center mb-4 ${
                status === "Pendente"
                  ? "text-blue-800"
                  : status === "Andamento"
                  ? "text-yellow-800"
                  : "text-green-800"
              }`}
            >
              {status}
            </h2>
            <div className="flex flex-col gap-3">
              {items.map((agendamento) => (
                <Card
                  key={agendamento.id}
                  draggable
                  onDragStart={() => setDraggedId(agendamento.id)}
                  className="p-4 bg-white shadow rounded-md hover:shadow-md transition-shadow"
                >
                  <p className="font-medium">
                    Paciente: {agendamento.paciente}
                  </p>
                  <p>Especialidade: {agendamento.especialidadeId}</p>
                  <p>Data: {agendamento.dataHora}</p>
                  {agendamento.observacao && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Observação:</span>{" "}
                      {agendamento.observacao}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
