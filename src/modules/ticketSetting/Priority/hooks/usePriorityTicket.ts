import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePriorities } from '@/modules/ticket/hooks/usePriorities';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { showToast } from '@/shared/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

// ---- API CALLS ----
const deletePriorityApi = async (id: number) => {
  const response = await axiosInstance.delete(`/tickets/priority/${id}`);
  return response.data;
};

export function usePrioritiesTicket() {
  const queryClient = useQueryClient();

  // ---- STATE ----
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [newPriorityBgColor, setNewPriorityBgColor] = useState('#000000');
  const [newPriorityTextColor, setNewPriorityTextColor] = useState('#ffffff');
  const [checkedPriority, setCheckedPriority] = useState<
    Record<number, boolean>
  >({});
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // ---- FORM ----
  const { control, handleSubmit, reset } = useForm<AddPriorityFormData>({
    defaultValues: { newPriorityName: '', level: '' },
  });

  // ---- FETCH PRIORITIES ----
  const { data, isLoading, isError, error } = usePriorities();

  useEffect(() => {
    if (data) {
      setPriorities(
        data.map((p: any) => ({
          id: String(p.id),
          name: p.name,
          darkColor: p.fg_color,
          lightColor: p.bg_color,
        })),
      );
    }
  }, [data]);

  // ---- OPTIONS ----
  const levelOptions = Array.from({ length: 11 }, (_, i) => ({
    value: String(i),
    label: String(i),
  }));

  // ---- UPDATE FUNCTIONS ----
  const updatePriorityName = useCallback((id: string, newName: string) => {
    setPriorities((prev) =>
      prev.map((priority) =>
        priority.id === id ? { ...priority, name: newName } : priority,
      ),
    );
  }, []);

  const updatePriorityColor = useCallback(
    (id: string, type: 'dark' | 'light', color: string) => {
      setPriorities((prev) =>
        prev.map((priority) =>
          priority.id === id
            ? {
                ...priority,
                [type === 'dark' ? 'darkColor' : 'lightColor']: color,
              }
            : priority,
        ),
      );
    },
    [],
  );

  // ---- ADD ----
  const onAddPriority = (formData: AddPriorityFormData) => {
    if (formData.newPriorityName.trim()) {
      const newPriority: PriorityItem = {
        id: Date.now().toString(),
        name: formData.newPriorityName,
        darkColor: newPriorityBgColor,
        lightColor: newPriorityTextColor,
      };
      setPriorities((prev) => [...prev, newPriority]);
      reset();
      setNewPriorityBgColor('#000000');
      setNewPriorityTextColor('#ffffff');
    }
  };

  // ---- SELECT ----
  const selectedIds = Object.entries(checkedPriority)
    .filter(([_, checked]) => checked)
    .map(([id]) => Number(id));

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCheckedPriority((prev) => ({ ...prev, [id]: isChecked }));
  };

  // ---- DELETE ----
  const { mutate: deletePriorities, isPending: isDeleting } = useMutation({
    mutationFn: async (ids: number[]) => {
      const responses = await Promise.all(
        ids.map((id) => deletePriorityApi(id)),
      );
      return responses; // you can return the API responses if needed
    },
    onSuccess: (responses: any) => {
      // Assuming API returns { success: boolean, message: string }
      const allSuccess = responses.every((res: any) => res.success !== false);

      showToast({
        title: allSuccess ? 'Deleted' : 'Warning',
        description: responses.map((res: any) => res.message).join(', '),
        variant: allSuccess ? 'success' : 'error',
      });

      queryClient.invalidateQueries({ queryKey: ['priorities'] });
      setCheckedPriority({});
      setDeleteModalOpen(false);
    },
    onError: (err: any) => {
      // Check if API returned a structured error
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to delete priority(s)';

      showToast({
        title: 'Error',
        description: message,
        variant: 'error',
      });
    },
  });

  const handleConfirmDelete = () => {
    if (selectedIds.length > 0) {
      deletePriorities(selectedIds);
    }
  };

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // ---- RETURN ----
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
    onAddPriority,
    isLoading,
    isError,
    error,
    checkedPriority,
    handleCheckChange,
    selectedIds,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleConfirmDelete,
    deletePriorities,
    isDeleting,
  };
}
