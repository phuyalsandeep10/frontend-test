// components/ui/ReusableDialog.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type ReusableDialogProps = {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  dialogClass?: string;
  dialogTitle?: string;
  dialogDescription?: string;
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  trigger,
  children = null,
  dialogClass = '',
  dialogTitle = '',
  dialogDescription = '',
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`!w-full !max-w-[1240px] gap-8 p-10 ${dialogClass}`}
      >
        <DialogHeader className="gap-0">
          <DialogTitle className="text-xl leading-[30px] font-semibold">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
