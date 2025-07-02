import { Badge } from "@/components/ui/badge"

import { getBadgeVariantByStatus } from "../../lib/status-badge"

interface StatusBadgeProps {
  status: string | null
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) return null

  // Format status for display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Badge variant={getBadgeVariantByStatus(status)} className={className}>
      {formatStatus(status)}
    </Badge>
  )
}
