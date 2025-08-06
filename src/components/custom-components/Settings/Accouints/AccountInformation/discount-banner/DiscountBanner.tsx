import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function DiscountBanner() {
  return (
    <Card className="bg-brand-primary mt-[53px] mb-10 h-28 overflow-hidden rounded-lg">
      <CardContent className="relative flex h-full items-center justify-between py-5">
        <div className="text-pure-white ml-[41px] flex flex-col gap-1">
          <h4 className="text-[18px] leading-[29px] font-semibold tracking-[0%]">
            Discount
          </h4>
          <div className="flex items-center gap-[25px]">
            <span className="text-[32px] leading-[40px] font-semibold tracking-[-0.3%]">
              30%
            </span>
            <span className="">
              <span className="text-[18px] leading-[29px] font-normal tracking-[0%]">
                discount on{' '}
              </span>
              <span className="text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
                Annual Plans
              </span>
            </span>
          </div>
        </div>

        <div className="absolute right-1/6">
          <Image width={141} height={88} src="/letter.svg" alt="letter-img" />
        </div>

        <Button
          variant="outline"
          className="border-pure-white text-pure-white h-9 w-[130px] rounded-[8px] text-[12px] leading-[16px] font-semibold"
        >
          Switch to Yearly
        </Button>
      </CardContent>
    </Card>
  );
}
