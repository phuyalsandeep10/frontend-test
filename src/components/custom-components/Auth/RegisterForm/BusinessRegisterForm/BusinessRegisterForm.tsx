import React from 'react';
import { useForm } from 'react-hook-form';
import { businessRegisterFormSchema } from './businessRegisterFormHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import z from 'zod';
import { InputField } from '@/components/common/hook-form/InputField';
import SelectableCardGroup from '@/components/common/hook-form/SelectableCard';
import Button from '@/components/common/hook-form/Button';

const BusinessRegisterForm = () => {
  const businessRegisterForm = useForm<
    z.infer<typeof businessRegisterFormSchema>
  >({
    resolver: zodResolver(businessRegisterFormSchema),
    defaultValues: {
      businessName: '',
      businessDomain: '',
      selectedPlan: '',
    },
  });

  async function submitRegisterForm(
    values: z.infer<typeof businessRegisterFormSchema>,
  ) {
    //Api is remaining for business register
    console.log(values);
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
            name="businessName"
            label="Enter name of your Business"
            placeholder="Workspace/Business Name"
          />

          <InputField
            control={businessRegisterForm.control}
            name="businessDomain"
            label="Enter your Business's Domain"
            type="email"
            placeholder="www.businessname.com"
            required
          />
          <SelectableCardGroup
            name="selectedPlan"
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
            Signup with chatboq
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BusinessRegisterForm;
