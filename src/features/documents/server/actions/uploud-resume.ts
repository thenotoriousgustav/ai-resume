"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { uploadFileStorage } from "@/server/actions/uploud-file-storage"
import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { UploudResumeSchema } from "../../schemas/resume-schema"

import pdfParser from "./pdf-parser"

export default async function uploadResume(
  values: z.infer<typeof UploudResumeSchema>
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, userError] = await getCurrentUser()

    if (userError) {
      throw userError
    }

    const valuesResult = UploudResumeSchema.safeParse(values)

    if (!valuesResult.success) {
      throw new Error(valuesResult.error.issues[0].message)
    }

    const file = valuesResult.data.file
    const { title, description } = valuesResult.data

    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop() || ""
    const fileName = `${title}-${timestamp}.${fileExtension}`
    const storagePath = `${user.id}/${fileName}`

    const [uploadResult, uploadError] = await uploadFileStorage(
      file,
      storagePath
    )

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    if (!uploadResult.storageUrl) {
      throw new Error(
        "Upload failed without returning file path or public URL."
      )
    }

    const [parsedText, parsedTextError] = await pdfParser(
      uploadResult.storageUrl
    )

    if (parsedTextError) {
      // Clean up the uploaded file if parsing fails
      await supabase.storage.from("documents").remove([storagePath])
      throw new Error(`Failed to parse PDF: ${parsedTextError.message}`)
    }

    const { error: dbError } = await supabase.from("resumes").insert([
      {
        user_id: user.id,
        file_name: fileName,
        file_size: file.size,
        file_type: fileExtension,
        storage_path: storagePath,
        storage_url: uploadResult.storageUrl,
        title: title,
        description: description,
        extracted_text: parsedText,
      },
    ])

    if (dbError) {
      // Clean up the uploaded file if metadata storage fails
      if (storagePath) {
        await supabase.storage.from("documents").remove([storagePath])
      }
      throw new Error(`Failed to store resume information: ${dbError.message}`)
    }

    revalidatePath("/documents")
  })
}
