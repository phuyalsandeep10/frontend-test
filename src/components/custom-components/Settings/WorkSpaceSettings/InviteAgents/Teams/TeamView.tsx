import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/Icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import TeamProfile from '@/assets/images/team_profile.svg';
import ReusableDialog from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReusableDialog';
import TeamMemberInfo from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/Teams/TeamMemberInfo';

const TeamView: React.FC = () => {
  return (
    <Card className="w-full max-w-full px-5">
      <CardHeader className="inline-flex items-center gap-x-[17px] gap-y-[14px] p-0">
        <CardTitle className="text-lg leading-[29px] font-semibold">
          Team Members
        </CardTitle>
      </CardHeader>

      <CardContent className="border-gray-light rounded-[4px] border-2 px-5.5 py-[7px] shadow-[0_0_4px_1px_#15F64540]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[18px]">
            {/* Team image */}
            <div className="border-brand-primary rounded-full border p-[6px]">
              <Image
                src={TeamProfile}
                alt="team-profile"
                width={48}
                height={48}
              />
            </div>

            {/* Team content */}
            <div className="text-base leading-[26px]">
              <p className="text-brand-dark font-medium">Abinash Babu Tiwari</p>
              <div className="flex items-center gap-1.5">
                <span className="bg-success inline-block h-2 w-2 rounded-full" />
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>

          <ReusableDialog
            trigger={
              <button aria-label="View team member info">
                <Icons.info className="text-brand-primary" />
              </button>
            }
          >
            <TeamMemberInfo />
          </ReusableDialog>
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex justify-center gap-4">
        <Button variant="outline">Cancel</Button>
        <Button type="button" className="rounded-lg py-3">
          Edit Team
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamView;
