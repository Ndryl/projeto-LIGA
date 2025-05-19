"use client";

import React, { createContext, useContext, useState } from "react";
import { AgendamentoProps } from "../types/convenio";

interface AgendamentoContextProps {
  agendamentos: AgendamentoProps[];
  setAgendamentos: React.Dispatch<React.SetStateAction<AgendamentoProps[]>>;
  adicionarAgendamento: (
    agendamento: Omit<AgendamentoProps, "id" | "status">
  ) => void;
  removerAgendamento: (id: string) => void;
  atualizarAgendamento: (
    id: string,
    novosDados: Partial<AgendamentoProps>
  ) => void;
}

// Contexto
const AgendamentoContext = createContext<AgendamentoContextProps | undefined>(
  undefined
);

// Dados iniciais (mockados)
const agendamentosIniciais: AgendamentoProps[] = [];

// Provider
export const AgendamentoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [agendamentos, setAgendamentos] =
    useState<AgendamentoProps[]>(agendamentosIniciais);

  const adicionarAgendamento = (
    agendamento: Omit<AgendamentoProps, "id" | "status">
  ) => {
    const novoAgendamento: AgendamentoProps = {
      ...agendamento,
      id: Date.now().toString(), // Gera um ID único
      status: "Pendente", // Define o status inicial
    };
    setAgendamentos((prev) => [...prev, novoAgendamento]);
  };

  const removerAgendamento = (id: string) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
  };

  const atualizarAgendamento = (
    id: string,
    novosDados: Partial<AgendamentoProps>
  ) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...novosDados } : a))
    );
  };

  return (
    <AgendamentoContext.Provider
      value={{
        agendamentos,
        setAgendamentos,
        adicionarAgendamento,
        removerAgendamento,
        atualizarAgendamento,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
};

// Hook personalizado
export const useAgendamento = () => {
  const context = useContext(AgendamentoContext);
  if (!context) {
    throw new Error(
      "useAgendamento deve ser usado dentro de AgendamentoProvider"
    );
  }
  return context;
};
