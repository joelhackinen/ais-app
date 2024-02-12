import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, isValid, parse } from "date-fns"
 
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
  id: string;
}

export interface DatePickerMethods {
  getDate: () => Date | undefined;
}
 
export const DatePicker = React.forwardRef<DatePickerMethods, DatePickerProps>(({ description, id }, ref) => {
  const [selected, setSelected] = React.useState<Date>();
  const [dateInputValue, setDateInputValue] = React.useState('');
  const [timeValue, setTimeValue] = React.useState<string>('00:00:00');

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    if (!date) {
      return setDateInputValue('');
    }
    setDateInputValue(format(date, 'dd-MM-yyyy'));
  };

  const handleDateInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newDate = parse(e.currentTarget.value, 'dd-MM-yyyy', new Date());
    if (!isValid(newDate)) {
      setDateInputValue(e.currentTarget.value);
      return setSelected(undefined);
    }
    const now = new Date();
    if (newDate > now) {
      setDateInputValue(format(now, 'dd-MM-yyyy'));
      return setSelected(now)
    }
    setDateInputValue(e.currentTarget.value);
    setSelected(newDate);
  };

  const handleTimeInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let time = e.currentTarget.value;
    if (time.split(':').length !== 3) {
      time = '00:00:00';
    }
    setTimeValue(time);
  };

  React.useImperativeHandle(ref, () => {
    return {
      getDate: () => {
        if (!selected) {
          return undefined;
        };
        const [hours, minutes, seconds] = timeValue.split(':').map((str) => parseInt(str, 10));
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
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ?
              <span>
                {format(selected, "PPP")} - {timeValue}
              </span> :
              <span>
                {description}
              </span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 gap-4" align="start">
          <Calendar
            toDate={(new Date())}
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
                      (!isValid(parse(dateInputValue, 'dd-MM-yyyy', new Date())) && dateInputValue !== "") && "border-red-400"
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
                  <Input className="w-[110px]"
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
  )
})