import { Form } from '@/components/ui/form';
import React, { SetStateAction, useState } from 'react';
import z from 'zod';
import { verifyEmailViaOtpFormSchema } from './verifyEmailViaOtpFormHelper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OTP from '@/components/common/hook-form/OTP';
import Button from '@/components/common/hook-form/Button';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';
import { toast } from 'sonner';
import { AuthService } from '@/services/auth/auth';

interface VerifyEmailViaOtpProps {
  email: string;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

const VerifyEmailViaOtpForm = ({
  email,
  setCurrentStep,
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
    const registerData = { ...values, email };
    verifyEmail(registerData, {
      onSuccess: (data) => {
        console.log(data);
        setHasError(false);
        setCurrentStep(2);
        toast.success(data?.message || 'Email verified successfully');
        const authToken = {
          accessToken: data?.data?.access_token,
          refreshToken: data?.data?.refresh_token,
        };
        AuthService.setAuthTokens(authToken);
        console.log('Verify email success:', data);
      },
      onError: (error: any) => {
        setHasError(true);
        toast.error(
          error?.response?.data?.message || 'Email verification failed',
        );
        console.log(error);
      },
    });
  };

  return (
    <div>
      <p className="text-theme-text-primary mb-8">
        We have sent mail with verification code to{' '}
        <span className="font-semibold"> *****@gmail.com.</span>
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
