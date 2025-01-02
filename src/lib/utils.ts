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

type SortedDataProps = {
  data: any[];
  sortKey: string;
  sortOrder: 'asc' | 'desc';
};

export const sortedData = ({ data, sortKey, sortOrder }: SortedDataProps) => {
  if (!data || data.length === 0) return [];
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};
