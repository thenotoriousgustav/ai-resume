import { getCurrentUser } from "@/server/actions/get-current-user"
import { Tables } from "@/types/database.types"
import { createClient } from "@/utils/supabase/server"

type Resume = Tables<"resumes">

export default async function getResumes(): Promise<Resume[]> {
  const supabase = await createClient()
  try {
    const user = await getCurrentUser()

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.error("Error fetching resumes:", error)
      throw new Error(`Failed to fetch resumes: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching resumes:", error)
    throw new Error("An unexpected error occurred while fetching resumes")
  }
}
