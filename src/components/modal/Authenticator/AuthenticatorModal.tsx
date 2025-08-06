import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import QRCode from 'qrcode';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

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
}

const AuthenticatorModal: React.FC<AuthenticatorModalProps> = ({
  cancelButtonText,
  submitButtonText,
  submitPendingText,
  open,
  setOpen,
  otpauth_url,
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
          toast.success(data?.message || 'Otp verification successful');
          queryClient.invalidateQueries({ queryKey: ['authUser'] });
          setOpen(false);
        },
        onError: (error: any) => {
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
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="font-outfit w-[344px] gap-0"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="mb-5">
              <h1 className="text-[16px] leading-6.5 font-medium text-black">
                Authenticator Setup
              </h1>
              <p className="text-xs leading-4.5 font-normal text-black">
                Set authentication via authenticator app
              </p>
            </div>
          </DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>
        <p className="text-center text-sm font-medium text-black">
          Scan the QR to setup authentication
        </p>
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-[53px]"
          >
            <OTP
              control={form.control}
              name="token"
              hasError={hasError}
              width="44px"
              height="44px"
              gap="2"
              textSize="18px"
            />

            <DialogFooter className="mt-4 flex gap-[34px]">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {cancelButtonText}
              </Button>

              <Button
                type="submit"
                variant="default"
                size="sm"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? submitPendingText : submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticatorModal;
