'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ProfileImageModalProps {
  open: boolean;
  onClose: () => void;
  onRemovePhoto: () => void;
  onOpenChangePhoto: () => void;
  title?: string;
  changePhotoText?: string;
  removePhotoText?: string;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  open,
  onClose,
  onRemovePhoto,
  onOpenChangePhoto,
  title = 'Edit Photo',
  changePhotoText = 'Change Photo',
  removePhotoText = 'Remove Photo',
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-outfit text-theme-text-primary text-xs leading-[16px] font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="default"
            onClick={onOpenChangePhoto}
            className="font-outfit cursor-pointer text-xs leading-[16px] font-semibold"
          >
            {changePhotoText}
          </Button>
          <Button
            variant="destructive"
            onClick={onRemovePhoto}
            className="font-outfit cursor-pointer text-xs leading-[16px] font-semibold"
          >
            {removePhotoText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageModal;
