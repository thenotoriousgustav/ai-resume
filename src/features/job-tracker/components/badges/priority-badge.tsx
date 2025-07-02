import { Badge } from "@/components/ui/badge"

import { getBadgeVariantByPriority } from "../../lib/priority-badge"

interface PriorityBadgeProps {
  priority: string | null
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  if (!priority) return null

  const formatPriority = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1)
  }

  return (
    <Badge variant={getBadgeVariantByPriority(priority)} className={className}>
      {formatPriority(priority)}
    </Badge>
  )
}
