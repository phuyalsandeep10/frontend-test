import AccountInformation from '@/components/custom-components/User/Settings/AccountInformation/AccountInformation';
import Settings from '@/components/custom-components/User/Settings/Settings';
import WorkSpaceInformation from '@/components/custom-components/User/Settings/WorkSpace_Setting/WorkSpaceInformation';
import React from 'react';

const AccountInformationPage = () => {
  return (
    <Settings>
      <WorkSpaceInformation />
    </Settings>
  );
};

export default AccountInformationPage;
