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
  title: "Silamar - AI-Powered Cover Letter & Resume Analyzer",
  description:
    "Silamar uses advanced AI to generate tailored cover letters, analyze your resume based on job descriptions, and track your job applications—all in one platform.",
  keywords:
    "AI cover letter generator, resume analysis, job description matching, job application tracker, AI resume analyzer, cover letter AI",
  openGraph: {
    title: "Silamar - AI-Powered Cover Letter & Resume Analyzer",
    description:
      "Generate perfect cover letters and analyze your resume with AI based on job descriptions",
    url: "https://silamar.com",
    siteName: "Silamar",
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
