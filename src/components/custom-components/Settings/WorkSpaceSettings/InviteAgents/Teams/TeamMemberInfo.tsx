import React from 'react';
import Image from 'next/image';
import TeamProfile from '@/assets/images/team_profile.svg';
import { Icons } from '@/components/ui/Icons';

const TeamMemberInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-[18px]">
      {/* Team image */}
      <div className="border-brand-primary rounded-full border p-[6px]">
        <Image
          src={TeamProfile}
          alt="team-profile"
          width={0}
          height={0}
          className="rounded-full object-cover"
        />
      </div>

      {/* Team content */}
      <div className="flex flex-col items-center text-base leading-[26px]">
        <p className="text-brand-dark font-medium">Abinash Babu Tiwari</p>

        <div className="flex items-center gap-1.5 py-[7px]">
          <span className="bg-success inline-block h-2 w-2 rounded-full"></span>
          <span className="text-success">Status: Active</span>
        </div>

        <div className="text-gray-primary flex flex-col items-center gap-[5px] text-xs leading-[17px] font-normal">
          <span className="flex items-center gap-2">
            <Icons.mail className="h-[16px] w-[16px]" />
            abinash.t@example.com
          </span>
          <span className="flex items-center gap-2">
            <Icons.ri_contacts_book_line className="h-[16px] w-[16px]" />
            985000000
          </span>
          <span className="flex items-center gap-2">
            <Icons.ri_user_line className="h-[16px] w-[16px]" />
            Agent
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberInfo;
