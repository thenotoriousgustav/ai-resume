"use server"

import { ActionResponse } from "@/types/action-response"
import { createClient } from "@/utils/supabase/server"

/**
 * Uploads a file to storage and returns the public URL
 * @param userId The user ID for the folder path
 * @param file The file to upload
 * @param bucketName The storage bucket name (defaults to "documents")
 * @returns Object containing status, URL and any error message
 */

type UploudFileStorage = ActionResponse & {
  storagePath?: string
  storageUrl?: string
}

export async function uploadFileStorage(
  file: File,
  storagePath: string,
  bucketName = "documents"
): Promise<UploudFileStorage> {
  const supabase = await createClient()

  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Error uploading file:", error.message)
      return {
        status: "error",
        message: "Failed to upload file. Please try again.",
        error: error.message,
      }
    }

    //! Get the URL for the uploaded file
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(storagePath)

    return {
      storageUrl: urlData.publicUrl,
      status: "success",
      message: "File uploaded successfully.",
    }
  } catch (error) {
    console.error("Unexpected error during file upload:", error)
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
