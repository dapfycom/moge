"use client";

import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFormikContext } from "formik";
import { CalendarIcon } from "lucide-react";
import { IFormValues } from "../FormikContainer/FormikContainer";

export function CalendarFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { values, setFieldValue } = useFormikContext<IFormValues>();

  const handleRangeDateChange = (name: "from" | "to", date?: Date) => {
    if (date) {
      if (name === "from") {
        setFieldValue("from", date);
      }
      if (name === "to") {
        setFieldValue("to", date);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col w-full gap-[6px] pt-[2.6px]">
        <Label>From Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[full] justify-start text-left font-normal",
                !values.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.from ? (
                format(values.from, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
          >
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={values.from}
                onSelect={(date) => handleRangeDateChange("from", date)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col w-full gap-[6px]  pt-[2.6px]">
        <Label>To Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[full] justify-start text-left font-normal",
                !values.to && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {values.to ? format(values.to, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
          >
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={values.to}
                onSelect={(date) => handleRangeDateChange("to", date)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
