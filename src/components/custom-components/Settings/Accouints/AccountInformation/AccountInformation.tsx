'use client';

import ProfileSection from './profile-section/ProfileSection';
import PersonalInformation from './personal-information/PersonalInformation';
import PlansSection from './plans-section/PlansSection';
import PublicProfile from './public-profile/PublicProfile';
import DiscountBanner from './discount-banner/DiscountBanner';

const AccountInformation = () => {
  return (
    <div className="font-outfit w-full bg-white">
      <ProfileSection
        name="Yubesh Koirala"
        email="koiralayubesh@gmail.com"
        location="Rio de Janeiro"
        phone="9842367186"
        countryCode="+977"
        profileImage="/profile.jpg"
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
