import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Select from 'react-select';

import { roleSchema, type RoleSchema } from '../../../utils/rules';
import Row from '../../../components/Row';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { rolePermissionApi } from '../../../services/rolePermission.api';
import { Permission } from '../../../types/permission.type';
import useUrl from '../../../hooks/useUrl';

type FormData = Pick<RoleSchema, 'description' | 'permissions' | 'name'>;
const createRoleSchema = roleSchema.pick([
  'description',
  'permissions',
  'name'
]);

export default function CreateRoleContent({
  isLoading = false,
  permissions,
  onCloseModal
}: {
  isLoading?: boolean;
  permissions: Permission[] | [];
  onCloseModal?: () => void;
}) {
  const { handler: setPage } = useUrl({ field: 'page' });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(createRoleSchema)
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: rolePermissionApi.createNewRole,
    onSuccess: () => {
      toast.success('Role created succesfully');

      setPage(1);

      queryClient.invalidateQueries({
        queryKey: ['roles']
      });
      reset();
      onCloseModal?.();
    },
    onError: (err) => {
      const errorMessage = (err as AxiosError<{ message: string }>).response
        ?.data?.message;
      toast.error(errorMessage || 'An error occurred');
    }
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      const { name, description, permissions } = data;
      mutate({
        name,
        description,
        permissions
      });
    },
    [mutate]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Create new role</h3>
      </div>
      <div className="p-4 md:p-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Input
              label="name"
              name="name"
              inputSize="md"
              type="text"
              roundedFull={false}
              placeholder="Enter name..."
              className="rounded-md"
              register={register}
              errorMessage={errors?.name?.message}
            />
            <Input
              label="description"
              name="description"
              inputSize="md"
              type="text"
              placeholder="Enter description..."
              roundedFull={false}
              className="rounded-md"
              register={register}
              errorMessage={errors?.description?.message}
            />
          </Row>
          <Row>
            {!isLoading && (
              <div className="flex-1">
                <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
                  Permissions
                </label>
                <Controller
                  name="permissions"
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <Select
                        onChange={(val) => {
                          const selectedIds = val.map((ele) => ele.value);
                          onChange(selectedIds);
                        }}
                        className="w-full max-w-[532px] border border-[#E2E8F0] rounded-md"
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: 0,
                            boxShadow: 'none'
                          })
                        }}
                        isMulti
                        isSearchable
                        options={permissions!.map((p) => ({
                          label: p.description,
                          value: p._id
                        }))}
                      />
                    );
                  }}
                />
                {errors.permissions && (
                  <span className="text-xs text-red-500 mt-2">
                    {errors.permissions.message}
                  </span>
                )}
              </div>
            )}
          </Row>
          <Button
            className="w-full capitalize text-[16px]"
            isLoading={isPending}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
