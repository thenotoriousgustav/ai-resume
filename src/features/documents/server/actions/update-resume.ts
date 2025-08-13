"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { resumeSchema } from "../../schemas/resume-schema"

const UpdateResumeSchema = resumeSchema.omit({ file: true })

export default async function updateResume(
  id: string,
  values: z.infer<typeof UpdateResumeSchema>
): Promise<ResultAsync<void, Error>> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const valuesResult = UpdateResumeSchema.safeParse(values)

    if (!valuesResult.success) {
      throw new Error(valuesResult.error.issues[0].message)
    }

    const { title, description } = valuesResult.data

    const { error: dbError } = await supabase
      .from("resumes")
      .update({
        title: title,
        description: description,
      })
      .eq("id", id)
      .eq("user_id", user.id)

    if (dbError) {
      throw new Error(`Failed to update file in database: ${dbError.message}`)
    }

    revalidatePath("/documents")
  })
}
