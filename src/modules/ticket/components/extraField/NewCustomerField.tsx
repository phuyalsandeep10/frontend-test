import React from 'react';
import { Control } from 'react-hook-form';
import { InputField } from '@/components/common/hook-form/InputField';
import { cn } from '@/lib/utils';
import { TicketFormData } from '@/modules/ticket/types/ticket.schema';

interface NewCustomerFieldsProps {
  control: Control<TicketFormData>;
}

const NewCustomerFields: React.FC<NewCustomerFieldsProps> = ({ control }) => {
  return (
    <>
      {/* Customer Name */}
      <InputField
        control={control}
        name="customer_name"
        label="Full Name"
        placeholder="Full Name"
        inputClassName={cn(
          'placeholder:text-gray-primary focus:ring-gray-primary w-full rounded-md py-2',
        )}
        labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
      />
      {/* Customer Phone */}
      <InputField
        control={control}
        name="customer_phone"
        label="Phone Number"
        placeholder="Enter phone number"
        inputClassName={cn(
          'placeholder:text-gray-primary focus:ring-gray-primary w-full rounded-md py-2',
        )}
        labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
      />
      {/* Customer Location */}
      <InputField
        control={control}
        name="customer_location"
        label="Location"
        placeholder="Enter location"
        inputClassName={cn(
          'placeholder:text-gray-primary focus:ring-gray-primary w-full rounded-md py-2',
        )}
        labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
      />
    </>
  );
};

export default NewCustomerFields;
