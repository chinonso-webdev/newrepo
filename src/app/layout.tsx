
import Providers from '@/components/layout';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QFS Accet',
  description: 'Gateway to Blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
