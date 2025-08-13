"use server"

import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { type ResultAsync, tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

export default async function updateTableCell(
  rowId: string,
  columnId: string,
  value: string | boolean
): ResultAsync<void, Error> {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const { error } = await supabase
      .from("job_applications")
      .update({
        [columnId]: value,
      })
      .eq("id", rowId)
      .eq("user_id", user.id)
      .select("*")

    if (error) {
      throw new Error(`Failed to update table cell: ${error.message}`)
    }
  })
}
