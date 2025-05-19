export interface ConvenioProps {
  nome: string;
  id: string;
}

export interface EspecialidadeProps {
  nome: string;
  id: string;
}

export interface DisponibilidadeProps {
  id: string;
  medico: string;
  especialidade: EspecialidadeProps;
  diaDisponivel: string;
  horarioInicio: string;
  horarioFim: string;
  disponibilidadeConsulta: DisponibilidadeMarcacaoCompleteProps[];
}
export interface DiaSemanaProps {
  id: string;
  semana:
    | "Segunda"
    | "Terça"
    | "Quarta"
    | "Quinta"
    | "Sexta"
    | "Sábado"
    | "Domingo";
}

export interface DisponibilidadeMarcacaoCompleteProps {
  horaInicio: string;
  horaFim: string;
  disponivel: boolean;
  agendamentoId?: string;
  paciente?: string;
}

export interface AgendamentoProps {
  id: string;
  paciente: string;
  especialidadeId: string;
  medicoId: string;
  convenioId: string;
  dataHora: string;
  status: "Pendente" | "Concluído" | "Andamento";
  observacao?: string;
}
