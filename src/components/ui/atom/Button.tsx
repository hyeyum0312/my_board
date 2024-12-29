import { cva } from 'class-variance-authority';
import Link from 'next/link';

const button = cva(
  'px-4 py-2 rounded-md focus:outline-none transition-all duration-200', // 기본 스타일
  {
    variants: {
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
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

type ButtonProps = {
  color?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export default function Button({
  color = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  href,
}: ButtonProps) {
  const classes = button({ color, size, disabled });

  if (href) {
    return (
      <Link href={href}>
        <a className={classes} onClick={disabled ? undefined : onClick}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
