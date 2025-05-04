"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getCurrentUser } from "@/server/actions/get-current-user"
import { uploadFileStorage } from "@/server/actions/uploud-file-storage"
import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

import { resumeSchema } from "../../schemas/resume-schema"

export default async function uploadResume(
  values: z.infer<typeof resumeSchema>
): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    //! get current user
    const user = await getCurrentUser()

    //! Validate the input data
    const valuesResult = resumeSchema.safeParse(values)

    if (!valuesResult.success) {
      console.log("Invalid input data:", valuesResult.error.issues)
      return {
        status: "error",
        message: "Invalid input data.",
        error: valuesResult.error.issues[0].message,
      }
    }

    const file = valuesResult.data.file
    const { title, description } = valuesResult.data

    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop() || ""
    const fileName = `${title}-${timestamp}.${fileExtension}`
    const storagePath = `${user.id}/${fileName}`

    //! Upload file to storage
    const { storageUrl } = await uploadFileStorage(file, storagePath)

    if (!storageUrl) {
      return {
        status: "error",
        message: "Upload failed without returning file path or public URL.",
      }
    }

    //! Store metadata in database
    const { error: dbError } = await supabase.from("resumes").insert([
      {
        user_id: user.id,
        file_name: fileName,
        file_size: file.size,
        file_type: file.type,
        storage_path: storagePath,
        storage_url: storageUrl,
        title: title,
        description: description,
        extracted_text: null,
      },
    ])

    if (dbError) {
      console.error("Error storing resume metadata:", dbError.message)
      // Clean up the uploaded file if metadata storage fails
      if (storagePath) {
        await supabase.storage.from("documents").remove([storagePath])
      }
      return {
        status: "error",
        message: "Failed to store resume information. Please try again.",
        error: dbError.message,
      }
    }

    revalidatePath("/documents")

    return {
      status: "success",
      message: "Resume uploaded successfully!",
    }
  } catch (error) {
    console.error("Unexpected error during resume upload:", error)
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
