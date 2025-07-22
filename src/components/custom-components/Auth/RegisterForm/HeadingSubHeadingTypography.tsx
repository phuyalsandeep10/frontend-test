import React from 'react';

interface HeadingSubHeadingTypographyProps {
  heading: string;
  subHeading: string;
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
      <p className="text-theme-text-primary leading-7 font-normal">
        {subHeading}
      </p>
    </div>
  );
};

export default HeadingSubHeadingTypography;
