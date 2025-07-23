'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertDialogDemoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  cancelText?: string;
  actionText?: string;
  descriptionClassName?: string;
  onCancel?: () => void;
  onAction?: () => void;
  cancelClassName?: string;
  actionClassName?: string;
}

export function AlertDialogDemo({
  isOpen,
  onOpenChange,
  icon,
  heading,
  subheading,
  cancelText,
  actionText,
  descriptionClassName,
  onCancel,
  onAction,
  cancelClassName,
  actionClassName,
}: AlertDialogDemoProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[568px] rounded-[8px] px-[34px] pt-[11px] pb-[29px] sm:max-w-[568px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{heading} </AlertDialogTitle>

          <AlertDialogDescription
            className={`mt-[4px] flex items-start gap-2 ${descriptionClassName}`}
          >
            {icon}
            <span>{subheading}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className={cancelClassName}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction} className={actionClassName}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
