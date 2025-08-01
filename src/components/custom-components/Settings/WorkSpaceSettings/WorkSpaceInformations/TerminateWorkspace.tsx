import AlertDialogDemo, {
  AlertDialogDemoRef,
} from '@/components/modal/AlertModal';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import React, { useRef } from 'react';
import { useForm, Control } from 'react-hook-form';
import { InputField } from '@/components/common/hook-form/InputField';

const TerminateWorkspace = () => {
  const dialogRef = useRef<AlertDialogDemoRef>(null);
  const { control } = useForm();

  const handleDeleteClick = () => {
    dialogRef.current?.open();
  };

  const handleConfirmDelete = () => {
    console.log('Workspace deleted');
    dialogRef.current?.close();
  };

  const handleCancelDelete = () => {
    console.log('Delete cancelled');
    dialogRef.current?.close();
  };
  return (
    <div>
      <div className={cn('mt-10')}>
        <div className="">
          <div className={cn('flex items-start')}>
            <div className={cn('flex-1')}>
              <h3
                className={cn(
                  'font-outfit text-brand-dark mb-3 text-xl leading-[30px] font-semibold',
                )}
              >
                Terminate Workspace
              </h3>
              <p
                className={cn(
                  'font-outfit text-disabled-foreground text-xs font-normal',
                )}
              >
                Proceed with Caution. These actions are irreversible.
              </p>

              <div className={cn('mt-6 space-y-7.5')}>
                <div>
                  <label
                    htmlFor="workspace-id"
                    className={cn(
                      'font-outfit text-brand-dark text-base leading-[16px] font-medium',
                    )}
                  >
                    Enter Workspace ID
                  </label>
                  <Input
                    id="workspace-id"
                    placeholder="Bramhabyfields"
                    className={cn('mt-2.5 h-9 w-1/2')}
                  />
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteClick}
                  className={cn(
                    'font-outfit mb-5 cursor-pointer text-xs leading-[16px] font-semibold',
                  )}
                >
                  Delete workspace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertDialogDemo
        ref={dialogRef}
        heading="Are you sure?"
        subheading="Please enter workspace ID to confirm deletion."
        icon={
          <Icons.danger className="text-alert-prominent mt-0.5" size={20} />
        }
        cancelText="Cancel"
        actionText="Yes, Delete"
        onCancel={handleCancelDelete}
        // onAction={handleSubmit(handleConfirmDelete)}
        descriptionClassName="font-outfit font-normal text-xs leading-[17px] text-alert-prominent"
        cancelButtonProps={{ variant: 'outline' }}
        actionButtonProps={{ variant: 'destructive' }}
      >
        {/* ✅ Custom content inside modal */}
        <div className="pt-6">
          <InputField
            control={control}
            name="workspaceId"
            required
            placeholder="DELETE"
            label="Type “DELETE” to confirm"
            className="w-full"
            inputClassName="h-9"
            labelClassName="font-outfit font-normal text-xs leading-[17px] text-disabled-foreground"
          />
        </div>
      </AlertDialogDemo>
    </div>
  );
};

export default TerminateWorkspace;
