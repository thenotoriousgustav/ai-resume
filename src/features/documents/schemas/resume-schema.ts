import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ["application/pdf"]

export const resumeSchema = z.object({
  id: z.string().uuid().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "File type must be PDF",
    }),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().optional(),
})

export type ResumeSchema = z.infer<typeof resumeSchema>

export const UpdateResumeSchema = resumeSchema.omit({ id: true, file: true })
export const UploudResumeSchema = resumeSchema.omit({ id: true })
