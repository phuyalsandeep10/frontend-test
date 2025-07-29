'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';
import { Icons } from '../ui/Icons';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  email: string;
  post: string;
}

interface TransferOwnershipModalProps {
  open: boolean;
  onClose: () => void;
}

const dummyUsers: User[] = [
  { id: 1, name: 'Alice Sharma', email: 'alice@example.com', post: 'agent' },
  { id: 2, name: 'Ravi Gupta', email: 'ravi@example.com', post: 'agent' },
  { id: 3, name: 'Sita Thapa', email: 'sita@example.com', post: 'agent' },
  { id: 4, name: 'Alice Sharma', email: 'alice@example.com', post: 'agent' },
  { id: 5, name: 'Ravi Gupta', email: 'ravi@example.com', post: 'agent' },
  { id: 6, name: 'Sita Thapa', email: 'sita@example.com', post: 'agent' },
  { id: 7, name: 'Alice Sharma', email: 'alice@example.com', post: 'agent' },
  { id: 8, name: 'Ravi Gupta', email: 'ravi@example.com', post: 'agent' },
  { id: 9, name: 'Sita Thapa', email: 'sita@example.com', post: 'agent' },
];

const TransferOwnershipModal: React.FC<TransferOwnershipModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[461px]">
        <DialogHeader>
          <DialogTitle className="font-outfit text-theme-text-primary text-xs leading-[16px] font-semibold">
            Do you want to change Ownership ?
          </DialogTitle>
        </DialogHeader>
        <div className="font-outfit text-gray-primary flex gap-3 text-sm leading-[21px] font-normal">
          <Input placeholder="Add People and Emails" />
          <Button
            variant="outline"
            size="sm"
            className="bg-brand-disable font-outfit hover:text-gray-primary text-gray-primary cursor-pointer gap-1 border-0 text-xs leading-[16px] font-semibold"
          >
            <Icons.user_plus className="h-4 w-4" />
            Invite
          </Button>
        </div>

        <ScrollArea className="mt-4 h-60 w-[405px]">
          <p className="font-outfit text-gray-primary text-base leading-[16px] font-semibold">
            Choose an Admin (Suggested)
          </p>
          <div className="space-y-4 pt-4 pr-4">
            {dummyUsers.map((user) => (
              <div
                key={user.id}
                className="hover:bg-light-blue font-outfit text-gray-primary flex cursor-pointer items-center justify-between p-2 text-xs leading-[16px] font-semibold"
              >
                <div className="flex items-center gap-1">
                  <div>
                    <Image
                      src={'/new.jpg'}
                      alt="user"
                      width={24}
                      height={24}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    {/* <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p> */}
                  </div>
                </div>
                <p>{user.post}</p>
              </div>
            ))}
            {dummyUsers.length === 0 && (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No users found.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TransferOwnershipModal;
