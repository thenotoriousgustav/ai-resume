"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { jobApplicationSchema } from "../../schemas/job-application-schema"

export default async function addJobApplication(
  values: z.infer<typeof jobApplicationSchema>
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const valuesResult = jobApplicationSchema.safeParse(values)

    if (!valuesResult.success) {
      console.log("Invalid input data:", valuesResult.error.issues)
      throw new Error(valuesResult.error.issues[0].message)
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
      throw new Error("Failed to save job application. Please try again.")
    }

    revalidatePath("/job-tracker")
  })
}
