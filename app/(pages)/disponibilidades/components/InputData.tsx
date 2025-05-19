"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarFormProps {
  setSelectedDate: (date: string | null) => void;
}

const FormSchema = z.object({
  dob: z.date({
    required_error: "O dia de marcação é obrigatório",
    invalid_type_error: "Selecione uma data válida",
  }),
});

export function CalendarForm({ setSelectedDate }: CalendarFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [open, setOpen] = useState(false); // controla abertura do popover

  const onChange = (data: z.infer<typeof FormSchema>) => {
    const diaDaSemana = format(data.dob, "EEEE", { locale: ptBR });
    setSelectedDate(diaDaSemana);
    setOpen(false); // fecha o popover após seleção
  };

  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-[48px] w-full pl-3 text-left font-normal border border-gray-300 rounded p-2 justify-start",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    `${format(field.value, "EEEE", {
                      locale: ptBR,
                    })} dia ${format(field.value, "d")}`
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  if (date) {
                    onChange({ dob: date });
                  }
                }}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
