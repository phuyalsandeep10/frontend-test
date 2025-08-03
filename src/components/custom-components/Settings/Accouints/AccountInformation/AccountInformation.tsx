'use client';
import React, { useState } from 'react';
// import CountrySelect, { Country } from '../../CountrySelect';
import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/common/hook-form/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ProfileSection from './profile-section/ProfileSection';
import PersonalInformation from './personal-information/PersonalInformation';
import SecuritySection from './security-section/SecuritySection';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import PlansSection from './plans-section/PlansSection';
import Image from 'next/image';

const AccountInformation = () => {
  return (
    <div className="font-outfit w-full bg-white">
      <main className="">
        {/* Page title */}
        <div className="text-brand-dark flex items-center">
          <h1 className="text-[32px] leading-[40px] font-semibold tracking-[-0.3%]">
            Account Information
          </h1>
          <Icons.help className="mt-0.5 ml-2 h-5 w-5" />
        </div>

        {/* Profile section */}
        <ProfileSection
          name="Yubesh Koirala"
          email="koiralayubesh@gmail.com"
          location="Rio de Janeiro"
          phone="9842367186"
          countryCode="+977"
          profileImage="/profile.jpg"
        />

        {/* Public Profile Section */}
        <section className="text-brand-dark mt-[60px] flex flex-col gap-2">
          <h3 className="text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
            Public Profile
          </h3>
          <div className="flex items-center gap-6">
            <p className="text-[18px] leading-[29px] font-normal tracking-[0%]">
              This will display on your profile
            </p>
            <Input
              className="border-gray-light text-theme-text-dark h-9 w-[284px] rounded-[4px] border bg-white text-[14px] leading-[21px] font-normal tracking-[0.15%] opacity-100"
              defaultValue="Yubesh Koirala"
            />
          </div>
        </section>

        <div className="mt-[43px] grid grid-cols-2 gap-0">
          {/* Personal Inforamtion Section */}

          <PersonalInformation />

          <PlansSection />
        </div>

        {/* Discount Banner */}
        <Card className="bg-brand-primary mt-[53px] h-28 w-[80%] overflow-hidden rounded-lg">
          <CardContent className="flex h-full items-center justify-between py-5">
            <div className="text-pure-white ml-[41px] flex flex-col gap-1">
              <h4 className="text-[18px] leading-[29px] font-semibold tracking-[0%]">
                Discount
              </h4>
              <div className="flex items-center gap-[25px]">
                <span className="text-[32px] leading-[40px] font-semibold tracking-[-0.3%]">
                  30%
                </span>
                <span className="">
                  <span className="text-[18px] leading-[29px] font-normal tracking-[0%]">
                    discount on{' '}
                  </span>
                  <span className="text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
                    Annual Plans
                  </span>
                </span>
              </div>
            </div>

            <div>
              <Image
                width={141}
                height={88}
                src="/letter.svg"
                alt="letter-img"
              />
            </div>

            <Button
              variant="outline"
              className="border-pure-white text-pure-white h-9 w-[130px] rounded-[8px] text-[12px] leading-[16px] font-semibold tracking-[0.25%]"
            >
              Switch to Yearly
            </Button>
          </CardContent>
        </Card>

        {/* Automatically Saved Badge */}
        <Badge className="bg-brandbrand-primary text-purewhite mx-auto mt-10 flex items-center gap-2 border-zinc-500 px-5 py-2.5 shadow-[1px_4px_4px_#00000040]">
          <CheckIcon className="h-4 w-4" />
          <span className="font-web-body-body-reg-sm text-purewhite text-[length:var(--web-body-body-reg-sm-font-size)] leading-[var(--web-body-body-reg-sm-line-height)] tracking-[var(--web-body-body-reg-sm-letter-spacing)]">
            Automatically Saved
          </span>
        </Badge>
      </main>
    </div>
  );
};

export default AccountInformation;
