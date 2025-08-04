'use client';

import { Icons } from '@/components/ui/Icons';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 6) {
    // Show all pages if 6 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // More than 6 pages
    if (currentPage <= 4) {
      // Near beginning: show 1 2 3 4 ... last
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage > totalPages - 4) {
      // Near end: show 1 ... last-3 last-2 last-1 last
      pageNumbers.push(
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      // Middle: show 1 ... currentPage-1 currentPage currentPage+1 ... last
      pageNumbers.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      );
    }
  }

  return (
    <div className="font-outfit flex items-center justify-between py-8">
      {/* Left: Showing X - Y of Z */}
      <div className="text-gray-primary font-outfit text-base font-normal">
        Showing{' '}
        <span className="text-brand-primary">
          {startItem}-{endItem}{' '}
        </span>
        of <span className="text-brand-primary">{totalItems}</span>
      </div>

      {/* Right: Pagination Buttons */}
      <div className="border-gray-light flex items-center space-x-2 rounded-md border">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer rounded px-2 py-1 disabled:opacity-50"
          aria-label="Previous page"
        >
          <Icons.chevron_left />
        </button>

        {pageNumbers.map((pageNum, idx) =>
          pageNum === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-2 text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(Number(pageNum))}
              className={`rounded-md px-3 py-1 ${
                pageNum === currentPage
                  ? 'bg-brand-primary rounde-md cursor-pointer border text-white'
                  : 'cursor-pointer hover:bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          ),
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer rounded px-2 py-2 disabled:opacity-5"
          aria-label="Next page"
        >
          <Icons.chevron_right />
        </button>
      </div>
    </div>
  );
}
