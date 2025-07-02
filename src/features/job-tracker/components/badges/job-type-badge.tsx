import { Badge } from "@/components/ui/badge"

import { getBadgeVariantByJobType } from "../../lib/job-type-badge"

interface JobTypeBadgeProps {
  jobType: string | null
  className?: string
}

export function JobTypeBadge({ jobType, className }: JobTypeBadgeProps) {
  if (!jobType) return null

  const formatJobType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Badge variant={getBadgeVariantByJobType(jobType)} className={className}>
      {formatJobType(jobType)}
    </Badge>
  )
}
