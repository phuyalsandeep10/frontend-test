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
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  trigger,
  title,
  description,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="!w-full !max-w-[1240px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
