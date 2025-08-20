import { cn } from '@/lib/utils';
import React from 'react';

const WorkSpaceHeader = () => {
  return (
    <div className="space-y-2">
      <h1 className={cn('font-outfit text-brand-dark text-3xl font-semibold')}>
        Workspace Information
      </h1>
      <p className={cn('font-outfit text-xs font-normal text-black')}>
        Configure your workspace information. This defines how your workspace
        appears to your users.
      </p>
    </div>
  );
};

export default WorkSpaceHeader;
