export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrentRole: boolean
  description: string
  location: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  isCurrently: boolean
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number // 1-5
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  url?: string
}

export interface ResumeBuilderData {
  id: string
  title: string
  template: string
  personalInfo: PersonalInfo
  objective: string
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  certifications: Certification[]
}
