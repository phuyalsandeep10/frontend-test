'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Settings from '@/components/custom-components/Settings/Settings';
import OperatorsTable from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/OperatorsTable';

const InviteAgents = () => {
  const [toggleActive, setToggleActive] = useState('Operators');
  return (
    <Settings>
      <section className="font-outfit">
        <div>
          {/* title of invite agents  */}
          <div className="flex items-end gap-2 pb-20">
            <h2 className="text-brand-dark text-[32px] leading-10 font-semibold">
              Invite Agents
            </h2>
            <Icons.help className="text-brand-dark" />
          </div>
          {/* notification bar of invite agents */}
          <div className="bg-info-light mb-20 flex gap-3 rounded-lg px-3 py-[9px]">
            <Icons.info className="text-info" />
            <p className="text-info text-base leading-[26px] font-normal">
              Want to control access? Add roles and assign permissions so team
              members only see what they need. Head to{' '}
              <strong className="font-semibold underline">
                Create Permission
              </strong>{' '}
              to begin.
            </p>
          </div>
          {/* invite agents container */}
          <div className="pb-5">
            <h4 className="pb-1 text-xl leading-[30px] font-semibold">
              Invite agents to your workspace.
            </h4>
            <p className="text-base leading-[26px] font-normal">
              Send invites, assign roles, and launch your support team.
            </p>
          </div>

          {/*invite agents input field */}
          <div className="mb-[86px] flex gap-5">
            <Input
              placeholder="Invite your agents"
              className="text-pure-black placeholder:text-pure-black border-grey-light h-[36px] rounded-sm border-[1px]"
            />

            <Button className="h-full max-h-[36px] w-auto rounded px-[22px] py-2.5 text-xs leading-4 font-semibold">
              {' '}
              <Icons.plus />
              Add agent in your workspace
            </Button>
          </div>

          {/* buttons to nvaigate to different pages */}

          <div className="border-b-grey-light mb-5 flex justify-between border-b-[1px] pb-1">
            <div className="relative flex gap-[35px] text-xs leading-[17px] font-normal">
              <span
                className={`relative ${
                  toggleActive === 'Invites'
                    ? "text-brand-primary before:absolute before:-bottom-[5px] before:w-[61px] before:translate-x-0 before:border-b-[1px] before:pb-3 before:text-[bg-brand-primary] before:content-['']"
                    : ''
                }`}
              >
                Invites
              </span>
              <span
                className={`relative ${
                  toggleActive === 'Operators'
                    ? "text-brand-primary before:absolute before:-bottom-[5px] before:w-[82px] before:-translate-x-2.5 before:border-b-[1px] before:pb-3 before:text-[bg-brand-primary] before:content-['']"
                    : ''
                }`}
              >
                Operators
              </span>
              <span
                className={`relative ${
                  toggleActive === 'Teams'
                    ? "text-brand-primary before:absolute before:-bottom-[5px] before:w-[82px] before:-translate-x-5 before:border-b-[1px] before:pb-3 before:text-[bg-brand-primary] before:content-['']"
                    : ''
                }`}
              >
                Teams
              </span>
              <span
                className={`relative ${
                  toggleActive === 'Roles'
                    ? "text-brand-primary before:absolute before:-bottom-[5px] before:w-[82px] before:-translate-x-5.5 before:border-b-[1px] before:pb-3 before:text-[bg-brand-primary] before:content-['']"
                    : ''
                }`}
              >
                Roles
              </span>
            </div>
            <span className="text-brand-primary">
              <Icons.filter />
            </span>
          </div>

          {/* table of operators */}
          <OperatorsTable />
        </div>
      </section>
    </Settings>
  );
};

export default InviteAgents;
