'use client';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/ui/Icons';
import ChangePasswordModal from '@/components/modal/ChangePassword/ChangePasswordModal';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import ConfirmModal from '@/components/custom-components/Dashboard/ConfirmModal/ConfirmModal';
import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';

import { useGenerateTwoFaOtp } from '@/hooks/auth/useGenerateTwoFaOtp';
import { useDisable2Fa } from '@/hooks/auth/useDisable2Fa';

export default function SecuritySection() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [open2FaAuthenticatorModal, setOpen2FaAuthenticatorModal] =
    useState(false);
  const [openConfirm2FaModal, setConfirm2FaModal] = useState(false);
  const [openDisable2FaModal, setOpenDisable2FaModal] = useState(false);

  const authData = useAuthStore((state) => state.authData);

  const {
    mutate: generate2FaOtp,
    isPending: generate2faOtpLoading,
    data: twoFaGeneratedOtpData,
  } = useGenerateTwoFaOtp();

  const { mutate: disable2Fa, isPending: disable2FaLoading } = useDisable2Fa();

  useEffect(() => {
    if (twoFaGeneratedOtpData && !generate2faOtpLoading) {
      setOpen2FaAuthenticatorModal(true);
      setConfirm2FaModal(false);
    }
  }, [twoFaGeneratedOtpData, generate2faOtpLoading]);

  return (
    <>
      <div>
        <h3 className="text-brand-dark text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
          Security
        </h3>

        <div className="mt-6">
          <div className="flex items-center gap-4">
            <Switch
              checked={authData?.data?.user?.two_fa_enabled}
              onCheckedChange={(checked) => {
                if (checked) {
                  setConfirm2FaModal(true);
                } else {
                  setOpenDisable2FaModal(true);
                }
              }}
              className="bg-brand-primary-switch data-[state=checked]:bg-brand-primary-switch"
            />
            <span className="text-brand-dark text-[16px] leading-[26px] font-medium">
              Two-factor authentication
            </span>
          </div>

          <Card className="border-theme-text-primary mt-[12px] h-12 w-[80%] rounded-md">
            <CardContent className="flex h-full items-center justify-between p-0">
              <div className="ml-[47px] flex items-center gap-2">
                <Icons.key className="h-5 w-5" />
                <span className="text-brand-dark text-[16px] leading-[26px] font-normal">
                  Change Password
                </span>
              </div>
              <div
                className="mr-[47px]"
                onClick={() => setOpenChangePasswordModal(true)}
              >
                <Icons.pencil className="text-brand-primary h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Signature Section */}
        <div className="mt-6">
          <h3 className="text-brand-dark text-[16px] leading-[26px] font-medium tracking-[0%]">
            Custom Signature
          </h3>

          <Card className="mt-5 h-12 w-[80%] rounded-md border-zinc-500">
            <CardContent className="flex h-full items-center justify-between p-0">
              <div className="ml-[47px] flex items-center gap-2">
                <Icons.key className="h-5 w-5" />
                <span className="text-brand-dark text-[16px] leading-[26px] font-normal tracking-[0%]">
                  Custom Signature
                </span>
              </div>
              <div className="mr-[47px]">
                <Icons.pencil className="text-brand-primary h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChangePasswordModal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
      />

      <ConfirmModal
        open={openConfirm2FaModal}
        setOpen={setConfirm2FaModal}
        loading={generate2faOtpLoading}
        onClick={() => generate2FaOtp()}
      />

      <ConfirmModal
        title="Are you sure?"
        subTitle="You want to disable two-factor authentication"
        open={openDisable2FaModal}
        setOpen={setOpenDisable2FaModal}
        onClick={() => disable2Fa()}
        loading={disable2FaLoading}
      />

      <AuthenticatorModal
        open={open2FaAuthenticatorModal}
        setOpen={setOpen2FaAuthenticatorModal}
        otpauth_url={twoFaGeneratedOtpData?.data?.['otp_auth_url'] || ''}
        cancelButtonText="Cancel"
        submitButtonText="Submit"
        submitPendingText="Submitting..."
      />
    </>
  );
}
