import React from 'react';
import { HeadingTypographyProps } from './types';

const HeadingTypography: React.FC<HeadingTypographyProps> = ({ heading }) => {
  return (
    <div>
      <p className="mb-3 text-xl leading-7.5 font-semibold">{heading}</p>
    </div>
  );
};

export default HeadingTypography;
