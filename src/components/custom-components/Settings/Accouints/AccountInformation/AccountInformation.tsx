'use client';

import ProfileSection from './profile-section/ProfileSection';
import PersonalInformation from './personal-information/PersonalInformation';
import PlansSection from './plans-section/PlansSection';
import PublicProfile from './public-profile/PublicProfile';
import DiscountBanner from './discount-banner/DiscountBanner';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';

const AccountInformation = () => {
  const authData = useAuthStore((state) => state.authData);
  return (
    <div className="font-outfit max-h-40 w-full bg-white">
      <ProfileSection
        name={authData?.data?.user?.name ?? ''}
        email={authData?.data?.user?.email ?? ''}
        location={authData?.data?.user.location ?? ''}
        phone={authData?.data?.user?.phone ?? ''}
        profileImage={authData?.data?.user?.image ?? ''}
      />

      <PublicProfile />

      <div className="mt-[43px] grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0">
        <PersonalInformation />
        <PlansSection />
      </div>

      <DiscountBanner />
    </div>
  );
};

export default AccountInformation;
