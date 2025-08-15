'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InputField } from '@/components/common/hook-form/InputField';
import { SelectField } from '@/components/common/hook-form/SelectField';
import { useSlaAutoSaveHook } from './hooks/useSlaAutoSave';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface SlaTableProps {
  slaList: any[];
}

export default function SlaTable({ slaList }: SlaTableProps) {
  const { control, timeUnitOptions } = useSlaAutoSaveHook(slaList);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [showNewRow, setShowNewRow] = useState(false); // Controls new SLA row visibility

  const toggleRowSelection = (id: number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedRows(newSelection);
  };

  const handleDelete = () => {
    console.log('Deleting selected rows:', Array.from(selectedRows));
    setSelectedRows(new Set());
  };

  const handleCancel = () => {
    setSelectedRows(new Set());
  };

  const handleAddNewRow = () => {
    setShowNewRow(true);
  };

  const isAnySelected = selectedRows.size > 0;

  return (
    <div>
      <div>
        <h1 className="font-outfit text-brand-dark text-xl font-semibold">
          SLA (Service Level Agreement)
        </h1>
        <div className="flex gap-20 text-justify">
          <p className="font-outfit text-brand-dark mt-1 text-xs font-normal">
            Define the maximum allowed time for the first reply (Response Time)
            and the time within which the issue must be completely resolved
            (Resolution Time). These times are crucial for maintaining service
            quality.
          </p>
          <Button
            type="button"
            onClick={handleAddNewRow}
            className="hover:bg-brand-primary/90 flex w-25 cursor-pointer items-center px-6 py-3 text-white"
          >
            <Icons.plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      {isAnySelected && (
        <div className="mt-5 mb-3 flex items-center justify-between">
          {/* Left: Selected count */}
          <div>
            <span className="font-outfit text-brand-primary text-base">
              {selectedRows.size} Selected
            </span>
          </div>

          {/* Right: Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-gray-primary text-brand-dark text-baset- w-17 font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="w-25 text-base font-semibold"
            >
              <Icons.delete_bin_fill />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-light hover:bg-brand-light text-brand-dark h-15 text-lg font-semibold">
              <TableHead className="w-12"></TableHead>
              <TableHead>SLA Name</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Resolution Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {slaList?.map((sla: any) => {
              const isSelected = selectedRows.has(sla.id);
              const key = sla.priority?.name || `sla-${sla.id}`;
              return (
                <TableRow
                  key={sla.id}
                  className={
                    isSelected
                      ? 'bg-secondary-hover hover:bg-secondary-hover'
                      : ''
                  }
                >
                  {/* Checkbox cell */}
                  <TableCell className="flex justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRowSelection(sla.id)}
                      className={cn(
                        'mt-2 h-5 w-5 rounded border',
                        'data-[state=checked]:bg-brand-primary',
                        'data-[state=checked]:border-brand-primary',
                      )}
                    />
                  </TableCell>

                  {/* SLA Name */}
                  <TableCell>
                    {sla.name && (
                      <Badge className="font-outfit text-brand-dark bg-white text-xs leading-[16px] font-semibold">
                        {sla.name}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Priority */}
                  <TableCell>
                    {sla.priority?.name && (
                      <Badge
                        className="font-outfit px-2 py-1 text-xs leading-[16px] font-semibold"
                        style={{
                          backgroundColor: sla.priority.bg_color,
                          color: sla.priority.fg_color,
                          textTransform: 'capitalize',
                        }}
                      >
                        {sla.priority.name}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Response Time */}
                  <TableCell>
                    <div className="font-outfit text-disabled-foreground flex gap-2 text-sm font-medium">
                      <InputField
                        control={control}
                        name={`${key}_responseTime`}
                        type="number"
                        className="border-grey-light h-9 w-28 text-sm"
                      />
                      <SelectField
                        control={control}
                        name={`${key}_responseUnit`}
                        options={timeUnitOptions ?? []}
                        className="border-grey-light h-9 w-28"
                      />
                    </div>
                  </TableCell>

                  {/* Resolution Time */}
                  <TableCell>
                    <div className="font-outfit text-disabled-foreground flex gap-2 text-sm font-medium">
                      <InputField
                        control={control}
                        name={`${key}_resolutionTime`}
                        type="number"
                        className="border-grey-light h-9 w-28 text-sm"
                      />
                      <SelectField
                        control={control}
                        name={`${key}_resolutionUnit`}
                        options={timeUnitOptions ?? []}
                        className="border-grey-light h-9 w-28"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* New SLA Row */}
            {showNewRow && (
              <TableRow className="hover:bg-brand-light bg-white">
                <TableCell className="flex justify-center">
                  <Checkbox
                    checked={false}
                    onCheckedChange={() => {}}
                    className={cn(
                      'mt-2 h-5 w-5 rounded border',
                      'data-[state=checked]:bg-brand-primary',
                      'data-[state=checked]:border-brand-primary',
                    )}
                  />
                </TableCell>

                <TableCell>
                  <InputField
                    control={control}
                    name={`new_sla_name`}
                    placeholder="Enter SLA Name"
                    className="border-grey-light h-9 w-full text-sm"
                  />
                </TableCell>

                <TableCell>
                  <SelectField
                    control={control}
                    name={`new_sla_priority`}
                    options={[
                      { value: 'Low', label: 'Low' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'High', label: 'High' },
                    ]}
                    className="border-grey-light h-9 w-full text-sm"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <InputField
                      control={control}
                      name={`new_sla_responseTime`}
                      type="number"
                      className="border-grey-light h-9 w-28 text-sm"
                    />
                    <SelectField
                      control={control}
                      name={`new_sla_responseUnit`}
                      options={timeUnitOptions ?? []}
                      className="border-grey-light h-9 w-28 text-sm"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <InputField
                      control={control}
                      name={`new_sla_resolutionTime`}
                      type="number"
                      className="border-grey-light h-9 w-28 text-sm"
                    />
                    <SelectField
                      control={control}
                      name={`new_sla_resolutionUnit`}
                      options={timeUnitOptions ?? []}
                      className="border-grey-light h-9 w-28 text-sm"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
