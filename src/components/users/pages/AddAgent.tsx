import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Icons } from '@/components/ui/Icons';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InputField } from '@/components/common/hook-form/InputField';
import Label from '@/components/common/hook-form/Label';
import { SelectField } from '@/components/common/hook-form/SelectField';
import { Form } from '@/components/ui/form';

type FormValues = {
  email: string;
  fullName: string;
  role: string;
  clientHandled: string;
  day: string | null;
  shift: string;
  startTime: string;
  endTime: string;
  totalHours: string;
  team: string;
};

interface AddAgentProps {
  defaultValues: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
}

const AddAgent: React.FC<AddAgentProps> = ({ defaultValues, onSubmit }) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues || {
      email: '',
      fullName: '',
      role: '',
      clientHandled: '',
      day: null,
      shift: '',
      startTime: '',
      endTime: '',
      totalHours: '',
      team: '',
    },
  });
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Input Fields */}

          {/* Enter agent’s Email * */}
          <div>
            <Label
              required
              className="pb-3 text-base leading-[26px] font-medium" //
              htmlFor="email"
            >
              Enter agent’s Email
            </Label>
            <InputField name="email" control={form.control} />
          </div>

          {/* Full Name  * */}
          <div>
            <Label
              className="pb-3 text-base leading-[26px] font-medium" //
              htmlFor="fullName"
              required
            >
              Full Name 
            </Label>
            <InputField name="fullName" control={form.control} />
          </div>

          {/* Dropdown: Role */}
          <div>
            <Label
              className="pb-3 text-base leading-[26px] font-medium" //
              htmlFor="role"
              required
            >
              Roles
            </Label>
            <SelectField
              name="role"
              required
              control={form.control}
              placeholder="admin"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
          </div>

          {/* Dropdown: Client Handled */}
          <div>
            <Label
              className="pb-3 text-base leading-[26px] font-medium" //
              htmlFor="clientHandled"
              required
            >
              Client Handled
            </Label>
            <SelectField
              name="clientHandled"
              required
              placeholder="admin"
              control={form.control}
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
          </div>

          {/* form date picker  */}

          <Controller
            control={form.control}
            name="day"
            render={({ field }) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-black"
                  >
                    {field.value
                      ? new Date(field.value).toLocaleDateString()
                      : 'Pick a date'}
                    <Icons.ri_calendar_line />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date?.toISOString());
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          {/* <div>
          <Label
            className="pb-3 text-base leading-[26px] font-medium" //
            htmlFor="day"
            required
          >
            Day
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <span id="date" className="w-full justify-between font-normal">
                <Button
                  variant="outline"
                  id="date"
                  className="border-grey-light !hover:bg-transparent w-full justify-between font-normal text-black"
                >
                  {date ? date.toLocaleDateString() : 'Pick a date'}
                  <Icons.ri_calendar_line />
                </Button> */}
          {/* <ChevronDownIcon /> */}
          {/* </span>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div> */}

          {/* Toggle Group */}
          {/* <div>
          <Label
            className="pb-3 text-base leading-[26px] font-medium" //
            htmlFor="shift"
            required
          >
            Shift 
          </Label>
          <ToggleGroup
            type="single"
            className="border-grey-light flex w-full gap-7 border px-[13px] py-1"
          >
            <ToggleGroupItem
              className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
              value="morning"
            >
              Morning
            </ToggleGroupItem>
            <ToggleGroupItem
              className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
              value="day"
            >
              Day
            </ToggleGroupItem>
            <ToggleGroupItem
              className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
              value="night"
            >
              Night
            </ToggleGroupItem>
          </ToggleGroup>
        </div> */}

          <Controller
            name="shift"
            control={form.control}
            render={({ field }) => (
              <ToggleGroup
                type="single"
                className="border-grey-light flex w-full gap-7 border px-[13px] py-1"
                value={field.value}
                onValueChange={field.onChange}
              >
                <ToggleGroupItem value="morning">Morning</ToggleGroupItem>
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="night">Night</ToggleGroupItem>
              </ToggleGroup>
            )}
          />

          {/* Work Schedule   */}
          <div className="col-span-full">
            <Label
              htmlFor="Workschedule"
              className="text-base leading-[26px] font-medium"
              required
            >
              Work Schedule
            </Label>

            <div className="flex w-[100%] basis-full gap-[26px]">
              {/* start time */}
              <div className="w-full">
                <Label
                  className="pb-3 text-base leading-[26px] font-medium" //
                  htmlFor="startTime"
                  required
                >
                  Start Time
                </Label>
                <InputField
                  type="time"
                  name="startTime"
                  control={form.control}
                  required
                  className="!w-[100%]"
                />
              </div>

              {/* end time */}
              <div className="w-full">
                <Label
                  className="pb-3 text-base leading-[26px] font-medium" //
                  htmlFor="endTime"
                  required
                >
                  End Time
                </Label>
                <InputField
                  type="time"
                  name="endTime"
                  control={form.control}
                  required
                  className="!w-[100%]"
                />
              </div>

              {/*toatl hours: Input Fields */}
              <div className="w-full">
                <Label
                  className="pb-3 text-base leading-[26px] font-medium" //
                  htmlFor="totalHours"
                  required
                >
                  Total Hours
                </Label>
                <InputField
                  name="totalHours"
                  control={form.control}
                  placeholder="8"
                  //   control={form.control}
                  //   label="Enter agent’s Email"
                />
              </div>
            </div>
          </div>

          {/* dropdown team */}
          <div className="col-span-full">
            <Label
              className="pb-3 text-base leading-[26px] font-medium" //
              htmlFor="team"
              required
            >
              Team
            </Label>
            <SelectField
              name="team"
              required
              control={form.control}
              placeholder="Select Team"
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
          </div>

          <button
            type="submit"
            className="bg-brand-primary col-span-full mt-4 rounded-lg py-3 text-white"
          >
            Add Agent
          </button>
        </form>
      </Form>
    </>
  );
};

export default AddAgent;
