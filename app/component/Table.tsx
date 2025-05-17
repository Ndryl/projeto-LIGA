"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import { ConvenioProps } from "../types/convenio";

interface TableModel {
  array: ConvenioProps[];
  columns: string[];
}

export function TableDemo({ array, columns }: TableModel) {
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
          {currentData.map((convenio, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{convenio.nome}</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-red-100 cursor-pointer">
                    <Pencil />
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-100 cursor-pointer">
                    <Trash className="text-red-500" />
                  </button>
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
