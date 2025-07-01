import { Database, Tables } from "./supabase-types"

export type DbJobApplication = Tables<"job_applications">
export type DbResume = Tables<"resumes">
export type DbTargetedResumeAnalysis = Tables<"targeted_resume_analysis">
export type DbCoverLetter = Tables<"cover_letters">

// Limited job application data returned from the job table query
export type JobApplicationTableData = {
  id: string
  position: string
  company: string
  location: string
  status: Database["public"]["Enums"]["job_status"] | null
  priority: Database["public"]["Enums"]["job_priority"] | null
  job_type: Database["public"]["Enums"]["job_type"]
  applied_at: string | null
  salary: number | null
  currency: string
}

export type JobApplication = DbJobApplication & {
  resumes: DbResume | null
}

export type JobApplicationLimited = DbJobApplication & {
  resumes: {
    id: string
    title: string
  } | null
}

export type JobApplicationWithResumes = DbJobApplication & {
  resumes: DbResume[]
}

export type JobApplicationPriority = Database["public"]["Enums"]["job_priority"]
export type JobApplicationStatus = Database["public"]["Enums"]["job_status"]
