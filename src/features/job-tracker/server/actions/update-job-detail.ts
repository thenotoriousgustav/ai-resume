"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { updateJobApplicationSchema } from "../../schemas/job-application-schema"

export default async function updateJobDetail(
  id: string,
  field: string,
  value: string | number | null
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const fieldData = { [field]: value }

    const validationResult = updateJobApplicationSchema.safeParse(fieldData)

    if (!validationResult.success) {
      throw new Error(validationResult.error.issues[0].message)
    }

    const { error: dbError } = await supabase
      .from("job_applications")
      .update(validationResult.data)
      .eq("id", id)
      .eq("user_id", user.id)

    if (dbError) {
      throw new Error(`Failed to update job application: ${dbError.message}`)
    }

    revalidatePath("/job-tracker", "page")
  })
}
