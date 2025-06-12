import { Database, Tables } from "./supabase-types"

export type DbJobApplication = Tables<"job_applications">
export type DbResume = Tables<"resumes">
export type DbResumeAnalysis = Tables<"resume_analysis">
export type DbTargetedResumeAnalysis = Tables<"targeted_resume_analysis">
export type DbCoverLetter = Tables<"cover_letters">
export type DBResumeBuilder = Tables<"resumes_builder">

export type JobApplication = DbJobApplication & {
  resumes: DbResume | null
}

export type JobApplicationWithResumes = DbJobApplication & {
  resumes: DbResume[]
}

export type JobApplicationPriority = Database["public"]["Enums"]["job_priority"]
export type JobApplicationStatus = Database["public"]["Enums"]["job_status"]
