"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type {
  Certification,
  Education,
  Experience,
  PersonalInfo,
  ResumeBuilderData,
  Skill,
} from "../components/types"

interface ResumeBuilderState {
  // State
  resumeData: ResumeBuilderData
  isLoading: boolean
  isSaving: boolean
  lastSaved: Date | null
  saveError: string | null
  activeTab: string
  focusField: string | null

  // Actions
  setResumeData: (data: ResumeBuilderData) => void
  updateField: <K extends keyof ResumeBuilderData>(
    field: K,
    value: ResumeBuilderData[K]
  ) => void
  setIsLoading: (loading: boolean) => void
  setIsSaving: (saving: boolean) => void
  setLastSaved: (date: Date | null) => void
  setSaveError: (error: string | null) => void
  resetStore: () => void
  setActiveTab: (tab: string) => void
  setFocusField: (field: string | null) => void
  navigateToField: (tab: string, field?: string) => void

  // Field-specific actions
  updatePersonalInfo: (info: PersonalInfo) => void
  updateObjective: (objective: string) => void
  updateExperiences: (experiences: Experience[]) => void
  updateEducation: (education: Education[]) => void
  updateSkills: (skills: Skill[]) => void
  updateCertifications: (certifications: Certification[]) => void
  updateTitle: (title: string) => void
}

const getInitialResumeData = (resumeId: string): ResumeBuilderData => ({
  id: resumeId,
  title: "",
  template: "modern",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  objective: "",
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
})

export const useResumeBuilderStore = create<ResumeBuilderState>()(
  devtools(
    (set, _get) => ({
      // Initial state
      resumeData: getInitialResumeData(""),
      isLoading: false,
      isSaving: false,
      lastSaved: null,
      saveError: null,
      activeTab: "personal",
      focusField: null,

      // Actions
      setResumeData: (data) =>
        set({ resumeData: data }, false, "setResumeData"),

      updateField: (field, value) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              [field]: value,
            },
          }),
          false,
          `updateField:${field}`
        ),

      setIsLoading: (loading) =>
        set({ isLoading: loading }, false, "setIsLoading"),

      setIsSaving: (saving) => set({ isSaving: saving }, false, "setIsSaving"),

      setLastSaved: (date) => set({ lastSaved: date }, false, "setLastSaved"),

      setSaveError: (error) => set({ saveError: error }, false, "setSaveError"),

      setActiveTab: (tab) => set({ activeTab: tab }, false, "setActiveTab"),

      setFocusField: (field) =>
        set({ focusField: field }, false, "setFocusField"),

      navigateToField: (tab, field) =>
        set({ activeTab: tab, focusField: field }, false, "navigateToField"),

      resetStore: () =>
        set(
          {
            resumeData: getInitialResumeData(""),
            isLoading: false,
            isSaving: false,
            lastSaved: null,
            saveError: null,
          },
          false,
          "resetStore"
        ),

      // Field-specific actions
      updatePersonalInfo: (info) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              personalInfo: info,
            },
          }),
          false,
          "updatePersonalInfo"
        ),

      updateObjective: (objective) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              objective,
            },
          }),
          false,
          "updateObjective"
        ),

      updateExperiences: (experiences) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              experiences,
            },
          }),
          false,
          "updateExperiences"
        ),

      updateEducation: (education) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              education,
            },
          }),
          false,
          "updateEducation"
        ),

      updateSkills: (skills) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              skills,
            },
          }),
          false,
          "updateSkills"
        ),

      updateCertifications: (certifications) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              certifications,
            },
          }),
          false,
          "updateCertifications"
        ),

      updateTitle: (title) =>
        set(
          (state) => ({
            resumeData: {
              ...state.resumeData,
              title,
            },
          }),
          false,
          "updateTitle"
        ),
    }),
    {
      name: "resume-builder-store",
    }
  )
)

// Selectors for better performance
export const useResumeData = () =>
  useResumeBuilderStore((state) => state.resumeData)

export const usePersonalInfo = () =>
  useResumeBuilderStore((state) => state.resumeData.personalInfo)

export const useObjective = () =>
  useResumeBuilderStore((state) => state.resumeData.objective)

export const useExperiences = () =>
  useResumeBuilderStore((state) => state.resumeData.experiences)

export const useEducation = () =>
  useResumeBuilderStore((state) => state.resumeData.education)

export const useSkills = () =>
  useResumeBuilderStore((state) => state.resumeData.skills)

export const useCertifications = () =>
  useResumeBuilderStore((state) => state.resumeData.certifications)

export const useResumeTitle = () =>
  useResumeBuilderStore((state) => state.resumeData.title)

export const useIsLoading = () =>
  useResumeBuilderStore((state) => state.isLoading)

export const useIsSaving = () =>
  useResumeBuilderStore((state) => state.isSaving)

export const useLastSaved = () =>
  useResumeBuilderStore((state) => state.lastSaved)

export const useSaveError = () =>
  useResumeBuilderStore((state) => state.saveError)

export const useLoadingState = () => ({
  isLoading: useIsLoading(),
  isSaving: useIsSaving(),
  lastSaved: useLastSaved(),
  saveError: useSaveError(),
})
