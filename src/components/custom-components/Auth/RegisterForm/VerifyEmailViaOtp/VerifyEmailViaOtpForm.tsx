import { Form } from '@/components/ui/form';
import React, { SetStateAction } from 'react';
import z from 'zod';
import { verifyEmailViaOtpFormSchema } from './verifyEmailViaOtpFormHelper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OTP from '@/components/common/hook-form/OTP';
import Button from '@/components/common/hook-form/Button';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';

interface VerifyEmailViaOtpProps {
  email: string;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

const VerifyEmailViaOtpForm = ({
  email,
  setCurrentStep,
}: VerifyEmailViaOtpProps) => {
  const {
    mutate: verifyEmail,
    isPending: verifyEmailPending,
    data: verifyEmailData,
  } = useVerifyEmail();
  const form = useForm<z.infer<typeof verifyEmailViaOtpFormSchema>>({
    resolver: zodResolver(verifyEmailViaOtpFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (values: any) => {
    const data = { ...values, email };
    verifyEmail(data);
    if (!verifyEmailPending) {
      setCurrentStep(2);
    }
  };
  return (
    <div>
      <p style={{ color: 'var(--color-theme-text-primary)' }} className="mb-8">
        We have sent mail with verification code to *****@gmail.com.
      </p>

      <div className="w-[516px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <OTP
              label="Enter OTP received in mail."
              required
              control={form.control}
              name="token"
            />
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="mt-4 w-full"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailViaOtpForm;
