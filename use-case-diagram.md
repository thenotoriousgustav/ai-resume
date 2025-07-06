# Use Case Diagram Silamar - Mermaid.js

## Use Case Diagram Utama

```plantuml
@startuml
!theme plain
title Sistem Silamar - Use Case Diagram

left to right direction

actor "Job Seeker" as User
actor "AI System" as AI

rectangle "Sistem Silamar" {
  usecase "Login/Register" as UC1
  usecase "Upload Resume" as UC2
  usecase "View Documents" as UC3
  usecase "Manage Job Applications" as UC4
  usecase "Search & Filter Jobs" as UC5
  usecase "Generate Targeted\nResume Analysis" as UC6
  usecase "Generate Cover Letter" as UC7
  usecase "View Dashboard" as UC8
}

' User relationships
User --> UC1
User --> UC2
User --> UC3
User --> UC4
User --> UC5
User --> UC6
User --> UC7
User --> UC8

' AI System relationships
AI --> UC6
AI --> UC7

' Dependencies
UC6 ..> UC2 : <<requires>>
UC6 ..> UC4 : <<requires>>
UC7 ..> UC2 : <<requires>>
UC7 ..> UC4 : <<requires>>

note right of UC6
  AI menganalisis resume
  terhadap job description
  dan memberikan saran
end note

note right of UC7
  AI membuat cover letter
  yang disesuaikan dengan
  job application
end note

@enduml
```

## Deskripsi Use Cases

### Login/Register

**Aktor**: Job Seeker  
**Deskripsi**: User melakukan autentikasi untuk mengakses sistem Silamar

### Upload Resume

**Aktor**: Job Seeker  
**Deskripsi**: User mengunggah file resume dalam format PDF untuk dianalisis sistem

### View Documents

**Aktor**: Job Seeker  
**Deskripsi**: User melihat dan mengelola dokumen resume yang telah diunggah

### Manage Job Applications

**Aktor**: Job Seeker  
**Deskripsi**: User menambah, mengedit, dan menghapus data aplikasi pekerjaan

### Search & Filter Jobs

**Aktor**: Job Seeker  
**Deskripsi**: User mencari dan memfilter aplikasi pekerjaan berdasarkan kriteria tertentu

### Generate Targeted Resume Analysis

**Aktor**: Job Seeker, AI System  
**Deskripsi**: Sistem AI menganalisis resume terhadap job description dan memberikan saran perbaikan

### Generate Cover Letter

**Aktor**: Job Seeker, AI System  
**Deskripsi**: Sistem AI membuat cover letter yang disesuaikan dengan job application

### View Dashboard

**Aktor**: Job Seeker  
**Deskripsi**: User melihat ringkasan statistik aplikasi pekerjaan dan aktivitas terbaru

## Aktor dalam Sistem

### 👤 Job Seeker

- **Peran**: Pengguna utama aplikasi Silamar
- **Tanggung jawab**: Mengelola resume, melacak aplikasi pekerjaan, menggunakan fitur AI

### 🤖 AI System

- **Peran**: Sistem kecerdasan buatan
- **Tanggung jawab**: Menganalisis resume, memberikan saran, dan generate cover letter

## Services dalam Sistem

### Authentication

- Mengelola login dan registrasi user
- Verifikasi identitas pengguna

### Document Management

- Mengelola upload dan storage resume
- Ekstraksi teks dari PDF

### Job Management

- Mengelola data aplikasi pekerjaan
- CRUD operations untuk job applications

### AI Analysis

- Analisis resume menggunakan AI
- Generate cover letter otomatis
- Perhitungan match score

### Dashboard

- Menampilkan statistik dan laporan
- Interface untuk quick actions
