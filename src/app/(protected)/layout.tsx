'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/routes/routes';
import { AuthService } from '@/services/auth/auth';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomSidebar from '@/components/custom-components/CustomSidebar/CustomSidebar';

export default function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: authData, isLoading } = useAuthenticatedUser();
  const router = useRouter();
  const authTokens = AuthService.getAuthTokens();

  useEffect(() => {
    if (!authTokens) {
      router.replace(ROUTES.LOGIN);
    }
    if (!isLoading) {
      const user = authData?.data?.user;
      const is2FaEnabled = user?.two_fa_enabled;
      const is2FaVerified = authData?.data?.is_2fa_verified;
      if (!user) {
        router.replace(ROUTES.LOGIN);
      } else if (!is2FaEnabled && !is2FaVerified) {
        router.replace(ROUTES.DASHBOARD);
      } else if (is2FaEnabled && !is2FaVerified) {
        router.replace(ROUTES.VERIFY_TWO_FA_TOKEN);
      }
    }
  }, [authData, isLoading, router, authTokens]);

  if (isLoading || !authData) return <p>Loading...</p>;

  return (
    <SidebarProvider>
      <CustomSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
