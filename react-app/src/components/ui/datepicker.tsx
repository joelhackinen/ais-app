import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isValid, parse } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  id: string;
}

export interface DatePickerMethods {
  getDatetime: () => Date | undefined;
}

export const DatePicker = React.forwardRef<DatePickerMethods, DatePickerProps>(
  ({ description, id }, ref) => {
    const [selected, setSelected] = React.useState<Date>();
    const [dateInputValue, setDateInputValue] = React.useState("");
    const [timeValue, setTimeValue] = React.useState<string>("00:00:00");

    const handleDaySelect: SelectSingleEventHandler = (date) => {
      setSelected(date);
      if (!date) {
        return setDateInputValue("");
      }
      setDateInputValue(format(date, "dd-MM-yyyy"));
    };

    const handleDateInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      const newDate = parse(e.currentTarget.value, "dd-MM-yyyy", new Date());
      if (!isValid(newDate)) {
        setDateInputValue(e.currentTarget.value);
        return setSelected(undefined);
      }
      const now = new Date();
      if (newDate > now) {
        setDateInputValue(format(now, "dd-MM-yyyy"));
        return setSelected(now);
      }
      setDateInputValue(e.currentTarget.value);
      setSelected(newDate);
    };

    const handleTimeInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      let time = e.currentTarget.value;
      if (time.split(":").length !== 3) {
        time = "00:00:00";
      }
      setTimeValue(time);
    };

    const handleResetDate = () => {
      setSelected(undefined);
      setDateInputValue("");
      setTimeValue("00:00:00");
    };

    const showWarning = dateInputValue !== "" && !isValid(
      parse(dateInputValue, "dd-MM-yyyy", new Date()),
    );

    React.useImperativeHandle(ref, () => {
      return {
        getDatetime: () => {
          if (!selected) {
            return undefined;
          }
          const [hours, minutes, seconds] = timeValue
            .split(":")
            .map((str) => parseInt(str, 10));
          const date = new Date(
            selected.getFullYear(),
            selected.getMonth(),
            selected.getDate(),
            hours,
            minutes,
            seconds,
          );
          return date;
        },
      };
    });

    return (
      <div className="relative pr-3">
        <TrashBin
          id={`${id}-trash`}
          onClick={handleResetDate}
          className="absolute right-1 top-0 w-4 h-4 hover:text-red-500 rounded-lg bg-white"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !selected && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selected ? (
                <span>
                  {format(selected, "PPP")} - {timeValue}
                </span>
              ) : (
                <span>{description}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 gap-4" align="start">
            <Calendar
              className={cn(
                "border rounded-md",
                showWarning && "border-red-500"
              )}
              toDate={new Date()}
              defaultMonth={selected}
              mode="single"
              selected={selected}
              onSelect={handleDaySelect}
              initialFocus
              footer={
                <div className="flex mt-2">
                  <div className="flex items-center gap-1 justify-end">
                    <Input
                      className={cn(
                        "w-[120px]",
                        showWarning && "border-red-500"
                      )}
                      id={`${id}-date`}
                      type="text"
                      placeholder="18-09-1998"
                      value={dateInputValue}
                      onChange={handleDateInputChange}
                    />
                    <CalendarIcon className="relative right-9" />
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Input
                      className="w-[110px]"
                      id={`${id}-time`}
                      type="time"
                      step="2"
                      value={timeValue}
                      onChange={handleTimeInputChange}
                    />
                  </div>
                </div>
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

//@ts-ignore
const TrashBin = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
};
