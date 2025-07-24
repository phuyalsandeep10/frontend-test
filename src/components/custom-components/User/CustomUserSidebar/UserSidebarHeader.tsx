import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/authLeftImage.svg';

const UserSidebarHeader = () => {
  return (
    <div className="flex gap-4">
      <div>
        <Image src={logo} className="" height={50} width={50} alt="" />
      </div>
      <div>
        <h3>Brahamabyte Lab</h3>
        <p>brahmabytelab.com</p>
      </div>
    </div>
  );
};

export default UserSidebarHeader;
