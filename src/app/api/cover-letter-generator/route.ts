import { createTogetherAI } from "@ai-sdk/togetherai"
import { streamText } from "ai"

import { env } from "@/config/env"

const togetherai = createTogetherAI({
  apiKey: env.TOGETHER_AI_API_KEY ?? "",
})

export async function POST(req: Request) {
  const { resume, company, position, jobDescription } = await req.json()

  const coverLetterPrompt = `
You are a professional career advisor who specializes in crafting compelling cover letters. 
Create a professional cover letter for a job application with the following details:

Company: ${company || "Not specified"}
Position: ${position || "Not specified"}
Job Description: ${jobDescription || "Not specified"}
My CV/resume: ${resume || "Not specified"}

Follow these guidelines:
1. Use a professional business letter format with proper spacing
2. Include today's date at the top
3. Create a strong opening paragraph that shows enthusiasm for the position
4. In the middle paragraphs, highlight relevant skills and experience that match the job requirements
5. Explain why the applicant is a good fit for both the role and company culture
6. Include a confident closing paragraph with a call to action
7. End with a professional sign-off

The tone should be:
- Professional but personable
- Confident without being arrogant
- Enthusiastic about the specific company and role
- Focused on what the applicant can offer (not what they want)

The cover letter should be approximately 350-400 words (3-4 paragraphs). Do not include placeholders for personal information like name, email, or phone number.
`

  const result = streamText({
    model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
    system:
      "You are an expert career advisor who writes compelling, effective cover letters tailored to specific job opportunities.",
    prompt: coverLetterPrompt,
  })

  return result.toDataStreamResponse()
}
