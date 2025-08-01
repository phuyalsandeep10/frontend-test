import React, { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const FilterComponent = () => {
  const [statusFilters, setStatusFilters] = useState<string[]>(['Active']);
  const [sortOption, setSortOption] = useState<string>('');

  const toggleStatus = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleSortSelect = (option: string) => {
    setSortOption((prev) => (prev === option ? '' : option));
  };

  const statuses = [
    'Active',
    'Inactive',
    'Guest',
    'Engaged',
    'Registered Recently',
  ];

  const sortOptions = [
    'Oldest First',
    'Newest First',
    'A-Z (Name)',
    'Z-A (Name)',
    'Most Engaged',
  ];

  return (
    <div
      className="flex w-[443px] gap-4 rounded-[8px] bg-white p-4 px-[36px]"
      style={{
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Filter by Status */}
      <div className="w-[175px]">
        <div className="border-grey-light text-theme-text-primary mb-2 flex items-center justify-between rounded-[4px] border p-[10px] text-[12px] leading-[16px] font-semibold">
          <span>Filter By Status</span>
          <Icons.chevron_down className="text-theme-text-primary h-4 w-4" />
        </div>
        <div className="border-grey-light space-y-3 rounded border p-3">
          {statuses.map((status) => (
            <label
              key={status}
              className="flex cursor-pointer items-center gap-[16px] text-[12px]"
            >
              <input
                type="checkbox"
                checked={statusFilters.includes(status)}
                onChange={() => toggleStatus(status)}
                className="accent-brand-primary border-grey-light h-[22px] w-[20px]"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {/* Filter By */}
      <div className="border-brand-light h-12 w-[178px] border-l pl-4">
        <div className="border-grey-light text-theme-text-primary mb-2 flex items-center justify-between rounded border px-3 py-2 text-[12px] font-semibold">
          <span>Filter By</span>
          <Icons.chevron_down className="text-theme-text-primary h-4 w-4" />
        </div>
        <div className="border-grey-light space-y-3 rounded border p-3">
          {sortOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 text-[12px] leading-[17px]"
            >
              <input
                type="checkbox"
                checked={sortOption === option}
                onChange={() => handleSortSelect(option)}
                className="accent-brand-primary h-[22px] w-[20px]"
              />
              <span className="flex items-center gap-1">
                {option}
                {(option === 'A-Z (Name)' || option === 'Z-A (Name)') &&
                  (sortOption === option ? (
                    <Icons.chevron_up className="h-2 w-2" />
                  ) : (
                    <Icons.chevron_down className="h-2 w-2" />
                  ))}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
