import React from 'react';

type HeadingProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ title, description, icon }) => {
  return (
    <div className="mt-[44px] mb-[40px]">
      <div className="flex gap-[8px]">
        <h1 className="pb-[4px] text-[32px] leading-[40px] font-semibold tracking-tight">
          {title}
        </h1>
        {icon && <span className="flex items-center">{icon}</span>}
      </div>
      <p
        className="text-theme-text-primary text-[12px] leading-[17px]"
        style={{ letterSpacing: '0.002em' }}
      >
        {description}
      </p>
    </div>
  );
};

export default Heading;
