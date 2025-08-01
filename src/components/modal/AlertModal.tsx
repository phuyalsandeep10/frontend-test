'use client';

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  headericon?: React.ReactNode;
  modalClassName?: string;
  DialogHeaderClassName?: string;
  headerIconClass?: string;
  iconClass?: string;
}

export const AlertDialogDemo = forwardRef<
  AlertDialogDemoRef,
  AlertDialogDemoProps
>(
  (
    {
      icon,
      heading,
      subheading,
      descriptionClassName,
      cancelText,
      actionText,
      onCancel,
      onAction,
      cancelClassName,
      actionClassName,
      cancelButtonProps,
      actionButtonProps,
      cancelIsLoading,
      actionIsLoading,
      children,
      headericon,
      modalClassName,
      DialogHeaderClassName,
      headerIconClass,
      iconClass,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent
          className={`w-[568px] rounded-[8px] px-[34px] pt-[11px] pb-[29px] sm:max-w-[568px] ${modalClassName ?? ''}`}
        >
          <AlertDialogHeader>
            {headericon && (
              <div className={headerIconClass ?? ''}>
                {' '}
                <span className={iconClass ?? ''}>{headericon}</span>{' '}
              </div>
            )}
            <AlertDialogTitle className={DialogHeaderClassName ?? ''}>
              {heading}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`mt-[4px] flex items-start gap-2 ${descriptionClassName}`}
            >
              {icon}
              <span>{subheading}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {children}
          <AlertDialogFooter>
            <Button
              onClick={onCancel}
              className={cancelClassName}
              isLoading={cancelIsLoading}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onAction}
              className={actionClassName}
              isLoading={actionIsLoading}
              {...actionButtonProps}
            >
              {actionText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

AlertDialogDemo.displayName = 'AlertDialogDemo';

export default AlertDialogDemo;
