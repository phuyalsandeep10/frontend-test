'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import {
  headingAndSubHeadingHelper,
  registerFormSchema,
} from './registerHelper';
import { useRegisterUser } from '@/hooks/auth/useRegisterUser';
import HeadingSubHeadingTypography from './HeadingSubHeadingTypography';
import Stepper from './Stepper';
import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

import PrimaryCheckbox from '@/shared/PrimaryCheckbox';
import { InputField } from '@/components/common/hook-form/InputField';
import Button from '@/components/common/hook-form/Button';
import Image from 'next/image';
import { baseURL } from '@/apiConfigs/axiosInstance';

import VerifyEmailViaOtpForm from './VerifyEmailViaOtp/VerifyEmailViaOtpForm';
import BusinessRegisterForm from './BusinessRegisterForm/BusinessRegisterForm';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAgreed, setIsAreed] = useState(false);
  const [email, setEmail] = useState('');
  const { mutate: register, isPending, data: registerData } = useRegisterUser();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
    register(values);
    if (!isPending) {
      setCurrentStep(1);
      setEmail(values.email);
    }
  }

  console.log(email);

  return (
    <>
      <HeadingSubHeadingTypography
        heading={headingAndSubHeadingHelper[currentStep as 0 | 1 | 2].heading}
        subHeading={
          headingAndSubHeadingHelper[currentStep as 0 | 1 | 2].subHeading
        }
      />
      <Stepper step={currentStep} />

      {currentStep === 0 && (
        <div className="mt-[44px]">
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
                disabled={!isAgreed}
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
        </div>
      )}

      {currentStep === 1 && (
        <VerifyEmailViaOtpForm email={email} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && <BusinessRegisterForm />}
    </>
  );
};

export default RegisterForm;
