import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        applied: "bg-muted text-muted-foreground border border-border",
        interview:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        offer:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        accepted:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
        rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        low: "bg-muted text-muted-foreground border border-border",
        medium:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        // Job type variants
        "full-time":
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        "part-time":
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
        contract:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
        temporary:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
        internship:
          "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
        remote:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        hybrid: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
        freelance:
          "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
