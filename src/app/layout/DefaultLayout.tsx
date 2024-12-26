import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface DefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayout) => {
  return (
    <div>
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
