'use client';

import { Button } from '@/components/ui/button';
import AdvancedColorPicker from '@/modules/ticket/components/comman/AdvanceColorPicker';
import { Icons } from '@/components/ui/Icons';

type Priority = {
  id: number | string;
  name: string;
  darkColor: string;
  lightColor: string;
};

type PriorityListProps = {
  priorities: Priority[];
  updatePriorityName: (id: number | string, name: string) => void;
  updatePriorityColor: (
    id: number | string,
    colorType: 'dark' | 'light',
    color: string,
  ) => void;
  openDeleteModal: (priorityId: number | string) => void;
};

export default function PriorityList({
  priorities,
  updatePriorityName,
  updatePriorityColor,
  openDeleteModal,
}: PriorityListProps) {
  return (
    <div className="space-y-4">
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
                  <div className="text-sm font-medium">Background Color</div>
                }
              />
              <AdvancedColorPicker
                color={priority.lightColor}
                onChange={(color) =>
                  updatePriorityColor(priority.id, 'light', color)
                }
                tooltip={<div className="text-sm font-medium">Text Color</div>}
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
              onClick={() => openDeleteModal(Number(priority.id))}
              className="text-alert-prominent hover:text-alert-prominent cursor-pointer"
            >
              <Icons.ri_delete_bin_5_line className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
