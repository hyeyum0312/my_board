import { cva } from 'class-variance-authority';
import React from 'react';

const inputStyles = cva(
  'w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all duration-200', // 기본 스타일
  {
    variants: {
      size: {
        small: 'text-sm h-8',
        medium: 'text-base h-10',
        large: 'text-lg h-12',
      },
      state: {
        default: 'border-gray-300 focus:ring-blue-500',
        error: 'border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:ring-green-500',
      },
      disabled: {
        true: 'bg-gray-100 text-gray-500 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
      disabled: false,
    },
  },
);

type InputProps = {
  id?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'success';
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  'aria-describedby'?: string; // 에러 메시지 등과 연결
  'data-testid'?: string; // 테스트를 위한 ID
};

export default function Input({
  id,
  name,
  size = 'medium',
  state = 'default',
  disabled = false,
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  type = 'text',
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId,
}: InputProps) {
  if (!id) {
    console.warn(
      'Input component is missing an "id" prop. This may affect accessibility.',
    );
  }

  const classes = inputStyles({ size, state, disabled });

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={classes}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={state === 'error'}
      aria-required={required}
      aria-describedby={ariaDescribedby}
      data-testid={dataTestId}
    />
  );
}
