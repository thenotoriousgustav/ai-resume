"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { RequestOptions } from "ai"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { coverLetterSchema } from "../schemas/cover-letter-schema"
import updateApplication from "../server/actions/update-application"

interface CoverLetterFormProps {
  initialData?: {
    company?: string
    position?: string
    description?: string
    resume?: string
  }
  jobApplicationId: string
  onSaveAndGenerate?: (formData: z.infer<typeof coverLetterSchema>) => void
  complete?: (
    prompt: string,
    options?: RequestOptions
  ) => Promise<string | null | undefined>
  isGenerating?: boolean
}
export default function CoverLetterForm({
  initialData = {},
  onSaveAndGenerate,
  jobApplicationId,
  isGenerating = false,
}: CoverLetterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof coverLetterSchema>>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      company: initialData.company ?? "",
      position: initialData.position ?? "",
      description: initialData.description ?? "",
    },
    mode: "onBlur",
  })

  const handleSubmit = async (values: z.infer<typeof coverLetterSchema>) => {
    try {
      setIsLoading(true)

      await updateApplication(values, jobApplicationId)

      toast.success("Job application updated successfully!")

      if (onSaveAndGenerate) {
        onSaveAndGenerate(values)
      }
    } catch (error) {
      console.error("Error updating application:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update job application"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmitting = isLoading || isGenerating

  return (
    <div className="h-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter position title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Paste the job description here..."
                    rows={6}
                    className="max-h-80 overflow-y-auto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isLoading && "Saving..."}
              {isGenerating && "Generating Cover Letter..."}
              {!isSubmitting && "Save & Generate Cover Letter"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
