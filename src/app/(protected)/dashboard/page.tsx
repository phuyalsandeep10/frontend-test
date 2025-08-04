'use client';

import ChangePasswordModal from '@/components/modal/ChangePassword/ChangePasswordModal';
import { Button } from '@/components/ui/button';
import { useGenerateTwoFaOtp } from '@/hooks/auth/useGenerateTwoFaOtp';
import { useDisable2Fa } from '@/hooks/auth/useDisable2Fa';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';

const DashboardPage = () => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [open2FaDialog, setOpen2FaDialog] = useState(false);
  const [openConfirm2FaModal, setConfirm2FaModal] = useState(false);
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);
  const [is2FaEnabled, setIs2FaEnabled] = useState(false);
  const [is2FaDisabled, setIs2FaDisabled] = useState(false);

  const {
    mutate: generate2FaOtp,
    isPending: generate2faOtpLoading,
    data: twoFaGeneratedOtpData,
  } = useGenerateTwoFaOtp();

  const { mutate: disable2Fa, isPending: disable2FaLoading } = useDisable2Fa();
  const authData = useAuthStore((state) => state.authData);
  const user = authData?.data?.user;
  useEffect(() => {
    if (twoFaGeneratedOtpData && !generate2faOtpLoading) {
      setOpen2FaAuthenticatorModal(true);
      setConfirm2FaModal(false);
    }
  }, [twoFaGeneratedOtpData, generate2faOtpLoading]);

  useEffect(() => {
    if (user) {
      setIs2FaEnabled(user.two_fa_enabled);
    }
  }, [user]);

  return (
    <div>
      <div className="mb-4 text-xl">User Dashboard</div>

      <div className="mb-6 flex gap-4">
        <Button onClick={() => setOpenPasswordModal(true)}>
          Change Password
        </Button>

        {user?.two_fa_enabled ? (
          <Button
            onClick={() => disable2Fa()}
            variant="outline"
            className="w-fit cursor-pointer"
          >
            {disable2FaLoading ? 'Disabling...' : 'Disable 2FA'}
          </Button>
        ) : (
          <Button
            onClick={() => generate2FaOtp()}
            variant="secondary"
            className="w-fit cursor-pointer"
          >
            {generate2faOtpLoading ? 'Enabling...' : 'Enable 2FA'}
          </Button>
        )}

        {/* {!user?.two_fa_enabled ? (
          <div className="flex items-center space-x-2">
            <Switch
              id="enable2Fa"
              checked={is2FaEnabled}
              onCheckedChange={() => setConfirm2FaModal(true)}
            />
            <Label htmlFor="enable2Fa">Enable 2Fa</Label>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Switch
              id="disable2Fa"
              checked={is2FaDisabled}
              onCheckedChange={() => setIs2FaDisabled(true)}
            />
            <Label htmlFor="disable2Fa">Disable 2Fa</Label>
          </div>
        )} */}
      </div>

      <ChangePasswordModal
        open={openPasswordModal}
        setOpen={setOpenPasswordModal}
      />

      {/* <TwoFactorAuthenticationDialog
        open={open2FaDialog}
        closeModal={() => setOpen2FaDialog(false)}
        otpauth_url={twoFaGeneratedOtpData?.['2fa_otp_auth_url'] || ''}
        base32={twoFaGeneratedOtpData?.['2fa_secrete'] || ''}
      /> */}

      <AlertDialog open={openConfirm2FaModal} onOpenChange={setConfirm2FaModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will enable two factor authentication
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirm2FaModal(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => generate2FaOtp()}
              disabled={generate2faOtpLoading}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={twoFaGeneratedOtpData?.['2fa_otp_auth_url'] || ''}
      />
    </div>
  );
};

export default DashboardPage;
