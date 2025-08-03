'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/routes/routes';
import Link from 'next/link';
import { baseURL } from '@/apiConfigs/axiosInstance';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from './loginHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@/services/auth/auth';
import { useLoginUser } from '@/hooks/auth/useLoginUser';
import HeadingSubHeadingTypography from '../RegisterForm/HeadingSubHeadingTypography';
import { InputField } from '@/components/common/hook-form/InputField';
import { Icons } from '@/components/ui/Icons';
import Button from '@/components/common/hook-form/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import googleIcon from '@/assets/images/google.svg';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  const { mutate: login, isPending } = useLoginUser();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    login(values);
  }

  useEffect(() => {
    if (accessToken && refreshToken) {
      const authTokens = {
        accessToken,
        refreshToken,
      };
      AuthService.setAuthTokens(authTokens);
      router.replace(ROUTES.DASHBOARD);
    }
  }, [accessToken, refreshToken, router]);

  return (
    <div className="mt-[87px]">
      <HeadingSubHeadingTypography
        heading={
          <>
            Login to <span className="text-brand-primary">Chatboq</span>
          </>
        }
        subHeading="Login to Chatboq account to access your dashboard."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 pt-10 pb-[16px]"
        >
          <InputField
            control={form.control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <InputField
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-brand-primary border-grey-light h-4 w-4"
                />
                <span className="text-[14px] leading-[21px] font-normal">
                  Remember Me
                </span>
              </label>

              <Link
                href="forgot-password"
                className="text-brand-primary text-[14px] leading-[21px] font-normal"
              >
                Forgot password?
              </Link>
            </div>
            {/* Google ReCAPTCHA UI */}
            <div className="w-full pt-4">
              <ReCAPTCHA sitekey="site-key-here " />
            </div>
          </div>
          <Button
            variant="default"
            type="submit"
            size="lg"
            className="mt-4 w-full"
          >
            {isPending ? 'Logging in...' : 'Login to Dashboard'}
          </Button>
          <p className="align-center text-center font-medium">Or</p>

          <Button
            variant="outline"
            type="button"
            size="lg"
            className="w-full"
            leftIcon={
              <Image
                src={googleIcon}
                alt="Google icon"
                width={20}
                height={20}
              />
            }
            onClick={() =>
              window.open(
                `${baseURL}/auth/oauth/google`,
                'google-auth',
                'width=620,height=620',
              )
            }
          >
            Continue With Google
          </Button>
          <p>
            Don’t have an account?
            <Link
              href="/register"
              className="text-brand-primary ml-2 text-lg hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
