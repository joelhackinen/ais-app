import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { SelectSingleEventHandler } from "react-day-picker";


interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
}

export interface DatePickerMethods {
  getValue: () => Date | undefined;
}
 
export const DatePicker = React.forwardRef<DatePickerMethods, DatePickerProps>(({ description, id }, ref) => {
  const [date, setDate] = React.useState<Date>();
  const [timeValue, setTimeValue] = React.useState<string>('00:00:00');

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    console.log(time)
    if (!date) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes, seconds] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds
    );
    setDate(newSelectedDate);
    setTimeValue(time);
  };

  const handleSelect: SelectSingleEventHandler = (day, selectedDay) => {
    if (day === selectedDay) {
      const [hours, minutes, seconds] = timeValue.split(':').map((str) => parseInt(str, 10));
      const newSelectedDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        hours,
        minutes,
        seconds
      );
      setDate(newSelectedDate);
      return;
    }
    setDate(undefined);
  };

  React.useImperativeHandle(ref, () => {
    return {
      getValue: () => date,
    };
  });
 
  return (
    <div id={id}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ?
              <span>
                {format(date, "PPP")} - {timeValue}
              </span> :
              <span>
                {description}
              </span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 gap-4" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            footer={
              <Input className="w-[110px]"
                type="time"
                step="2"
                value={timeValue}
                onChange={handleTimeChange}
              />
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  )
})