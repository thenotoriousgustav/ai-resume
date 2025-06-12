import { z } from "zod"

export const jobApplicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z
    .enum(["applied", "interview", "offer", "accepted", "rejected"])
    .optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
  description: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  deadline: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  job_type: z
    .enum([
      "full_time",
      "part_time",
      "contract",
      "temporary",
      "internship",
      "remote",
      "hybrid",
      "freelance",
    ])
    .optional(),
  // applied_at: z.string().optional(),
})

export const updateJobApplicationSchema = jobApplicationSchema.partial()

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>
export type UpdateJobApplicationSchema = z.infer<
  typeof updateJobApplicationSchema
>
