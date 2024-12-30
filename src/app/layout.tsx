import DefaultLayout from './layout/DefaultLayout';
import { ReactNode } from 'react';
import '../styles/globals.scss';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// MSW 초기화
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('../lib/mocks/init').catch((err) => {
    console.error('Failed to initialize MSW:', err);
  });
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
