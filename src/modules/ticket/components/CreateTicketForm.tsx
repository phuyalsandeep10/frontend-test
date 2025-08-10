'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTicketSchema, TicketFormData } from '@/lib/ticket.schema';
import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';
import { usePriorities } from '../hooks/usePriorities';
import { TextAreaField } from '@/components/common/hook-form/TextAreaField';
import { SelectField } from '@/components/common/hook-form/SelectField';
import { useTeams } from '../hooks/useTeams';
import { useTeamStore } from '@/services/teams/useTeamStore';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useWatch } from 'react-hook-form';
import { MultiSelectField } from '@/components/common/hook-form/MultipleSelect';

import { useCustomers } from '../hooks/useCustomers';
import { InputField } from '@/components/common/hook-form/InputField';
import { useCreateTicket } from '../hooks/createTicketPayload';
import MultiImageUploader from './comman/MultipleImageuploader';
import { EmailSelectorField } from './comman/EmailSection';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
const CreateTicketForm = () => {
  const authData = useAuthStore((state) => state.authData);
  const organizationId =
    authData?.data?.user?.attributes?.organization_id || null;
  const [emailPopoverOpen, setEmailPopoverOpen] = useState(false);
  const { data: customers = [], isLoading: customersLoading } =
    useCustomers(organizationId);
  const [isAddingNewEmail, setIsAddingNewEmail] = useState(false);
  const { mutate: createTicket, isPending: isCreating } = useCreateTicket();
  const teams = useTeamStore((state) => state.teams);
  const { data: priorities } = usePriorities();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const customerOptions = customers.map((customer: any) => ({
    label: customer.email,
    value: customer.email,
    id: customer.id,
  }));

  // const [isAddingNewEmail, setIsAddingNewEmail] = useState(false);

  const ticketSchema = React.useMemo(
    () => createTicketSchema(isAddingNewEmail),
    [isAddingNewEmail],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: '',
      description: '',
      sender_domain: '',
      notes: '',
      attachment: [],
      priority_id: '',
      department_id: '',
      customer_email: '',
      customer_name: '',
      customer_phone: '',
      customer_location: '',
      assignees: [],
    },
  });

  const selectedTeam = useWatch({ control, name: 'department_id' });
  const selectedPriority = useWatch({ control, name: 'priority_id' });
  const selectedMembers = useWatch({ control, name: 'assignees' });
  const selectedEmail = useWatch({ control, name: 'customer_email' });

  const selectedTeamObj = teams.find((t) => t.id.toString() === selectedTeam);
  const selectedTeamId = selectedTeamObj?.id || 0;

  const { data: teamMembers = [], isLoading: membersLoading } =
    useTeamMembers(selectedTeamId);

  const priorityColorMap =
    priorities?.reduce<Record<string, { bg: string; fg: string }>>(
      (acc, item) => {
        acc[item.id] = {
          bg: item.bg_color,
          fg: item.fg_color,
        };
        return acc;
      },
      {},
    ) ?? {};

  const priorityOptions =
    priorities?.map((p) => ({
      value: p.id.toString(),
      label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    })) ?? [];

  const onSubmit = (data: TicketFormData) => {
    const selectedCustomer = customerOptions.find(
      (opt: any) => opt.value === selectedEmail,
    );
    const priorityId = parseInt(selectedPriority);
    const teamId = selectedTeamObj?.id || 0;
    const memberIds = teamMembers
      .filter((member: any) =>
        selectedMembers?.includes(member.user?.name?.toLowerCase()),
      )
      .map((member: any) => member.user?.id || 0);
    const customerId = selectedCustomer?.id || 0;

    createTicket(
      {
        data,
        teamId,
        priorityId,
        memberIds,
        customerId,
      },
      {
        onSuccess: () => {
          reset({
            title: '',
            description: '',
            sender_domain: '',
            notes: '',
            attachment: [],
            priority_id: '',
            department_id: '',
            customer_email: '',
            customer_name: '',
            customer_phone: '',
            customer_location: '',
            assignees: [],
          });
          setIsAddingNewEmail(false);
          setPreviewImages([]); // reset the array preview images here
          setPreviewImage(null); // reset single preview image here, if you use it
        },
      },
    );
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { isLoading, error } = usePriorities();
  const { isLoading: teamsLoading, error: teamsError } = useTeams();

  const isFetching = isLoading || teamsLoading || isCreating;

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Icons.loader className="text-brand-primary h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error || teamsError) {
    return (
      <div className="text-alert-prominent text-base">
        {error && <p>Error loading: {String(error)}</p>}
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'border-gray-primary shadow-gray-primary rounded-md px-9 pb-8 shadow-md',
        )}
      >
        <h2
          className={cn(
            'font-outfit text-brand-dark pt-8 pb-5 text-xl leading-[30px] font-semibold',
          )}
        >
          Create New Ticket
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-x-5 gap-y-5">
            {/* Ticket Title */}
            <InputField
              control={control}
              name="title"
              label="Ticket Title"
              placeholder="Write a ticket title"
              required
              // error={errors.title?.message}
              inputClassName={cn(
                'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
              )}
              labelClassName={cn(
                'text-brand-dark font-outfit text-sm font-semibold',
              )}
            />
            {/* Customer Email */}
            <EmailSelectorField
              control={control}
              name="customer_email"
              label="Customer's Email"
              required
              options={customerOptions}
              isAddingNew={isAddingNewEmail}
              setIsAddingNew={setIsAddingNewEmail}
              open={emailPopoverOpen}
              setOpen={setEmailPopoverOpen}
              error={errors.customer_email?.message}
            />
            {/* Priority */}
            <SelectField<TicketFormData>
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              name="priority_id"
              label="Priority"
              required
              options={priorityOptions.map((opt) => {
                const color = priorityColorMap[opt.value];
                return {
                  ...opt,
                  label: (
                    <span
                      className="inline-block rounded px-2 py-1 text-sm font-medium"
                      style={{
                        backgroundColor: color?.bg,
                        color: color?.fg,
                      }}
                    >
                      {opt.label}
                    </span>
                  ),
                };
              })}
            />
            {isAddingNewEmail && (
              <>
                {/* Customer Name */}
                <InputField
                  control={control}
                  name="customer_name"
                  label="Full Name"
                  placeholder="Full Name"
                  error={errors.title?.message}
                  inputClassName={cn(
                    'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                  )}
                  labelClassName={cn(
                    'text-brand-dark font-outfit text-sm font-semibold',
                  )}
                />
                {/* Customer Phone */}
                <InputField
                  control={control}
                  name="customer_phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  error={errors.title?.message}
                  inputClassName={cn(
                    'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                  )}
                  labelClassName={cn(
                    'text-brand-dark font-outfit text-sm font-semibold',
                  )}
                />
                {/* Customer Location */}
                <InputField
                  control={control}
                  name="customer_location"
                  label="Location"
                  placeholder="Enter location"
                  error={errors.title?.message}
                  inputClassName={cn(
                    'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                  )}
                  labelClassName={cn(
                    'text-brand-dark font-outfit text-sm font-semibold',
                  )}
                />
              </>
            )}
            {/* Sender's Domain */}
            <InputField
              control={control}
              name="sender_domain"
              label="Sender&#39;s Domain"
              placeholder="Sender's email"
              required
              // error={errors.title?.message}
              inputClassName={cn(
                'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
              )}
              labelClassName={cn(
                'text-brand-dark font-outfit text-sm font-semibold',
              )}
            />
            {/* Teams */}
            <SelectField<TicketFormData>
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              name="department_id"
              label="Teams"
              placeholder="Select Team"
              required
              options={teams.map((team) => ({
                value: team.id.toString(),
                label: team.name,
              }))}
            />
            {/* Assignees */}
            <MultiSelectField
              name="assignees"
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              label="Assignees"
              placeholder={
                membersLoading ? 'Loading members...' : 'Select Members'
              }
              options={teamMembers.map((member: any) => ({
                label: member.user?.name || 'Unknown',
                value: member.user?.name?.toLowerCase() || '',
              }))}
            />
            {/* Description */}
            <TextAreaField
              control={control}
              name="description"
              labelClassName="text-brand-dark font-outfit font-semibold text-sm pb-2 leading-[21px]"
              textareaClassName="h-[122px] border-gray-light resize-none"
              label="Ticket Remarks/Description"
              placeholder="Description"
              required
            />
            {/* Notes */}
            <TextAreaField
              control={control}
              name="notes"
              labelClassName="text-brand-dark font-outfit font-semibold text-sm pb-2 leading-[21px]"
              textareaClassName="h-[122px] border-gray-light resize-none"
              label="Internal Notes"
              placeholder="Note to Agent"
            />
            {/* Attachment */}
            <div className="pt-2">
              <Controller
                name="attachment"
                control={control}
                render={({ field }) => (
                  <MultiImageUploader
                    label="Add Attachment"
                    onImagesSelect={(imageDataUrls) => {
                      field.onChange(imageDataUrls);
                      setPreviewImages(imageDataUrls);
                    }}
                    previewImages={previewImages}
                    wrapperClassName="border-dashed border-2 border-gray-300 h-[122px] w-full flex items-center justify-center"
                    descriptionText=""
                  />
                )}
              />
            </div>
          </div>
          <div className="items-cente flex justify-between">
            <button
              type="submit"
              disabled={isCreating}
              className={cn(
                'bg-brand-primary font-outfit mt-4 h-12 w-[240px] cursor-pointer rounded-md px-6 py-2 text-base leading-[19px] font-semibold text-white',
                isCreating && 'cursor-not-allowed opacity-50',
              )}
            >
              {isCreating ? (
                <Icons.loader className="mr-2 inline-block h-5 w-5 animate-spin" />
              ) : null}
              Create Ticket
            </button>
            <div className="mt-5 text-right text-sm font-medium">
              {!isAddingNewEmail && selectedEmail ? (
                <div className="flex flex-col items-end space-y-1">
                  <span className="bg-info-light text-info font-outfit flex h-8 w-[164px] gap-2 rounded-md px-2 py-1.5 text-center text-sm font-semibold">
                    <span className="h-6 w-6">
                      <Icons.checbox_circle />
                    </span>
                    Existing customer
                  </span>
                  <span className="font-outfit text-info text-sm font-semibold">
                    Cunstomer Since :{' '}
                    {(() => {
                      const customer = customers.find(
                        (c: any) => c.email === selectedEmail,
                      );
                      if (!customer) return 'N/A';
                      // Format date, e.g. "Aug 8, 2025"
                      const createdDate = new Date(customer.created_at);
                      return createdDate.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      });
                    })()}
                  </span>
                </div>
              ) : null}

              {isAddingNewEmail ? (
                <span className="font-outfit text-warning-prominent bg-warning-prominent-bg flex items-center gap-2 rounded-md px-4 py-1 text-sm font-semibold">
                  <span>
                    <Icons.error_warning />
                  </span>
                  Non Existing Customer
                </span>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTicketForm;
