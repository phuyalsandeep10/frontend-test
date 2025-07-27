'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputField } from '@/components/common/hook-form/InputField';
import { SelectField } from '@/components/common/hook-form/SelectField';
import { TextAreaField } from '@/components/common/hook-form/TextAreaField';
import Button from '@/components/common/hook-form/Button';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  country: z.string().min(1, 'Please select a country'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  experience: z.string().min(1, 'Please select your experience level'),
  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must not exceed 500 characters'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  linkedin: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
];

const experienceOptions = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior Level (6-10 years)' },
  { value: 'lead', label: 'Lead/Principal (10+ years)' },
  { value: 'executive', label: 'Executive/C-Level' },
];

export default function Page() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      jobTitle: '',
      company: '',
      experience: '',
      bio: '',
      website: '',
      linkedin: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Form submitted:', data);
    alert('Form submitted successfully!');

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  required
                />

                <InputField
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <InputField
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                required
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />

                <SelectField
                  control={form.control}
                  name="country"
                  label="Country"
                  options={countryOptions}
                  placeholder="Select your country"
                  required
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  control={form.control}
                  name="jobTitle"
                  label="Job Title"
                  placeholder="e.g. Software Engineer"
                  required
                />

                <InputField
                  control={form.control}
                  name="company"
                  label="Company"
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <SelectField
                control={form.control}
                name="experience"
                label="Experience Level"
                options={experienceOptions}
                placeholder="Select your experience level"
                required
              />

              <TextAreaField
                control={form.control}
                name="bio"
                label="Professional Bio"
                placeholder="Tell us about your professional background, skills, and interests..."
                rows={4}
                required
              />
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                Social Links (Optional)
              </h3>

              <InputField
                control={form.control}
                name="website"
                label="Website"
                type="url"
                placeholder="https://yourwebsite.com"
              />

              <InputField
                control={form.control}
                name="linkedin"
                label="LinkedIn Profile"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <div className="flex flex-col justify-end gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
