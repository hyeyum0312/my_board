import { ErrorMessage, Field } from 'formik';

type FormikFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
};
export const FormikField = ({
  name,
  type,
  placeholder,
  label,
}: FormikFieldProps) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      aria-describedby={`${name}-error`}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-500 text-sm mt-1"
      id={`${name}-error`}
    />
  </div>
);
