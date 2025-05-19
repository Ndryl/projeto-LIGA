"use client";
import { useEspecialidade } from "@/app/context/especialidade";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CalendarForm } from "./components/InputData";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputHora from "./components/inputHora";
import { toast } from "sonner";
import { useDisponibilidade } from "@/app/context/disponibilidade";
import CardDisponibilidade from "./components/cardResponse";
import CardSemana from "./components/cardSemana";
import { DisponibilidadeMarcacaoCompleteProps } from "@/app/types/convenio";

export default function DisponibilidadesPage() {
  const [medico, setMedico] = useState<string>("");
  const [selectedEspecialidade, setSelectedEspecialidade] =
    useState<string>("");
  const form = useForm();

  const { disponibilidades, adicionarDisponibilidade } = useDisponibilidade();

  const { especialidade } = useEspecialidade();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [disabled] = useState<boolean>(false);
  const [horarioInicio, setHorarioInicio] = useState<string>("");
  const [horarioFim, setHorarioFim] = useState<string>("");
  const [tempoConsulta, setTempoConsulta] = useState<number>(0);

  function gerarIntervalosDisponibilidade(
    horarioInicio: string,
    horarioFim: string,
    tempoConsulta: number
  ): DisponibilidadeMarcacaoCompleteProps[] {
    const intervalos: DisponibilidadeMarcacaoCompleteProps[] = [];

    // Converte horários em minutos para facilitar os cálculos
    const [inicioHoras, inicioMinutos] = horarioInicio.split(":").map(Number);
    const [fimHoras, fimMinutos] = horarioFim.split(":").map(Number);

    let inicioAtual = inicioHoras * 60 + inicioMinutos;
    const fimTotal = fimHoras * 60 + fimMinutos;

    while (inicioAtual + tempoConsulta <= fimTotal) {
      const horaInicio = `${String(Math.floor(inicioAtual / 60)).padStart(
        2,
        "0"
      )}:${String(inicioAtual % 60).padStart(2, "0")}`;
      const horaFim = `${String(
        Math.floor((inicioAtual + tempoConsulta) / 60)
      ).padStart(2, "0")}:${String((inicioAtual + tempoConsulta) % 60).padStart(
        2,
        "0"
      )}`;

      intervalos.push({
        horaInicio,
        horaFim,
        disponivel: true,
      });

      inicioAtual += tempoConsulta; // Incrementa o horário atual
    }

    return intervalos;
  }

  function handleSubmitDisponibilidade(e: React.FormEvent) {
    e.preventDefault();

    if (
      !medico ||
      !selectedEspecialidade ||
      !selectedDate ||
      !horarioInicio ||
      !horarioFim ||
      tempoConsulta <= 0
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const especialidadeSelecionada = especialidade.find(
      (esp) => esp.nome === selectedEspecialidade
    );

    if (!especialidadeSelecionada) {
      toast.error("Especialidade não encontrada.");
      return;
    }

    const intervalos = gerarIntervalosDisponibilidade(
      horarioInicio,
      horarioFim,
      tempoConsulta
    );

    const novaDisponibilidade = {
      id: crypto.randomUUID(), // Gera um ID único
      medico,
      especialidade: especialidadeSelecionada,
      diaDisponivel: selectedDate,
      horarioInicio,
      horarioFim,
      disponibilidadeConsulta: intervalos,
    };

    adicionarDisponibilidade(novaDisponibilidade);

    // Limpa os campos
    setMedico("");
    setSelectedEspecialidade("");
    setSelectedDate(null);
    setHorarioInicio("");
    setHorarioFim("");
    setTempoConsulta(0);

    toast.success("Disponibilidade adicionada com sucesso!");
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={handleSubmitDisponibilidade}>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 items-end w-full">
            <div className="w-full md:w-[calc(50%-0.5rem)]">
              <span className="text-sm">Nome médico:</span>
              <input
                type="text"
                className="border border-gray-300 rounded p-2 w-full h-[48px] mt-1"
                placeholder="Nome do médico"
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
              />
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)]">
              <span className="text-sm">Especialidade:</span>
              <select
                name="especialidade"
                id="especialidade"
                className="border border-gray-300 rounded p-2 w-full h-[48px] mt-1"
                value={selectedEspecialidade}
                onChange={(e) => setSelectedEspecialidade(e.target.value)}
              >
                <option value="" disabled>
                  especialidades
                </option>
                {especialidade.map((item) => (
                  <option key={item.id} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)]">
              <span className="text-sm">Dia de consulta:</span>
              <div className="mt-1">
                <CalendarForm setSelectedDate={setSelectedDate} />
              </div>
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)]">
              <span className="text-sm">Tempo de consulta (minutos):</span>
              <input
                type="number"
                min="0"
                step="1"
                className="border border-gray-300 rounded p-2 w-full h-[48px] mt-1"
                placeholder="Insira o tempo de consulta"
                value={tempoConsulta}
                onChange={(e) => {
                  // Se o input estiver vazio, define como 0
                  if (e.target.value === "") {
                    setTempoConsulta(0);
                    return;
                  }

                  const value = parseInt(e.target.value);
                  // Só atualiza se for um número válido e não negativo
                  if (!isNaN(value) && value >= 0) {
                    setTempoConsulta(value);
                  }
                }}
                onKeyDown={(e) => {
                  // Permite Backspace, Delete, Tab, etc.
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div className="w-full md:w-[calc(50%-0.5rem)] items-end">
              <div className="mt-1 flex gap-2 items-end">
                <InputHora
                  setHorarioInicio={setHorarioInicio}
                  setHorarioFim={setHorarioFim}
                />

                <button
                  className="flex justify-center items-center  border text-white bg-green-400 h-[48px] w-[48px] rounded cursor-pointer hover:bg-green-400/80 mt-10"
                  type="submit"
                  disabled={disabled}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <CardDisponibilidade arrayDisponibilidade={disponibilidades} />
      <CardSemana />
    </div>
  );
}
