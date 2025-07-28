import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import HeadingSubHeadingTypography from '@/components/custom-components/Auth/RegisterForm/HeadingSubHeadingTypography';
import { Button } from '@/components/ui/button';
import OTP from '@/components/common/hook-form/OTP';
import { AuthenticatorSchema } from './AuthenticatorHelpter';
import { z } from 'zod';

type AuthenticatorFormValues = z.infer<typeof AuthenticatorSchema>;

interface AuthenticatorModalProps {
  heading?: string;
  subHeading?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
  headingContainerClassName?: string;

  triggerButton?: React.ReactNode;

  cancelButtonText?: string;
  submitButtonText?: string;
  submitPendingText?: string;

  onSubmit?: (values: AuthenticatorFormValues) => Promise<void> | void;
}

const AuthenticatorModal: React.FC<AuthenticatorModalProps> = ({
  heading = 'Authenticator Setup',
  subHeading = 'Set authentication via authenticator app',
  headingClassName = 'text-black font-medium text-[16px] leading-[26px]',
  subHeadingClassName = 'text-black text-[12px] leading-[17px] font-normal',
  headingContainerClassName = 'mb-[20px]',
  triggerButton = <Button>Authenticator</Button>,
  cancelButtonText = 'Cancel',
  submitButtonText = 'Verify',
  submitPendingText = 'Verifying...',
  onSubmit,
}) => {
  const form = useForm<AuthenticatorFormValues>({
    resolver: zodResolver(AuthenticatorSchema),
    defaultValues: { token: '' },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (values: AuthenticatorFormValues) => {
    setIsPending(true);
    try {
      if (onSubmit) await onSubmit(values);
      setOpen(false);
      form.reset();
    } finally {
      setIsPending(false);
    }
  };

  const hasError = !!form.formState.errors.token;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

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
