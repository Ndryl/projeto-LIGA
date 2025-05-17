"use client";
import React, { createContext, useContext, useState } from "react";
import { ConvenioProps } from "@/app/types/convenio";

interface ConvenioContextProps {
  convenios: ConvenioProps[];
  setConvenios: React.Dispatch<React.SetStateAction<ConvenioProps[]>>;
}

const ConvenioContext = createContext<ConvenioContextProps | undefined>(
  undefined
);

export const ConvenioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [convenios, setConvenios] = useState<ConvenioProps[]>([
    { nome: "UNIMED", id: "1" },
    { nome: "Bradesco Saúde", id: "2" },
    { nome: "Amil", id: "3" },
    { nome: "Hapvida", id: "4" },
    { nome: "Sulamérica", id: "5" },
  ]);

  return (
    <ConvenioContext.Provider value={{ convenios, setConvenios }}>
      {children}
    </ConvenioContext.Provider>
  );
};

export const useConvenio = () => {
  const context = useContext(ConvenioContext);
  if (!context) {
    throw new Error("useConvenio deve ser usado dentro de ConvenioProvider");
  }
  return context;
};
