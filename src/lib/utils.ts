import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const assertValue = <T>(value: T, message: string) => {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
  return value;
};
