import { ROUTES } from '@/routes/routes';
import { OrganizationsService } from '@/services/organizations/organizations';
import { createOrganizationPayload } from '@/services/organizations/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useCreateOrganizations = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: createOrganizationPayload) =>
      OrganizationsService.createOrganizations(payload),
    onSuccess: (data) => {
      router.push(ROUTES.DASHBOARD);
      toast.success(data?.message || 'Organization created Successfully');
      console.log('Organization created Successfully', data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to create Organizations',
      );
      console.error('Error in organization creation:', error);
    },
  });
};
