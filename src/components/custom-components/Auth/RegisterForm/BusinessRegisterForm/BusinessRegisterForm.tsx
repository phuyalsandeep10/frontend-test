import Button from '@/components/common/hook-form/Button';
import { InputField } from '@/components/common/hook-form/InputField';
import SelectableCardGroup from '@/components/common/hook-form/SelectableCard';
import { Form } from '@/components/ui/form';
import { useCreateOrganizations } from '@/hooks/organizations/useCreateOrganizations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { businessRegisterFormSchema } from './businessRegisterFormHelper';
import { ROUTES } from '@/routes/routes';
import { toast } from 'sonner';
import React, { SetStateAction } from 'react';
import { queryClient } from '@/providers/query-provider';

interface BusinessRegisterFormProps {
  from?: 'dashboard' | 'register';
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
}

const BusinessRegisterForm = ({ from, setOpen }: BusinessRegisterFormProps) => {
  const router = useRouter();
  const { mutate: createOrganization, isPending } = useCreateOrganizations();
  const businessRegisterForm = useForm<
    z.infer<typeof businessRegisterFormSchema>
  >({
    resolver: zodResolver(businessRegisterFormSchema),
    defaultValues: {
      name: '',
      domain: '',
      purpose: '',
    },
  });

  async function submitRegisterForm(
    values: z.infer<typeof businessRegisterFormSchema>,
  ) {
    createOrganization(values, {
      onSuccess: (data) => {
        if (from === 'dashboard' && setOpen) {
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ['authUser'] });
        } else {
          router.push(ROUTES.DASHBOARD);
        }
        toast.success(data?.message || 'Organization created Successfully');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to create Organizations',
        );
      },
    });
  }
  return (
    <div className={`pb-6 ${from === 'dashboard' ? 'w-full' : 'w-[516px]'}`}>
      <Form {...businessRegisterForm}>
        <form
          onSubmit={businessRegisterForm.handleSubmit(submitRegisterForm)}
          className="w-full space-y-5"
        >
          <InputField
            control={businessRegisterForm.control}
            name="name"
            label="Enter name of your Business"
            placeholder="Workspace/Business Name"
          />

          <InputField
            control={businessRegisterForm.control}
            name="domain"
            label="Enter your Business's Domain"
            type="url"
            placeholder="www.businessname.com"
            required
          />
          <SelectableCardGroup
            name="purpose"
            control={businessRegisterForm.control}
            label="Select your Purpose of using Chatboq"
            options={[
              'Chat with my website visitor, generate leads.',
              'Build AI Chatbot',
              'I am curious about the product',
              'I want to unify my inbox',
            ]}
          />
          {from === 'dashboard' ? (
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="mt-4 w-full"
            >
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          ) : (
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="mt-4 w-full"
            >
              {isPending ? 'Signing...' : 'Signup with chatboq'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default BusinessRegisterForm;
