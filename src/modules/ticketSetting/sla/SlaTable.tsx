'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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

interface SlaTableProps {
  slaList: any[];
}

export default function SlaTable({ slaList }: SlaTableProps) {
  const { control, timeUnitOptions } = useSlaAutoSaveHook(slaList);

  const [alertBeforeBreach, setAlertBeforeBreach] = useState(true);
  const [alertAfterBreach, setAlertAfterBreach] = useState(true);

  return (
    <div>
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-brand-light hover:bg-brand-light text-brand-dark h-15 text-lg font-semibold">
              <TableHead>Priority</TableHead>
              <TableHead>Priority Name</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Resolution Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slaList?.map((sla: any) => {
              const key = sla.priority?.name || 'low';
              return (
                <TableRow key={sla.id}>
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
                  <TableCell>
                    {sla.name && (
                      <Badge className="font-outfit text-brand-dark bg-white text-xs leading-[16px] font-semibold">
                        {sla.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <InputField
                        control={control}
                        name={`${key}_responseTime`}
                        type="number"
                        className="border-grey-light h-9 w-28 text-sm"
                      />
                      <SelectField
                        control={control}
                        name={`${key}_responseUnit`}
                        options={timeUnitOptions}
                        className="border-grey-light h-9 w-28"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <InputField
                        control={control}
                        name={`${key}_resolutionTime`}
                        type="number"
                        className="border-grey-light h-9 w-28 text-sm"
                      />
                      <SelectField
                        control={control}
                        name={`${key}_resolutionUnit`}
                        options={timeUnitOptions}
                        className="border-grey-light h-9 w-28"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span>Alert when SLA is about to breach</span>
          <Switch
            checked={alertBeforeBreach}
            onCheckedChange={setAlertBeforeBreach}
            className="data-[state=checked]:bg-brand-primary-switch"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Alert when SLA has breached</span>
          <Switch
            checked={alertAfterBreach}
            onCheckedChange={setAlertAfterBreach}
            className="data-[state=checked]:bg-brand-primary-switch"
          />
        </div>
      </div>
    </div>
  );
}
