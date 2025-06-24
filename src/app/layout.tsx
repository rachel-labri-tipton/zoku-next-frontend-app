import { Providers } from './providers'
import './globals.css'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

// const geistSans = Geist_Sans({
//   subsets: ['latin'],
//   variable: '--font-geist-sans',
// })

// const geistMono = Geist_Mono({s
//   subsets: ['latin'],
//   variable: '--font-geist-mono',
// })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>
          <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 dark:bg-gray-900">
            {children}
          </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}