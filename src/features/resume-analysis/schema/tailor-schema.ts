import { z } from "zod"

export const tailorSchema = z.object({
  keywords: z.object({
    missing: z.array(z.string()),
    present: z.array(z.string()),
    suggestions: z.array(z.string()),
  }),
  suggestions: z.array(
    z.object({
      section: z.string(),
      improvement: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    })
  ),
  jobTitleMissing: z.array(
    z.object({
      title: z.string(),
      relevance: z.string(),
      where: z.string(),
    })
  ),
  matchScore: z.number(),
})
