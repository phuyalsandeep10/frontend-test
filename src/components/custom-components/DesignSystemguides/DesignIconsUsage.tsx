import { Icons } from '@/components/ui/Icons';
import React from 'react';

const DesignIconsUsage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
          Basic Usage
        </h4>
        <div className="rounded-lg bg-gray-50 p-4">
          <code className="text-theme-text-dark text-sm whitespace-pre-wrap">
            {`import { Icons } from '@/components/ui/Icons';

// Basic usage
<Icons.arrow_up className="w-5 h-5" />
<Icons.eye className="w-4 h-4 text-brand-primary" />

// With styling
<Icons.arrow_down className="w-6 h-6 text-theme-text-dark hover:text-brand-primary transition-colors" />

// In buttons
<button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded">
  <Icons.eye className="w-4 h-4" />
  View Details
</button>`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
          Adding New Icons
        </h4>
        <div className="rounded-lg bg-gray-50 p-4">
          <code className="text-theme-text-dark text-sm whitespace-pre-wrap">
            {`// Navigate Into src/components/ui/Icons.tsx
import { ArrowDown, ArrowUp, Settings, User } from 'lucide-react'
import { RiEye2Line, RiHomeLine } from "@remixicon/react"

export const Icons = {
  arrow_up: ArrowUp,
  arrow_down: ArrowDown,
  eye: RiEye2Line,
  settings: Settings,    // New Lucide icon
  user: User,           // New Lucide icon
  home: RiHomeLine,     // New Remix icon
}`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-theme-text-dark mb-3 text-lg font-semibold">
          Icon Sizes & Best Practices
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h5 className="text-theme-text-dark font-medium">Standard Sizes</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Icons.eye className="text-theme-text-primary h-4 w-4" />
                <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                  w-4 h-4 (16px)
                </code>
                <span className="text-theme-text-primary text-sm">
                  Small - UI elements
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.eye className="text-theme-text-primary h-5 w-5" />
                <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                  w-5 h-5 (20px)
                </code>
                <span className="text-theme-text-primary text-sm">
                  Medium - Buttons
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.eye className="text-theme-text-primary h-6 w-6" />
                <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                  w-6 h-6 (24px)
                </code>
                <span className="text-theme-text-primary text-sm">
                  Large - Headers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.eye className="text-theme-text-primary h-8 w-8" />
                <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                  w-8 h-8 (32px)
                </code>
                <span className="text-theme-text-primary text-sm">
                  XL - Features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignIconsUsage;
