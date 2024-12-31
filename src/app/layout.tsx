import DefaultLayout from '../components/layout/DefaultLayout';
import { ReactNode } from 'react';
import '../styles/globals.scss';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// MSW 초기화
if (process.env.NODE_ENV === 'development') {
  import('../lib/mocks/init');
}

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
