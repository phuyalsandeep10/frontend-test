import React from 'react';

type HeadingProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ title, description, icon }) => {
  return (
    <div className="mt-11 mb-10">
      <div className="flex gap-2">
        <h1 className="pb-1 text-[32px] leading-10 font-semibold tracking-tight">
          {title}
        </h1>
        {icon && <span className="flex items-center">{icon}</span>}
      </div>
      <p
        className="text-theme-text-primary text-xs leading-4"
        style={{ letterSpacing: '0.002em' }}
      >
        {description}
      </p>
    </div>
  );
};

export default Heading;
