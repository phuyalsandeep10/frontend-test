// 'use client';

// import { InputField } from '@/components/common/hook-form/InputField';
// import { cn } from '@/lib/utils';
// import { Control, FieldErrors } from 'react-hook-form';
// import { TicketFormData } from '@/lib/ticket.schema';

// interface ExtraFormProps {
//   control: Control<TicketFormData>;
//   errors: FieldErrors<TicketFormData>;
// }

// const ExtraForm: React.FC<ExtraFormProps> = ({ control, errors }) => {
//   return (
//     <>
//       {/* Customer Name */}
//       <InputField
//         control={control}
//         name="customerName"
//         label="Full Name"
//         placeholder="Enter full name"
//         required={false} // Align with ticketSchema (optional)
//         inputClassName={cn(
//           'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
//         )}
//         labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
//       />

//       {/* Customer Phone */}
//       <InputField
//         control={control}
//         name="customerPhone"
//         label="Phone Number"
//         placeholder="Enter phone number"
//         required={false} // Align with ticketSchema (optional)
//         inputClassName={cn(
//           'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
//         )}
//         labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
//       />

//       {/* Customer Company */}
//       <InputField
//         control={control}
//         name="customerCompany"
//         label="Company/Address"
//         placeholder="Enter company or address"
//         required={false} // Align with ticketSchema (optional)
//         inputClassName={cn(
//           'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
//         )}
//         labelClassName={cn('text-brand-dark font-outfit text-sm font-semibold')}
//       />
//     </>
//   );
// };

// export default ExtraForm;
