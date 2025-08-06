import { Input } from '@/components/ui/input';

export default function PublicProfile() {
  return (
    <section className="text-brand-dark mt-[60px] flex flex-col gap-2">
      <h3 className="text-[20px] leading-[30px] font-semibold">
        Public Profile
      </h3>
      <div className="flex items-center gap-6">
        <p className="text-[18px] leading-[29px] font-normal">
          This will display on your profile
        </p>
        <Input
          className="border-gray-light text-theme-text-dark h-9 w-[284px] rounded-[4px] border bg-white text-sm leading-[21px] font-normal opacity-100"
          defaultValue="Yubesh Koirala"
        />
      </div>
    </section>
  );
}
