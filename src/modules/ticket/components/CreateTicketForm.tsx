'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
const Member = ['Satish', 'Srijan', 'Aayan', 'Pradeep', 'Rahul'];

const CreateTicketForm = () => {
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

  const priorityBgColors =
    priorities?.reduce<Record<string, string>>((acc, item) => {
      acc[item.name] = `bg-[${item.bg_color}] text-[${item.fg_color}]`;
      return acc;
    }, {}) ?? {};

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
      <div className="text-sm text-red-500">
        {error && <p>Error loading priorities: {String(error)}</p>}
        {teamsError && <p>Error loading teams</p>}
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
                {...register('ticket')}
                className={cn('border-gray-light h-9 w-full rounded-md border')}
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
                className={cn(
                  'text-brand-dark font-outfit pb-2 text-sm font-semibold',
                )}
              >
                Customer&#39;s Email
              </Label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={cn('border-gray-light h-9 w-full rounded-md border')}
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
              options={priorityOptions}
              colorMap={priorityBgColors}
            />

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
                {...register('sender')}
                className={cn('border-gray-light h-9 w-full rounded-md border')}
              />
              {errors.sender && (
                <p className="text-alert-prominent mt-1 text-sm">
                  {errors.sender.message}
                </p>
              )}
            </div>

            <SelectField<TicketFormData>
              control={control}
              LabelClassName={cn(
                'text-brand-dark font-outfit font-semibold text-sm ',
              )}
              name="team"
              label="Teams"
              placeholder="Select Teams"
              required
              options={teams.map((team) => ({
                value: team.name.toLowerCase(),
                label: team.name,
              }))}
            />
            <SelectField<TicketFormData>
              control={control}
              LabelClassName="text-brand-dark font-outfit font-semibold text-sm"
              name="member"
              label="Suggested Member"
              placeholder={
                membersLoading ? 'Loading members...' : 'Select Member'
              }
              required
              options={teamMembers.map((member: any) => {
                const name = member.user?.name || 'Unknown';
                const image = member.user?.image;

                // Extract initials: First + Last
                const [firstName = '', lastName = ''] = name.trim().split(' ');
                const initials = (firstName[0] || '') + (lastName[0] || '');

                return {
                  value: name.toLowerCase(),
                  label: (
                    <div className="flex items-center gap-2">
                      {image ? (
                        <Image
                          height={50}
                          width={50}
                          src={image}
                          alt={name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
                          {initials.toUpperCase()}
                        </div>
                      )}
                      <span className="capitalize">{name}</span>
                    </div>
                  ),
                };
              })}
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
