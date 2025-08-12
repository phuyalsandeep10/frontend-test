'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface SLAFormData {
  low_responseTime: number;
  low_responseUnit: string;
  low_resolutionTime: number;
  low_resolutionUnit: string;
  low_calendar: string;
  high_responseTime: number;
  high_responseUnit: string;
  high_resolutionTime: number;
  high_resolutionUnit: string;
  high_calendar: string;
  medium_responseTime: number;
  medium_responseUnit: string;
  medium_resolutionTime: number;
  medium_resolutionUnit: string;
  medium_calendar: string;
  critical_responseTime: number;
  critical_responseUnit: string;
  critical_resolutionTime: number;
  critical_resolutionUnit: string;
  critical_calendar: string;
}

export default function SlaTable() {
  const { control, watch } = useForm<SLAFormData>({
    defaultValues: {
      low_responseTime: 4,
      low_responseUnit: 'Hours',
      low_resolutionTime: 24,
      low_resolutionUnit: 'Hours',
      low_calendar: 'Business Hours',
      high_responseTime: 4,
      high_responseUnit: 'Minutes',
      high_resolutionTime: 24,
      high_resolutionUnit: 'Minutes',
      high_calendar: '24/7',
      medium_responseTime: 4,
      medium_responseUnit: 'Days',
      medium_resolutionTime: 24,
      medium_resolutionUnit: 'Days',
      medium_calendar: 'Business Hours',
      critical_responseTime: 4,
      critical_responseUnit: 'Hours',
      critical_resolutionTime: 24,
      critical_resolutionUnit: 'Hours',
      critical_calendar: 'Business Hours',
    },
  });

  const [alertBeforeBreach, setAlertBeforeBreach] = useState(true);
  const [alertAfterBreach, setAlertAfterBreach] = useState(true);

  const timeUnitOptions = [
    { value: 'Minutes', label: 'Minutes' },
    { value: 'Hours', label: 'Hours' },
    { value: 'Days', label: 'Days' },
  ];

  //   const calendarOptions = [
  //     { value: 'Business Hours', label: 'Business Hours' },
  //     { value: '24/7', label: '24/7' },
  //   ];

  const priorities = [
    {
      key: 'low',
      label: 'Low',
      badgeClass: 'bg-green-100 text-green-800 hover:bg-green-100',
    },
    {
      key: 'high',
      label: 'High',
      badgeClass: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    },
    {
      key: 'medium',
      label: 'Medium',
      badgeClass: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    },
    {
      key: 'critical',
      label: 'Critical',
      badgeClass: 'bg-red-100 text-red-800 hover:bg-red-100',
    },
  ];

  return (
    <div className="">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader className="ml-2.5">
            <TableRow className="bg-brand-light font-outfit font-semibolds text-brand-dark h-15 text-lg">
              <TableHead>Priority</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Resolution Time</TableHead>
              {/* <TableHead className="font-medium text-gray-800">
                Calendar
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorities.map((priority) => (
              <TableRow key={priority.key} className="">
                <TableCell>
                  <Badge className={priority.badgeClass}>
                    {priority.label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-end gap-2">
                    <InputField
                      control={control}
                      name={`${priority.key}_responseTime` as keyof SLAFormData}
                      type="number"
                      className="w-28"
                      inputClassName="h-9"
                    />
                    <SelectField
                      control={control}
                      name={`${priority.key}_responseUnit` as keyof SLAFormData}
                      options={timeUnitOptions}
                      className="w-28"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="mb-5 flex items-end gap-2">
                    <InputField
                      control={control}
                      name={
                        `${priority.key}_resolutionTime` as keyof SLAFormData
                      }
                      type="number"
                      className="w-28"
                      inputClassName="h-9"
                    />
                    <SelectField
                      control={control}
                      name={
                        `${priority.key}_resolutionUnit` as keyof SLAFormData
                      }
                      options={timeUnitOptions}
                      className="w-28"
                    />
                  </div>
                </TableCell>

                {/* <TableCell>
                  <SelectField
                    control={control}
                    name={`${priority.key}_calendar` as keyof SLAFormData}
                    options={calendarOptions}
                    className="w-40"
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Alert Settings */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-outfit text-brand-dark text-base font-normal">
            Alert when SLA is about to breach
          </span>
          <Switch
            checked={alertBeforeBreach}
            onCheckedChange={setAlertBeforeBreach}
            className="data-[state=checked]:bg-brand-primary-switch"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-outfit text-brand-dark text-base font-normal">
            Alert when SLA has breached
          </span>
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
