import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { DatePickerWithRange } from "./components/ui/daterangepicker"

export default function Component() {
  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <DatePickerWithRange />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IMO</TableHead>
                <TableHead>LAT</TableHead>
                <TableHead>LON</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-medium">
                <TableCell>123456789</TableCell>
                <TableCell>37.7749° N</TableCell>
                <TableCell>122.4194° W</TableCell>
                <TableCell>Oct 08, 2023 9:15 AM</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell>987654321</TableCell>
                <TableCell>48.8566° N</TableCell>
                <TableCell>2.3522° E</TableCell>
                <TableCell>Oct 08, 2023 9:15 AM</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell>111111111</TableCell>
                <TableCell>35.6895° N</TableCell>
                <TableCell>139.6917° E</TableCell>
                <TableCell>Oct 08, 2023 9:15 AM</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell>222222222</TableCell>
                <TableCell>51.5074° N</TableCell>
                <TableCell>0.1278° W</TableCell>
                <TableCell>Oct 08, 2023 9:15 AM</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell>333333333</TableCell>
                <TableCell>40.7128° N</TableCell>
                <TableCell>74.0060° W</TableCell>
                <TableCell>Oct 08, 2023 9:15 AM</TableCell>
              </TableRow>
              
            </TableBody>
          </Table>
        </Card>
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
