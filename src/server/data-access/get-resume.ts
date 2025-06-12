import { Tables } from "@/types/supabase-types"
import { createClient } from "@/utils/supabase/server"

type Resume = Tables<"resumes">

export default async function getResume(id: string): Promise<Resume> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching resume:", error)
      throw new Error(`Failed to fetch resume: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching resume:", error)
    throw new Error("An unexpected error occurred while fetching resumes")
  }
}
