'use client';

import { Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LanguageDropdownProps {
  onValueChange: (value: string) => void;
  selectedLanguage: string;
}

export default function LanguageDropdown({
  onValueChange,
  selectedLanguage,
}: LanguageDropdownProps) {
  const handleSelect = (language: string) => {
    onValueChange(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="text-gray-primary">
          <Globe className="text-gray-primary h-6 w-6" />
          <span className="font-medium">{selectedLanguage}</span>
          <ChevronDown className="text-theme-text-primary h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onSelect={() => handleSelect('English - US')}>
          English - US
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('Español - ES')}>
          Español - ES
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('Français - FR')}>
          Français - FR
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect('Deutsch - DE')}>
          Deutsch - DE
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
