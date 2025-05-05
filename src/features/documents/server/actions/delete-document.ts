"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

export default async function deleteDocument(
  fileName: string
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    const user = await getCurrentUser()

    const filePath = `${user.id}/${fileName}`

    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath])

    if (storageError) {
      return {
        status: "error",
        message: "Failed to delete file from storage.",
        error: storageError.message,
      }
    }

    const { error: dbError } = await supabase
      .from("resumes")
      .delete()
      .eq("user_id", user.id)
      .eq("file_name", fileName)

    if (dbError) {
      return {
        status: "error",
        message: "Failed to delete file from database.",
        error: dbError.message,
      }
    }

    revalidatePath("/documents")

    return {
      status: "success",
      message: "File deleted successfully.",
    }
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred while deleting the document",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
