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

const BusinessRegisterForm = () => {
  const router = useRouter();
  const {
    mutate: createOrganization,
    isPending,
    isError,
    error,
  } = useCreateOrganizations();
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

  console.log(isError, error);

  async function submitRegisterForm(
    values: z.infer<typeof businessRegisterFormSchema>,
  ) {
    createOrganization(values);
  }
  return (
    <div className="w-[516px]">
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
            type="text"
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
          <Button
            variant="default"
            type="submit"
            size="lg"
            className="mt-4 w-full"
          >
            {isPending ? 'Signing...' : 'Signup with chatboq'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BusinessRegisterForm;
