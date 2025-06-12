import { z } from "zod"

export const workExperienceItemSchema = z.object({
  id: z
    .string()
    .optional()
    .default(() => crypto.randomUUID()),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional().default(false),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional().default([]),
})

export const workExperienceSchema = z.object({
  experiences: z.array(workExperienceItemSchema).default([]),
})

export type WorkExperienceItem = z.infer<typeof workExperienceItemSchema>
export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>
