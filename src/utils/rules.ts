import * as yup from 'yup';

const FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const userSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters'),
  password_confirm: yup
    .string()
    .required('This field is required')
    .min(8, 'Password confirm need at least 8 characters')
    .oneOf(
      [yup.ref('password')],
      'Password and confirm password does not match'
    ),
  role: yup.string()
});

export const bookingSchema = yup.object({
  status: yup.string().required('This field is required'),
  participants: yup
    .number()
    .required('This field is required')
    .min(1, 'participants need at least 1 characters'),
  special_requirements: yup.string()
});

export const roleSchema = yup.object({
  name: yup.string().required('This field is required'),
  permissions: yup
    .array()
    .of(yup.string())
    .min(1, 'Role need at least 1 permission')
    .required('This field is required'),
  description: yup.string().required('This field is required')
});

export const permissionSchema = yup.object({
  name: yup.string().required('This field is required'),
  description: yup.string().required('This field is required')
});

export const tourSchema = yup.object().shape({
  name: yup
    .string()
    .required('A tour must have a name')
    .min(10, 'A tour name must have more or equals than 10 characters')
    .max(40, 'A tour name must have less or equals than 40 characters'),
  price: yup
    .number()
    .required('A tour must have a price')
    .test({
      name: 'price',
      message: 'Price must be greater than 0',
      test: (value) => value > 0
    }),
  duration: yup
    .number()
    .required('A tour must have a duration')
    .test({
      name: 'duration',
      message: 'Duration must be greater than 0',
      test: (value) => value > 0
    }),
  maxGroupSize: yup
    .number()
    .required('A tour must have a max group size')
    .test({
      name: 'maxGroupSize',
      message: 'Max group size must be greater than 0',
      test: (value) => value > 0
    }),
  difficulty: yup.string().required('A tour must have a difficulty'),
  summary: yup
    .string()
    .required('A tour must have a summary')
    .max(1000, 'A summary must be below 1000 characters'),
  imageCover: yup
    .mixed()
    .required('Image cover is required')
    .test({
      name: 'file-type',
      message: 'Only image file are allowed',
      test: (value) => {
        const file = (value as FileList)[0];
        if (typeof file === 'string') return true;
        if (typeof file === 'object') return file.type.startsWith('image/');
      }
    })
    .test({
      name: 'file-size',
      message: 'File too large. Maximum 2MB',
      test: (value) => {
        if (typeof value === 'string') return true;
        const file = (value as FileList)[0];
        return !!file && file.size <= FILE_SIZE;
      }
    }),
  images: yup
    .mixed()
    .test('fileCount', `Tối đa 3 file`, (value) => {
      if (!value || !(value instanceof FileList)) return true;
      return value.length <= 3;
    })
    .test({
      name: 'file-type',
      message: 'Only image files are allowed',

      test: (value) => {
        if (!value || !(value instanceof FileList) || !value.length)
          return true;
        const files = Array.from(value);
        return files.every((ele) => ele.type.startsWith('image/'));
      }
    })
    .test({
      name: 'file-size',
      message: 'File too large. Maximum 6MB',
      test: (value) => {
        if (!value || !(value instanceof FileList) || !value.length)
          return true;
        const files = Array.from(value);
        return (
          files.reduce((acc, curr: File) => acc + curr.size, 0) <=
          FILE_SIZE * files.length
        );
      }
    })
    .notRequired(),
  startDates: yup
    .array()
    .required('A tour must have a starts date')
    .of(
      yup.object({
        date: yup.date().min(new Date(), 'Start date must be today or later'),
        participants: yup
          .number()
          .required('Participants is required')
          .min(1, 'Participants must be greater than 0')
      })
    )
    .min(1, 'Need at least one start day'),
  startLocation: yup.object({
    coordinates: yup
      .array()
      .of(yup.number().required('Coordinates must a number'))
      .length(2, 'Must have sufficient longitude and latitude'),
    description: yup.string(),
    address: yup.string().required('Location need a address')
  }),
  guides: yup
    .string()
    .required('Tour must have guide')
    .required('Tour need at least 1 guide')
});

export const updatePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters'),
  newPassword: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters'),
  passwordConfirm: yup
    .string()
    .required('This field is required')
    .min(8, 'Password need at least 8 characters')
    .oneOf(
      [yup.ref('newPassword')],
      'New password and confirm password does not match'
    )
});

export type UserSchema = yup.InferType<typeof userSchema>;
export type TourSchema = yup.InferType<typeof tourSchema>;
export type BookingSchema = yup.InferType<typeof bookingSchema>;
export type RoleSchema = yup.InferType<typeof roleSchema>;
export type PermissionSchema = yup.InferType<typeof permissionSchema>;
export type UpdatePasswordSchema = yup.InferType<typeof updatePasswordSchema>;
