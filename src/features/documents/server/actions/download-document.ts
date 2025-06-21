"use server"

import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function downloadDocument(
  storagePath: string
): ResultAsync<string, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()

    const { data } = await supabase.storage
      .from("documents")
      .getPublicUrl(storagePath, {
        download: true,
      })

    return data.publicUrl
  })
}
