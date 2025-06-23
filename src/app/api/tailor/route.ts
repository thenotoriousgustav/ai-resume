import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const tailorSchema = z.object({
  keywords: z.object({
    missing: z
      .array(z.string())
      .describe("Keywords from job description missing in resume"),
    present: z
      .array(z.string())
      .describe("Keywords from job description found in resume"),
    suggestions: z
      .array(z.string())
      .describe("Additional relevant keywords to consider"),
  }),
  suggestions: z.array(
    z.object({
      section: z.string().describe("Resume section to improve"),
      improvement: z.string().describe("Specific improvement suggestion"),
      priority: z.enum(["high", "medium", "low"]).describe("Priority level"),
    })
  ),
  jobTitleMissing: z.array(
    z.object({
      title: z.string().describe("Missing job title or role"),
      relevance: z.string().describe("Why this title is relevant"),
      where: z.string().describe("Where to add this in resume"),
    })
  ),
  matchScore: z.number().describe("Overall match score between 0-100"),
})

const requestSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
  resume: z.string().min(1, "Resume text is required"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate the request body
    const { position, company, description, resume } = requestSchema.parse(body)

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: tailorSchema,
      prompt: `
        You are an expert resume consultant. Analyze the provided resume against the job description and provide:

        Resume Content:
        ${resume}

        Job Details:
        - Position: ${position}
        - Company: ${company}
        - Job Description: ${description}
        
        1. Keywords analysis (missing, present, suggestions)
        2. Specific improvement suggestions with priority levels
        3. Missing job titles that would be relevant
        4. Overall match score (0-100)
        5. Additional insights or recommendations

        Provide actionable, specific recommendations that will help improve the resume's match for this ${position} position at ${company}.
      `,
    })

    return result.toJsonResponse()
  } catch (error) {
    console.error("Error in tailor API:", error)

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }

    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
