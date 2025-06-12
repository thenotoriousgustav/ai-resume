import { z } from "zod"

export const educationItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
})

export const educationSchema = z.object({
  education: z.array(educationItemSchema).default([]),
})

export type EducationItem = z.infer<typeof educationItemSchema>
export type EducationSchema = z.infer<typeof educationSchema>
