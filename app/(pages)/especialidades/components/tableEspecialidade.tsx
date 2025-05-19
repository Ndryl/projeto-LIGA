"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EspecialidadeProps } from "@/app/types/convenio";
import { DialogComponentEsp } from "./dialogComponentEspecialidade";
import { DialogComponentDelEsp } from "./DialogComponentDelEsp";

interface TableModel {
  array: EspecialidadeProps[];
  setSelected?: (especialidade: EspecialidadeProps) => void;
}

export function TableDemoEspecialidade({ array }: TableModel) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(array.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = array.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Table>
        <TableBody>
          {currentData.map((especialidade: EspecialidadeProps, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {especialidade.nome}
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex gap-2">
                  <DialogComponentEsp Especialidade={especialidade} />
                  <DialogComponentDelEsp Especialidade={especialidade} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </Button>
        <span>
          {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
