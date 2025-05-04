import { format } from "date-fns"

export function formatDate(
  date?: string | Date | null,
  dateFormat: string = "PPP"
): string {
  if (!date) return "-"
  try {
    return format(new Date(date), dateFormat)
  } catch (error) {
    console.error("Invalid date:", date, error)
    return "-"
  }
}
