"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-70" />

      <div className="relative z-10 px-4 md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-lg text-black/80 md:text-xl">
              Welcome to the Future of Job Applications
            </p>
            <h1 className="text-4xl font-bold tracking-tighter text-black md:text-6xl lg:text-7xl">
              Smart Resume{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Optimizer
                <motion.span
                  className="absolute -top-1 -right-4 text-4xl text-purple-500 md:text-6xl lg:text-7xl"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  ✨
                </motion.span>
              </motion.span>
            </h1>
            <motion.h2
              className="mt-2 text-3xl font-bold tracking-tighter text-black md:text-5xl lg:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Land Your Dream Job Faster
            </motion.h2>
          </motion.div>

          <motion.p
            className="mx-auto max-w-[800px] text-lg text-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Our AI-powered platform analyzes your resume, optimizes it for
            specific job applications, and helps you stand out to recruiters.
            Start your journey to success today!
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="mt-6 grid grid-cols-3 gap-4 text-sm text-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📊</span>
              <span>Resume Analysis</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📝</span>
              <span>Cover Letters</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📱</span>
              <span>Job Tracking</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              variant={"outline"}
              className="rounded-full px-8 py-6 text-lg font-semibold text-black hover:bg-black/10"
              asChild
            >
              <Link href="/dashboard">
                Start for Free <span className="text-2xl">🙀</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-sm text-black/60">Trusted by job seekers</p>
            <div className="flex gap-3">
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="opacity-80"
              />
              <Image
                src="/icons/chrome.svg"
                alt="Chrome"
                width={24}
                height={24}
                className="opacity-80"
              />
              <Image
                src="/icons/meta.svg"
                alt="Meta"
                width={24}
                height={24}
                className="opacity-80"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, type: "spring" }}
        >
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
            <Image
              src="/images/landing-page.png"
              alt="AI Resume Optimizer Dashboard"
              width={1000}
              height={600}
              className="h-auto w-full"
            />
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-6 -left-6 -z-10 h-24 w-24 rounded-full bg-purple-200 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full bg-orange-200 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
