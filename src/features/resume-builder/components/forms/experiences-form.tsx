"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Experience } from "../types"

interface ExperiencesFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export function ExperiencesForm({ data, onChange }: ExperiencesFormProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentRole: false,
      description: "",
      location: "",
    }
    onChange([...data, newExperience])
  }

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: unknown
  ) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    )
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <Button onClick={addExperience} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((experience) => (
          <div
            key={experience.id}
            className="relative space-y-4 rounded-lg border p-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company</Label>
                <Input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label>Position</Label>
                <Input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(experience.id, "position", e.target.value)
                  }
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                  disabled={experience.isCurrentRole}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.isCurrentRole}
                    onCheckedChange={(checked) =>
                      updateExperience(experience.id, "isCurrentRole", checked)
                    }
                  />
                  <Label htmlFor={`current-${experience.id}`}>
                    Current Role
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={experience.location}
                onChange={(e) =>
                  updateExperience(experience.id, "location", e.target.value)
                }
                placeholder="City, State/Country"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) =>
                  updateExperience(experience.id, "description", e.target.value)
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No work experience added yet.</p>
            <Button onClick={addExperience} className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
