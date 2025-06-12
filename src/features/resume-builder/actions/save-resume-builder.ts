"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { resumeBuilderSchema } from "@/stores/resume-builder-store"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

export async function saveResumeBuilder(
  id: string,
  resumeData: z.infer<typeof resumeBuilderSchema>
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const validatedData = resumeBuilderSchema.safeParse(resumeData)

    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid resume data",
        error: validatedData.error.issues[0].message,
      }
    }

    const { error } = await supabase
      .from("resumes_builder")
      .upsert({
        id,
        user_id: user.id,
        personalInfo: validatedData.data.personalInfo as any,
        experiences: validatedData.data.experiences.experiences as any,
        education: validatedData.data.education.education as any,
        skills: validatedData.data.skills.skills as any,
        objective: validatedData.data.objective,
        template: validatedData.data.template,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving resume:", error)
      return {
        status: "error",
        message: "Failed to save resume",
        error: error.message,
      }
    }

    revalidatePath(`/resume-builder/${id}`)

    return {
      status: "success",
      message: "Resume saved successfully",
    }
  } catch (error) {
    console.error("Unexpected error saving resume:", error)
    return {
      status: "error",
      message: "An unexpected error occurred while saving",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function createResumeBuilder(): Promise<
  ActionResponse & { resumeId?: string }
> {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from("resumes_builder")
      .insert({
        user_id: user.id,
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          summary: "",
          linkedIn: "",
          portfolio: "",
        },
        experiences: [],
        education: [],
        skills: [],
        template: "modern",
      })
      .select()
      .single()

    if (error) {
      return {
        status: "error",
        message: "Failed to create resume",
        error: error.message,
      }
    }

    return {
      status: "success",
      message: "Resume created successfully",
      resumeId: data.id,
    }
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
