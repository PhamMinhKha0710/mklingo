import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { ExitModel } from "@/components/models/exit-model";
import { HeartsModel } from '@/components/models/hearts-model'
import { PracticeModel } from '@/components/models/practice-model'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mklingo - Learn Languages',
  description: 'Learn languages with interactive lessons and practice',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster />
          <ExitModel />
          <HeartsModel/>
          <PracticeModel/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
