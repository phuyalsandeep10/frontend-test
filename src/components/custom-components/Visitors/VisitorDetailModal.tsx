import Image from 'next/image';
import React from 'react';
import VisitorDetails from '../../common/modal/visitordetails';
import { Button } from '../../ui/button';

interface Activity {
  label: string;
  subLabel?: string;
  timestamp: string;
}

interface VisitorDetailModalProps {
  name: string;
  image: string;
  details: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  activity: Activity[];
  onClose: () => void;
  onStartChat: () => void;
  style?: React.CSSProperties;
}

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
      className="border-grey-light w-[363px] rounded-[8px] border bg-white px-[20px] py-[20px] shadow-2xl"
      style={style}
    >
      <div className="mb-[24px] flex items-center justify-between">
        <p className="text-brand-dark text-[24px] leading-[34px] font-semibold">
          {name}
        </p>
        <Image
          src={image}
          alt="User Profile"
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
      </div>

      <div>
        <div className="mb-[24px] grid grid-cols-2 gap-x-[72px] gap-y-4">
          {details.map((item, idx) => (
            <VisitorDetails key={idx} {...item} />
          ))}
        </div>

        <div>
          <p className="text-brand-dark mb-[12px] text-[16px] leading-[26px] font-semibold">
            Recent Activity
          </p>

          <div className="mb-[24px] space-y-3">
            {activity.map((item, i) => (
              <div
                key={i}
                className="bg-info-light border-info flex items-start justify-between rounded-[6px] border-l-[3px] px-3 py-2.5"
              >
                <div>
                  <p className="text-theme-text-primary text-[14px] leading-[21px] font-medium">
                    {item.label}
                  </p>
                  {item.subLabel && (
                    <p className="text-theme-text-primary mt-1 text-[12px] leading-[17px]">
                      “{item.subLabel}”
                    </p>
                  )}
                </div>
                <p className="text-theme-text-primary text-[12px] leading-[17px] whitespace-nowrap">
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
