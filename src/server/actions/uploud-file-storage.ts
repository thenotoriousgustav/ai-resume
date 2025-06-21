"use server"

import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

/**
 * Uploads a file to storage and returns the public URL
 * @param file The file to upload
 * @param storagePath The storage path for the file
 * @param bucketName The storage bucket name (defaults to "documents")
 * @returns Result containing storage path and URL
 */

interface UploadFileStorageResult {
  storagePath: string
  storageUrl: string
}

export async function uploadFileStorage(
  file: File,
  storagePath: string,
  bucketName = "documents"
): ResultAsync<UploadFileStorageResult, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`)
    }

    //! Get the URL for the uploaded file
    const { data: urlData } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(storagePath)

    return {
      storageUrl: urlData.publicUrl,
      storagePath,
    }
  })
}
