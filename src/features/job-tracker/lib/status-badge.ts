export type JobStatus =
  | "applied"
  | "interview"
  | "offer"
  | "accepted"
  | "rejected"

export type StatusBadgeVariant =
  | "applied"
  | "interview"
  | "offer"
  | "accepted"
  | "rejected"

export const statusVariantMap: Record<JobStatus, StatusBadgeVariant> = {
  applied: "applied",
  interview: "interview",
  offer: "offer",
  accepted: "accepted",
  rejected: "rejected",
}

export function getBadgeVariantByStatus(
  status: string | null
): StatusBadgeVariant {
  return statusVariantMap[status as JobStatus]
}
