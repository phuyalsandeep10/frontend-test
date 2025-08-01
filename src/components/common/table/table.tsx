'use client';
import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/Icons';

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  showSearch?: boolean;
  showFilterIcon?: boolean;
  customFilterIcon?: React.ReactNode;
  placeholderText?: string;
  onFilterClick?: (e: React.MouseEvent) => void;
};

function DataTable<TData>({
  columns,
  data,
  showSearch = true,
  showFilterIcon = true,
  customFilterIcon,
  placeholderText = 'Search by Visitor...',
  onFilterClick,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  const handleFilterClick = (e: React.MouseEvent) => {
    setFilterActive((prev) => !prev);
    onFilterClick?.(e);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      {(showSearch || showFilterIcon) && (
        <div className="mb-[33px] flex items-center justify-between">
          {showFilterIcon ? (
            <div
              onClick={handleFilterClick}
              className={`cursor-pointer rounded p-1 ${filterActive ? 'text-brand-primary' : 'text-theme-text-primary'}`}
            >
              {customFilterIcon ? (
                customFilterIcon
              ) : (
                <Icons.filter className="h-6 w-6" />
              )}
            </div>
          ) : (
            <div />
          )}

          {showSearch && (
            <div className="relative w-[269px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icons.search className="text-theme-text-primary h-5 w-5" />
              </div>
              <Input
                placeholder={placeholderText}
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="text-theme-text-primary border-grey-light w-full rounded-[8px] pl-10"
              />
            </div>
          )}
        </div>
      )}

      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-light hover:bg-light border-none"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-theme-text-primary border-none text-[14px] leading-[21px] font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-none">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-theme-text-primary border-none pl-[8px] text-[12px] leading-[17px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-none">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 border-none text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
