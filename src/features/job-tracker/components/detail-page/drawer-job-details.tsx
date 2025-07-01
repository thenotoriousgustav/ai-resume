import { useRouter } from "next/navigation"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { JobApplication } from "@/types/database"

import { UpdateJobApplicationSchema } from "../../schemas/job-application-schema"
import updateJobDetail from "../../server/actions/update-job-detail"

export default function DrawerJobDetails({ data }: { data: JobApplication }) {
  const router = useRouter()
  const originalDataRef = useRef(data)

  const form = useForm<UpdateJobApplicationSchema>({
    defaultValues: {
      company: data.company || "",
      position: data.position || "",
      location: data.location || "",
      salary: data.salary || undefined,
      job_type: data.job_type || undefined,
      status: data.status || undefined,
      priority: data.priority || undefined,
      description: data.description || "",
    },
  })

  // Handle save on blur for individual fields
  const handleFieldBlur = async (fieldName: string, value: string | number) => {
    const originalValue =
      originalDataRef.current[fieldName as keyof JobApplication]

    // Convert values to comparable format
    const normalizedCurrentValue = value === "" || value === 0 ? null : value
    const normalizedOriginalValue =
      originalValue === "" || originalValue === 0 ? null : originalValue

    // Only save if value has changed
    if (normalizedCurrentValue !== normalizedOriginalValue) {
      try {
        // Convert value based on field type
        let processedValue: string | number = value
        if (fieldName === "salary" && typeof value === "string") {
          // Try to parse salary as number, fallback to 0 if invalid
          const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""))
          processedValue = isNaN(numericValue) ? 0 : numericValue
        }

        await updateJobDetail(data.id, fieldName, processedValue)
        // Update the original data reference to reflect the saved value
        originalDataRef.current = {
          ...originalDataRef.current,
          [fieldName]: processedValue,
        }
        toast.success(`${fieldName} updated successfully`)
        router.refresh()
      } catch (error) {
        console.error(`Failed to save ${fieldName}:`, error)
        toast.error(`Failed to update ${fieldName}`)
      }
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter position title"
                    onBlur={(e) => handleFieldBlur("position", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter company name"
                    onBlur={(e) => handleFieldBlur("company", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter job location"
                    onBlur={(e) => handleFieldBlur("location", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Salary Range
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., $80,000 - $100,000"
                    onBlur={(e) => handleFieldBlur("salary", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Status</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleFieldBlur("status", value)
                  }}
                  value={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleFieldBlur("priority", value)
                  }}
                  value={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleFieldBlur("job_type", value)
                  }}
                  value={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter job description, requirements, and any additional notes..."
                  className="h-64 resize-none overflow-y-auto"
                  onBlur={(e) => handleFieldBlur("description", e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-muted-foreground text-center text-xs">
          Changes are automatically saved when you finish editing each field
        </div>
      </form>
    </Form>
  )
}
