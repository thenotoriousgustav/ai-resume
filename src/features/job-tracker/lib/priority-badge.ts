export type JobPriority = "low" | "medium" | "high"

export type PriorityBadgeVariant = "low" | "medium" | "high"

const priorityVariantMap: Record<JobPriority, PriorityBadgeVariant> = {
  low: "low",
  medium: "medium",
  high: "high",
}

export function getBadgeVariantByPriority(
  priority: string | null
): PriorityBadgeVariant {
  return priorityVariantMap[priority as JobPriority]
}
