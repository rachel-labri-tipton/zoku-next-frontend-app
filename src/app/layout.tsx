import { Providers } from './providers';
import { UserProvider } from '@/context/UserContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import OldHeader from '@/app/components/OldHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider>
          <UserProvider> */}
        <Providers>
          {/* <OldHeader /> */}
          <Header />
          <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 dark:bg-gray-900">
            {children}
          </main>
          <Footer />
        </Providers>
        {/* </UserProvider>
        </AuthProvider> */}
      </body>
    </html>
  );
}
