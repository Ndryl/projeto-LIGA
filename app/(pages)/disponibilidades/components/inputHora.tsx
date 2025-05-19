"use client";

import { useEffect, useState } from "react";

interface InputHoraManualProps {
  setHorarioInicio: (value: string) => void;
  setHorarioFim: (value: string) => void;
  chave: boolean;
}

export default function InputHoraManual({
  setHorarioInicio,
  setHorarioFim,
  chave,
}: InputHoraManualProps) {
  const [horarioInicio, setHorarioInicioLocal] = useState("");
  const [horarioFim, setHorarioFimLocal] = useState("");

  useEffect(() => {
    setHorarioInicioLocal("");
    setHorarioFimLocal("");
    setHorarioInicio("");
    setHorarioFim("");
  }, [chave]);

  useEffect(() => {
    if (horarioInicio.length === 4) {
      const hora = horarioInicio.slice(0, 2);
      const minuto = horarioInicio.slice(2, 4);
      setHorarioInicio(`${hora}:${minuto}`);
    }
  }, [horarioInicio]);

  useEffect(() => {
    if (horarioFim.length === 4) {
      const hora = horarioFim.slice(0, 2);
      const minuto = horarioFim.slice(2, 4);
      setHorarioFim(`${hora}:${minuto}`);
    }
  }, [horarioFim]);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    let numericValue = value.replace(/\D/g, "");
    if (numericValue.length > 0 && parseInt(numericValue[0]) > 3) {
      numericValue = `0${numericValue}`;
    }
    setter(numericValue.slice(0, 4));
  };

  const handleBlur = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.length < 4) {
      setter(value.padEnd(4, "0"));
    }
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
      <div className="flex flex-col gap-1">
        <span className="text-sm">hor. início:</span>
        <input
          type="text"
          className="w-20 text-center border border-gray-300 rounded p-2 outline-none"
          value={formatHorario(horarioInicio)}
          onChange={(e) =>
            handleInputChange(e.target.value, setHorarioInicioLocal)
          }
          onBlur={(e) =>
            handleBlur(e.target.value.replace(/\D/g, ""), setHorarioInicioLocal)
          }
          maxLength={5}
          placeholder="HHMM"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">hor. término:</span>
        <input
          type="text"
          className="w-20 text-center border border-gray-300 rounded p-2 outline-none"
          value={formatHorario(horarioFim)}
          onChange={(e) =>
            handleInputChange(e.target.value, setHorarioFimLocal)
          }
          onBlur={(e) =>
            handleBlur(e.target.value.replace(/\D/g, ""), setHorarioFimLocal)
          }
          maxLength={5}
          placeholder="HHMM"
        />
      </div>
    </div>
  );
}
