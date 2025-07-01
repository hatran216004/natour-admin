import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { PermissionSchema, permissionSchema } from '../../../utils/rules';
import Row from '../../../components/Row';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { rolePermissionApi } from '../../../services/rolePermission.api';
import { ErrorResponseApi } from '../../../types/utils.type';
import useUrl from '../../../hooks/useUrl';

export default function CreatePermissionContent({
  onCloseModal
}: {
  onCloseModal?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PermissionSchema>({
    resolver: yupResolver(permissionSchema)
  });

  const { handler: setPage } = useUrl({ field: 'page' });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: rolePermissionApi.createNewPermission,
    onSuccess: () => {
      toast.success('Permission created succesfully');

      setPage(1);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'permissions'
      });

      onCloseModal?.();
      reset();
    },
    onError: (err) => {
      const errorMessage = (err as AxiosError<ErrorResponseApi>).response?.data
        ?.message;
      toast.error(errorMessage || 'An error occurred');
    }
  });

  const onSubmit = useCallback(
    (data: PermissionSchema) => {
      const { name, description } = data;
      mutate({
        name,
        description
      });
    },
    [mutate]
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">
          Create new permission
        </h3>
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
