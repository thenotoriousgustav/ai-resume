"use server"

import { redirect } from "next/navigation"

import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { getCurrentUser } from "../queries/get-current-user"

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

    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

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
