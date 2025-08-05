'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketSchema, TicketFormData } from '@/lib/ticket.schema';
import Label from '@/components/common/hook-form/Label';
import { showToast } from '@/shared/toast';
import { Icons } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';
import { usePriorities } from '../hooks/usePriorities';
import { TextAreaField } from '@/components/common/hook-form/TextAreaField';
import { SelectField } from '@/components/common/hook-form/SelectField';
import ImageUploader from '@/components/ImageUploader/imageUploader';
import Image from 'next/image';
import { useTeams } from '../hooks/useTeams';
import { useTeamStore } from '@/services/teams/useTeamStore';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useWatch } from 'react-hook-form';
import { MultiSelectField } from '@/components/common/hook-form/MultipleSelect';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
// import { Command } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { useCustomers } from '../hooks/useCustomers';

const CreateTicketForm = () => {
  const [emailPopoverOpen, setEmailPopoverOpen] = useState(false);
  const { data: customers = [], isLoading: customersLoading } = useCustomers(1);
  const [isAddingNewEmail, setIsAddingNewEmail] = useState(false);

  const customerOptions = customers.map((customer: any) => ({
    label: customer.email,
    value: customer.email,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      ticket: '',
      email: '',
      priority: '',
      sender: '',
      team: '',
      member: '',
      description: '',
      notes: '',
    },
  });

  const onSubmit = (data: TicketFormData) => {
    console.log('Submitted:', data);
    showToast({
      title: 'Ticket Created',
      description: 'Your ticket created successfully!',
      variant: 'success',
    });
    reset({
      ticket: '',
      email: '',
      priority: '',
      sender: '',
      team: '',
      member: '',
      description: '',
      notes: '',
    });
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImage = (imageDataUrl: string) => {
    setPreviewImage(imageDataUrl);
  };

  const { data: priorities, isLoading, error } = usePriorities();
  const { isLoading: teamsLoading, error: teamsError } = useTeams();
  const teams = useTeamStore((state) => state.teams);

  // watch the selected team
  const selectedTeam = useWatch({ control, name: 'team' });

  // get the team ID from team name
  const selectedTeamObj = teams.find(
    (t) => t.name.toLowerCase() === selectedTeam,
  );
  const selectedTeamId = selectedTeamObj?.id;

  // fetch members for the selected team
  const { data: teamMembers = [], isLoading: membersLoading } =
    useTeamMembers(selectedTeamId);

  const priorityColorMap =
    priorities?.reduce<Record<string, { bg: string; fg: string }>>(
      (acc, item) => {
        acc[item.name.toLowerCase()] = {
          bg: item.bg_color,
          fg: item.fg_color,
        };
        return acc;
      },
      {},
    ) ?? {};

  const priorityOptions =
    priorities?.map((p) => ({
      value: p.name.toLowerCase(),
      label: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    })) ?? [];

  const isFetching = isLoading || teamsLoading;

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
        {error && <p>Error loading : {String(error)}</p>}
        {/* {teamsError && <p>Error loading teams</p>} */}
      </div>
    );
  }
  return (
    <>
      <div className="pb-10">
        <h1
          className={cn(
            'font-outfit text-brand-dark flex items-center gap-2 text-3xl leading-[40px] font-semibold',
          )}
        >
          Ticket
          <span>
            <Icons.danger />
          </span>
        </h1>
        <p
          className={cn(
            'font-outfit text-gray-primary pt-2 text-xs leading-[17px] font-normal',
          )}
        >
          Organize, assign, and monitor issues seamlessly.
        </p>
      </div>

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
            {/* Ticket Topic */}
            <div>
              <Label
                htmlFor="ticket"
                required
                className={cn(
                  'text-brand-dark font-outfit pb-2 text-sm font-semibold',
                )}
              >
                Ticket Topic
              </Label>
              <input
                type="text"
                id="ticket"
                placeholder="Your Precise Topic"
                {...register('ticket')}
                className={cn(
                  'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                )}
              />
              {errors.ticket && (
                <p className="text-alert-prominent mt-1 text-sm">
                  {errors.ticket.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                required
                className="text-brand-dark font-outfit pb-2 text-sm font-semibold"
              >
                Customer&apos;s Mail
              </Label>

              <Controller
                name="email"
                control={control}
                render={({ field }) =>
                  isAddingNewEmail ? (
                    <input
                      type="email"
                      {...field}
                      placeholder="Enter customer email"
                      className={cn(
                        'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                      )}
                    />
                  ) : (
                    <Popover
                      open={emailPopoverOpen}
                      onOpenChange={setEmailPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="border-gray-light h-9 w-full justify-between text-black"
                        >
                          {field.value || 'Select email'}
                          <Icons.chevron_down className="text-gray-primary ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="text-gray-primary w-full min-w-[var(--radix-popover-trigger-width)] p-0">
                        <Command>
                          <CommandInput placeholder="Search email..." />
                          <CommandEmpty>No customer found.</CommandEmpty>
                          <CommandGroup>
                            {customerOptions.map(
                              (option: { label: string; value: string }) => (
                                <CommandItem
                                  key={option.value}
                                  onSelect={() => {
                                    field.onChange(option.value);
                                    setEmailPopoverOpen(false);
                                  }}
                                >
                                  {option.label}
                                </CommandItem>
                              ),
                            )}
                          </CommandGroup>
                          <div className="border-t p-2">
                            <Button
                              type="button"
                              variant="ghost"
                              className="flex w-full items-center justify-start gap-2"
                              onClick={() => {
                                setEmailPopoverOpen(false);
                                setIsAddingNewEmail(true); // enable manual input
                              }}
                            >
                              <Icons.plus className="h-4 w-4" /> Add New Email
                            </Button>
                          </div>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )
                }
              />
              {errors.email && (
                <p className="text-alert-prominent mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Priority */}

            <SelectField<TicketFormData>
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              name="priority"
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
                <div>
                  <Label
                    htmlFor="customerName"
                    className="text-brand-dark font-outfit pb-2 text-sm font-semibold"
                  >
                    Full Name
                  </Label>
                  <input
                    type="text"
                    id="customerName"
                    placeholder="Customer full Name here"
                    {...register('customerName')}
                    className={cn(
                      'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                    )}
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <Label
                    htmlFor="customerPhone"
                    className="text-brand-dark font-outfit pb-2 text-sm font-semibold"
                  >
                    Phone Number
                  </Label>
                  <input
                    inputMode="numeric"
                    pattern="\d*"
                    id="customerPhone"
                    placeholder="Customer Phone Number"
                    {...register('customerPhone')}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9]/g,
                        '',
                      );
                    }}
                    className={cn(
                      'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                    )}
                  />
                </div>

                {/* Customer Company */}
                <div>
                  <Label
                    htmlFor="customerCompany"
                    className="text-brand-dark font-outfit pb-2 text-sm font-semibold"
                  >
                    Address
                  </Label>
                  <input
                    type="text"
                    placeholder="Customer Address"
                    id="customerCompany"
                    {...register('customerCompany')}
                    className={cn(
                      'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                    )}
                  />
                </div>
              </>
            )}

            {/* Sender's Domain */}
            <div>
              <Label
                htmlFor="sender"
                required
                className={cn(
                  'text-brand-dark font-outfit pb-1 text-sm font-semibold',
                )}
              >
                Sender&#39;s domain
              </Label>
              <input
                type="text"
                id="sender"
                placeholder="Senders Domain Here"
                {...register('sender')}
                className={cn(
                  'border-gray-light placeholder:text-gray-primary focus:ring-gray-primary h-9 w-full rounded-md border px-4 py-2 placeholder:text-sm focus:ring focus:outline-none',
                )}
              />
              {errors.sender && (
                <p className="text-alert-prominent mt-1 text-sm">
                  {errors.sender.message}
                </p>
              )}
            </div>
            <SelectField<TicketFormData>
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              name="team"
              label="Teams"
              placeholder="Select Team"
              required
              options={teams.map((team) => ({
                value: team.name.toLowerCase(),
                label: team.name,
              }))}
            />
            <MultiSelectField
              name="member"
              control={control}
              label="Suggested Member"
              placeholder={
                membersLoading ? 'Loading members...' : 'Select Members'
              }
              options={teamMembers.map((member: any) => ({
                label: member.user?.name || 'Unknown',
                value: member.user?.name?.toLowerCase() || '',
              }))}
            />
            <TextAreaField
              control={control}
              name="description"
              labelClassName="text-brand-dark font-outfit font-semibold text-sm pb-2 leading-[21px]"
              textareaClassName="h-[122px] border-gray-light resize-none"
              label="Ticket Remarks/Descriptiton"
              placeholder="subject"
              required
            />
            <TextAreaField
              control={control}
              name="notes"
              labelClassName="text-brand-dark font-outfit font-semibold text-sm pb-2 leading-[21px]"
              textareaClassName="h-[122px] border-gray-light resize-none"
              label="Internal Notes"
              placeholder="Note to Agent"
            />
            <div className="pt-2">
              <Label
                htmlFor="imageUploadInput"
                className="text-brand-dark font-outfit pb-2 text-sm leading-[21px] font-semibold"
              >
                Add Attachment
              </Label>

              <ImageUploader
                onImageSelect={handleImage}
                wrapperClassName="border-dashed border-2 border-gray-300 h-[122px] w-full flex items-center justify-center"
                descriptionText=""
              />
              {previewImage && (
                <div className="mt-3">
                  <Image
                    height={128}
                    width={128}
                    src={previewImage}
                    alt="Preview"
                    className="max-h-[150px] rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={cn(
              'bg-brand-primary font-outfit mt-4 h-12 w-[240px] cursor-pointer rounded-md px-6 py-2 text-base leading-[19px] font-semibold text-white',
            )}
          >
            Create Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTicketForm;
