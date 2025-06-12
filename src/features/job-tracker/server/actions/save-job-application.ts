"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

import { updateJobApplicationSchema } from "../../schemas/job-application-schema"

export default async function saveJobApplication(
  id: string,
  values: z.infer<typeof updateJobApplicationSchema>
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

    const validationResult = updateJobApplicationSchema.safeParse(values)

    if (!validationResult.success) {
      return {
        status: "error",
        message: "Invalid input data",
        error: validationResult.error.issues[0].message,
      }
    }

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
      message: "Job application saved successfully",
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
