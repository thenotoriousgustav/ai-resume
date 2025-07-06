import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { resume, company, position, jobDescription, tone, language, length } =
    await req.json()

  // Define tone styles
  const toneStyles = {
    formal:
      "Use formal, professional language. Maintain a respectful and traditional business tone throughout.",
    "semi-formal":
      "Use professional yet approachable language. Strike a balance between formality and warmth.",
    friendly:
      "Use warm, personable language while maintaining professionalism. Show personality and enthusiasm.",
  }

  // Define length requirements
  const lengthRequirements = {
    short:
      "Write a concise 1-paragraph cover letter (approximately 100-150 words).",
    medium:
      "Write a standard 3-paragraph cover letter (approximately 250-350 words).",
    long: "Write a comprehensive cover letter with 4-5 paragraphs (approximately 400-500 words). Include detailed examples and thorough explanations.",
  }

  // Language instruction
  const languageInstruction =
    language && language.trim()
      ? `CRITICAL: You MUST write the ENTIRE cover letter in ${language} language. Do not use English. Every single word, sentence, and paragraph must be written in ${language}.`
      : "Write the cover letter in English."

  const coverLetterPrompt = `
${languageInstruction}

You are an expert career advisor who specializes in writing impactful, personalized cover letters tailored to specific job opportunities.

Your task is to write a professional cover letter for the following job application:

- **Company**: ${company || "[Company not provided]"}
- **Position**: ${position || "[Position not provided]"}
- **Job Description**: ${jobDescription || "[Job description not provided]"}
- **Applicant Resume**: ${resume || "[Resume not provided]"}

---

📝 **TONE GUIDELINE**
${toneStyles[tone as keyof typeof toneStyles] || toneStyles.formal}

🧾 **LENGTH GUIDELINE**
${lengthRequirements[length as keyof typeof lengthRequirements] || lengthRequirements.medium}

---

🎯 **Instructions**:
${language && language.trim() ? `REMEMBER: Write everything in ${language} language only.` : ""}
Write a complete and polished cover letter that meets the following requirements:
      1. Use proper business letter format (with today's date at the top)
      2. Begin with a strong, engaging opening paragraph showing enthusiasm for the position
      3. Highlight the applicant's most relevant skills and experiences that align with the job description
      4. Explain clearly why the applicant is a strong fit for the role and the company culture
      5. Conclude with a confident closing paragraph that invites the employer to follow up
      6. Use a professional sign-off (e.g., "Sincerely," or "Best regards,")
      7. Focus on what the applicant can offer to the company — not what they want
      8. Output only the final cover letter — no explanation or notes

      Make sure the writing flows naturally and convincingly. Avoid generic or vague statements. Be specific and compelling.
`

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `You are an expert career advisor who writes compelling, effective cover letters tailored to specific job opportunities. ${
      language && language.trim()
        ? `IMPORTANT: You must write the entire response in ${language} language only. Do not use any English words.`
        : "Write in English."
    }`,
    prompt: coverLetterPrompt,
  })

  return result.toDataStreamResponse()
}
