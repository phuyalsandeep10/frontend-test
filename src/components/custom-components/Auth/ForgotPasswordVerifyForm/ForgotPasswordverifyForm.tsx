'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { forgotPasswordVerifyFormSchema } from './forgotPasswordVerifyHelper';
import { useForgotPasswordVerify } from '@/hooks/auth/useForgotPasswordVerify';
import HeadingSubHeadingTypography from '../RegisterForm/HeadingSubHeadingTypography';
import { Icons } from '@/components/ui/Icons';
import { StrongPasswordField } from '@/components/common/hook-form/StrongPasswordField';
import Image from 'next/image';
import passwordChanged from '@/assets/images/passwordChanged.svg';

const ForgotPasswordVerifyForm = () => {
  const { mutate: forgotPassVerify, isPending } = useForgotPasswordVerify();

  const form = useForm<z.infer<typeof forgotPasswordVerifyFormSchema>>({
    resolver: zodResolver(forgotPasswordVerifyFormSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(
    values: z.infer<typeof forgotPasswordVerifyFormSchema>,
  ) {
    forgotPassVerify(values);
  }

  return (
    <>
      <div className="pt-[180px]">
        <Link
          href={'/login'}
          className="text-theme-text-primary flex items-center gap-1 pb-[32px] text-[15px] font-semibold"
        >
          <Icons.chevron_left className="h-4 w-4" />
          Go back
        </Link>

        <HeadingSubHeadingTypography
          heading={
            <>
              Set New <span className="text-brand-primary">Password</span>
            </>
          }
        />

        <div className="flex h-screen pt-[40px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <StrongPasswordField
                control={form.control}
                name="new_password"
                label="Enter new password"
                required
                placeholder="**********"
              />

              <StrongPasswordField
                control={form.control}
                name="confirm_password"
                label="Confirm your password"
                compareWith={form.watch('new_password')}
                required
                placeholder="**********"
                hideChecklist
              />
              <Button
                variant="default"
                type="submit"
                size="lg"
                className="mt-4 w-full"
                disabled={isPending}
              >
                {isPending ? 'Confirming...' : 'Confirm'}
              </Button>
            </form>
          </Form>
        </div>

        {/* <div className="flex w-[489px] flex-col items-center pb-20">
          <Image
            src={passwordChanged}
            alt="Password changed successfully"
            className="pb-[32px]"
          />

          <p className="text-brand-pressed w-full pb-[8px] text-center text-[32px] leading-[40px] font-semibold tracking-[-0.05px]">
            SUCCESSFUL
          </p>

          <p className="text-theme-text-primary w-full pb-[40px] text-center text-[18px] leading-[29px] font-semibold">
            You have changed your password
          </p>

          <Link href="/login" passHref className="w-full">
            <Button variant="default" size="lg" className="w-full">
              Go to login
            </Button>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default ForgotPasswordVerifyForm;
