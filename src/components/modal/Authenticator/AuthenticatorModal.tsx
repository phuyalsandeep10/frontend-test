import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import QRCode from 'qrcode';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import OTP from '@/components/common/hook-form/OTP';
import { AuthenticatorSchema } from './AuthenticatorHelpter';
import { z } from 'zod';
import { useVerifyTwoFaOtp } from '@/hooks/auth/useVerifyTwoFaOtp';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { queryClient } from '@/providers/query-provider';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type AuthenticatorFormValues = z.infer<typeof AuthenticatorSchema>;

interface AuthenticatorModalProps {
  heading?: string;
  subHeading?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
  headingContainerClassName?: string;
  cancelButtonText?: string;
  submitButtonText?: string;
  submitPendingText?: string;
  open: boolean;
  setOpen: any;
  otpauth_url: string;
  from?: 'dashboard' | 'profile';
}

const AuthenticatorModal: React.FC<AuthenticatorModalProps> = ({
  cancelButtonText,
  submitButtonText,
  submitPendingText,
  open,
  setOpen,
  otpauth_url,
  from,
}) => {
  const [qrcodeUrl, setQrCodeUrl] = useState('');
  const form = useForm<AuthenticatorFormValues>({
    resolver: zodResolver(AuthenticatorSchema),
    defaultValues: { token: '' },
  });

  const { mutate: verify2faOtp, isPending } = useVerifyTwoFaOtp();

  const handleSubmit = async (values: AuthenticatorFormValues) => {
    verify2faOtp(
      {
        token: values.token,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data?.message || 'Otp verification successful');
          queryClient.invalidateQueries({ queryKey: ['authUser'] });
          form.reset();
          setOpen(false);
        },
        onError: (error: any) => {
          console.log(error);
          toast.error(error?.response?.data?.message || 'Failed to verify otp');
          console.error('2fa otp verify error:', error);
        },
      },
    );
  };

  const hasError = !!form.formState.errors.token;

  useEffect(() => {
    if (otpauth_url) {
      QRCode.toDataURL(otpauth_url)
        .then(setQrCodeUrl)
        .catch((err) => {
          console.error('Failed to generate QR Code:', err);
        });
    }
  }, [otpauth_url]);

  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent
        className="font-outfit w-[344px] gap-0"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="mb-5">
              <h1 className="text-[16px] leading-6.5 font-medium text-black">
                Authenticator Setup
              </h1>
              <p className="text-xs leading-4.5 font-normal text-black">
                Set authentication via authenticator app
              </p>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        {from !== 'dashboard' && (
          <p className="text-center text-sm font-medium text-black">
            Scan the QR to setup authentication
          </p>
        )}

        {from !== 'dashboard' && (
          <div className="flex justify-center">
            {qrcodeUrl ? (
              <Image
                src={qrcodeUrl}
                alt="QR Code"
                className="h-40 w-40"
                height={160}
                width={160}
              />
            ) : (
              <Skeleton className="h-40 w-40" />
            )}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={`w-full ${from === 'dashboard' ? 'space-y-0' : 'space-y-[53px]'}`}
          >
            <OTP
              control={form.control}
              name="token"
              hasError={hasError}
              width="44px"
              height="44px"
              gap="2"
              textSize="18px"
              labelClassName={from === 'dashboard' ? 'mb-0' : 'mb-6'}
            />

            <AlertDialogFooter className="mt-4 flex gap-[34px]">
              {/* <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {cancelButtonText}
              </Button> */}

              <Button
                type="submit"
                variant="default"
                size="sm"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? submitPendingText : submitButtonText}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthenticatorModal;
