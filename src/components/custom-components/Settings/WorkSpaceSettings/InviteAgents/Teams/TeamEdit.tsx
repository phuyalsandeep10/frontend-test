import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { InputField } from '@/components/common/hook-form/InputField';
import Label from '@/components/common/hook-form/Label';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/Icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type FormValues = {
  teamname: string;
  member?: string;
};

interface TeamEditProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
}

const TeamEdit: React.FC<TeamEditProps> = ({
  defaultValues = {},
  onSubmit,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      teamname: '',
      ...defaultValues,
    },
  });

  return (
    <Card className="w-full max-w-full border-0 p-0 shadow-none">
      <CardHeader className="inline-flex flex-col gap-1 p-0">
        <CardTitle className="text-brand-dark text-xl leading-[30px] font-semibold">
          Edit Team
        </CardTitle>
        <CardDescription className="text-xs leading-[17px] font-normal">
          Modify team information
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {' '}
            <div className="pb-5">
              <Label
                required
                htmlFor="teamname"
                className="pb-3 text-base leading-[26px] font-medium"
              >
                Team Name
              </Label>
              <InputField
                className="w-full"
                name="teamname"
                control={form.control}
              />
            </div>
            <div className="pb-5">
              <Label
                required
                htmlFor="member"
                className="pb-3 text-base leading-[26px] font-medium"
              >
                Team Member
              </Label>

              <Controller
                name="member"
                control={form.control}
                render={({ field }) => (
                  <div className="border-grey-light rounded-sm border">
                    <div className="flex items-center justify-between rounded-sm px-5 py-[18px]">
                      <span>Frank Lampard</span>
                      <div className="flex items-center gap-3.5">
                        <ToggleGroup
                          type="single"
                          className="bg-brand-disable flex gap-7 px-[13px] py-1"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <ToggleGroupItem
                            value="Lead"
                            className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
                          >
                            Lead
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Admin"
                            className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
                          >
                            Admin
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Moderator"
                            className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
                          >
                            Moderator
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Agent"
                            className="data-[state=on]:bg-brand-primary data-[state=on]:hover:bg-brand-primary rounded-[4px] px-[15px] py-[2px] data-[state=on]:border data-[state=on]:text-white"
                          >
                            Agent
                          </ToggleGroupItem>
                        </ToggleGroup>
                        <Icons.ri_delete_bin_5_line className="text-alert-prominent cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <Button
              type="submit"
              className="bg-brand-disable text-brand-primary hover:bg-brand-disable h-full max-h-[36px] w-full rounded-sm px-[22px] py-3 text-xs leading-4 font-semibold"
            >
              <Icons.plus />
              Add Member
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Save Change button outside form might cause issue - move inside form if needed */}
      <CardFooter className="flex justify-end gap-4 p-0">
        <Button
          type="button"
          className="h-full max-h-[36px] w-auto rounded-lg px-[22px] py-3 text-xs leading-4 font-semibold"
          onClick={form.handleSubmit(onSubmit)}
        >
          Save Change
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamEdit;
