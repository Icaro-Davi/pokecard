import Footer from '../common/components/Layout/Footer';
import MainNavbar from '../common/components/Layout/Menu/MainNavbar';
import fonts from '../common/style/fonts';
import app from '../config';

import '../common/style/globals.scss';

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={fonts[app.font].className}>
        <MainNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
