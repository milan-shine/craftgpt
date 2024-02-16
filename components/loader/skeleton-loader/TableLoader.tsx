import React from "react";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { TableCell, TableRow } from "@/components/shadcn/ui/table";

export const TableLoader: React.FC<{
  theadLength: number;
}> = ({ theadLength }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: theadLength }).map((_, index) => (
            <TableCell key={index}>
              <div className="flex flex-col items-center justify-center">
                <Skeleton className="h-5 w-[100%]" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
