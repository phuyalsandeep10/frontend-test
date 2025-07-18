'use client';

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
import { useRouter, useSearchParams } from 'next/navigation';
import { userRoutes } from '@/routes/userRoutes';
import Link from 'next/link';
import { baseURL } from '@/apiConfigs/axiosInstance';
import { useEffect } from 'react';
import { useLoginUser } from '../../../../../hooks/auth/useLoginUser';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from './loginHelper';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@/services/auth/auth';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  const { mutate: login, isPending } = useLoginUser();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'user@example.com',
      password: 'Pass@1234',
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
      router.replace(userRoutes.DASHBOARD);
    }
  }, [accessToken, refreshToken, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 px-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-teal">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Link href="forgot-password" className="text-indigo-600">
                Forgot password
              </Link>
            </div>
            <Button type="submit" className="cursor-pointer">
              {' '}
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
            <Link href={'/register'} className="ml-4 text-indigo-600">
              Register
            </Link>
            <div>
              <Button
                onClick={() =>
                  window.open(
                    `${baseURL}/auth/oauth/google`,
                    'google-auth',
                    'width=620,height=620',
                  )
                }
                className="cursor-pointer"
                type="button"
                variant={'link'}
              >
                Login With Google
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
