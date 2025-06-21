"use client"

import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import type { ResumeBuilderData } from "./types"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontSize: 10,
    lineHeight: 1.4,
    color: "#000000", // Default black color
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    color: "#000000",
  },
  contactItem: {
    marginRight: 15,
    color: "#000000",
  },
  section: {
    marginBottom: 15,
    color: "#000000",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  company: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "500",
  },
  dateRange: {
    fontSize: 9,
    color: "#000000",
  },
  description: {
    fontSize: 9,
    color: "#000000",
    marginTop: 4,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  institution: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "500",
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    backgroundColor: "#F5F5F5",
    color: "#000000",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 3,
    fontSize: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  certificationItem: {
    marginBottom: 10,
  },
  certificationName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  certificationIssuer: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "500",
  },
  certificationDate: {
    fontSize: 9,
    color: "#000000",
  },
})

interface ResumePDFDocumentProps {
  data: ResumeBuilderData
}

export function ResumePDFDocument({ data }: ResumePDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalInfo.fullName || "Your Name"}
          </Text>
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>
                {data.personalInfo.location}
              </Text>
            )}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>
                {data.personalInfo.linkedin}
              </Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>
                {data.personalInfo.website}
              </Text>
            )}
          </View>
        </View>

        {/* Objective Section */}
        {data.objective && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.objective}</Text>
          </View>
        )}

        {/* Experience Section */}
        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>
                      {exp.company} • {exp.location}
                    </Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {exp.startDate} -{" "}
                    {exp.isCurrentRole ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.degree}>
                      {edu.degree} {edu.field}
                    </Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    {edu.gpa && (
                      <Text style={styles.description}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                  <Text style={styles.dateRange}>
                    {edu.startDate} -{" "}
                    {edu.isCurrently ? "Present" : edu.endDate}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {Array.from(
              new Set(data.skills.map((skill) => skill.category))
            ).map((category: string) => (
              <View key={category} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{category}:</Text>
                <View style={styles.skillsContainer}>
                  {data.skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Text key={skill.id} style={styles.skillItem}>
                        {skill.name}
                      </Text>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={styles.certificationItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    <Text style={styles.certificationIssuer}>
                      {cert.issuer}
                    </Text>
                    {cert.credentialId && (
                      <Text style={styles.description}>
                        Credential ID: {cert.credentialId}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.certificationDate}>
                      Issued: {cert.issueDate}
                    </Text>
                    {cert.expirationDate && (
                      <Text style={styles.certificationDate}>
                        Expires: {cert.expirationDate}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

// Function to generate and download PDF
export async function downloadResumePDF(
  data: ResumeBuilderData,
  filename?: string
) {
  const doc = <ResumePDFDocument data={data} />
  const pdfBlob = await pdf(doc).toBlob()

  // Create download link
  const url = URL.createObjectURL(pdfBlob)
  const link = document.createElement("a")
  link.href = url
  link.download =
    filename ||
    `${data.personalInfo.fullName || "Resume"}_${new Date().toISOString().split("T")[0]}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
