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

import PrimaryCheckbox from '@/shared/PrimaryCheckbox';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isAgreed, setIsAreed] = useState(false);
  const { mutate: register, isPending } = useRegisterUser();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
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

      <div>
        <HeadingSubHeadingTypography
          heading="Join Us"
          subHeading="Create your free Chatboq account and continue."
        />
        <Stepper step={currentStep} />
        <div className="w-[516px]">
          <Form {...form}>
            <form>
              <PrimaryCheckbox
                isAgreed={isAgreed}
                setIsAreed={setIsAreed}
                redirectLink="/"
                redirectLinkText="Read Terms"
              />
            </form>
            <p className="lead mt-8 text-right text-lg font-normal text-black">
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
      </div>
    </>
  );
};

export default RegisterForm;
