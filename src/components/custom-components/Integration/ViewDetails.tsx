import { Icons } from '@/components/ui/Icons';
import React from 'react';

const ViewDetails = () => {
  return (
    <div className="mt-3.5 flex cursor-pointer justify-end gap-2.5">
      <p className="text-base leading-6.5 font-medium">See More</p>
      <Icons.ri_arrow_right_long_line />
    </div>
  );
};

export default ViewDetails;
