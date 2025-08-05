import React from 'react';
import { HeadingProps } from './types';

const Heading: React.FC<HeadingProps> = ({ title, description, icon }) => {
  return (
    <div className="mt-11 mb-10">
      <div className="flex gap-2">
        <h1 className="pb-1 text-[32px] leading-10 font-semibold">{title}</h1>
        {icon && <span className="flex items-center">{icon}</span>}
      </div>
      <p className="text-theme-text-primary text-xs leading-4">{description}</p>
    </div>
  );
};

export default Heading;
