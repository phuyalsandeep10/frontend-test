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
import React, { SetStateAction } from 'react';

interface Enable2FaConfirmModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  subTitle?: string;
  cancelBtnText?: string;
  confirmBtnText?: string;
  loading?: boolean;
}

const ConfirmModal = ({
  open,
  setOpen,
  onClick,
  title,
  subTitle,
  cancelBtnText,
  confirmBtnText,
  loading,
}: Enable2FaConfirmModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {subTitle || 'This action will enable two factor authentication'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={loading}>
            {cancelBtnText || 'No'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick} disabled={loading}>
            {loading ? 'loading...' : confirmBtnText || ' Yes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
