import Image from 'next/image';
import React from 'react';
import VisitorDetails from './VisitorDetails';
import { Button } from '../../ui/button';
import { VisitorDetailModalProps } from './types';

const VisitorDetailModal: React.FC<VisitorDetailModalProps> = ({
  name,
  image,
  details,
  activity,
  onClose,
  onStartChat,
  style,
}) => {
  return (
    <div
      className="border-grey-light w-[363px] rounded-[8px] border bg-white px-5 py-5 shadow-2xl"
      style={style}
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-brand-dark text-2xl leading-8.5 font-semibold">
          {name}
        </p>
        <Image
          src={image}
          alt="User Profile"
          width={50}
          height={50}
          className="h-12.5 w-12.5 rounded-full object-cover"
        />
      </div>

      <div>
        <div className="mb-[24px] grid grid-cols-2 gap-x-18 gap-y-4">
          {details.map((item, idx) => (
            <VisitorDetails key={idx} {...item} />
          ))}
        </div>

        <div>
          <p className="text-brand-dark mb-3 text-[16px] leading-6.5 font-semibold">
            Recent Activity
          </p>

          <div className="mb-6 space-y-3">
            {activity.map((item, i) => (
              <div
                key={i}
                className="bg-info-light border-info flex items-start justify-between rounded-[6px] border-l-[3px] px-3 py-2.5"
              >
                <div>
                  <p className="text-theme-text-primary text-sm leading-5 font-medium">
                    {item.label}
                  </p>
                  {item.subLabel && (
                    <p className="text-theme-text-primary mt-1 text-xs leading-4">
                      “{item.subLabel}”
                    </p>
                  )}
                </div>
                <p className="text-theme-text-primary text-xs leading-4 whitespace-nowrap">
                  {item.timestamp}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" size="sm" onClick={onStartChat}>
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorDetailModal;
