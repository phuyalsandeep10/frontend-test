import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

const TerminateWorkspace = () => {
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
    </div>
  );
};

export default TerminateWorkspace;
