'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthService } from '@/services/auth/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomSidebar from '@/components/custom-components/CustomSidebar/CustomSidebar';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';

export default function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const authTokens = AuthService.getAuthTokens();
  const setAuthData = useAuthStore((state) => state.setAuthData);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(storedUser, parsedUser);
    if (parsedUser) {
      setAuthData(parsedUser);
    }
  }, [router, authTokens]);

  return (
    <SidebarProvider>
      <CustomSidebar />
      {/* <SidebarTrigger /> */}
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
