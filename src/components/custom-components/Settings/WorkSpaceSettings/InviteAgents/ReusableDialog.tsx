// components/ui/ReusableDialog.tsx
'use client';

import React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

type ReusableDialogProps = {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  dialogClass?: string;
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  trigger,
  children = null,
  dialogClass = '',
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`!w-full !max-w-[1240px] ${dialogClass}`}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
