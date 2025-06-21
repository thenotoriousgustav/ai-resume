"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function deleteDocument(
  fileName: string
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const filePath = `${user.id}/${fileName}`

    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath])

    if (storageError) {
      throw new Error(
        `Failed to delete file from storage: ${storageError.message}`
      )
    }

    const { error: dbError } = await supabase
      .from("resumes")
      .delete()
      .eq("user_id", user.id)
      .eq("file_name", fileName)

    if (dbError) {
      throw new Error(`Failed to delete file from database: ${dbError.message}`)
    }

    revalidatePath("/documents")
  })
}
