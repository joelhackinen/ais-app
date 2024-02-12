import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/datepicker"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AISTable from "./AISTable";
import { AISEntry } from "./types";
import { DatePickerMethods } from "@/components/ui/datepicker";
import { format } from "date-fns";

export default function Component() {
  const [data, setData] = useState<Array<AISEntry>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<DatePickerMethods>(null);
  const endDateRef = useRef<DatePickerMethods>(null);

  function dateToString(date: Date | undefined): string | undefined {
    if (date) {
      return format(date, "yyyy-MM-dd'T'HH:mm:ss")
    }
    return undefined;
  }
  
  async function handleSearch() {
    const startTime = dateToString(startDateRef.current?.getDate());
    const endTime = dateToString(endDateRef.current?.getDate());
    const imo = searchRef.current?.value;

    const startTimeParam = startTime && `startTime=${startTime}`;
    const endTimeParam = endTime && `endTime=${endTime}`;
    const imoParam = imo && `imo=${imo}`;

    const searchParamString = [startTimeParam, endTimeParam, imoParam]
      .filter((p): p is string => p !== undefined)
      .join("&");
    
    console.log(searchParamString);
    
    const url = `/api/aisdata?${searchParamString}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    const aisData: AISEntry[] = await response.json();
    setData(aisData);
  }

  return (
    <div className="flex flex-col min-w-[480px]">
      <header className="flex flex-nowrap gap-x-4 justify-end py-4 px-4 items-center border-b sticky top-0 z-10 bg-white">
        <div className="flex flex-col lg:flex-row gap-x-4 gap-y-2">
          <div className="flex flex-nowrap items-center gap-x-1">
            <Label htmlFor="from">From:</Label>
            <DatePicker id="from" description="Pick start time" ref={startDateRef} />
          </div>
          <div className="flex flex-nowrap items-center gap-x-1 self-end">
            <Label htmlFor="to">To:</Label>
            <DatePicker id="to" description="Pick end time" ref={endDateRef} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
          <div className="relative flex">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="searchImo"
              className="pl-8 w-[160px]"
              placeholder="Search IMO..."
              type="search"
              ref={searchRef}
            />
          </div>
          <Button onClick={handleSearch}>
            Search vessels
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <AISTable data={data} />
      </main>
    </div>
  )
}

// @ts-ignore
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
