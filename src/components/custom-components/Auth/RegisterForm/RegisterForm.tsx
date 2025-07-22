'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { registerFormSchema } from './registerHelper';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser';
import HeadingSubHeadingTypography from './HeadingSubHeadingTypography';
import Stepper from './Stepper';
import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

import PrimaryCheckbox from '@/shared/PrimaryCheckbox';
import { InputField } from '@/components/common/hook-form/InputField';
import Button from '@/components/common/hook-form/Button';
import OTP from '@/components/common/hook-form/OTP';
import Image from 'next/image';
import { baseURL } from '@/apiConfigs/axiosInstance';
import SelectableCardGroup from '@/components/common/hook-form/SelectableCard';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAgreed, setIsAreed] = useState(false);
  const { mutate: register, isPending } = useRegisterUser();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      otp: '',
      businessDomain: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    register(values);
  }
  console.log(isAgreed);
  return (
    <>
      {/* <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 px-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {' '}
              {isPending ? 'Registering...' : 'Register'}
            </Button>
            <Link href={'/login'} className="ml-4 text-indigo-600">
              Login
            </Link>
          </form>
        </Form>
      </Card>
    </div> */}

      <div className="mt-[44px]">
        <HeadingSubHeadingTypography
          heading="Join Us"
          subHeading="Create your free Chatboq account and continue."
        />
        <Stepper step={currentStep} />
        <div className="w-[516px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <InputField
                control={form.control}
                name="name"
                label="Enter your full name"
                placeholder="Full Name"
              />

              <InputField
                control={form.control}
                name="email"
                label="Enter your Email"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                rightIcon={<Icons.eye size={16} />}
                required
              />
              <PrimaryCheckbox
                isAgreed={isAgreed}
                setIsAreed={setIsAreed}
                redirectLink="/"
                labelText="I have read and I accept Chatboq’s terms and use."
                redirectLinkText="Read Terms"
              />

              <Button
                variant="default"
                type="submit"
                size="lg"
                className="mt-4 w-full"
              >
                Continue
              </Button>
              <p className="align-center text-center font-medium">Or</p>
              <Button
                variant="outline"
                type="button"
                size="lg"
                className="w-full"
                leftIcon={
                  <Image
                    src="/icons/google.svg"
                    alt="Google icon"
                    width={20}
                    height={20}
                  />
                }
                onClick={() =>
                  window.open(
                    `${baseURL}uth/oauth/google`,
                    'google-auth',
                    'width=620,height=620',
                  )
                }
              >
                Continue With Google
              </Button>
            </form>

            <p className="lead mt-8 text-right text-[18px] font-normal text-black">
              Already have an account?
              <Link
                href={'/login'}
                className="text-brand-primary cursor-pointer"
              >
                {' '}
                Login
              </Link>
            </p>
          </Form>

          <div className="mt-[44px] mb-10">
            <HeadingSubHeadingTypography
              heading="Welcome! Please confirm your email to finish setup."
              subHeading="All setup are completed! Have fun with Chatboq."
            />
            <Stepper step={currentStep} />
            <p
              style={{ color: 'var(--color-theme-text-primary)' }}
              className="mb-8"
            >
              We have sent mail with verification code to *****@gmail.com.
            </p>

            <div className="w-[516px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <OTP
                    label="Enter OTP received in mail."
                    required
                    control={form.control}
                    name="otp"
                  />
                  <Button
                    variant="default"
                    type="submit"
                    size="lg"
                    className="mt-4 w-full"
                  >
                    Continue
                  </Button>
                </form>
              </Form>
            </div>

            <div className="mt-[44px]">
              <HeadingSubHeadingTypography
                heading="Say more about yourself."
                subHeading="Fill in your business information! You are almost there. "
              />
              <Stepper step={currentStep} />
              <div className="w-[516px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-5"
                  >
                    <InputField
                      control={form.control}
                      name="businessName"
                      label="Enter name of your Business"
                      placeholder="Workspace/Business Name"
                    />

                    <InputField
                      control={form.control}
                      name="businessDomain"
                      label="Enter your Business's Domain"
                      type="email"
                      placeholder="www.businessname.com"
                      required
                    />
                    <SelectableCardGroup
                      name="selectedPlan"
                      control={form.control}
                      label="Select your Purpose of using Chatboq"
                      options={[
                        'Chat with my website visitor, generate leads.',
                        'Build AI Chatbot',
                        'I am curious about the product',
                        'I want to unify my inbox',
                      ]}
                    />
                    <Button
                      variant="default"
                      type="submit"
                      size="lg"
                      className="mt-4 w-full"
                    >
                      Signup with chatboq
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
