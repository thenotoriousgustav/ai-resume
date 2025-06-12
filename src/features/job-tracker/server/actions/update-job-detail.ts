"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

import { updateJobApplicationSchema } from "../../schemas/job-application-schema"

export default async function updateJobDetail(
  id: string,
  field: string,
  value: string
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    if (!id) {
      return {
        status: "error",
        message: "Job application ID is required",
        error: "Invalid ID",
      }
    }

    // Create a partial validation for single field
    const fieldData = { [field]: value }
    const validationResult = updateJobApplicationSchema.safeParse(fieldData)

    if (!validationResult.success) {
      return {
        status: "error",
        message: "Invalid field data",
        error: validationResult.error.issues[0].message,
      }
    }

    // Transform applied_at date string to proper date format for database

    const { error: dbError } = await supabase
      .from("job_applications")
      .update(validationResult.data)
      .eq("id", id)
      .eq("user_id", user.id)

    if (dbError) {
      return {
        status: "error",
        message: "Failed to update job application",
        error: dbError.message,
      }
    }

    revalidatePath("/job-tracker")

    return {
      status: "success",
      message: "Job application updated successfully",
    }
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
