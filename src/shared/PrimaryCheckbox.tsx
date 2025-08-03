import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { SetStateAction } from 'react';

interface PrimaryCheckboxProps {
  isAgreed: boolean;
  setIsAreed: React.Dispatch<SetStateAction<boolean>>;
  redirectLink: string;
  redirectLinkText: string;
  labelText: string;
  error?: boolean;
}
const PrimaryCheckbox = ({
  isAgreed,
  setIsAreed,
  redirectLink,
  redirectLinkText,
  labelText,
  error = false,
}: PrimaryCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="isAgreed"
        checked={isAgreed}
        onCheckedChange={(value) => setIsAreed(!!value)}
        className={cn(
          'h-4 w-4 rounded border transition-colors',
          isAgreed
            ? 'data-[state=checked]:border-brand-primary data-[state=checked]:bg-brand-primary data-[state=checked]:text-white'
            : 'border-gray-light bg-white',
          error && 'border-alert-prominent',
        )}
      />
      <Label className="text-sm font-normal text-black" htmlFor="isAgreed">
        {labelText}{' '}
        {redirectLink && (
          <Link href="" className="text-brand-primary underline">
            {redirectLinkText}
          </Link>
        )}
      </Label>
    </div>
  );
};

export default PrimaryCheckbox;
