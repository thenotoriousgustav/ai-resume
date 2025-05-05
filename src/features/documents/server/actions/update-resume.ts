"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

import { resumeSchema } from "../../schemas/resume-schema"

const UpdateResumeSchema = resumeSchema.omit({ file: true })

export default async function updateResume(
  id: string,
  values: z.infer<typeof UpdateResumeSchema>
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const valuesResult = UpdateResumeSchema.safeParse(values)

    if (!valuesResult.success) {
      console.log("Invalid input data:", valuesResult.error.issues)
      return {
        status: "error",
        message: "Invalid input data.",
        error: valuesResult.error.issues[0].message,
      }
    }

    const { title, description } = valuesResult.data

    if (!id) {
      return {
        status: "error",
        message: "Invalid input data.",
        error: "Resume ID is required.",
      }
    }

    const { error: dbError } = await supabase
      .from("resumes")
      .update({
        title: title,
        description: description,
      })
      .eq("id", id)
      .eq("user_id", user.id)

    if (dbError) {
      return {
        status: "error",
        message: "Failed to update file in database.",
        error: dbError.message,
      }
    }

    revalidatePath("/documents", "layout")

    return {
      status: "success",
      message: "File updated successfully.",
    }
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred while updating the resume",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
