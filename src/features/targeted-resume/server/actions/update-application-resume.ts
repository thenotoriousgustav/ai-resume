"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function updateApplicationResume(
  values: {
    position: string
    company: string
    description: string
  },
  jobApplicationId: string
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const { error } = await supabase
      .from("job_applications")
      .update({
        company: values.company,
        position: values.position,
        description: values.description,
      })
      .eq("user_id", user.id)
      .eq("id", jobApplicationId)

    if (error) {
      throw new Error(`Failed to update application: ${error.message}`)
    }

    revalidatePath("/job-tracker")
  })
}
