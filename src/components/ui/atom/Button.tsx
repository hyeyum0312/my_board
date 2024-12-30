import { cva } from 'class-variance-authority';
import Link from 'next/link';

const button = cva(
  'px-4 py-2 rounded-md focus:outline-none transition-all duration-200', // 기본 스타일
  {
    variants: {
      color: {
        primary: 'bg-black text-white hover:bg-gray-800',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-gray-500 text-gray-500 hover:bg-gray-100', // 보더만 있는 버튼
        link: 'text-blue-500 underline hover:text-blue-700', // Link용 스타일
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
      disabled: {
        true: 'bg-gray-300 text-gray-500 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'medium',
      disabled: false,
    },
  },
);

// Button Props 타입 정의
type ButtonBaseProps = {
  color?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
};

type SubmitButtonProps = ButtonBaseProps & {
  type?: 'submit';
  onClick?: never; // 폼 제출 버튼에 onClick 불필요
  href?: never;
};

type ActionButtonProps = ButtonBaseProps & {
  type?: 'button';
  onClick?: () => void;
  href?: never;
};

type LinkButtonProps = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonProps = SubmitButtonProps | ActionButtonProps | LinkButtonProps;

export default function Button({
  color = 'primary',
  size = 'medium',
  disabled = false,
  children,
  type = 'button', // 기본 버튼 타입을 "button"으로 설정
  onClick,
  href,
}: ButtonProps) {
  const classes = button({ color, size, disabled });

  // Link 버튼
  if (href) {
    return <Link href={href}>{children}</Link>;
  }

  // 일반 버튼 (submit 또는 button 타입)
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
