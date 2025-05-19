"use client";
import React, { createContext, useContext, useState } from "react";
import { EspecialidadeProps } from "../types/convenio";

interface EspecialidadeContextProps {
  especialidade: EspecialidadeProps[];
  setespecialidade: React.Dispatch<React.SetStateAction<EspecialidadeProps[]>>;
}

const EspecialidadeContext = createContext<
  EspecialidadeContextProps | undefined
>(undefined);

export const EspecialidadeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [especialidade, setespecialidade] = useState<EspecialidadeProps[]>([
    { nome: "Cardiologia", id: "1" },
    { nome: "Ortopedia", id: "2" },
    { nome: "Dermatologia", id: "3" },
    { nome: "Neurologia", id: "4" },
    { nome: "Oftalmologia", id: "5" },
  ]);

  return (
    <EspecialidadeContext.Provider value={{ especialidade, setespecialidade }}>
      {children}
    </EspecialidadeContext.Provider>
  );
};

export const useEspecialidade = () => {
  const context = useContext(EspecialidadeContext);
  if (!context) {
    throw new Error(
      "useEspecialidade deve ser usado dentro de EspecialidadeProvider"
    );
  }
  return context;
};
