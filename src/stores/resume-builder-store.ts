import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { createClient } from "@/utils/supabase/client"

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  location?: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  location?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface ResumeData {
  id?: string
  user_id?: string
  title: string
  template: string
  personal_info: PersonalInfo
  objective: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
  certifications: Certification[]
  created_at?: string
  updated_at?: string
}

export type SaveStatus = "idle" | "saving" | "saved" | "error"

interface ResumeStore {
  resumeData: ResumeData
  saveStatus: SaveStatus
  lastSaved: Date | null
  isLoading: boolean

  // Actions
  setTitle: (title: string) => void
  setTemplate: (template: string) => void
  updatePersonalInfo: (info: Partial<ResumeData["personal_info"]>) => void
  setObjective: (objective: string) => void

  // Experience actions
  addExperience: () => void
  updateExperience: (id: string, data: Partial<Experience>) => void
  removeExperience: (id: string) => void

  // Education actions
  addEducation: () => void
  updateEducation: (id: string, data: Partial<Education>) => void
  removeEducation: (id: string) => void

  // Skills actions
  updateSkills: (skills: string[]) => void

  // Certification actions
  addCertification: () => void
  updateCertification: (id: string, data: Partial<Certification>) => void
  removeCertification: (id: string) => void

  // Save actions
  saveResume: () => Promise<void>
  setSaveStatus: (status: SaveStatus) => void
  loadResume: (id: string) => Promise<void>
  createNewResume: () => void
  loadUserResumes: () => Promise<ResumeData[]>
}

const initialResumeData: ResumeData = {
  title: "My Resume",
  template: "modern",
  personal_info: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  objective: "",
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
}

export const useResumeStore = create<ResumeStore>()(
  devtools((set, get) => ({
    resumeData: initialResumeData,
    saveStatus: "idle",
    lastSaved: null,
    isLoading: false,

    setTitle: (title) => {
      set((state) => ({
        resumeData: { ...state.resumeData, title },
        saveStatus: "idle",
      }))
    },

    setTemplate: (template) => {
      set((state) => ({
        resumeData: { ...state.resumeData, template },
        saveStatus: "idle",
      }))
    },

    updatePersonalInfo: (info) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          personal_info: { ...state.resumeData.personal_info, ...info },
        },
        saveStatus: "idle",
      }))
    },

    setObjective: (objective) => {
      set((state) => ({
        resumeData: { ...state.resumeData, objective },
        saveStatus: "idle",
      }))
    },

    addExperience: () => {
      const newExp: Experience = {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        location: "",
      }
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experiences: [...state.resumeData.experiences, newExp],
        },
        saveStatus: "idle",
      }))
    },

    updateExperience: (id, data) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experiences: state.resumeData.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
          ),
        },
        saveStatus: "idle",
      }))
    },

    removeExperience: (id) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          experiences: state.resumeData.experiences.filter(
            (exp) => exp.id !== id
          ),
        },
        saveStatus: "idle",
      }))
    },

    addEducation: () => {
      const newEdu: Education = {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
        gpa: "",
        location: "",
      }
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, newEdu],
        },
        saveStatus: "idle",
      }))
    },

    updateEducation: (id, data) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map((edu) =>
            edu.id === id ? { ...edu, ...data } : edu
          ),
        },
        saveStatus: "idle",
      }))
    },

    removeEducation: (id) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter((edu) => edu.id !== id),
        },
        saveStatus: "idle",
      }))
    },

    updateSkills: (skills) => {
      set((state) => ({
        resumeData: { ...state.resumeData, skills },
        saveStatus: "idle",
      }))
    },

    addCertification: () => {
      const newCert: Certification = {
        id: crypto.randomUUID(),
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        url: "",
      }
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          certifications: [...state.resumeData.certifications, newCert],
        },
        saveStatus: "idle",
      }))
    },

    updateCertification: (id, data) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.map((cert) =>
            cert.id === id ? { ...cert, ...data } : cert
          ),
        },
        saveStatus: "idle",
      }))
    },

    removeCertification: (id) => {
      set((state) => ({
        resumeData: {
          ...state.resumeData,
          certifications: state.resumeData.certifications.filter(
            (cert) => cert.id !== id
          ),
        },
        saveStatus: "idle",
      }))
    },

    setSaveStatus: (status) => set({ saveStatus: status }),

    createNewResume: () => {
      set({
        resumeData: initialResumeData,
        saveStatus: "idle",
        lastSaved: null,
      })
    },

    saveResume: async () => {
      const supabase = createClient()
      const { resumeData } = get()

      try {
        set({ saveStatus: "saving" })

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error("User not authenticated")

        const dataToSave = {
          user_id: user.id,
          template: resumeData.template,
          personal_info: JSON.parse(JSON.stringify(resumeData.personal_info)),
          objective: resumeData.objective,
          experiences: JSON.parse(JSON.stringify(resumeData.experiences)),
          education: JSON.parse(JSON.stringify(resumeData.education)),
          skills: JSON.parse(JSON.stringify(resumeData.skills)),
          certifications: JSON.parse(JSON.stringify(resumeData.certifications)),
          title: resumeData.title,
          updated_at: new Date().toISOString(),
        }

        let result

        if (resumeData.id) {
          // Update existing resume
          result = await supabase
            .from("resumes_builder")
            .update(dataToSave)
            .eq("id", resumeData.id)
            .eq("user_id", user.id)
            .select()
            .single()
        } else {
          // Create new resume
          result = await supabase
            .from("resumes_builder")
            .insert({
              ...dataToSave,
              created_at: new Date().toISOString(),
            })
            .select()
            .single()
        }

        const { data, error } = result

        if (error) throw error

        set({
          resumeData: {
            ...resumeData,
            id: data.id,
            user_id: data.user_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
          saveStatus: "saved",
          lastSaved: new Date(),
        })
      } catch (error) {
        console.error("Save failed:", error)
        set({ saveStatus: "error" })
      }
    },

    loadResume: async (id) => {
      try {
        const supabase = createClient()
        set({ isLoading: true })

        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error("User not authenticated")

        const { data, error } = await supabase
          .from("resumes_builder")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single()

        if (error) throw error

        const resumeData: ResumeData = {
          id: data.id,
          user_id: data.user_id,
          title: (data.title as string) || "My Resume",
          template: (data.template as string) || "modern",
          personal_info: (data.personal_info as unknown as PersonalInfo) || {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            github: "",
          },
          objective: (data.objective as string) || "",
          experiences: (data.experiences as unknown as Experience[]) || [],
          education: (data.education as unknown as Education[]) || [],
          skills: (data.skills as unknown as string[]) || [],
          certifications:
            (data.certifications as unknown as Certification[]) || [],
          created_at: data.created_at || undefined,
          updated_at: data.updated_at || undefined,
        }

        set({
          resumeData,
          saveStatus: "saved",
          lastSaved: data.updated_at ? new Date(data.updated_at) : null,
          isLoading: false,
        })
      } catch (error) {
        console.error("Load failed:", error)
        set({ isLoading: false })
      }
    },

    loadUserResumes: async () => {
      const supabase = createClient()
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error("User not authenticated")

        const { data, error } = await supabase
          .from("resumes_builder")
          .select("id, title, template, updated_at")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })

        if (error) throw error

        return data || []
      } catch (error) {
        console.error("Load user resumes failed:", error)
        return []
      }
    },
  }))
)
