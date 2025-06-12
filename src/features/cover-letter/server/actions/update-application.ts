"use server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { createClient } from "@/utils/supabase/server"

import { coverLetterSchema } from "../../schemas/cover-letter-schema"

export default async function updateApplication(
  values: z.infer<typeof coverLetterSchema>,
  jobApplicationId: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated")
  }
  try {
    const result = coverLetterSchema.safeParse(values)

    if (!result.success) {
      throw new Error(`Validation failed: ${result.error}`)
    }

    const { error } = await supabase
      .from("job_applications")
      .update({
        company: result.data.company,
        position: result.data.position,
        description: result.data.description,
      })
      .eq("user_id", user.id)
      .eq("id", jobApplicationId)

    if (error) {
      throw new Error(`Failed to update application: ${error.message}`)
    }

    revalidatePath("/job-tracker")
    return { success: true }
  } catch (err) {
    console.error("Error updating application:", err)
    throw new Error(
      `Failed to update application: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}
