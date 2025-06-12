"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAutoSave } from "@/hooks/use-auto-save"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"
import { useResumeStore } from "@/stores/resume-builder-store"

// Schema for personal info validation
const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, saveStatus } = useResumeStore()

  // Auto-save with 1.5 second delay
  useAutoSave(1500)

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: resumeData.personal_info.fullName || "",
      email: resumeData.personal_info.email || "",
      phone: resumeData.personal_info.phone || "",
      location: resumeData.personal_info.location || "",
      website: resumeData.personal_info.website || "",
      linkedin: resumeData.personal_info.linkedin || "",
      github: resumeData.personal_info.github || "",
    },
  })

  // Update form when store data changes
  useEffect(() => {
    form.reset({
      fullName: resumeData.personal_info.fullName || "",
      email: resumeData.personal_info.email || "",
      phone: resumeData.personal_info.phone || "",
      location: resumeData.personal_info.location || "",
      website: resumeData.personal_info.website || "",
      linkedin: resumeData.personal_info.linkedin || "",
      github: resumeData.personal_info.github || "",
    })
  }, [resumeData.personal_info, form])

  // Handle form submission (not needed with auto-save, but keeping for form validation)
  const onSubmit = async (values: PersonalInfoFormData) => {
    updatePersonalInfo(values)
  }

  // Handle field changes (auto-update store on change with debounce)
  const debouncedUpdatePersonalInfo = useDebouncedCallback(
    (field: keyof PersonalInfoFormData, value: string) => {
      updatePersonalInfo({ [field]: value })
    },
    300 // 300ms debounce
  )

  const handleFieldChange = (
    field: keyof PersonalInfoFormData,
    value: string
  ) => {
    debouncedUpdatePersonalInfo(field, value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Personal Information
        </h2>
        <p className="text-muted-foreground">
          Enter your basic contact information and professional links.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleFieldChange("fullName", e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleFieldChange("email", e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleFieldChange("phone", e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York, NY"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleFieldChange("location", e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Professional Links (Optional)
            </h3>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://johndoe.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleFieldChange("website", e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/johndoe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleFieldChange("linkedin", e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://github.com/johndoe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleFieldChange("github", e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4">
            <div className="text-muted-foreground text-sm">
              {saveStatus === "saving" && (
                <span className="flex items-center gap-2">
                  <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Auto-saving...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="text-green-600">✓ Auto-saved</span>
              )}
              {saveStatus === "error" && (
                <span className="text-red-600">⚠ Error saving changes</span>
              )}
              {saveStatus === "idle" && (
                <span className="text-amber-600">● Unsaved changes</span>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
