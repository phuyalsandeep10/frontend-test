'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { showToast } from '@/shared/toast';

export interface SLAFormData {
  [key: string]: number | string;
}

export const timeUnitOptions = [
  { value: 'Minutes', label: 'Minutes' },
  { value: 'Hours', label: 'Hours' },
  { value: 'Days', label: 'Days' },
];

export function humanToSeconds(value: number, unit: string) {
  switch (unit) {
    case 'Minutes':
      return value * 60;
    case 'Hours':
      return value * 3600;
    case 'Days':
      return value * 86400;
    default:
      return value;
  }
}

export function secondsToHuman(seconds: number) {
  if (seconds < 3600)
    return { value: Math.round(seconds / 60), unit: 'Minutes' };
  if (seconds < 86400)
    return { value: Math.round(seconds / 3600), unit: 'Hours' };
  return { value: Math.round(seconds / 86400), unit: 'Days' };
}

function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = (...args: Parameters<T>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounced as T;
}

export function useSlaAutoSaveHook(slaList: any[]) {
  const { control, watch, setValue } = useForm<SLAFormData>({
    defaultValues: {},
  });

  const updateSlaMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await axiosInstance.patch(
        `/tickets/sla/${payload.sla_id}`,
        payload,
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      showToast({
        title: 'Saved',
        description: data?.message || 'SLA updated successfully!',
        variant: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to update SLA',
        variant: 'error',
      });
    },
  });

  // Initialize defaults
  useEffect(() => {
    if (!slaList?.length) return;
    slaList.forEach((sla: any) => {
      const key = sla.priority?.name || 'low';
      const response = secondsToHuman(Number(sla.response_time ?? 0));
      const resolution = secondsToHuman(Number(sla.resolution_time ?? 0));

      setValue(`${key}_responseTime`, response.value);
      setValue(`${key}_responseUnit`, response.unit);
      setValue(`${key}_resolutionTime`, resolution.value);
      setValue(`${key}_resolutionUnit`, resolution.unit);
    });
  }, [slaList, setValue]);

  // Debounced save only for the changed SLA row
  const saveDebounced = useDebounce(
    (
      slaId: number,
      priorityId: number,
      responseTime: number,
      responseUnit: string,
      resolutionTime: number,
      resolutionUnit: string,
    ) => {
      updateSlaMutation.mutate({
        sla_id: slaId,
        priority_id: priorityId,
        response_time: humanToSeconds(responseTime, responseUnit),
        resolution_time: humanToSeconds(resolutionTime, resolutionUnit),
      });
    },
    2000,
  );

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name) return; // no field name -> ignore

      // Extract priority key from field name
      const priorityKey = name.split('_')[0];
      const sla = slaList.find(
        (s: any) => (s.priority?.name || 'low') === priorityKey,
      );
      if (!sla) return;

      // Grab current values for this SLA row
      const responseTime = Number(values[`${priorityKey}_responseTime`] ?? 0);
      const responseUnit = String(
        values[`${priorityKey}_responseUnit`] ?? 'Minutes',
      );
      const resolutionTime = Number(
        values[`${priorityKey}_resolutionTime`] ?? 0,
      );
      const resolutionUnit = String(
        values[`${priorityKey}_resolutionUnit`] ?? 'Minutes',
      );

      // Only send the changed row
      saveDebounced(
        sla.id,
        sla.priority?.id || 0,
        responseTime,
        responseUnit,
        resolutionTime,
        resolutionUnit,
      );
    });

    return () => subscription.unsubscribe();
  }, [watch, slaList, saveDebounced]);

  return {
    control,
    timeUnitOptions,
    updateSlaMutation,
  };
}
