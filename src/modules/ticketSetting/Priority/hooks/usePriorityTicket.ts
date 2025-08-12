import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePriorities } from '@/modules/ticket/hooks/usePriorities';

interface PriorityItem {
  id: string;
  name: string;
  darkColor: string;
  lightColor: string;
}

interface AddPriorityFormData {
  newPriorityName: string;
  level: string;
}

export function usePrioritiesTicket() {
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [newPriorityBgColor, setNewPriorityBgColor] = useState('#000000');
  const [newPriorityTextColor, setNewPriorityTextColor] = useState('#ffffff');

  const { control, handleSubmit, reset } = useForm<AddPriorityFormData>({
    defaultValues: {
      newPriorityName: '',
      level: '',
    },
  });

  const { data, isLoading, isError, error } = usePriorities();

  // Load API priorities into state
  useEffect(() => {
    if (data) {
      const mapped = data.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        darkColor: p.fg_color,
        lightColor: p.bg_color,
      }));
      setPriorities(mapped);
    }
  }, [data]);

  const levelOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '5', label: '5' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];

  const updatePriorityName = useCallback((id: string, newName: string) => {
    setPriorities((prev) =>
      prev.map((priority) =>
        priority.id === id ? { ...priority, name: newName } : priority,
      ),
    );
  }, []);

  const updatePriorityColor = useCallback(
    (id: string, colorType: 'dark' | 'light', color: string) => {
      setPriorities((prev) =>
        prev.map((priority) =>
          priority.id === id
            ? {
                ...priority,
                [colorType === 'dark' ? 'darkColor' : 'lightColor']: color,
              }
            : priority,
        ),
      );
    },
    [],
  );

  const deletePriority = useCallback((id: string) => {
    setPriorities((prev) => prev.filter((priority) => priority.id !== id));
  }, []);

  const onAddPriority = (data: AddPriorityFormData) => {
    if (data.newPriorityName.trim()) {
      const newPriority: PriorityItem = {
        id: Date.now().toString(),
        name: data.newPriorityName,
        darkColor: newPriorityBgColor,
        lightColor: newPriorityTextColor,
      };
      setPriorities((prev) => [...prev, newPriority]);
      reset();
      setNewPriorityBgColor('#000000');
      setNewPriorityTextColor('#ffffff');
    }
  };

  return {
    priorities,
    control,
    handleSubmit,
    reset,
    newPriorityBgColor,
    newPriorityTextColor,
    setNewPriorityBgColor,
    setNewPriorityTextColor,
    levelOptions,
    updatePriorityName,
    updatePriorityColor,
    deletePriority,
    onAddPriority,
    isLoading,
    isError,
    error,
  };
}
