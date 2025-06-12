// schemas/resumeAnalysisSchema.ts
import { z } from "zod"

export const resumeAnalysisSchema = z.object({
  is_resume: z.boolean(),
  language: z.string().optional(),
  overall_impression: z.string(),
  overall_score: z.number(),
  sections: z.array(
    z.object({
      name: z.string(),
      score: z.number(),
      analysis: z.string(),
      action_points: z.array(z.string()),
      importance: z.string(),
    })
  ),
  keywords: z.object({
    job_titles: z.array(z.string()),
    skills: z.array(z.string()),
    career_paths: z.array(z.string()),
    professional_summaries: z.array(z.string()),
    additional_keywords: z.array(z.string()),
  }),
  career_recommendation: z.string(),
})

// Keep the old schema for backward compatibility
export const legacyResumeAnalysisSchema = z.object({
  is_resume: z.boolean(),
  score: z.number(),
  summary: z.string(),
  feedback: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
  }),
  keywords: z.object({
    present: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  sections: z.array(
    z.object({
      name: z.string(),
      score: z.number(),
      feedback: z.string(),
    })
  ),
  language_analysis: z.object({
    grammatical_errors: z.array(
      z.object({
        issue: z.string(),
        example: z.string(),
        correction: z.string(),
      })
    ),
    professional_tone: z.array(
      z.object({
        issue: z.string(),
        example: z.string(),
        suggestion: z.string(),
      })
    ),
    unnecessary_information: z.array(
      z.object({
        issue: z.string(),
        example: z.string(),
        suggestion: z.string(),
      })
    ),
  }),
  relevance: z.object({
    experience: z.array(
      z.object({
        issue: z.string(),
        example: z.string(),
        suggestion: z.string(),
      })
    ),
    skills: z.array(
      z.object({
        issue: z.string(),
        example: z.string(),
        suggestion: z.string(),
      })
    ),
  }),
  improvementPlan: z.array(
    z.object({
      priority: z.number(),
      action: z.string(),
      details: z.string(),
    })
  ),
})
