'use client';

import React, { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { changePasswordModalSchema } from './ChangePasswordHelpter';
import HeadingSubHeadingTypography from '@/components/custom-components/Auth/RegisterForm/HeadingSubHeadingTypography';
import { StrongPasswordField } from '@/components/common/hook-form/StrongPasswordField';
import { Button } from '@/components/ui/button';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { toast } from 'sonner';

type ChangePasswordFormValues = z.infer<typeof changePasswordModalSchema>;

interface ChangePasswordModalProps {
  heading?: string;
  subHeading?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
  headingContainerClassName?: string;

  triggerButton?: React.ReactNode;

  cancelButtonText?: string;
  continueButtonText?: string;
  continuePendingText?: string;

  onSubmit?: (values: ChangePasswordFormValues) => Promise<void> | void;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  heading = 'Change Password',
  subHeading = 'Update password for enhance account security.',
  headingClassName = 'text-black font-medium text-[16px] leading-[26px]',
  subHeadingClassName = 'text-black text-[12px] leading-[17px] font-normal',
  headingContainerClassName = 'mb-[20px]',
  cancelButtonText = 'Cancel',
  continueButtonText = 'Continue',
  continuePendingText = 'Continuing...',
  open,
  setOpen,
}) => {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordModalSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    resetPassword(
      {
        old_password: values.old_password,
        new_password: values.new_password,
      },
      {
        onSuccess: (data) => {
          setOpen(false);
          toast.success(data?.data?.message || 'Password reset successfully!');
        },
        onError: (error: any) => {
          console.log(error);
          toast.error(
            error?.response?.data?.message || 'Password reset failed!',
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[344px] gap-0">
        <DialogHeader>
          <DialogTitle>
            <HeadingSubHeadingTypography
              heading={heading}
              subHeading={subHeading}
              headingClassName={headingClassName}
              subHeadingClassName={subHeadingClassName}
              containerClassName={headingContainerClassName}
            />
          </DialogTitle>
          <DialogClose className="absolute top-4 right-4" />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-4"
          >
            <StrongPasswordField
              control={form.control}
              name="old_password"
              label="Current password"
              required
              placeholder="**********"
              hideChecklist
              inputClassName="w-[301px]"
              showStrengthText={false}
            />

            <StrongPasswordField
              control={form.control}
              name="new_password"
              label="New password"
              required
              placeholder="**********"
              hideChecklist
              inputClassName="w-[301px]"
              showStrengthText={false}
            />

            <StrongPasswordField
              control={form.control}
              name="confirm_password"
              label="Confirm New Password"
              compareWith={form.watch('new_password')}
              required
              placeholder="**********"
              inputClassName="w-[301px]"
              showStrengthText={false}
              validationLines
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
                className="flex-1"
                size="sm"
                disabled={isPending}
              >
                {isPending ? continuePendingText : continueButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
