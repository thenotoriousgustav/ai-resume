"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { createResumeFromScratch } from "@/features/resume-builder/server/actions/create-resume-from-scratch"
import { createResumeFromTemplate } from "@/features/resume-builder/server/actions/create-resume-from-template"

// Example resume templates
const exampleTemplates = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Perfect for developers and tech professionals",
    template: {
      title: "Software Engineer Resume",
      personalInfo: {
        fullName: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johndoe",
        website: "https://johndoe.dev",
      },
      objective:
        "Experienced software engineer with 5+ years of experience developing scalable web applications and leading cross-functional teams.",
      experiences: [
        {
          id: "exp1",
          company: "Tech Company Inc.",
          position: "Senior Software Engineer",
          startDate: "2021-01",
          endDate: "",
          isCurrentRole: true,
          description:
            "• Led development of microservices architecture serving 1M+ users\n• Collaborated with product teams to deliver features ahead of schedule\n• Mentored junior developers and conducted code reviews",
          location: "San Francisco, CA",
        },
        {
          id: "exp2",
          company: "Startup LLC",
          position: "Full Stack Developer",
          startDate: "2019-06",
          endDate: "2020-12",
          isCurrentRole: false,
          description:
            "• Built responsive web applications using React and Node.js\n• Implemented CI/CD pipelines reducing deployment time by 50%\n• Worked closely with designers to create intuitive user interfaces",
          location: "Austin, TX",
        },
      ],
      education: [
        {
          id: "edu1",
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-05",
          isCurrently: false,
          gpa: "3.8",
          description:
            "Relevant coursework: Data Structures, Algorithms, Database Systems",
        },
      ],
      skills: [
        { id: "skill1", name: "JavaScript", category: "Programming", level: 5 },
        { id: "skill2", name: "React", category: "Frontend", level: 5 },
        { id: "skill3", name: "Node.js", category: "Backend", level: 4 },
        { id: "skill4", name: "Python", category: "Programming", level: 4 },
        { id: "skill5", name: "AWS", category: "Cloud", level: 3 },
        { id: "skill6", name: "Docker", category: "DevOps", level: 4 },
      ],
      certifications: [
        {
          id: "cert1",
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          issueDate: "2022-03",
          expirationDate: "2025-03",
          credentialId: "ABC123456",
          url: "https://aws.amazon.com/certification/",
        },
      ],
    },
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    description: "Ideal for marketing and digital marketing professionals",
    template: {
      title: "Marketing Specialist Resume",
      personalInfo: {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 987-6543",
        location: "New York, NY",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        website: "https://sarahmarketing.com",
      },
      objective:
        "Creative marketing professional with 4+ years of experience in digital marketing, content strategy, and brand management.",
      experiences: [
        {
          id: "exp1",
          company: "Digital Agency Pro",
          position: "Senior Marketing Specialist",
          startDate: "2022-03",
          endDate: "",
          isCurrentRole: true,
          description:
            "• Developed and executed marketing campaigns resulting in 30% increase in lead generation\n• Managed social media accounts with 100K+ followers\n• Collaborated with design team to create compelling visual content",
          location: "New York, NY",
        },
        {
          id: "exp2",
          company: "Marketing Solutions Inc.",
          position: "Marketing Coordinator",
          startDate: "2020-01",
          endDate: "2022-02",
          isCurrentRole: false,
          description:
            "• Created content calendars and managed content creation workflow\n• Analyzed campaign performance using Google Analytics and HubSpot\n• Coordinated with external vendors and influencers for partnerships",
          location: "New York, NY",
        },
      ],
      education: [
        {
          id: "edu1",
          institution: "State University",
          degree: "Bachelor of Arts",
          field: "Marketing",
          startDate: "2016-09",
          endDate: "2020-05",
          isCurrently: false,
          gpa: "3.7",
          description:
            "Relevant coursework: Digital Marketing, Consumer Behavior, Brand Management",
        },
      ],
      skills: [
        {
          id: "skill1",
          name: "Google Analytics",
          category: "Analytics",
          level: 5,
        },
        {
          id: "skill2",
          name: "Social Media Marketing",
          category: "Marketing",
          level: 5,
        },
        {
          id: "skill3",
          name: "Content Creation",
          category: "Creative",
          level: 4,
        },
        { id: "skill4", name: "SEO", category: "Digital Marketing", level: 4 },
        {
          id: "skill5",
          name: "Adobe Creative Suite",
          category: "Design",
          level: 3,
        },
        {
          id: "skill6",
          name: "Email Marketing",
          category: "Marketing",
          level: 4,
        },
      ],
      certifications: [
        {
          id: "cert1",
          name: "Google Analytics Certified",
          issuer: "Google",
          issueDate: "2021-06",
          expirationDate: "2024-06",
          credentialId: "GAC123456",
          url: "https://analytics.google.com/analytics/academy/",
        },
        {
          id: "cert2",
          name: "HubSpot Content Marketing",
          issuer: "HubSpot",
          issueDate: "2021-09",
          expirationDate: "",
          credentialId: "HUB789012",
          url: "https://academy.hubspot.com/",
        },
      ],
    },
  },
]

export default function CreateResumeClient() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("")

  const handleCreateFromScratch = async () => {
    if (!resumeTitle.trim()) {
      return
    }

    setIsCreating(true)
    try {
      const [result, error] = await createResumeFromScratch(resumeTitle)
      if (result) {
        router.push(`/resume-builder/${result}`)
      } else if (error) {
        console.error("Failed to create resume:", error.message)
      }
    } catch (error) {
      console.error("Failed to create resume:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateFromTemplate = async (
    template: (typeof exampleTemplates)[0]
  ) => {
    setIsCreating(true)
    try {
      const [result, error] = await createResumeFromTemplate(template.template)
      if (result) {
        router.push(`/resume-builder/${result}`)
      } else if (error) {
        console.error("Failed create resume from template:", error.message)
      }
    } catch (error) {
      console.error("Failed to create resume from template:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      {/* Create from Scratch */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Start from Scratch</CardTitle>
          <p className="text-muted-foreground text-sm">
            Build your resume from the ground up with a blank template
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume-title">Resume Title</Label>
            <Input
              id="resume-title"
              placeholder="e.g., Software Engineer Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>
          <Button
            onClick={handleCreateFromScratch}
            disabled={!resumeTitle.trim() || isCreating}
            className="w-full"
          >
            {isCreating ? "Creating..." : "Create Blank Resume"}
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Create from Examples */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Start with Examples</h2>
          <p className="text-muted-foreground text-sm">
            Use pre-filled templates as a starting point and customize them
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {exampleTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {template.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Includes:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      <li>• Complete personal information</li>
                      <li>• Professional objective</li>
                      <li>• Work experience examples</li>
                      <li>• Education details</li>
                      <li>• Skills and certifications</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleCreateFromTemplate(template)}
                    disabled={isCreating}
                    className="w-full"
                    variant="outline"
                  >
                    {isCreating ? "Creating..." : "Use This Template"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
