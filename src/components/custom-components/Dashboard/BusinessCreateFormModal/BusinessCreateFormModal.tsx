import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

interface VerifyEmailModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const BusinessCreateFormModal = ({
  open,
  setOpen,
  children,
}: VerifyEmailModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent
        className="w-full p-6 sm:max-w-[600px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Create Your Business
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BusinessCreateFormModal;
