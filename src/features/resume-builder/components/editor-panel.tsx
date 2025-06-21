"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useResumeBuilderStore } from "../store/resume-builder-store"

import { CertificationsForm } from "./forms/certifications-form"
import { EducationForm } from "./forms/education-form"
import { ExperiencesForm } from "./forms/experiences-form"
import { ObjectiveForm } from "./forms/objective-form"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { SkillsForm } from "./forms/skills-form"
import { SaveIndicator } from "./save-indicator"
import type { ResumeBuilderData } from "./types"

interface EditorPanelProps {
  handleUpdateField: <K extends keyof ResumeBuilderData>(
    field: K,
    value: ResumeBuilderData[K]
  ) => void
  isSaving: boolean
  lastSaved: Date | null
  saveError: string | null
}

export function EditorPanel({
  handleUpdateField,
  isSaving,
  lastSaved,
  saveError,
}: EditorPanelProps) {
  const { resumeData, activeTab, setActiveTab } = useResumeBuilderStore()

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <div>
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              value={resumeData.title}
              onChange={(e) => handleUpdateField("title", e.target.value)}
              placeholder="My Professional Resume"
              className="mt-1 max-w-md"
            />
          </div>
        </div>
        <SaveIndicator
          isSaving={isSaving}
          lastSaved={lastSaved}
          saveError={saveError}
        />
      </div>

      <ScrollArea className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="objective">Objective</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(data) => handleUpdateField("personalInfo", data)}
            />
          </TabsContent>

          <TabsContent value="objective">
            <ObjectiveForm
              data={resumeData.objective}
              onChange={(data) => handleUpdateField("objective", data)}
            />
          </TabsContent>

          <TabsContent value="experience">
            <ExperiencesForm
              data={resumeData.experiences}
              onChange={(data) => handleUpdateField("experiences", data)}
            />
          </TabsContent>

          <TabsContent value="education">
            <EducationForm
              data={resumeData.education}
              onChange={(data) => handleUpdateField("education", data)}
            />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) => handleUpdateField("skills", data)}
            />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsForm
              data={resumeData.certifications}
              onChange={(data) => handleUpdateField("certifications", data)}
            />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
