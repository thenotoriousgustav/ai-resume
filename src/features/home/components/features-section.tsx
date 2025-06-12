"use client"

import { motion } from "framer-motion"
import { BarChart3, CheckCircle, FileText } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Resume Analysis",
      description:
        "Get detailed feedback on your resume with AI-powered analysis that identifies strengths and areas for improvement.",
      benefits: [
        "Keyword optimization for ATS systems",
        "Industry-specific suggestions",
        "Formatting and structure improvements",
      ],
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Cover Letter Generator",
      description:
        "Create personalized cover letters in seconds that match job descriptions and highlight your relevant skills.",
      benefits: [
        "Job-specific customization",
        "Multiple style templates",
        "One-click generation",
      ],
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
      title: "Application Tracking",
      description:
        "Keep track of all your job applications in one place with status updates, reminders, and follow-up suggestions.",
      benefits: [
        "Centralized application dashboard",
        "Smart follow-up reminders",
        "Progress analytics and insights",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="features"
      className="flex w-full flex-col items-center justify-center bg-white py-16 md:py-24"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="mx-auto mt-4 max-w-[800px] text-xl text-black/70">
            Our AI-powered platform streamlines your job search process from
            start to finish.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full overflow-hidden border-2 transition-all duration-300 hover:border-purple-200">
                <CardHeader className="pb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mb-2"
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-black/70">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="mb-6 text-center text-3xl font-bold">How It Works</h3>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            {[
              {
                step: 1,
                title: "Upload Your Resume",
                desc: "Upload your existing resume or create a new one",
              },
              {
                step: 2,
                title: "Get AI Feedback",
                desc: "Receive instant analysis and suggestions",
              },
              {
                step: 3,
                title: "Apply & Track",
                desc: "Apply to jobs and track your applications",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100"
                  whileHover={{ scale: 1.1, backgroundColor: "#f3e8ff" }}
                >
                  <span className="font-bold text-purple-700">{item.step}</span>
                </motion.div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="mx-auto max-w-[200px] text-sm text-black/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
