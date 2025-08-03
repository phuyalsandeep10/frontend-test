'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/common/hook-form/InputField';
import Label from '@/components/common/hook-form/Label';
import { SelectField } from '@/components/common/hook-form/SelectField';
import { Form } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReuseableTable } from '@/components/custom-components/Settings/WorkSpaceSettings/InviteAgents/ReuseableTable';
import { DialogClose } from '@/components/ui/dialog'; // to close dialog on cancel

type FormValues = {
  role: string;
};

interface RoleFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  roleHead: string;
}

type OrderRow = {
  permissions: string;
  id?: number;
};

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

const RoleForm: React.FC<RoleFormProps> = ({
  defaultValues,
  onSubmit,
  roleHead,
}) => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues || {
      role: '',
    },
  });

  const orders: OrderRow[] = [
    { permissions: 'Canned Response' },
    { permissions: 'Workflows' },
    { permissions: 'Tags & Properties' },
    { permissions: 'Billings' },
    { permissions: 'Project preferences' },
    { permissions: 'Project reports' },
    { permissions: 'Service Level Agreement' },
  ];

  const columns: Column<OrderRow>[] = [
    {
      key: 'permissions',
      label: 'Permissions',
    },
    {
      key: 'edit',
      label: 'Able to edit',
      render: (row) => (
        <Checkbox
          aria-label={`Edit ${row.permissions}`}
          className="data-[state=checked]:bg-brand-primary bg-gray-primary border-gray-300"
        />
      ),
    },
    {
      key: 'view',
      label: 'Able to view',
      render: (row) => (
        <Checkbox
          aria-label={`View ${row.permissions}`}
          className="data-[state=checked]:bg-brand-primary bg-gray-primary border-gray-300"
        />
      ),
    },
    {
      key: 'delete',
      label: 'Able to delete',
      render: (row) => (
        <Checkbox
          aria-label={`Delete ${row.permissions}`}
          className="data-[state=checked]:bg-brand-primary bg-gray-primary border-gray-300"
        />
      ),
    },
  ];

  return (
    <Card className="w-full max-w-full border-0 py-0 shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-lg leading-[29px] font-semibold">
          {roleHead}
        </CardTitle>
        <CardDescription className="text-xs leading-[17px] font-normal">
          Modify an existing role’s name, permissions, or access levels to keep
          your team structure up to date.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Role Input */}
            <div className="pb-[49px]">
              <Label
                htmlFor="role"
                required
                className="pb-3 text-base leading-[26px] font-medium"
              >
                Role Name
              </Label>
              <InputField
                name="role"
                placeholder="Moderator"
                control={form.control}
                className="border-brand-primary rounded-sm border"
                inputClassName="border-brand-primary rounded-sm placeholder:text-sm placeholder:leading-[21px] placeholder:font-normal placeholder:text-black"
              />
            </div>

            {/* Permissions Section */}
            <div className="flex h-full w-full gap-5">
              {/* Tabs */}
              <div className="h-auto w-auto">
                <Tabs
                  defaultValue="setting"
                  className="flex w-full flex-col gap-[12px]"
                >
                  <div className="border-brand-dark flex h-[201px] flex-col items-start border-r-4 pr-6 pb-3">
                    <p className="text-sm leading-[21px] font-semibold">
                      Set Permission
                    </p>
                    <TabsList className="flex h-[201px] flex-col items-start bg-transparent">
                      <TabsTrigger
                        value="setting"
                        className="data-[state=active]:text-brand-primary p-0 text-sm leading-[21px] font-normal !shadow-none"
                      >
                        Setting
                      </TabsTrigger>
                      <TabsTrigger
                        value="channels"
                        className="data-[state=active]:text-brand-primary p-0 text-sm leading-[21px] font-normal !shadow-none"
                      >
                        Channels
                      </TabsTrigger>
                      <TabsTrigger
                        value="inbox"
                        className="data-[state=active]:text-brand-primary p-0 text-sm leading-[21px] font-normal !shadow-none"
                      >
                        Inbox & Contact
                      </TabsTrigger>
                      <TabsTrigger
                        value="analytics"
                        className="data-[state=active]:text-brand-primary p-0 text-sm leading-[21px] font-normal !shadow-none"
                      >
                        Analytics
                      </TabsTrigger>
                      <TabsTrigger
                        value="access"
                        className="data-[state=active]:text-brand-primary p-0 text-sm leading-[21px] font-normal !shadow-none"
                      >
                        Section Access
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>

              {/* Permissions Table */}
              <ReuseableTable
                columns={columns}
                data={orders}
                tableClassName="bg-white border-b-0 border-none"
                headerClassName="border-none"
              />
            </div>

            {/* Footer Buttons */}
            <CardFooter className="flex justify-end gap-4 px-0 pt-6">
              <DialogClose asChild>
                <Button
                  className="bg-brand-primary h-[36px] w-full max-w-[130px] rounded-lg px-4 py-2.5 text-xs leading-4 font-semibold text-white"
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="bg-brand-primary h-[36px] w-full max-w-[130px] rounded-lg px-4 py-3 text-xs leading-4 font-semibold text-white"
                type="submit"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RoleForm;
