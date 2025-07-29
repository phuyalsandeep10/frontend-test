// components/GenericTable.tsx
'use client';

import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
// import { ColumnDef } from '@/types/column';

type ColumnKey = string;

type Column<T> = {
  key: string; // <== Accepts any string now
  label: string;
  render?: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function ReuseableTable<T extends Record<string, any>>({
  columns,
  data,
}: GenericTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-light-blue mb-[11px] p-0">
        <TableRow>
          {columns.map((col, colIndex) => (
            <TableHead
              key={col.key ? col.key.toString() : `col-${colIndex}`}
              className={`text-sm leading-[21px] font-semibold ${col.headerClassName || ''}`}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={row.id ?? rowIndex} className="border-none">
            {columns.map((col, colIndex) => (
              <TableCell
                key={
                  col.key ? col.key.toString() : `cell-${rowIndex}-${colIndex}`
                }
                className={`text-xs leading-[17px] font-normal ${col.cellClassName || ''}`}
              >
                {col.render
                  ? col.render(row)
                  : col.key
                    ? row[col.key as keyof T]
                    : ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
