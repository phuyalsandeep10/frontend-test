'use client';
import React from 'react';

type HeaderComponentProps = {
  heading: string;
  icon: React.ReactNode;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ heading, icon }) => {
  return (
    <div className="flex gap-2">
      <h1 className="text-brand-dark text-[32px] leading-10 font-semibold">
        {heading}
      </h1>
      {icon && <span className="flex items-center">{icon}</span>}
    </div>
  );
};

export default HeaderComponent;
