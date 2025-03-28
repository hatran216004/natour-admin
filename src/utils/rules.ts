import * as yup from 'yup';

export const schema = yup.object({
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
    )
});

export type Schema = yup.InferType<typeof schema>;
