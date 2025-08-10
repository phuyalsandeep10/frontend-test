import React from 'react';
import { ReactNode } from 'react';

interface HeadingSubHeadingTypographyProps {
  heading: ReactNode;
  subHeading?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
  containerClassName?: string;
}

const HeadingSubHeadingTypography = ({
  heading,
  subHeading,
  headingClassName = 'font-outfit md:text-2xl xl:text-[40px] xl:leading-[48px] font-bold text-black',
  subHeadingClassName = 'text-theme-text-primary text-base lg:text-[18px] leading-[29px] font-normal',
  containerClassName = 'flex flex-col gap-2',
}: HeadingSubHeadingTypographyProps) => {
  return (
    <div className={containerClassName}>
      <h3 className={headingClassName}>{heading}</h3>
      {subHeading && <p className={subHeadingClassName}>{subHeading}</p>}
    </div>
  );
};

export default HeadingSubHeadingTypography;
