import Link from 'next/link';
import SecuritySection from '../security-section/SecuritySection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PlansSection() {
  // Subscription plans data
  const plans = [
    {
      name: 'Organization Plan',
      price: '39.99',
      period: '/month',
      nextBillingDate: 'October 20, 2025',
      usedAccounts: '1/5 account',
      isActive: true,
      action: 'Cancel Subscriptions',
      bgColor: 'bg-secondary-hover',
    },
    {
      name: 'Starter Plan',
      price: 'Free',
      isActive: false,
      action: 'DOWNGRACE',
      bgColor: 'bg-white',
    },
  ];

  return (
    <div className="">
      <SecuritySection />

      <p className="mt-8 text-base leading-[17px] font-normal tracking-[0.2%]">
        <span className="text-theme-text-dark">
          Want to remove your Chatboq account?
        </span>{' '}
        <Link
          href="#"
          className="text-brand-primary hover:text-brand-light underline"
        >
          Click here to continue!
        </Link>
      </p>

      {/* Plans Section */}
      <section className="mt-8">
        <h3 className="text-brand-dark mb-3 text-[20px] leading-[30px] font-semibold tracking-[-0.1%]">
          Plans
        </h3>

        <div className="flex gap-[41px]">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`${plan.bgColor} rounded-lg p-0 shadow-[0px_1px_3px_#dfb3ff]`}
            >
              <CardContent className="flex flex-col p-5">
                <h4 className="text-brand-dark text-[14px] leading-[21px] font-semibold tracking-[0%]">
                  {plan.name}
                </h4>

                <div className="text-brand-primary leading-[29px] font-semibold tracking-[0%]">
                  <span className="text-[18px]">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm font-semibold">{plan.period}</span>
                  )}
                </div>

                {plan.isActive ? (
                  <>
                    <div className="mt-[7px]">
                      <p className="text-sm leading-[21px] font-normal tracking-[0.15%]">
                        Next billing date
                      </p>
                      <p className="text-xs leading-[17px] font-semibold tracking-[0.2%]">
                        {plan.nextBillingDate}
                      </p>
                    </div>

                    <div className="mt-[7px]">
                      <p className="text-sm leading-[21px] font-normal tracking-[0.15%]">
                        Used accounts
                      </p>
                      <p className="mt-[3px] text-xs leading-[17px] font-semibold tracking-[0.2%]">
                        {plan.usedAccounts}
                      </p>
                    </div>

                    <Link
                      href="#"
                      className="text-brand-primary mt-4 text-sm leading-[21px] font-normal tracking-[0.15%] underline decoration-solid decoration-[0px] underline-offset-[0px]"
                    >
                      {plan.action}
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="text-pure-black mt-2.5 text-xs leading-[17px] font-normal tracking-[0.2%]">
                      This subscription allows <br />
                      up to 1 linked account.
                      <br />
                      You are currently using <br />1 accounts.
                    </div>
                    <Button
                      variant="outline"
                      className="border-brand-primary border- text-brand-primary mt-[19px] h-9 rounded-[8px] text-xs leading-[17px] font-normal tracking-[0.2%]"
                    >
                      {plan.action}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
