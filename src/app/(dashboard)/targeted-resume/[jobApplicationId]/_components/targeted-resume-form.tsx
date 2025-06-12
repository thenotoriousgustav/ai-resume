"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import updateApplication from "@/features/cover-letter/server/actions/update-application"
import { JobApplication } from "@/types/database"

const formSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export default function TargetedResumeForm({
  jobApplication,
  submit,
  onCancel,
}: {
  jobApplication: JobApplication
  submit: (input: unknown) => void
  onCancel?: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: jobApplication.position,
      company: jobApplication.company,
      description: jobApplication.description,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateApplication(values, jobApplication.id)
      toast.success("Job application updated successfully!")

      submit({
        position: values.position,
        company: values.company,
        description: values.description,
        resume: jobApplication.resumes?.extracted_text || "",
      })
    } catch (error) {
      console.error("Error updating application:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update job application"
      )
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software Engineer" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the job position you're applying for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Google" {...field} />
                </FormControl>
                <FormDescription>Enter the company name.</FormDescription>
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
                    placeholder="Paste the job description here..."
                    className="max-h-80 overflow-y-auto"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Paste the complete job description to help tailor your resume.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="cursor-pointer">
              Save & Generate Analysis
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
