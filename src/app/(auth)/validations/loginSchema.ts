import * as Yup from 'yup';
import { email, password } from './commonSchema';
export const loginSchema = Yup.object({
  email: email,
  password: password,
});
