'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ContactFormSchema,
  contactFormSchema,
} from '@/hooks/utils/ContactSchema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import PhoneInput from '@/shared/PhoneInput';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ContactForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormSchema) => {
    const fullData = { ...data, phoneNumber }; // Append phone number from state
    console.log(fullData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2
        className={cn(
          'font-outfit text-brand-dark mb-6 text-xl leading-[30px] font-semibold',
        )}
      >
        Contact Information
      </h2>
      <div className={cn('space-y-4.5')}>
        <div className={cn('grid grid-cols-2 gap-5')}>
          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="email"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="anything@gmail.com"
              type="email"
              className={cn('font-outfit h-9 text-sm font-medium')}
              {...register('email')}
            />
            {errors.email && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="phone"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              Phone
            </Label>
            <PhoneInput />
            {errors.phoneNumber && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className={cn('grid grid-cols-2 gap-5')}>
          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="messenger"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              Messenger
            </Label>
            <Input
              id="messenger"
              placeholder="Messenger username"
              className={cn('font-outfit h-9 text-sm font-medium')}
              {...register('messenger')}
            />
            {errors.messenger && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.messenger.message}
              </p>
            )}
          </div>
          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="telegram"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              Telegram
            </Label>
            <Input
              id="telegram"
              placeholder="Telegram username"
              className={cn('font-outfit h-9 text-sm font-medium')}
              {...register('telegram')}
            />
            {errors.telegram && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.telegram.message}
              </p>
            )}
          </div>
        </div>

        <div className={cn('grid grid-cols-2 gap-5')}>
          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="twitter"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              X (Twitter)
            </Label>
            <Input
              id="twitter"
              placeholder="X username"
              className={cn('font-outfit h-9 text-sm font-medium')}
              {...register('twitter')}
            />
            {errors.twitter && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.twitter.message}
              </p>
            )}
          </div>
          <div className={cn('space-y-2.5')}>
            <Label
              htmlFor="whatsapp"
              className={cn('font-outfit text-base font-medium text-black')}
            >
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              className={cn('font-outfit h-9 text-sm font-medium')}
              placeholder="+977 9824830624"
              {...register('whatsapp')}
            />
            {errors.whatsapp && (
              <p className={cn('text-alert-prominent text-xs')}>
                {errors.whatsapp.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
