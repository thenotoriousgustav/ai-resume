"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function deleteDocument(
  fileName: string
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
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
