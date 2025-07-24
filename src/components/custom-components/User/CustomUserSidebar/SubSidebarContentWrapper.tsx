import React from 'react';

const SubSidebarContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="border-l-gray-light border-r-gray-light box-border h-full w-[234px] border-r-1 border-l-1 px-2.5 py-[30px]">
      <div>{children}</div>
    </div>
  );
};

export default SubSidebarContentWrapper;
