"use server"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

interface TemplateData {
  title: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  objective: string
  experiences: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate?: string
    isCurrentRole: boolean
    description: string
    location: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    isCurrently: boolean
    gpa?: string
    description?: string
  }>
  skills: Array<{
    id: string
    name: string
    category: string
    level: number
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    issueDate: string
    expirationDate?: string
    credentialId?: string
    url?: string
  }>
}

export async function createResumeFromTemplate(
  template: TemplateData
): Promise<ResultAsync<string, Error>> {
  return await tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const resumeId = crypto.randomUUID()

    const { data, error } = await supabase
      .from("resumes_builder")
      .insert({
        id: resumeId,
        user_id: user.id,
        title: template.title,
        template: "modern",
        personal_info: template.personalInfo,
        objective: template.objective,
        experiences: template.experiences,
        education: template.education,
        skills: template.skills,
        certifications: template.certifications,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create resume from template: ${error.message}`)
    }

    return data.id
  })
}
