'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { userRoutes } from '@/routes/userRoutes';
import { AuthService } from '@/services/auth/auth';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

export default function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: authData, isLoading } = useAuthenticatedUser();
  const router = useRouter();
  const authTokens = AuthService.getAuthTokens();

  // useEffect(() => {
  //   if (!authTokens) {
  //     router.replace(userRoutes.LOGIN);
  //   }
  //   if (!isLoading) {
  //     const user = authData?.data?.user;
  //     const is2FaEnabled = user?.two_fa_enabled;
  //     const is2FaVerified = authData?.data?.is_2fa_verified;
  //     if (!user) {
  //       router.replace(userRoutes.LOGIN);
  //     } else if (!is2FaEnabled && !is2FaVerified) {
  //       router.replace(userRoutes.DASHBOARD);
  //     } else if (is2FaEnabled && !is2FaVerified) {
  //       router.replace(userRoutes.VERIFY_TWO_FA_TOKEN);
  //     }
  //   }
  // }, [authData, isLoading, router, authTokens]);

  // if (isLoading || !authData) return <p>Loading...</p>;

  return <div>{children}</div>;
}
