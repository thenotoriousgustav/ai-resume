export type JobTypeOptions =
  | "full_time"
  | "part_time"
  | "contract"
  | "temporary"
  | "internship"
  | "remote"
  | "hybrid"
  | "freelance"

export type JobTypeBadgeVariant =
  | "full-time"
  | "part-time"
  | "contract"
  | "temporary"
  | "internship"
  | "remote"
  | "hybrid"
  | "freelance"

export const JobTypeVariantMap: Record<JobTypeOptions, JobTypeBadgeVariant> = {
  full_time: "full-time",
  part_time: "part-time",
  contract: "contract",
  temporary: "temporary",
  internship: "internship",
  remote: "remote",
  hybrid: "hybrid",
  freelance: "freelance",
}

export function getBadgeVariantByJobType(
  jobType: string | null
): JobTypeBadgeVariant {
  return JobTypeVariantMap[jobType as JobTypeOptions]
}
