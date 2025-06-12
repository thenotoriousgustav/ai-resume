"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

import { jobApplicationSchema } from "../../schemas/job-application-schema"

export default async function addJobApplication(
  values: z.infer<typeof jobApplicationSchema>
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()
    const user = await getCurrentUser()

    const valuesResult = jobApplicationSchema.safeParse(values)

    if (!valuesResult.success) {
      console.log("Invalid input data:", valuesResult.error.issues)
      return {
        status: "error",
        message: "Invalid input data.",
        error: valuesResult.error.issues[0].message,
      }
    }

    const {
      company,
      position,
      location,
      salary,
      description,
      status,
      priority,
      job_type,
    } = valuesResult.data

    const { error: dbError } = await supabase.from("job_applications").insert([
      {
        user_id: user.id,
        company: company || "",
        position: position || "",
        location: location || "",
        salary: salary || null,
        description: description || "",
        status: status || null,
        priority: priority || null,
        job_type: job_type || null,
        country: "",
        currency: "USD",
        applied_at: new Date().toISOString(),
      },
    ])

    if (dbError) {
      console.error("Error storing job application:", dbError.message)
      return {
        status: "error",
        message: "Failed to save job application. Please try again.",
        error: dbError.message,
      }
    }

    revalidatePath("/job-tracker")

    return {
      status: "success",
      message: "Job application added successfully!",
    }
  } catch (error) {
    console.error("Unexpected error during job application creation:", error)
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
