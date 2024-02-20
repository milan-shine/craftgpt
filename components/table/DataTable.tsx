import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/ui/table";
import { TableLoader } from "../loader/skeleton-loader/TableLoader";

interface ICell {
  cell: string | React.ReactNode;
}

interface IRow {
  row: ICell[];
}

const DataTable: React.FC<{
  tHeads: string[];
  tRows: IRow[];
  isLoading: boolean;
}> = ({ tHeads, tRows, isLoading }) => {
  const renderCells = (row: any) => {
    return row.map((item: any) => (
      <TableCell key={item} className="text-center font-medium">
        {item.cell}
      </TableCell>
    ));
  };

  return (
    <Table className="border-black-500 border-2 bg-blue-100">
      <TableHeader className="justify-between bg-[#285B7E]">
        <TableRow>
          {tHeads?.map((head: any) => (
            <TableHead
              key={head}
              className="text-center text-lg font-bold text-white"
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableLoader theadLength={tHeads.length} />
        ) : (
          <>
            {tRows?.map((row: any) => (
              <TableRow key={row} className="justify-between">
                {renderCells(row.row)}
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
