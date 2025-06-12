"use server"

import { createClient } from "@/utils/supabase/server"

export default async function updateTableCell(
  rowId: string,
  columnId: string,
  value: string | boolean
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("job_applications")
    .update({
      [columnId]: value,
    })
    .eq("id", rowId)
    .select("*")

  if (error) {
    console.error("Error updating table cell:", error)
    throw new Error(`Failed to update table cell: ${error.message}`)
  }
  // revalidatePath("/job-tracker")
}
