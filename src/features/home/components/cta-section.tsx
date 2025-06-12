"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-70" />

      {/* Animated shapes */}
      <motion.div
        className="absolute bottom-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-purple-200 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-orange-200 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="relative z-10 container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Job Search?
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-black/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of successful job seekers who have used JobGenius to
            land their dream roles faster.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="rounded-full bg-black px-8 py-6 text-lg text-white hover:bg-black/90">
                Start Your 7-Day Free Trial
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="rounded-full border-2 border-black px-8 py-6 text-lg text-black"
              >
                Schedule a Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-black/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No credit card required. 14-day free trial.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
