import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { AISEntry } from "./types";

interface AISTableProps {
  data: Array<AISEntry>;
}

export default function AISTable({ data }: AISTableProps) {
  return (
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
          {data.map(({ imo, lat, lon, basedatetime }, i) => (
            <TableRow key={i} className="font-medium">
              {[imo, lat, lon, basedatetime].map((value, j) => (
                <TableCell key={`${i}-${j}`}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}