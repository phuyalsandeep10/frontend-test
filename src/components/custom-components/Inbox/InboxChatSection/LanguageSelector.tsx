import { Icons } from '@/components/ui/Icons';
import React from 'react';

const LanguageSelector = () => {
  return (
    <div className="mt-6 flex justify-center py-2">
      <div className="bg-brand-disable text-theme-text-primary flex items-center space-x-1 rounded border px-2 py-1">
        <span className="text-xs">🇺🇸</span>
        <span className="text-theme-text-primary text-sm font-semibold">
          English
        </span>
        <Icons.chevron_down className="h-4 w-4" />
      </div>
    </div>
  );
};

export default LanguageSelector;
