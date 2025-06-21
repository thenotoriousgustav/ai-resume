"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ObjectiveFormProps {
  data: string
  onChange: (data: string) => void
}

export function ObjectiveForm({ data, onChange }: ObjectiveFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Objective</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="objective">Objective Statement</Label>
        <Textarea
          id="objective"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief statement about your career objectives and what you bring to the role..."
          rows={4}
          className="mt-2"
        />
      </CardContent>
    </Card>
  )
}
