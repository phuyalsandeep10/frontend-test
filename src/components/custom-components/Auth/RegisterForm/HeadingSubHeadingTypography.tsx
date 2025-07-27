import React from 'react';
import { ReactNode } from 'react';

interface HeadingSubHeadingTypographyProps {
  heading: ReactNode;
  subHeading?: string;
}
const HeadingSubHeadingTypography = ({
  heading,
  subHeading,
}: HeadingSubHeadingTypographyProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-outfit text-[40px] leading-10 font-bold text-black">
        {heading}
      </h3>
      <p className="text-theme-text-primary text-lg leading-7 font-normal">
        {subHeading}
      </p>
    </div>
  );
};

export default HeadingSubHeadingTypography;
