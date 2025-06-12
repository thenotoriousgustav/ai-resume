import { createTogetherAI } from "@ai-sdk/togetherai"
import { generateText } from "ai"

import { env } from "@/config/env"
import { saveAnalysisResult } from "@/features/analyze/server/actions/save-analysis-result"

const togetherai = createTogetherAI({
  apiKey: env.TOGETHER_AI_API_KEY ?? "",
})

export async function POST(req: Request) {
  try {
    const { parsedResume, resumeId } = await req.json()

    const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer. Your task is to analyze the provided resume and provide comprehensive feedback in a structured format.

CRITICAL INSTRUCTION: You MUST respond ONLY with valid JSON. Do not include any markdown formatting, code blocks, or any text outside of the JSON structure.

Language Detection: Automatically detect if the resume is in English or Indonesian and provide feedback in the same language.

Analysis Framework:
1. Provide an overall impression and percentage score (0-100)
2. Analyze each section with individual scores and specific feedback
3. Include action points for improvement
4. Explain why each improvement is important
5. Provide relevant keywords and career recommendations

Required JSON Response Format:
{
  "is_resume": true,
  "language": "English | Indonesian",
  "overall_impression": "Brief overall assessment with specific improvement suggestions",
  "overall_score": 67,
  "sections": [
    {
      "name": "Contact Information",
      "score": 62,
      "analysis": "Detailed analysis of what's present and what's missing",
      "action_points": [
        "Specific actionable improvement 1",
        "Specific actionable improvement 2"
      ],
      "importance": "Explanation of why this section matters for job search success"
    },
    {
      "name": "Professional Summary",
      "score": 42,
      "analysis": "Analysis of summary quality or note if missing",
      "action_points": [
        "Add professional summary with 3-4 sentences highlighting key skills",
        "Customize summary for each job application"
      ],
      "importance": "Why professional summary is crucial for first impressions"
    },
    {
      "name": "Work Experience",
      "score": 89,
      "analysis": "Analysis of experience presentation and content quality",
      "action_points": [
        "Add quantifiable results and specific achievements",
        "Use action verbs to highlight accomplishments"
      ],
      "importance": "Why detailed work experience with metrics is important"
    },
    {
      "name": "Skills",
      "score": 71,
      "analysis": "Analysis of skills relevance and presentation",
      "action_points": [
        "Add specific examples for each skill",
        "Include technical skills and software proficiency"
      ],
      "importance": "Why relevant skills help with ATS and recruiter screening"
    },
    {
      "name": "Education",
      "score": 71,
      "analysis": "Analysis of education section completeness",
      "action_points": [
        "Add relevant coursework or projects",
        "Include academic honors or certifications"
      ],
      "importance": "Why education details matter for qualification assessment"
    },
    {
      "name": "Achievements",
      "score": 32,
      "analysis": "Analysis of quantifiable achievements and results",
      "action_points": [
        "Quantify achievements with specific numbers and percentages",
        "Use action verbs to highlight impact"
      ],
      "importance": "Why quantifiable achievements demonstrate value to employers"
    },
    {
      "name": "Organizational Activities",
      "score": 22,
      "analysis": "Analysis of leadership and volunteer experience",
      "action_points": [
        "Add volunteer work and leadership roles",
        "Quantify impact of organizational activities"
      ],
      "importance": "Why organizational activities show well-rounded character"
    },
    {
      "name": "Writing Quality",
      "score": 78,
      "analysis": "Analysis of grammar, consistency, and formatting",
      "action_points": [
        "Proofread for grammar and punctuation errors",
        "Ensure consistent formatting throughout"
      ],
      "importance": "Why error-free writing shows attention to detail"
    },
    {
      "name": "Additional Sections",
      "score": 41,
      "analysis": "Analysis of portfolio, languages, interests, etc.",
      "action_points": [
        "Add relevant additional sections like languages or volunteer work",
        "Include portfolio or project links if applicable"
      ],
      "importance": "Why additional sections help differentiate candidates"
    }
  ],
  "keywords": {
    "job_titles": ["Title 1", "Title 2"],
    "skills": ["Skill 1", "Skill 2", "Skill 3"],
    "career_paths": ["Path 1", "Path 2"],
    "professional_summaries": ["Trait 1", "Trait 2"],
    "additional_keywords": ["Keyword 1", "Keyword 2"]
  },
  "career_recommendation": "Based on the resume analysis, provide specific career path recommendations and role suggestions that align with the candidate's background and skills."
}

If the document is NOT a resume, respond with:
{
  "is_resume": false,
  "document_type": "detected document type",
  "explanation": "Why this is not identified as a resume",
  "recommendations": ["What should be included in a proper resume"]
}

Scoring Guidelines:
- Be strict and realistic in scoring
- Most professional resumes should score 65-85
- Reserve 90+ for truly exceptional resumes
- Score below 50 for resumes with critical issues
- Each section should be scored based on completeness, relevance, and impact

Remember: Respond ONLY with valid JSON. No markdown, no code blocks, no additional text.

Resume content to analyze:
${parsedResume}
`

    const { text } = await generateText({
      model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
      system:
        "You are an expert AI Application Tracking System (ATS) Resume Analyzer. You MUST respond ONLY with valid JSON format. Do not include any markdown formatting, code blocks, or any text outside of the JSON structure.",
      prompt,
    })

    const cleanedResult = text.trim()
    console.log(cleanedResult)

    let analysisResult
    try {
      analysisResult = JSON.parse(cleanedResult)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError)
      console.error("Raw response:", text)

      return new Response(
        JSON.stringify({
          error: "Invalid response format from AI",
          details: "The AI returned an invalid JSON response",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Save the analysis result to Supabase if resumeId is provided
    if (resumeId && analysisResult.is_resume) {
      try {
        const saveResult = await saveAnalysisResult({
          resumeId,
          analysisResult,
        })
        console.log("Analysis saved successfully:", saveResult)
      } catch (saveError) {
        console.error("Error saving analysis result:", saveError)

        // Return error if save fails
        return new Response(
          JSON.stringify({
            error: "Analysis completed but failed to save",
            details:
              saveError instanceof Error
                ? saveError.message
                : "Unknown save error",
            analysisResult, // Still return the analysis for the frontend
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        )
      }
    }

    return new Response(JSON.stringify(analysisResult), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return new Response(
      JSON.stringify({
        error: "Analysis failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
