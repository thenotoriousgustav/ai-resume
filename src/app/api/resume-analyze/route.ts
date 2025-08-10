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
  language: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { position, company, description, resume, language } =
      requestSchema.parse(body)

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: tailorSchema,
      temperature: 0.3,
      system: `You are an expert resume consultant. ${
        language && language.trim()
          ? `IMPORTANT: You must write the entire response in ${language} language only. Do not use any English words.`
          : "Write in English."
      }`,
      prompt: `
        You are an expert resume consultant. Analyze the provided resume against the job description and provide:

        LANGUAGE INSTRUCTION:
        ${
          language && language.trim()
            ? `CRITICAL: You MUST write the ENTIRE analysis response in ${language} language. Do not use English. Every single word, sentence, and paragraph must be written in ${language}.`
            : "Please provide all responses in English."
        }

        CRITICAL RULE FOR MISSING JOB TITLES:
        You must NEVER suggest a job title that already exists in the resume, even with different formatting or synonyms.
        
        Before adding ANY job title to the "jobTitleMissing" array, you MUST:
        1. Read the entire resume carefully
        2. Check if the person already has this exact role or equivalent (Frontend = Front-end = Front End = Frontend Engineer = Frontend Developer)
        3. If they already have it in ANY form, DO NOT include it in missing job titles
        4. Only suggest titles for completely different roles they don't have
        
        Common equivalent titles (DO NOT suggest if person already has any of these):
        - Frontend Developer = Front-end Developer = Front End Developer = Frontend Engineer = Front End Engineer
        - Backend Developer = Back-end Developer = Backend Engineer = Server-side Developer
        - Full Stack = Fullstack = Full-stack Developer = Full Stack Engineer
        - DevOps Engineer = DevOps Specialist = Site Reliability Engineer
        
        ONLY suggest job titles for roles they truly don't have any experience with.

        Analysis Requirements:
        1. **keywords**
            - missing: Keywords from the job description that are **not found** in the resume.
            - present: Keywords from the job description that are **found** in the resume.
            - suggestions: Additional **relevant keywords** that are not in the job description but are commonly expected for this position.

        2. **suggestions**
            - Provide at least 3 concrete suggestions for improving the resume, with:
            - section: The specific section in the resume (e.g., "Experience", "Skills", "Summary") that needs improvement.
            - improvement: A clear and concise suggestion on what to change or add.
            - priority: Priority level of this suggestion ("high", "medium", or "low").

        3. **jobTitleMissing**
            - Suggest any **relevant job titles or roles** that are missing from the resume and would help align with the job description.
            - For each, include:
            - title: The missing job title.
            - relevance: Why this title strengthens the resume for this position.
            - where: Suggest where in the resume it should be added (e.g., "under work experience", "in the professional summary").

        4. **matchScore**
            - Return a numeric score between 0 to 100 representing how well the resume matches the job description.

        Resume Content:
        ${resume}

        Job Details:
        - Position: ${position}
        - Company: ${company}
        - Job Description: ${description}


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
