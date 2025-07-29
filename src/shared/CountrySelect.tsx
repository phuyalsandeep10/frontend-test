'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Flag from 'react-world-flags';
import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

export type Country = {
  name: string;
  code: string;
};

interface CountrySelectProps {
  value: Country | null;
  onChange: (country: Country) => void;
  countries?: Country[];
  buttonClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  wrapperClassName?: string;
}

const defaultCountries: Country[] = [
  { name: 'Nepal', code: 'NP' },
  { name: 'United States', code: 'US' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'India', code: 'IN' },
  { name: 'Germany', code: 'DE' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Australia', code: 'AU' },
  { name: 'China', code: 'CN' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Russia', code: 'RU' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'Mexico', code: 'MX' },
  { name: 'South Africa', code: 'ZA' },
];

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  countries = defaultCountries,
  buttonClassName = 'w-60 justify-between',
  contentClassName = 'w-60',
  itemClassName = '',
  wrapperClassName = '',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={wrapperClassName}>
      <DropdownMenu open={open} onOpenChange={(o) => setOpen(o)}>
        <DropdownMenuTrigger asChild>
          <Button
            className={`border-gray-light h-10 border-1 bg-white ${contentClassName} ${buttonClassName}`}
          >
            <div className="flex w-full items-center justify-between">
              {value ? (
                <div className="flex items-center gap-2">
                  <Flag code={value.code} style={{ width: 24, height: 16 }} />
                  <span>{value.name}</span>
                </div>
              ) : (
                <span>Select Country</span>
              )}
              <div className="ml-2">
                {open ? (
                  <Icons.chevron_up size={16} />
                ) : (
                  <Icons.chevron_down size={16} />
                )}
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={4}
          className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {countries.map((country) => (
            <DropdownMenuItem
              key={country.code}
              onClick={() => onChange(country)}
              className={cn(
                'flex cursor-pointer items-center gap-2',
                itemClassName,
              )}
            >
              <Flag code={country.code} style={{ width: 20, height: 13 }} />
              <span>{country.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelect;
