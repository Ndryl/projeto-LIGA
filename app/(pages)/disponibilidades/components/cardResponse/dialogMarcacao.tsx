"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DisponibilidadeProps } from "@/app/types/convenio";
import { useDisponibilidade } from "@/app/context/disponibilidade";
import { useConvenio } from "@/app/context/convenio";
import { useAgendamento } from "@/app/context/AgendamentoContext";

interface DisponibilidadeDialogProps {
  disponibilidade: DisponibilidadeProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisponibilidadeDialog({
  disponibilidade,
  open,
  onOpenChange,
}: DisponibilidadeDialogProps) {
  const [selectedEspecialidade, setSelectedEspecialidade] =
    useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<
    DisponibilidadeProps["disponibilidadeConsulta"][number] | null
  >(null);
  const [patientName, setPatientName] = useState("");

  const handleSlotSelection = (
    slot: DisponibilidadeProps["disponibilidadeConsulta"][number]
  ) => {
    setSelectedSlot(slot);
  };

  const handleCancel = () => {
    setSelectedSlot(null);
    setPatientName("");
  };

  const handleMarkAppointment = () => {
    if (selectedSlot && patientName.trim() && selectedEspecialidade) {
      // Atualizar a disponibilidade
      atualizarDisponibilidade(disponibilidade.id, {
        ...disponibilidade,
        disponibilidadeConsulta: disponibilidade.disponibilidadeConsulta.map(
          (slot) =>
            slot.horaInicio === selectedSlot.horaInicio &&
            slot.horaFim === selectedSlot.horaFim
              ? { ...slot, disponivel: false, paciente: patientName }
              : slot
        ),
      });

      // Criar um agendamento
      adicionarAgendamento({
        paciente: patientName,
        especialidadeId: disponibilidade.especialidade.nome,
        medicoId: disponibilidade.medico,
        convenioId:
          convenios.find((c) => c.nome === selectedEspecialidade)?.id || "",
        dataHora: `${disponibilidade.diaDisponivel}T${selectedSlot.horaInicio}`,
      });

      handleCancel();
      onOpenChange(false);
    }
  };

  const { atualizarDisponibilidade } = useDisponibilidade();
  const { convenios } = useConvenio();
  const { adicionarAgendamento } = useAgendamento();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Horários disponíveis - {disponibilidade.medico}
          </DialogTitle>
          <p className="text-sm text-zinc-500 text-center">
            {disponibilidade.diaDisponivel} |{" "}
            {disponibilidade.especialidade.nome}
          </p>
        </DialogHeader>

        {selectedSlot ? (
          <div className="mt-6">
            <h3 className="font-medium text-zinc-800 mb-4 text-center">
              Confirmar agendamento para {selectedSlot.horaInicio} -{" "}
              {selectedSlot.horaFim}
            </h3>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="border border-zinc-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do paciente"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />

              <select
                name="especialidade"
                id="especialidade"
                className="border border-gray-300 rounded p-2 w-full h-[48px] mt-1"
                value={selectedEspecialidade}
                onChange={(e) => setSelectedEspecialidade(e.target.value)}
              >
                <option value="" disabled>
                  Convênios
                </option>
                {convenios.map((item) => (
                  <option key={item.id} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </select>

              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={handleMarkAppointment}
                  disabled={!patientName.trim()}
                >
                  Marcar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="font-medium text-zinc-800 mb-4">
              Selecione um horário:
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
              {disponibilidade.disponibilidadeConsulta.map((slot, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    slot.disponivel
                      ? "hover:bg-blue-50 hover:border-blue-200"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (slot.disponivel) handleSlotSelection(slot);
                  }}
                  role={slot.disponivel ? "button" : "none"}
                  aria-disabled={!slot.disponivel}
                >
                  <p className="font-medium text-center">
                    {slot.horaInicio} - {slot.horaFim}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
