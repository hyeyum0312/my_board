import { cva } from 'class-variance-authority';
import React from 'react';

const inputStyles = cva(
  'px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all duration-200', // 기본 스타일
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
  size?: 'small' | 'medium' | 'large';
  state?: 'default' | 'error' | 'success';
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number';
};

export default function Input({
  size = 'medium',
  state = 'default',
  disabled = false,
  placeholder = '',
  value,
  onChange,
  type = 'text',
}: InputProps) {
  const classes = inputStyles({ size, state, disabled });

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={classes}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
