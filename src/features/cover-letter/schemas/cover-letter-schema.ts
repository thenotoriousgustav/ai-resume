import { z } from "zod"

export const coverLetterSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  position: z
    .string()
    .min(1, "Position is required")
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Job description is required")
    .min(10, "Job description must be at least 10 characters")
    .max(5000, "Job description must be less than 5000 characters"),
  tone: z.enum(["formal", "semi-formal", "friendly"], {
    required_error: "Please select a tone for the cover letter.",
  }),
  language: z.string().optional(),
  length: z.enum(["short", "medium", "long"], {
    required_error: "Please select the length for the cover letter.",
  }),
})

export type CoverLetterFormData = z.infer<typeof coverLetterSchema>
