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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tables } from "@/types/supabase-types"

import { UpdateResumeSchema } from "../../schemas/resume-schema"
import updateResume from "../../server/actions/update-resume"

type Resume = Tables<"resumes">

export default function UpdateResumeForm({ resume }: { resume: Resume }) {
  const form = useForm<z.infer<typeof UpdateResumeSchema>>({
    resolver: zodResolver(UpdateResumeSchema),
    defaultValues: {
      title: resume.title,
      description: resume.description ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof UpdateResumeSchema>) {
    startTransition(async () => {
      const updateResumeWithId = updateResume.bind(null, resume.id)
      const [_, error] = await updateResumeWithId(values)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Resume updated successfully")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Title</FormLabel>
              <FormControl>
                <Input placeholder="Resume Title" type="text" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Resume"}
        </Button>
      </form>
    </Form>
  )
}
