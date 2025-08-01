import { Form } from '@/components/ui/form';
import React, { SetStateAction, useState } from 'react';
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
  setOtpError: React.Dispatch<React.SetStateAction<string | null>>;
}

const VerifyEmailViaOtpForm = ({
  email,
  setCurrentStep,
  setOtpError,
}: VerifyEmailViaOtpProps) => {
  const [hasError, setHasError] = useState(false);
  const { mutate: verifyEmail, isPending: verifyEmailPending } =
    useVerifyEmail();
  const form = useForm<z.infer<typeof verifyEmailViaOtpFormSchema>>({
    resolver: zodResolver(verifyEmailViaOtpFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (values: any) => {
    const data = { ...values, email };
    verifyEmail(data, {
      onSuccess: () => {
        setHasError(false);
        setCurrentStep(2);
      },
      onError: (error) => {
        setHasError(true);
        setOtpError(
          "We couldn't validate the code you provided. Kindly recheck and enter it again.",
        );
        console.log(error);
      },
    });
  };

  return (
    <div>
      <p className="text-theme-text-primary mb-8">
        We have sent mail with verification code to *****@gmail.com.
      </p>

      <div className="w-[489px]">
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
              hasError={hasError}
            />
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="mt-4 w-full"
            >
              {verifyEmailPending ? 'Verifying...' : 'Continue'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailViaOtpForm;
