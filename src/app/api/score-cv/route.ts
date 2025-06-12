import { createTogetherAI } from "@ai-sdk/togetherai"
import { streamText } from "ai"

import { env } from "@/config/env"

export const maxDuration = 30

const togetherai = createTogetherAI({
  apiKey: env.TOGETHER_AI_API_KEY ?? "",
})

export async function POST(req: Request) {
  const { messages, resume } = await req.json()

  const result = await streamText({
    model: togetherai("deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free"),

    prompt: `
    Analyze the following resume content and provide a detailed assessment:

    ${messages}
    ${resume}

    Evaluate the resume on these aspects:
    1. Experience relevance (score out of 10)
    2. Skills (score out of 10)
    3. Education (score out of 10)
    4. Overall presentation (score out of 10)
    5. Improvement suggestions

    Format your response as JSON with these fields:
    experienceScore, skillsScore, educationScore, presentationScore, overallScore, suggestions.
          `,
  })

  console.log(messages, resume)
  // console.log(result)

  return result.toDataStreamResponse()
}
