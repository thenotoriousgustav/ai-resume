"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Education } from "../types"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      isCurrently: false,
      gpa: "",
      description: "",
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: unknown
  ) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    )
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((education) => (
          <div
            key={education.id}
            className="relative space-y-4 rounded-lg border p-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Institution</Label>
                <Input
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(education.id, "institution", e.target.value)
                  }
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input
                value={education.field}
                onChange={(e) =>
                  updateEducation(education.id, "field", e.target.value)
                }
                placeholder="Computer Science, Business, etc."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(education.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) =>
                    updateEducation(education.id, "endDate", e.target.value)
                  }
                  disabled={education.isCurrently}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`currently-${education.id}`}
                    checked={education.isCurrently}
                    onCheckedChange={(checked) =>
                      updateEducation(education.id, "isCurrently", checked)
                    }
                  />
                  <Label htmlFor={`currently-${education.id}`}>
                    Currently Studying
                  </Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(education.id, "gpa", e.target.value)
                  }
                  placeholder="3.8"
                />
              </div>
              <div></div>
            </div>

            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={education.description || ""}
                onChange={(e) =>
                  updateEducation(education.id, "description", e.target.value)
                }
                placeholder="Relevant coursework, achievements, etc."
                rows={3}
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No education added yet.</p>
            <Button onClick={addEducation} className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Education
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
