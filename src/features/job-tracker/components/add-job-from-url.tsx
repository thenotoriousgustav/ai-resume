"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon, PlusIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import Modal from "@/components/modal"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

import addJobApplication from "../server/actions/add-job-application"

const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
})

type FormData = z.infer<typeof urlSchema>

export default function AddJobFromUrl() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<FormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const scrapeResponse = await fetch("/api/scrape-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.url }),
      })

      const scrapeResult = await scrapeResponse.json()

      if (!scrapeResult.success) {
        toast.error(scrapeResult.error || "Failed to scrape job data", {
          description: scrapeResult.suggestion,
          duration: 6000,
        })
        return
      }

      const jobData = scrapeResult.data

      // Create the job application with scraped data
      const [, error] = await addJobApplication({
        position: jobData.position,
        company: jobData.company,
        location: jobData.location || "",
        job_type: jobData.jobType || "full_time",
        status: "applied",
        source_url: data.url,
        description: `Automatically imported from ${jobData.platform || "job board"}\n\nJob Description:\n${jobData.description || "No description available"}`,
        salary: jobData.salary
          ? parseFloat(jobData.salary.replace(/[^\d.]/g, "")) || undefined
          : undefined,
      })

      if (error) {
        toast.error(error.message || "Failed to add job application")
        return
      }

      toast.success(
        `Job application for "${jobData.position}" at ${jobData.company} has been added successfully!`
      )
      form.reset()
      router.replace(pathname, { scroll: false }) // Close the modal
    })
  }

  return (
    <Modal routeName={"add-from-url"}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add from URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Job from URL</DialogTitle>
          <DialogDescription>
            Paste a JobStreet or LinkedIn job URL to automatically extract and
            add the job application. The system uses advanced scraping
            techniques to handle anti-bot protection, but some sites may
            occasionally block automated extraction.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://id.jobstreet.com/... or https://linkedin.com/jobs/..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Copy and paste the JobStreet or LinkedIn job URL here. The
                    system will automatically extract job details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPending ? "Adding Job..." : "Add Job"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Modal>
  )
}
