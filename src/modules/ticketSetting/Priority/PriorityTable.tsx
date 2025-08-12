'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/common/hook-form/InputField';
import { SelectField } from '@/components/common/hook-form/SelectField';
import AdvancedColorPicker from '@/modules/ticket/components/comman/AdvanceColorPicker';
import { usePrioritiesTicket } from './hooks/usePriorityTicket';
import { Icons } from '@/components/ui/Icons';
import DeleteModal from '@/components/modal/DeleteModal';
import { useState } from 'react';

export default function TicketPriorityPage() {
  const {
    priorities,
    control,
    handleSubmit,
    newPriorityBgColor,
    newPriorityTextColor,
    setNewPriorityBgColor,
    setNewPriorityTextColor,
    levelOptions,
    updatePriorityName,
    updatePriorityColor,
    deletePriority,
    onAddPriority,
    isLoading,
    isError,
    error,
  } = usePrioritiesTicket();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(
    null,
  );

  const openDeleteModal = (priorityId: number) => {
    setSelectedPriorityId(priorityId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPriorityId !== null) {
      //   deletePriority(selectedPriorityId);
    }
    setDeleteModalOpen(false);
    setSelectedPriorityId(null);
  };
  if (isLoading) {
    return <div className="p-4">Loading priorities...</div>;
  }

  if (isError) {
    return (
      <div className="text-alert-prominent p-4">
        Error loading priorities: {(error as Error).message}
      </div>
    );
  }

  return (
    <>
      <TooltipProvider>
        <div className="bg-white">
          {/* Header */}
          <div className="mb-5">
            <h1 className="font-outfit text-brand-dark mb-1 text-lg font-semibold">
              Ticket Priority
            </h1>
            <p className="font-outfit text-brand-dark text-xs font-normal">
              Customize priority levels, assign unique colors, and map default
              SLA values to reflect urgency.
            </p>
          </div>

          {/* Priority Items */}
          <div className="mb-8 space-y-4">
            {priorities.map((priority) => (
              <div key={priority.id} className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <AdvancedColorPicker
                      color={priority.darkColor}
                      onChange={(color) =>
                        updatePriorityColor(priority.id, 'dark', color)
                      }
                      tooltip={
                        <div className="text-sm">
                          <div className="font-medium">Background Color</div>
                        </div>
                      }
                    />
                    <AdvancedColorPicker
                      color={priority.lightColor}
                      onChange={(color) =>
                        updatePriorityColor(priority.id, 'light', color)
                      }
                      tooltip={
                        <div className="text-sm">
                          <div className="font-medium">Text Color</div>
                        </div>
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={priority.name}
                      onChange={(e) =>
                        updatePriorityName(priority.id, e.target.value)
                      }
                      className="font-outfit text-theme-text-primary w-full rounded-md border px-3 py-2 text-sm font-medium focus:ring-2"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => openDeleteModal(priority.id)}
                    className="text-alert-prominent cursor-pointer"
                  >
                    <Icons.ri_delete_bin_5_line className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Priority */}
          <div className="border-t pt-6">
            <form
              onSubmit={handleSubmit(onAddPriority)}
              className="flex items-end gap-4"
            >
              <div className="flex-1">
                <InputField
                  control={control}
                  name="newPriorityName"
                  placeholder="New Priority Name"
                />
              </div>
              <div className="w-32">
                <SelectField
                  control={control}
                  name="level"
                  options={levelOptions}
                  placeholder="Level"
                />
              </div>
              <div className="flex gap-2">
                <AdvancedColorPicker
                  color={newPriorityBgColor}
                  onChange={setNewPriorityBgColor}
                  tooltip={
                    <div className="text-sm">
                      <div className="font-medium">Background Color</div>
                    </div>
                  }
                />
                <AdvancedColorPicker
                  color={newPriorityTextColor}
                  onChange={setNewPriorityTextColor}
                  tooltip={
                    <div className="text-sm">
                      <div className="font-medium">Text Color</div>
                    </div>
                  }
                />
              </div>
              <Button
                type="submit"
                className="hover:bg-brand-primary bg-brand-primary hover:bg- px-6 py-3 text-white"
              >
                <Icons.plus className="mr-2 h-4 w-4" />
                Add Status
              </Button>
            </form>
          </div>
        </div>
      </TooltipProvider>
      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Priority?"
        description="Are you sure you want to delete this priority? This action cannot be undone."
        confirmText="Delete Priority"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
