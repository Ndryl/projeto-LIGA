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
import { Dialog } from "@radix-ui/react-dialog";
import { DialogComponent } from "../(pages)/convenios/components/DialogComponent";
import { DialogComponentDel } from "../(pages)/convenios/components/DialogDeletConvenio";

interface TableModel {
  array: ConvenioProps[];
  setSelected?: (convenio: ConvenioProps) => void;
}

export function TableDemo({ array, setSelected }: TableModel) {
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
          {currentData.map((convenio: ConvenioProps, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{convenio.nome}</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex gap-2">
                  <DialogComponent convenio={convenio} />
                  <DialogComponentDel convenio={convenio} />
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
