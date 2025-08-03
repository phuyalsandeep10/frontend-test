'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import { useVerifyTwoFaOtp } from '@/hooks/auth/useVerifyTwoFaOtp';

const twoFactorAuthSchema = object({
  token: string().min(1, 'Authentication code is required'),
});
type TwoFactorAuthInput = z.infer<typeof twoFactorAuthSchema>;

type TwoFactorAuthProps = {
  open: boolean;
  otpauth_url: string;
  base32?: string;
  closeModal: () => void;
};

const TwoFactorAuthenticationDialog: React.FC<TwoFactorAuthProps> = ({
  open,
  otpauth_url,
  base32,
  closeModal,
}) => {
  const [qrcodeUrl, setQrCodeUrl] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<TwoFactorAuthInput>({
    resolver: zodResolver(twoFactorAuthSchema),
  });

  const { mutate: verify2faOtp, isPending } = useVerifyTwoFaOtp();

  const onSubmitHandler: SubmitHandler<TwoFactorAuthInput> = (values) => {
    verify2faOtp({
      token: values.token,
    });
    if (!isPending) {
      closeModal();
      setValue('token', '');
      if (pathname !== ROUTES.DASHBOARD) {
        router.replace(ROUTES.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    if (otpauth_url) {
      QRCode.toDataURL(otpauth_url)
        .then(setQrCodeUrl)
        .catch((err) => {
          console.error('Failed to generate QR Code:', err);
        });
    }
    setFocus('token');
  }, [otpauth_url, setFocus]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication (2FA)</DialogTitle>
          <DialogDescription>
            Configure Google Authenticator or Authy and enter your code to
            verify.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <ol className="list-inside list-decimal space-y-1">
            <li>Install Google Authenticator (iOS/Android) or Authy.</li>
            <li>Open the app and click the &quot;+&quot; icon.</li>
            <li>Choose &quot;Scan a barcode&quot; and scan the QR below.</li>
          </ol>

          <div className="flex justify-center py-2">
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

          <div>
            <p className="font-medium">Or Enter Key Manually:</p>
            <p className="text-muted-foreground break-all">
              SecretKey: {base32}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-4 pt-2"
          >
            <div className="grid gap-2">
              <Label htmlFor="token">Authentication Code</Label>
              <Input
                id="token"
                type="text"
                placeholder="123 456"
                {...register('token')}
              />
              {errors.token && (
                <p className="text-sm text-red-500">{errors.token.message}</p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Verifying...' : 'Verify & Activate'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthenticationDialog;
