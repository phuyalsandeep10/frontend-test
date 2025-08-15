'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSlaStore, useSla } from './useSla';
import type { SLAFormData } from './useSlaAutoSave';

export const timeUnitOptions = [
  { value: 'Minutes', label: 'Minutes' },
  { value: 'Hours', label: 'Hours' },
  { value: 'Days', label: 'Days' },
];

export function secondsToHuman(seconds: number) {
  if (seconds < 3600)
    return { value: Math.round(seconds / 60), unit: 'Minutes' };
  if (seconds < 86400)
    return { value: Math.round(seconds / 3600), unit: 'Hours' };
  return { value: Math.round(seconds / 86400), unit: 'Days' };
}

// Custom hook to encapsulate SLA form logic
export function useSlaLogic() {
  const { data: slaData, isLoading } = useSla(); // if you need it for fetching
  const slaList = useSlaStore((state) => state.slaList);

  const { control, reset } = useForm<SLAFormData>({ defaultValues: {} });

  const [alertBeforeBreach, setAlertBeforeBreach] = useState(true);
  const [alertAfterBreach, setAlertAfterBreach] = useState(true);

  useEffect(() => {
    if (!slaList?.length) return;

    const mappedDefaults: Record<string, any> = {};
    slaList.forEach((sla: any) => {
      const key = sla.priority?.name || 'low';
      const response = secondsToHuman(Number(sla.response_time ?? 0));
      const resolution = secondsToHuman(Number(sla.resolution_time ?? 0));

      mappedDefaults[`${key}_responseTime`] = response.value;
      mappedDefaults[`${key}_responseUnit`] = response.unit;
      mappedDefaults[`${key}_resolutionTime`] = resolution.value;
      mappedDefaults[`${key}_resolutionUnit`] = resolution.unit;
    });

    reset(mappedDefaults);
  }, [slaList, reset]);

  return {
    slaList,
    isLoading,
    control,
    alertBeforeBreach,
    setAlertBeforeBreach,
    alertAfterBreach,
    setAlertAfterBreach,
    timeUnitOptions,
  };
}
