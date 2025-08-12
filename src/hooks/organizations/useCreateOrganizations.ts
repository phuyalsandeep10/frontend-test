import { ROUTES } from '@/routes/routes';
import { OrganizationsService } from '@/services/organizations/organizations';
import { createOrganizationPayload } from '@/services/organizations/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateOrganizations = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: createOrganizationPayload) =>
      OrganizationsService.createOrganizations(payload),
  });
};
