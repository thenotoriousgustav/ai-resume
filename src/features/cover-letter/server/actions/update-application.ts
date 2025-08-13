"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { coverLetterSchema } from "../../schemas/cover-letter-schema"

export default async function updateApplication(
  values: z.infer<typeof coverLetterSchema>,
  jobApplicationId: string
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

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
  })
}
