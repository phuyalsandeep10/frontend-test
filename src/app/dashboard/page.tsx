'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useLogout } from '../../../hooks/auth/useLogout';
import { useAuthenticatedUser } from '../../../hooks/auth/useAuthenticatedUser';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useGenerateTwoFaOtp } from '../../../hooks/auth/useGenerateTwoFaOtp';

const DashboardPage = () => {
  const { mutate: logout, isPending } = useLogout();
  const { mutate: generate2FaOtp, isPending: generate2faOtpLoading } =
    useGenerateTwoFaOtp();
  const { data } = useAuthenticatedUser();
  console.log(data);
  return (
    <div className="m-6 flex flex-col gap-4">
      <h1>Dashboard Page</h1>
      <div className="flex gap-4">
        <Link href={'/dashboard'} className="text-indigo-500">
          Dashboard
        </Link>
        <Link href={'/profile'} className="text-indigo-500">
          {' '}
          Profile
        </Link>
      </div>
      <Card>
        <CardContent>
          <div>{data?.email}</div>
          <div>{data?.name}</div>
        </CardContent>
      </Card>
      <Button
        onClick={() => logout()}
        type="button"
        variant={'destructive'}
        className="w-fit cursor-pointer"
      >
        {isPending ? 'Logging out' : 'Logout'}
      </Button>
      <Button
        onClick={() => generate2FaOtp()}
        type="button"
        variant={'secondary'}
        className="w-fit cursor-pointer"
      >
        {generate2faOtpLoading ? 'Enabaling....' : 'Enable 2 FA'}
      </Button>
    </div>
  );
};

export default DashboardPage;
