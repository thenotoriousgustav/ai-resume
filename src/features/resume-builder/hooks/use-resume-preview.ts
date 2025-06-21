"use client"

import { useMemo } from "react"

import { useResumeData } from "../store/resume-builder-store"

/**
 * Hook untuk mendapatkan data resume yang sudah dioptimasi untuk preview
 * Menghindari re-render berlebihan dengan memoization
 */
export function useResumePreview() {
  const resumeData = useResumeData()

  // Memoize computed values untuk menghindari recalculation
  const previewData = useMemo(() => {
    const hasPersonalInfo = Boolean(
      resumeData.personalInfo.fullName ||
        resumeData.personalInfo.email ||
        resumeData.personalInfo.phone ||
        resumeData.personalInfo.location
    )

    const hasObjective = Boolean(resumeData.objective?.trim())
    const hasExperiences = resumeData.experiences.length > 0
    const hasEducation = resumeData.education.length > 0
    const hasSkills = resumeData.skills.length > 0
    const hasCertifications = resumeData.certifications.length > 0

    // Group skills by category
    const skillsByCategory = resumeData.skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
      },
      {} as Record<string, typeof resumeData.skills>
    )

    const skillCategories = Object.keys(skillsByCategory)

    return {
      ...resumeData,
      // Computed flags
      hasPersonalInfo,
      hasObjective,
      hasExperiences,
      hasEducation,
      hasSkills,
      hasCertifications,
      // Processed data
      skillsByCategory,
      skillCategories,
      // Display name
      displayName: resumeData.personalInfo.fullName || "Your Name",
      // PDF filename
      pdfFilename: `${resumeData.personalInfo.fullName || "Resume"}_${new Date().toISOString().split("T")[0]}.pdf`,
    }
  }, [resumeData])

  return previewData
}

/**
 * Hook untuk mendapatkan status preview (apakah ada data untuk ditampilkan)
 */
export function usePreviewStatus() {
  const {
    hasPersonalInfo,
    hasObjective,
    hasExperiences,
    hasEducation,
    hasSkills,
    hasCertifications,
  } = useResumePreview()

  const hasAnyContent =
    hasPersonalInfo ||
    hasObjective ||
    hasExperiences ||
    hasEducation ||
    hasSkills ||
    hasCertifications
  const isEmpty = !hasAnyContent

  return {
    hasAnyContent,
    isEmpty,
    sections: {
      personalInfo: hasPersonalInfo,
      objective: hasObjective,
      experiences: hasExperiences,
      education: hasEducation,
      skills: hasSkills,
      certifications: hasCertifications,
    },
  }
}
