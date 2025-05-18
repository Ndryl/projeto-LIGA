"use client";
import { useConvenio } from "@/app/context/convenio";

export default function PageConsultas() {
  const { convenios } = useConvenio();
  console.log(convenios);
  return (
    <div>
      <h1>Área de consultas</h1>
      <p>Esta é a área de consultas.</p>
    </div>
  );
}
