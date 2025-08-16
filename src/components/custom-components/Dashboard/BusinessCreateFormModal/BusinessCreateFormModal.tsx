import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import BusinessRegisterForm from '../../Auth/RegisterForm/BusinessRegisterForm/BusinessRegisterForm';

interface BusinessCreateFormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BusinessCreateFormModal = ({
  open,
  setOpen,
}: BusinessCreateFormModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent
        className="w-full p-6 sm:max-w-[600px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-outfit text-center">
            Create Your Business
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-full w-full">
          <BusinessRegisterForm from="dashboard" setOpen={setOpen} />
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BusinessCreateFormModal;
