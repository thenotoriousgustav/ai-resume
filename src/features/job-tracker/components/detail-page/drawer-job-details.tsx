import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

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
  const hasUnsavedChanges = useRef(false)

  const form = useForm<UpdateJobApplicationSchema>({
    defaultValues: {
      company: data.company || "",
      position: data.position || "",
      location: data.location || "",
      salary: data.salary || 0,
      job_type: data.job_type || undefined,
      status: data.status || undefined,
      priority: data.priority || undefined,
      description: data.description || "",
    },
  })

  // Save all pending changes when component unmounts (drawer closes)
  useEffect(() => {
    return () => {
      // Always save when drawer closes, regardless of hasUnsavedChanges
      const currentValues = form.getValues()
      const changedFields: Array<{ field: string; value: string }> = []

      // Check each field for changes
      Object.keys(currentValues).forEach((field) => {
        const currentValue =
          currentValues[field as keyof UpdateJobApplicationSchema]
        const originalValue =
          originalDataRef.current[field as keyof JobApplication]

        // Convert values to comparable format
        const normalizedCurrentValue =
          currentValue === "" || currentValue === 0 ? null : currentValue
        const normalizedOriginalValue =
          originalValue === "" || originalValue === 0 ? null : originalValue

        if (normalizedCurrentValue !== normalizedOriginalValue) {
          changedFields.push({ field, value: String(currentValue || "") })
        }
      })

      // Save all changed fields when drawer closes
      if (changedFields.length > 0) {
        // Use Promise.all to save all changes
        Promise.all(
          changedFields.map(async ({ field, value }) => {
            try {
              await updateJobDetail(data.id, field, value)
            } catch (error) {
              console.error(`Failed to save ${field}:`, error)
            }
          })
        ).then(() => {
          // Refresh the page data after all saves are complete
          router.refresh()
        })
      }
    }
  }, [data.id, form])

  // Simple field change handler that only marks changes
  const handleFieldChange = useCallback(() => {
    hasUnsavedChanges.current = true
  }, [])

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
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange()
                    }}
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
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange()
                    }}
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
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange()
                    }}
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
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange()
                    }}
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
                    handleFieldChange()
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
                    handleFieldChange()
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
                    handleFieldChange()
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
                  onChange={(e) => {
                    field.onChange(e)
                    handleFieldChange()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-muted-foreground text-center text-xs">
          Changes are automatically saved when you close this drawer
        </div>
      </form>
    </Form>
  )
}
