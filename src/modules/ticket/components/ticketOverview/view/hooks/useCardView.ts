import { useState, useMemo } from 'react';
import { TicketCardProps } from '@/modules/ticket/types/type';
import { useTicketStatuses } from '@/modules/ticket/hooks/useTicketStatus';
import { useTickets } from '@/modules/ticket/hooks/getApi/useTicket';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { showToast } from '@/shared/toast';

const deleteTicket = async (id: number) => {
  const response = await axiosInstance.delete(`/tickets/${id}`);
  return response.data;
};

export function useCardView() {
  const queryClient = useQueryClient();

  // Load ticket statuses
  const {
    data: statuses = [],
    isLoading: statusLoading,
    error: statusError,
  } = useTicketStatuses();

  // Selected status tab
  const [selectedStatus, setSelectedStatus] =
    useState<TicketCardProps['status']>('ALL');

  // Map status name to ID
  const statusMap = useMemo(() => {
    const map: Record<string, number> = {};
    statuses.forEach((s) => {
      map[s.name] = s.id;
    });
    return map;
  }, [statuses]);

  const selectedStatusId =
    selectedStatus === 'ALL' ? undefined : statusMap[selectedStatus];

  // Fetch tickets based on selected status
  const {
    data: tickets = [],
    isLoading: ticketsLoading,
    error: ticketsError,
  } = useTickets(selectedStatusId);

  // Checkbox state for selected tickets
  const [checkedTickets, setCheckedTickets] = useState<Record<number, boolean>>(
    {},
  );

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCheckedTickets((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  // Format date to "time ago"
  function formatTimeAgo(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  // Get selected ticket IDs and ticket data
  const selectedTicketIds = Object.entries(checkedTickets)
    .filter(([_, checked]) => checked)
    .map(([id]) => Number(id));

  const selectedTickets = tickets.filter((t) =>
    selectedTicketIds.includes(t.id),
  );

  const deleteTicketName = selectedTickets.length
    ? selectedTickets[0].title
    : '';

  const selectedCountInCurrentTab = selectedTickets.length;

  // Delete modal state
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // React Query mutation for deleting tickets
  const { mutate: deleteTickets, isPending: isDeleting } = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => deleteTicket(id)));
    },
    onSuccess: () => {
      showToast({
        title: 'Deleted',
        description: 'Ticket(s) deleted successfully',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      setCheckedTickets({});
      closeDeleteModal();
    },
    onError: (error: any) => {
      showToast({
        title: 'Error',
        description: error.message || 'Failed to delete ticket(s)',
        variant: 'error',
      });
    },
  });

  const handleConfirmDelete = () => {
    if (selectedTicketIds.length > 0) {
      deleteTickets(selectedTicketIds);
    }
  };

  // Tabs for status filtering
  const tabs = [
    { label: 'ALL', status: 'ALL' as TicketCardProps['status'] },
    ...statuses.map((s) => ({
      label: s.name,
      status: s.name as TicketCardProps['status'],
    })),
  ];

  return {
    // Loading and error states
    statusLoading,
    statusError,
    ticketsLoading,
    ticketsError,

    // Tickets and filtering
    tickets,
    selectedStatus,
    setSelectedStatus,
    tabs,

    // Selection states and handlers
    checkedTickets,
    handleCheckChange,
    selectedCountInCurrentTab,

    // Delete modal states and handlers
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteTicketName,
    handleConfirmDelete,
    isDeleting,

    // Utilities
    formatTimeAgo,
  };
}
