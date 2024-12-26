import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function BorderLayout({ children }: Props) {
  return <section>{children || null}</section>;
}
