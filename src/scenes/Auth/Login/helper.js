import * as Yup from 'yup';

export const LoginvalidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email.')
    .email('Please enter a valid email.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Please enter your password.'),
});

export const initialValues = {
  email: '',
  password: '',
  isChecked: false,
};
