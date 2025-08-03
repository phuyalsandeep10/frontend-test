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
import googleIcon from '@/assets/images/google.svg';

import PrimaryCheckbox from '@/shared/PrimaryCheckbox';
import { InputField } from '@/components/common/hook-form/InputField';
import Button from '@/components/common/hook-form/Button';
import Image from 'next/image';
import { baseURL } from '@/apiConfigs/axiosInstance';

import VerifyEmailViaOtpForm from './VerifyEmailViaOtp/VerifyEmailViaOtpForm';
import BusinessRegisterForm from './BusinessRegisterForm/BusinessRegisterForm';
import { StrongPasswordField } from '@/components/common/hook-form/StrongPasswordField';
import { ValidEmailInput } from '@/components/common/hook-form/ValidEmailInput';
import ErrorText from '@/components/common/hook-form/ErrorText';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAgreed, setIsAreed] = useState(false);
  const [isAgreeError, setisAgreeError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [validEmail, setValidEmail] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const { mutate: register } = useRegisterUser();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    const registerFormData = { ...values, email: validEmail };
    console.log(registerFormData);
    if (!isAgreed) {
      setisAgreeError('You must agree to the Terms and Conditions to proceed.');
      return;
    }
    setisAgreeError('');
    register(registerFormData, {
      onSuccess: () => {
        setCurrentStep(1);
      },
      onError: () => {},
    });
  };
  return (
    <>
      <div className="relative"></div>
      <div
        className={`${currentStep === 0 && 'mt-11'} ${currentStep === 1 && 'mt-[168px]'} ${currentStep === 2 && 'mt-16'} `}
      >
        <HeadingSubHeadingTypography
          heading={headingAndSubHeadingHelper[currentStep as 0 | 1 | 2].heading}
          subHeading={
            headingAndSubHeadingHelper[currentStep as 0 | 1 | 2].subHeading
          }
        />
        <Stepper step={currentStep} />

        {currentStep === 0 && (
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
                required
              />

              <ValidEmailInput
                onValidityChange={(valid, email) => {
                  setIsEmailValid(valid);
                  setValidEmail(email);
                }}
                name="email"
                label="Enter your Email "
                required
              />
              <StrongPasswordField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
              />
              <PrimaryCheckbox
                isAgreed={isAgreed}
                setIsAreed={setIsAreed}
                redirectLink="/"
                labelText="I have read and I accept Chatboq’s terms and use."
                redirectLinkText="Read Terms"
                error={!!isAgreeError}
              />
              {isAgreeError && <ErrorText error={isAgreeError} />}

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
                    src={googleIcon}
                    alt="Google icon"
                    width={20}
                    height={20}
                  />
                }
                onClick={() =>
                  window.open(
                    `${baseURL}/auth/oauth/google`,
                    'google-auth',
                    'width=620,height=620',
                  )
                }
              >
                Continue With Google
              </Button>
            </form>

            <p className="lead mt-8 text-left text-[18px] font-normal text-black">
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
        )}

        {currentStep === 1 && (
          <VerifyEmailViaOtpForm
            email={validEmail}
            setCurrentStep={setCurrentStep}
            setOtpError={setOtpError}
          />
        )}
        {currentStep === 2 && <BusinessRegisterForm />}
      </div>
    </>
  );
};

export default RegisterForm;
