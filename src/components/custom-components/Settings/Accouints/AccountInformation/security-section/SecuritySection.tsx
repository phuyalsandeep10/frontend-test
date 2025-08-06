import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/ui/Icons';

export default function SecuritySection() {
  return (
    <section>
      <h3 className="text-brand-dark text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
        Security
      </h3>

      <div className="mt-6">
        <div className="flex items-center gap-4">
          <Switch
            className="bg-brand-primary-switch data-[state=checked]:bg-brand-primary-switch"
            defaultChecked
          />
          <span className="text-brand-dark text-[16px] leading-[26px] font-medium">
            Two-factor authentication
          </span>
        </div>

        <Card className="border-theme-text-primary mt-[12px] h-12 w-[80%] rounded-md">
          <CardContent className="flex h-full items-center justify-between p-0">
            <div className="ml-[47px] flex items-center gap-2">
              <Icons.key className="h-5 w-5" />
              <span className="text-brand-dark text-[16px] leading-[26px] font-normal">
                Change Password
              </span>
            </div>
            <div className="mr-[47px]">
              <Icons.pencil className="text-brand-primary h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Signature Section */}
      <div className="mt-6">
        <h3 className="text-brand-dark text-[16px] leading-[26px] font-medium tracking-[0%]">
          Custom Signature
        </h3>

        <Card className="mt-5 h-12 w-[80%] rounded-md border-zinc-500">
          <CardContent className="flex h-full items-center justify-between p-0">
            <div className="ml-[47px] flex items-center gap-2">
              <Icons.key className="h-5 w-5" />
              <span className="text-brand-dark text-[16px] leading-[26px] font-normal tracking-[0%]">
                Custom Signature
              </span>
            </div>
            <div className="mr-[47px]">
              <Icons.pencil className="text-brand-primary h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
