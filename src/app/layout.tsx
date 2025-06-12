import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JobGenius - AI-Powered Job Search Platform",
  description:
    "JobGenius uses advanced AI to analyze your resume, generate tailored cover letters, and track your job applications—all in one platform.",
  keywords:
    "job search, resume analysis, cover letter generator, job application tracking, AI job search",
  openGraph: {
    title: "JobGenius - AI-Powered Job Search Platform",
    description: "Land your dream job faster with AI-powered tools",
    url: "https://jobgenius.com",
    siteName: "JobGenius",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NuqsAdapter>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Analytics />
          <Toaster closeButton richColors />
        </body>
      </NuqsAdapter>
    </html>
  )
}
