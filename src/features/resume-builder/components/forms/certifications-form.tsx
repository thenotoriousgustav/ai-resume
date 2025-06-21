"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Certification } from "../types"

interface CertificationsFormProps {
  data: Certification[]
  onChange: (data: Certification[]) => void
}

export function CertificationsForm({
  data,
  onChange,
}: CertificationsFormProps) {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      expirationDate: "",
      credentialId: "",
      url: "",
    }
    onChange([...data, newCertification])
  }

  const updateCertification = (
    id: string,
    field: keyof Certification,
    value: string | null
  ) => {
    onChange(
      data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    )
  }

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certifications</CardTitle>
        <Button onClick={addCertification} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((certification) => (
          <div
            key={certification.id}
            className="relative space-y-4 rounded-lg border p-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(certification.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Certification Name</Label>
                <Input
                  value={certification.name}
                  onChange={(e) =>
                    updateCertification(
                      certification.id,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label>Issuing Organization</Label>
                <Input
                  value={certification.issuer}
                  onChange={(e) =>
                    updateCertification(
                      certification.id,
                      "issuer",
                      e.target.value
                    )
                  }
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Issue Date</Label>
                <Input
                  type="month"
                  value={certification.issueDate}
                  onChange={(e) =>
                    updateCertification(
                      certification.id,
                      "issueDate",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label>Expiration Date (Optional)</Label>
                <Input
                  type="month"
                  value={certification.expirationDate || ""}
                  onChange={(e) =>
                    updateCertification(
                      certification.id,
                      "expirationDate",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Credential ID (Optional)</Label>
                <Input
                  value={certification.credentialId || ""}
                  onChange={(e) =>
                    updateCertification(
                      certification.id,
                      "credentialId",
                      e.target.value
                    )
                  }
                  placeholder="Certificate ID or Badge Number"
                />
              </div>
              <div>
                <Label>Credential URL (Optional)</Label>
                <Input
                  value={certification.url || ""}
                  onChange={(e) =>
                    updateCertification(certification.id, "url", e.target.value)
                  }
                  placeholder="https://credential-url.com"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No certifications added yet.</p>
            <Button onClick={addCertification} className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Certification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
