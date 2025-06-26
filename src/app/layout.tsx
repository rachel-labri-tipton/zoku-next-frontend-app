import { Providers } from './providers'
import { UserProvider } from '@/context/UserContext'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider>
          <UserProvider> */}
            <Providers>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 dark:bg-gray-900">
                  {children}
                </main>
                <Footer />
              </div>
            </Providers>
          {/* </UserProvider>
        </AuthProvider> */}
      </body>
    </html>
  )
}