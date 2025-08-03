import { MapPinIcon, EditIcon, PhoneIcon } from 'lucide-react';

interface ProfileSectionProps {
  name: string;
  email: string;
  location: string;
  phone: string;
  countryCode: string;
  profileImage: string;
}

export default function ProfileSection({
  name,
  email,
  location,
  phone,
  countryCode,
  profileImage,
}: ProfileSectionProps) {
  return (
    <div className="mt-11 flex items-center gap-[126px]">
      <div className="flex items-center gap-6">
        <div
          className="relative h-[167px] w-[167px] overflow-hidden rounded-[175px] bg-cover"
          style={{ backgroundImage: `url(${profileImage})` }}
        >
          <div className="absolute bottom-0 flex h-12 w-full items-center justify-center bg-[#d9d9d9b2]">
            <EditIcon className="h-6 w-6" />
          </div>
        </div>

        <div className="text-brand-dark flex w-[314px] flex-col gap-2">
          <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.4%]">
            {name}
          </h2>
          <p className="text-[18px] font-normal">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-end gap-2">
          <MapPinIcon className="h-3.5 w-3.5" />
          <span className="text-right">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-3.5 w-3.5" />
          <span className="text-right">
            {countryCode} {phone}
          </span>
        </div>
      </div>
    </div>
  );
}
