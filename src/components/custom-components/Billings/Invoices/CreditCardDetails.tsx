import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCardDetailsProps } from './types';
import { Icons } from '@/components/ui/Icons';

const CreditCardDetails: React.FC<CreditCardDetailsProps> = ({
  expiryYear,
  expiryDate,
  cardImage,
  isPrimary = false,
}) => {
  const currentYear = new Date().getFullYear();
  const isExpired = parseInt(expiryYear) < currentYear;

  let buttonText = 'Set As Default';
  let buttonVariant: 'default' | 'secondary' | 'destructive' = 'default';

  if (isPrimary) {
    buttonText = 'Default';
    buttonVariant = 'secondary';
  } else if (isExpired) {
    buttonText = 'Expired';
    buttonVariant = 'destructive';
  } else {
    buttonText = 'Set As Default';
    buttonVariant = 'default';
  }

  return (
    <div
      className={`flex items-center gap-43 rounded-[8px] border px-5 py-4 ${
        isPrimary ? 'border-brand-dark' : 'border-gray-light'
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src={cardImage} alt="Card" className="h-12 w-22" />

        <div className="flex flex-col">
          <p className="text-xl leading-7.5 font-semibold text-black">
            Master card ending in {expiryYear}
          </p>
          <p className="text-theme-text-primary text-xs leading-4 font-normal">
            Exp.date {expiryDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        <Button size="sm" variant={buttonVariant}>
          {buttonText}
        </Button>

        {!isPrimary && (
          <Icons.ri_delete_bin_6_fill className="text-alert-prominent h-5 w-5" />
        )}
      </div>
    </div>
  );
};

export default CreditCardDetails;
