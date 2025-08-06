'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyEmail } from '@/hooks/auth/useVerifyEmail';
import { Form } from '@/components/ui/form';
import OTP from '@/components/common/hook-form/OTP';
import { Button } from '@/components/ui/button';
import { emailVerifyFormSchema } from '../../Auth/EmailVerifyForm/emailVerifyFormHelper';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface VerifyEmailModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyEmailModal = ({ open, setOpen }: VerifyEmailModalProps) => {
  const [hasError, setHasError] = useState(false);

  const { mutate: verifyEmail, isPending: verifyEmailPending } =
    useVerifyEmail();
  const authData = useAuthStore((state) => state.authData);

  console.log('Hello for Modal', authData);

  const form = useForm<z.infer<typeof emailVerifyFormSchema>>({
    resolver: zodResolver(emailVerifyFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (values: any) => {
    const verifyEmailData = { ...values, email: authData?.data?.user?.email };

    verifyEmail(verifyEmailData, {
      onSuccess: (data) => {
        console.log(data);
        setHasError(false);
        toast.success('Email Verified Successfully.');
        setOpen(false);
        //TODO: Save response in localstorage
        // AuthService.setUserToLocalStorage()
      },
      onError: (error: any) => {
        console.log(error);
        setHasError(true);
        toast.error(error.response?.data?.message);
      },
    });
  };

  const sendOtp = () => {
    console.log('sending otp...');
  };

  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent
        className="w-full p-6 sm:max-w-[600px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Verify Your Email
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-full w-full">
          <p className="text-muted-foreground mb-2 text-center text-sm">
            Please enter the 6-digit code sent to your email:{' '}
            <strong>{authData?.data?.user?.email || 'your email'}</strong>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <OTP
                label="Enter OTP received in mail"
                required
                control={form.control}
                name="token"
                hasError={hasError}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={verifyEmailPending}
              >
                {verifyEmailPending ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <Button
              type="button"
              variant={'outline'}
              className="w-full"
              onClick={sendOtp}
            >
              Resend OTP
            </Button>
          </div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerifyEmailModal;
