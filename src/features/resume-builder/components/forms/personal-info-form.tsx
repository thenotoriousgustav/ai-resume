"use client"

import { useEffect, useRef } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  usePersonalInfo,
  useResumeBuilderStore,
} from "../../store/resume-builder-store"
import { PersonalInfo } from "../types"

interface PersonalInfoFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ onChange }: PersonalInfoFormProps) {
  const personalInfo = usePersonalInfo()
  const { updatePersonalInfo, focusField, setFocusField } =
    useResumeBuilderStore()

  // Refs for focusing specific fields
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const linkedinRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)

  // Handle focus when focusField changes
  useEffect(() => {
    if (focusField) {
      const refs = {
        fullName: fullNameRef,
        email: emailRef,
        phone: phoneRef,
        location: locationRef,
        linkedin: linkedinRef,
        website: websiteRef,
      }

      const targetRef = refs[focusField as keyof typeof refs]
      if (targetRef?.current) {
        targetRef.current.focus()
        setFocusField(null) // Clear focus field after focusing
      }
    }
  }, [focusField, setFocusField])

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const newData = {
      ...personalInfo,
      [field]: value,
    }
    updatePersonalInfo(newData)
    onChange(newData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              ref={fullNameRef}
              id="fullName"
              value={personalInfo.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              value={personalInfo.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              ref={phoneRef}
              id="phone"
              value={personalInfo.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              ref={locationRef}
              id="location"
              value={personalInfo.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              ref={linkedinRef}
              id="linkedin"
              value={personalInfo.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              ref={websiteRef}
              id="website"
              value={personalInfo.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
