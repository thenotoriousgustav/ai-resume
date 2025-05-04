"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { startTransition } from "react"
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

import { resumeSchema } from "../../schemas/resume-schema"
import uploadResume from "../../server/actions/uploud-resume"

interface ResumeInputProps {
  onSuccess?: () => void
}

export default function ResumeForm({ onSuccess }: ResumeInputProps) {
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      file: new File([], ""),
      title: "",
      description: "",
    },
  })

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileName = file.name.split(".").shift() || file.name

      form.setValue("file", file)

      const currentTitle = form.getValues("title")
      if (!currentTitle) {
        form.setValue("title", fileName)
      }
    } else {
      form.setValue("file", new File([], ""))
    }
  }

  async function onSubmit(values: z.infer<typeof resumeSchema>) {
    startTransition(async () => {
      const data = await uploadResume(values)

      if (data.status === "error") {
        toast.error(data.message)
      } else {
        toast.success(data.message)
        form.reset()
        if (onSuccess) {
          onSuccess()
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload your resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={".pdf,.doc,.docx"}
                  onChange={(event) => {
                    const file = event.target.files
                      ? event.target.files[0]
                      : null
                    onChange(file)
                    handleFileChange(file)
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                {value && value.name
                  ? `File name: ${value.name}, File size: ${(
                      value.size /
                      (1024 * 1024)
                    ).toFixed(2)}MB`
                  : "Please upload a document file (PDF, DOC, or DOCX, max 10MB)."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Title</FormLabel>
              <FormControl>
                <Input placeholder="Resume Title" {...field} />
              </FormControl>
              <FormDescription>
                This will be the name of the file in your storage. It can be
                different from the uploaded file name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This will be the description of the file in your storage. It can
                be different from the uploaded file name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Uploading..." : "Upload Resume"}
        </Button>
      </form>
    </Form>
  )
}
