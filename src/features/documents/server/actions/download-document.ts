"use server"

import { createClient } from "@/utils/supabase/server"

export default async function downloadDocument(storagePath: string) {
  const supabase = await createClient()

  const { data } = await supabase.storage
    .from("documents")
    .getPublicUrl(storagePath, {
      download: true,
    })

  return {
    status: "success",
    message: "File downloaded successfully.",

    data,
  }
}
