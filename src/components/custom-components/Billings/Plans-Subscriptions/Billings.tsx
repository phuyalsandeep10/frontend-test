'use client';
import React from 'react';
import HeaderComponent from '@/components/custom-components/Billings/Plans-Subscriptions/Header';
import ActivePlansComponent from '@/components/custom-components/Billings/Plans-Subscriptions/ActivePlans';
import Settings from '@/components/custom-components/Settings/Settings';

const Billings = () => {
  return (
    <Settings>
      <div className="font-outfit">
        <div className="pb-6">
          <HeaderComponent heading="Plans & Subscriptions" />
          <ActivePlansComponent />
        </div>
      </div>
    </Settings>
  );
};

export default Billings;
