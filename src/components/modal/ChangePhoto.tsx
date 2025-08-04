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
import { Input } from '@/components/ui/input';
import React, { ChangeEvent } from 'react';

interface ChangePhotoProps {
  open: boolean;
  onClose: () => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ChangePhotoModal: React.FC<ChangePhotoProps> = ({
  open,
  onClose,
  onImageChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Photo</DialogTitle>
        </DialogHeader>

        <Input type="file" accept="image/*" onChange={onImageChange} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePhotoModal;
