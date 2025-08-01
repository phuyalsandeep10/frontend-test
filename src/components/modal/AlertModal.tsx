'use client';

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'; // swap from alert-dialog
import { Button, type ButtonProps } from '@/components/ui/button';

export interface AlertDialogDemoRef {
  open: () => void;
  close: () => void;
}

interface AlertDialogDemoProps {
  icon?: React.ReactNode;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  descriptionClassName?: string;
  cancelText?: React.ReactNode;
  actionText?: React.ReactNode;
  onCancel?: () => void;
  onAction?: () => void;
  cancelClassName?: string;
  actionClassName?: string;
  cancelButtonProps?: Partial<ButtonProps>;
  actionButtonProps?: Partial<ButtonProps>;
  cancelIsLoading?: boolean;
  actionIsLoading?: boolean;
  children?: React.ReactNode;
}

const AlertDialogDemo = forwardRef<AlertDialogDemoRef, AlertDialogDemoProps>(
  (
    {
      icon,
      heading,
      subheading,
      descriptionClassName,
      cancelText = 'Cancel',
      actionText = 'Confirm',
      onCancel,
      onAction,
      cancelClassName,
      actionClassName,
      cancelButtonProps,
      actionButtonProps,
      cancelIsLoading,
      actionIsLoading,
      children,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleCancel = () => {
      setOpen(false);
      onCancel?.();
    };

    const handleAction = () => {
      onAction?.();
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[568px] rounded-[8px] px-[34px] pt-[11px] pb-[29px] sm:max-w-[568px]">
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription
              className={`mt-[4px] flex items-start gap-2 ${descriptionClassName}`}
            >
              {icon}
              <span>{subheading}</span>
            </DialogDescription>
          </DialogHeader>

          {children}

          <DialogFooter>
            <Button
              onClick={handleCancel}
              className={cancelClassName}
              isLoading={cancelIsLoading}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleAction}
              className={actionClassName}
              isLoading={actionIsLoading}
              {...actionButtonProps}
            >
              {actionText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

AlertDialogDemo.displayName = 'AlertDialogDemo';
export default AlertDialogDemo;
