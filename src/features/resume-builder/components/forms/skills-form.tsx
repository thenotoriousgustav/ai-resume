"use client"

import { Tag, TagInput } from "emblor"
import { Plus, Trash2 } from "lucide-react"
import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Skill } from "../types"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const id = useId()
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      category: "Technical",
      level: 3,
    }
    onChange([...data, newSkill])
  }

  const updateSkill = (
    id: string,
    field: keyof Skill,
    value: string | number | null
  ) => {
    onChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    )
  }

  // Convert skill names to tags and vice versa
  const getSkillTags = (skillName: string): Tag[] => {
    if (!skillName) return []
    return skillName
      .split(",")
      .map((name, index) => ({
        id: `${index}`,
        text: name.trim(),
      }))
      .filter((tag) => tag.text !== "")
  }

  const updateSkillFromTags = (skillId: string, tags: Tag[]) => {
    const skillNames = tags.map((tag) => tag.text).join(", ")
    updateSkill(skillId, "name", skillNames)
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button onClick={addSkill} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((skill) => (
          <div
            key={skill.id}
            className="relative space-y-4 rounded-lg border p-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`${id}-${skill.id}`}>Skills</Label>
                <TagInput
                  id={`${id}-${skill.id}`}
                  tags={getSkillTags(skill.name)}
                  setTags={(newTags) => {
                    if (typeof newTags === "function") {
                      const currentTags = getSkillTags(skill.name)
                      const updatedTags = newTags(currentTags)
                      updateSkillFromTags(skill.id, updatedTags)
                    } else {
                      updateSkillFromTags(skill.id, newTags)
                    }
                  }}
                  placeholder="Add skills (JavaScript, React, etc.)"
                  styleClasses={{
                    tagList: {
                      container: "gap-1",
                    },
                    input:
                      "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    tag: {
                      body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                      closeButton:
                        "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                    },
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  inlineTags={false}
                  inputFieldPosition="top"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={skill.category}
                  onChange={(e) =>
                    updateSkill(skill.id, "category", e.target.value)
                  }
                  placeholder="Enter category (e.g., Technical, Programming Languages)"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No skills added yet.</p>
            <Button onClick={addSkill} className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Skill
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
