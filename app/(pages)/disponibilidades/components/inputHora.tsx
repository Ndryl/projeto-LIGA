"use client";

import { useState, useEffect } from "react";

interface InputHoraManualProps {
  setHorarioInicio: (value: string) => void;
  setHorarioFim: (value: string) => void;
}

export default function InputHoraManual({
  setHorarioInicio,
  setHorarioFim,
}: InputHoraManualProps) {
  const [horarioInicio, setHorarioInicioLocal] = useState("");
  const [horarioFim, setHorarioFimLocal] = useState("");

  useEffect(() => {
    if (horarioInicio.length === 4) {
      const hora = horarioInicio.slice(0, 2);
      const minuto = horarioInicio.slice(2, 4);
      setHorarioInicio(`${hora}:${minuto}`);
    }
  }, [horarioInicio, setHorarioInicio]);

  useEffect(() => {
    if (horarioFim.length === 4) {
      const hora = horarioFim.slice(0, 2);
      const minuto = horarioFim.slice(2, 4);
      setHorarioFim(`${hora}:${minuto}`);
    }
  }, [horarioFim, setHorarioFim]);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Remove caracteres não numéricos
    let numericValue = value.replace(/\D/g, "");

    // Validação para adicionar 0 à esquerda se o primeiro número for maior que 3
    if (numericValue.length > 0 && parseInt(numericValue[0]) > 3) {
      numericValue = `0${numericValue}`;
    }

    // Limita a 4 caracteres
    numericValue = numericValue.slice(0, 4);

    setter(numericValue);
  };

  const formatHorario = (value: string) => {
    if (value.length === 3 || value.length === 4) {
      const hora = value.slice(0, 2);
      const minuto = value.slice(2);
      return `${hora}:${minuto}`;
    }
    return value;
  };

  return (
    <div className="flex gap-4">
      {/* Input de Horário Início */}
      <div className="flex flex-col gap-1">
        <span className="text-sm">hor. início:</span>
        <input
          type="text"
          className="w-20 text-center border border-gray-300 rounded p-2 outline-none"
          value={formatHorario(horarioInicio)}
          onChange={(e) =>
            handleInputChange(e.target.value, setHorarioInicioLocal)
          }
          maxLength={5} // Para exibir no formato HH:MM
          placeholder="HHMM"
        />
      </div>

      {/* Input de Horário Fim */}
      <div className="flex flex-col gap-1">
        <span className="text-sm">hor. término:</span>
        <input
          type="text"
          className="w-20 text-center border border-gray-300 rounded p-2 outline-none"
          value={formatHorario(horarioFim)}
          onChange={(e) =>
            handleInputChange(e.target.value, setHorarioFimLocal)
          }
          maxLength={5} // Para exibir no formato HH:MM
          placeholder="HHMM"
        />
      </div>
    </div>
  );
}
