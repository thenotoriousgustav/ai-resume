import { z } from "zod"

export const skillsItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  category: z.string().min(1, "Category is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
})

export const skillsSchema = z.object({
  skills: z.array(skillsItemSchema).default([]),
})

export type SkillsItem = z.infer<typeof skillsItemSchema>
export type SkillsSchema = z.infer<typeof skillsSchema>
