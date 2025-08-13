import { create } from 'zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';
import { showToast } from '@/shared/toast';
import { TicketFormData } from '@/modules/ticket/types/ticket.schema';

interface TicketState {
  createTicket: (
    data: TicketFormData,
    teamId: number,
    priorityId: number,
    memberIds: number[],
    customerId: number,
  ) => Promise<any>;
}
interface TicketPayload {
  // other fields
  customer_id?: number | null;
  customer_email?: string;
  // ...
}

const createTicket = async (
  data: TicketFormData,
  teamId: number,
  priorityId: number,
  memberIds: number[],
  customerId: number,
) => {
  let attachments: string[] = [];

  if (
    data.attachment &&
    Array.isArray(data.attachment) &&
    data.attachment.length > 0
  ) {
    const formData = new FormData();

    for (let i = 0; i < data.attachment.length; i++) {
      try {
        const dataUrl = data.attachment[i];
        console.log('Uploading image:', dataUrl.slice(0, 30) + '...'); // Preview

        // Extract MIME type
        const mimeType = dataUrl.split(';')[0].split(':')[1];
        const extension = mimeType === 'image/jpeg' ? 'jpg' : 'png';

        // Decode base64 to binary
        const base64Data = dataUrl.split(',')[1];
        const byteString = atob(base64Data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let j = 0; j < byteString.length; j++) {
          ia[j] = byteString.charCodeAt(j);
        }
        const blob = new Blob([ab], { type: mimeType });
        formData.append('files', blob, `image_${i + 1}.${extension}`);
      } catch (uploadErr) {
        console.error('Error processing image', uploadErr);
        throw uploadErr;
      }
    }

    try {
      const uploadResponse = await axiosInstance.post(
        '/upload/files',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log('Upload response:', uploadResponse.data);
      attachments = uploadResponse.data.data.files.map((file: any) => file.url);
    } catch (err) {
      console.error('Upload failed', err);
      throw err;
    }
  }

  const payload = {
    title: data.title,
    description: data.description,
    sender_domain: data.sender_domain,
    notes: data.notes || '',
    attachments: attachments,
    priority_id: priorityId,
    department_id: teamId,
    customer_id: customerId && customerId > 0 ? customerId : null,
    customer_name: data.customer_name || '',
    customer_email: data.customer_email,
    customer_phone: data.customer_phone || '',
    customer_location: data.customer_location || '',
    assignees: memberIds,
  };
  const cleanedPayload = {
    ...payload,
    customer_id:
      payload.customer_id && payload.customer_id > 0
        ? payload.customer_id
        : undefined,
    customer_email:
      payload.customer_id && payload.customer_id > 0
        ? undefined
        : payload.customer_email,
  };

  const response = await axiosInstance.post('/tickets/', cleanedPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const useTicketStore = create<TicketState>(() => ({
  createTicket: async (
    data: TicketFormData,
    teamId: number,
    priorityId: number,
    memberIds: number[],
    customerId: number,
  ) => {
    try {
      const response = await createTicket(
        data,
        teamId,
        priorityId,
        memberIds,
        customerId,
      );
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create ticket',
      );
    }
  },
}));

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      teamId,
      priorityId,
      memberIds,
      customerId,
    }: {
      data: TicketFormData;
      teamId: number;
      priorityId: number;
      memberIds: number[];
      customerId: number;
    }) => createTicket(data, teamId, priorityId, memberIds, customerId),
    onSuccess: (response: any) => {
      // Assuming your API response has { success: boolean, message: string, data: any }
      showToast({
        title: response.success ? 'Success' : 'Notice',
        description: response.message || 'Ticket created successfully!',
        variant: response.success ? 'success' : 'warning',
      });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to create ticket';
      showToast({
        title: 'Error',
        description: message,
        variant: 'error',
      });
    },
  });
};
