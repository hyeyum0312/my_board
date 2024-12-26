import DefaultLayout from './layout/DefaultLayout';
import { ReactNode } from 'react';
import '../styles/globals.scss';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <div className="container mx-auto">
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      </body>
    </html>
  );
}
