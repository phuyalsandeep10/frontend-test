import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCardDetailsProps } from './types';

const CreditCardDetails: React.FC<CreditCardDetailsProps> = ({
  expiryYear,
  expiryDate,
  cardImage,
  buttonText,
}) => {
  return (
    <div className="border-gray-light flex items-center gap-43 rounded-[8px] border px-5 py-4">
      <div className="flex items-center gap-2">
        <Image src={cardImage} alt="Card" className="h-12 w-22" />

        <div className="flex flex-col gap-1">
          <p className="text-xl leading-7.5 font-semibold text-black">
            Master card ending in {expiryYear}
          </p>
          <p className="text-theme-text-primary text-xs leading-4 font-normal">
            Exp.date {expiryDate}
          </p>
        </div>
      </div>
      <div>
        <Button size="sm">{buttonText}</Button>
      </div>
    </div>
  );
};

export default CreditCardDetails;
