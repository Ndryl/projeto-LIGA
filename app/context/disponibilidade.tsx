"use client";
import React, { createContext, useContext, useState } from "react";

// Tipos
export interface ConvenioProps {
  nome: string;
  id: string;
}

export interface EspecialidadeProps {
  nome: string;
  id: string;
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

export interface DisponibilidadeProps {
  id: string;
  medico: string;
  especialidade: EspecialidadeProps;
  diaDisponivel: string;
  horarioInicio: string;
  horarioFim: string;
  disponibilidadeConsulta: DisponibilidadeMarcacaoCompleteProps[];
}

interface DisponibilidadeContextProps {
  disponibilidades: DisponibilidadeProps[];
  setDisponibilidades: React.Dispatch<
    React.SetStateAction<DisponibilidadeProps[]>
  >;
  adicionarDisponibilidade: (disp: Omit<DisponibilidadeProps, "id">) => void;
  removerDisponibilidade: (id: string) => void;
  atualizarDisponibilidade: (
    id: string,
    novosDados: Partial<DisponibilidadeProps>
  ) => void;
}

// Contexto
const DisponibilidadeContext = createContext<
  DisponibilidadeContextProps | undefined
>(undefined);

// Dados iniciais (mockados)
const disponibilidadesIniciais: DisponibilidadeProps[] = [];

// Provider
export const DisponibilidadeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [disponibilidades, setDisponibilidades] = useState<
    DisponibilidadeProps[]
  >(disponibilidadesIniciais);

  const adicionarDisponibilidade = (disp: Omit<DisponibilidadeProps, "id">) => {
    const novaDisponibilidade: DisponibilidadeProps = {
      ...disp,
      id: Date.now().toString(),
    };
    setDisponibilidades((prev) => [...prev, novaDisponibilidade]);
  };

  const removerDisponibilidade = (id: string) => {
    setDisponibilidades((prev) => prev.filter((d) => d.id !== id));
  };

  const atualizarDisponibilidade = (
    id: string,
    novosDados: Partial<DisponibilidadeProps>
  ) => {
    setDisponibilidades((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...novosDados } : d))
    );
  };

  return (
    <DisponibilidadeContext.Provider
      value={{
        disponibilidades,
        setDisponibilidades,
        adicionarDisponibilidade,
        removerDisponibilidade,
        atualizarDisponibilidade,
      }}
    >
      {children}
    </DisponibilidadeContext.Provider>
  );
};

// Hook personalizado
export const useDisponibilidade = () => {
  const context = useContext(DisponibilidadeContext);
  if (!context) {
    throw new Error(
      "useDisponibilidade deve ser usado dentro de DisponibilidadeProvider"
    );
  }
  return context;
};
