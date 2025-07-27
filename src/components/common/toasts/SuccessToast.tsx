import { Icons } from '@/components/ui/Icons';
import React from 'react';

interface SuccessToastProps {
  text: string;
  onClick: () => void;
}

const SuccessToast = ({ text, onClick }: SuccessToastProps) => {
  return (
    <div>
      <div className="border-success bg-success-prominent mb-8 flex items-center justify-between rounded-lg border p-5">
        <div className="flex gap-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
              fill="#009959"
            />
            <path
              d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
              fill="white"
            />
          </svg>
          <p className="text-gray-primary leading-[26px]">{text}</p>
        </div>
        <div className="cursor-pointer" onClick={onClick}>
          <Icons.x className="text-gray-primary" />
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
