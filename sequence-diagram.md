# Sequence Diagram Silamar - PlantUML

## 1. Authentication Flow

```plantuml
@startuml
!theme plain
title Authentication Flow - Sistem Silamar

actor "Job Seeker" as User
participant "Landing Page" as Landing
participant "Auth Page" as Auth
participant "Supabase Auth" as AuthService
participant "Dashboard" as Dashboard

User -> Landing: Visit homepage
Landing -> Landing: Display hero section
User -> Landing: Click "Sign In"
Landing -> Auth: Redirect to /auth

User -> Auth: Enter credentials
Auth -> AuthService: authenticate(email, password)
AuthService -> AuthService: Validate credentials
AuthService -> Auth: Return auth token
Auth -> Dashboard: Redirect to /dashboard
Dashboard -> Dashboard: Load user data
Dashboard -> User: Display dashboard

note right of AuthService
  Supabase handles
  authentication and
  session management
end note

@enduml
```

## 2. Resume Upload and Analysis Flow

```plantuml
@startuml
!theme plain
title Resume Upload and Analysis Flow

actor "Job Seeker" as User
participant "Documents Page" as DocsPage
participant "Upload Component" as Upload
participant "File Storage" as Storage
participant "PDF Parser" as Parser
participant "Database" as DB

User -> DocsPage: Navigate to /documents
DocsPage -> User: Display document list

User -> Upload: Select PDF file
Upload -> Upload: Validate file type
Upload -> Storage: Upload PDF to storage
Storage -> Upload: Return storage URL

Upload -> Parser: Extract text from PDF
Parser -> Parser: Parse PDF content
Parser -> Upload: Return extracted text

Upload -> DB: Save resume metadata
activate DB
DB -> DB: Store resume info
DB -> Upload: Return resume ID
deactivate DB

Upload -> DocsPage: Refresh document list
DocsPage -> User: Show uploaded resume

note right of Parser
  PDF text extraction
  for AI analysis
end note

@enduml
```

## 3. Job Application Management Flow

```plantuml
@startuml
!theme plain
title Job Application Management Flow

actor "Job Seeker" as User
participant "Job Tracker Page" as JobPage
participant "Add Job Form" as AddForm
participant "Job Table" as Table
participant "Database" as DB
participant "Job Detail Drawer" as Drawer

User -> JobPage: Navigate to /job-tracker
JobPage -> DB: getJobApplications()
DB -> JobPage: Return job applications
JobPage -> Table: Display job table

User -> Table: Click "Add Job"
Table -> AddForm: Open add job form

User -> AddForm: Fill job details
AddForm -> AddForm: Validate form data
User -> AddForm: Submit form
AddForm -> DB: addJobApplication(data)
DB -> DB: Save job application
DB -> AddForm: Return success
AddForm -> Table: Refresh table data

User -> Table: Click job row
Table -> Drawer: Open job detail drawer
Drawer -> DB: getJobApplication(id)
DB -> Drawer: Return job details
Drawer -> User: Display job information

User -> Drawer: Edit job details
Drawer -> DB: updateJobApplication(data)
DB -> Drawer: Return updated data
Drawer -> Table: Refresh table

@enduml
```

## 4. Targeted Resume Analysis Flow

```plantuml
@startuml
!theme plain
title Targeted Resume Analysis Flow

actor "Job Seeker" as User
participant "Job Detail" as JobDetail
participant "Targeted Resume Page" as ResumePage
participant "Resume Form" as Form
participant "AI Analysis API" as AI
participant "Database" as DB
participant "Results Display" as Results

User -> JobDetail: Click "Targeted Resume"
JobDetail -> ResumePage: Navigate to /targeted-resume/[id]

ResumePage -> DB: getJobApplication(id)
DB -> ResumePage: Return job data
ResumePage -> Form: Display form with job info

User -> Form: Review/edit job description
User -> Form: Submit for analysis
Form -> AI: POST /api/targeted-resume-analyze
activate AI

AI -> AI: Analyze resume vs job description
AI -> AI: Calculate match score
AI -> AI: Identify missing keywords
AI -> AI: Generate suggestions
AI -> Form: Stream analysis results
deactivate AI

Form -> DB: saveResumeAnalysis(data)
DB -> Form: Confirm save
Form -> Results: Display analysis results

Results -> User: Show match score
Results -> User: Show missing keywords
Results -> User: Show improvement suggestions

note right of AI
  AI streams real-time
  analysis results using
  Vercel AI SDK
end note

@enduml
```

## 5. Cover Letter Generation Flow

```plantuml
@startuml
!theme plain
title Cover Letter Generation Flow

actor "Job Seeker" as User
participant "Job Detail" as JobDetail
participant "Cover Letter Page" as CoverPage
participant "Cover Letter Form" as Form
participant "AI Generation API" as AI
participant "Database" as DB
participant "Cover Letter Result" as Result

User -> JobDetail: Click "Cover Letter"
JobDetail -> CoverPage: Navigate to /cover-letter/[id]

CoverPage -> DB: getJobApplication(id)
CoverPage -> DB: getCoverLetter(id)
DB -> CoverPage: Return job and cover letter data
CoverPage -> Form: Display form with data

User -> Form: Review application details
User -> Form: Click "Generate Cover Letter"
Form -> DB: updateApplication(data)
DB -> Form: Confirm update

Form -> AI: POST /api/cover-letter-generator
activate AI
AI -> AI: Generate personalized cover letter
AI -> Form: Stream generated content
deactivate AI

Form -> DB: saveCoverLetter(content)
DB -> Form: Return saved cover letter
Form -> Result: Display generated content

Result -> User: Show cover letter
User -> Result: Review and edit if needed
User -> Result: Save final version
Result -> DB: updateCoverLetter(content)

note right of AI
  AI generates cover letter
  based on job description
  and resume content
end note

@enduml
```

## 6. Dashboard Overview Flow

```plantuml
@startuml
!theme plain
title Dashboard Overview Flow

actor "Job Seeker" as User
participant "Dashboard Page" as Dashboard
participant "Dashboard Client" as Client
participant "Database" as DB
participant "Stats Component" as Stats
participant "Recent Activities" as Recent

User -> Dashboard: Navigate to /dashboard
Dashboard -> DB: getResumes()
Dashboard -> DB: getJobApplications()

DB -> Dashboard: Return resumes data
DB -> Dashboard: Return job applications data

Dashboard -> Client: Pass data to client component
Client -> Stats: Calculate statistics
Stats -> Stats: Count total resumes
Stats -> Stats: Count job applications by status
Stats -> Client: Return calculated stats

Client -> Recent: Display recent activities
Recent -> Recent: Format recent resumes
Recent -> Recent: Format recent applications

Client -> User: Display dashboard overview
User -> Client: View statistics cards
User -> Client: View recent activities
User -> Client: Click quick actions

Client -> Dashboard: Navigate to feature pages

note right of Stats
  Dashboard shows:
  - Total resumes
  - Job application counts
  - Recent activities
  - Quick action buttons
end note

@enduml
```

## 7. Document Management Flow

```plantuml
@startuml
!theme plain
title Document Management Flow

actor "Job Seeker" as User
participant "Documents Page" as DocsPage
participant "Document List" as DocList
participant "Document Detail" as DocDetail
participant "PDF Viewer" as Viewer
participant "Database" as DB

User -> DocsPage: Navigate to /documents
DocsPage -> DB: getResumes()
DB -> DocsPage: Return resume list
DocsPage -> DocList: Display document grid

User -> DocList: Click document card
DocList -> DocDetail: Navigate to /documents/[id]

DocDetail -> DB: getResume(id)
DB -> DocDetail: Return resume data
DocDetail -> Viewer: Load PDF viewer

Viewer -> Viewer: Render PDF pages
Viewer -> User: Display document content

User -> DocDetail: View document details
User -> DocDetail: Click "Analyze" button
DocDetail -> DocsPage: Navigate to analysis

alternative Delete Document
    User -> DocDetail: Click delete button
    DocDetail -> DocDetail: Show confirmation dialog
    User -> DocDetail: Confirm deletion
    DocDetail -> DB: deleteResume(id)
    DB -> DocDetail: Confirm deletion
    DocDetail -> DocsPage: Navigate back to list
end

@enduml
```

## 8. Complete User Journey Flow

```plantuml
@startuml
!theme plain
title Complete User Journey - Sistem Silamar

actor "Job Seeker" as User
participant "Landing" as Landing
participant "Auth" as Auth
participant "Dashboard" as Dashboard
participant "Documents" as Docs
participant "Job Tracker" as Jobs
participant "AI Services" as AI
participant "Database" as DB

== Authentication ==
User -> Landing: Visit application
Landing -> User: Display landing page
User -> Auth: Sign in/Register
Auth -> DB: Authenticate user
DB -> Dashboard: Redirect after login

== Document Management ==
User -> Docs: Upload resume
Docs -> DB: Store resume data
DB -> Docs: Confirm upload

== Job Application Tracking ==
User -> Jobs: Add job application
Jobs -> DB: Save job data
User -> Jobs: Link resume to job
Jobs -> DB: Update job-resume relation

== AI-Powered Features ==
User -> AI: Request resume analysis
AI -> AI: Analyze resume vs job
AI -> DB: Save analysis results
AI -> User: Display recommendations

User -> AI: Generate cover letter
AI -> AI: Create personalized letter
AI -> DB: Save cover letter
AI -> User: Display generated content

== Dashboard Overview ==
User -> Dashboard: View progress
Dashboard -> DB: Fetch user data
DB -> Dashboard: Return statistics
Dashboard -> User: Show overview

note over User, DB
  Complete workflow from
  authentication to AI-powered
  job application assistance
end note

@enduml
```

---

## Penjelasan Sequence Diagrams untuk Skripsi

### 1. Penjelasan Authentication Flow

**Sequence Diagram Authentication Flow** menggambarkan proses autentikasi pengguna dalam sistem Silamar. Diagram ini menunjukkan alur kerja dari saat pengguna mengunjungi halaman utama hingga berhasil masuk ke dashboard.

**Aktor yang Terlibat:**

- **Job Seeker**: Pengguna yang ingin mengakses sistem
- **Landing Page**: Halaman utama aplikasi
- **Auth Page**: Halaman autentikasi
- **Supabase Auth**: Layanan autentikasi eksternal
- **Dashboard**: Halaman utama setelah login

**Alur Proses:**

1. Pengguna mengunjungi halaman utama dan melihat hero section
2. Pengguna mengklik tombol "Sign In" untuk memulai proses autentikasi
3. Sistem mengarahkan pengguna ke halaman autentikasi (/auth)
4. Pengguna memasukkan kredensial (email dan password)
5. Sistem mengirim data kredensial ke Supabase Auth untuk validasi
6. Supabase Auth memvalidasi kredensial dan mengembalikan token autentikasi
7. Setelah autentikasi berhasil, sistem mengarahkan pengguna ke dashboard
8. Dashboard memuat data pengguna dan menampilkan interface utama

**Keamanan dan Session Management:**
Diagram ini menunjukkan bahwa sistem menggunakan Supabase sebagai provider autentikasi, yang menyediakan keamanan tingkat enterprise dan session management otomatis.

### 2. Penjelasan Resume Upload and Analysis Flow

**Sequence Diagram Resume Upload and Analysis Flow** mendemonstrasikan proses pengunggahan dan pemrosesan dokumen resume dalam sistem. Diagram ini menunjukkan bagaimana sistem menangani file PDF dan mempersiapkannya untuk analisis AI.

**Komponen yang Terlibat:**

- **User**: Pengguna yang mengunggah resume
- **Documents Page**: Interface manajemen dokumen
- **Upload Component**: Komponen pengunggahan file
- **File Storage**: Sistem penyimpanan file
- **PDF Parser**: Parser untuk ekstraksi teks
- **Database**: Basis data untuk metadata

**Tahapan Proses:**

1. **Navigasi**: Pengguna mengakses halaman dokumen dan melihat daftar dokumen yang ada
2. **Seleksi File**: Pengguna memilih file PDF yang akan diunggah
3. **Validasi**: Sistem memvalidasi tipe file untuk memastikan format yang didukung
4. **Upload Storage**: File diunggah ke sistem penyimpanan dan mendapat URL unik
5. **Ekstraksi Teks**: PDF Parser mengekstrak konten teks dari file untuk keperluan analisis AI
6. **Penyimpanan Metadata**: Informasi resume disimpan dalam database termasuk URL storage dan teks terekstrak
7. **Update Interface**: Daftar dokumen diperbarui untuk menampilkan resume yang baru diunggah

**Teknologi yang Digunakan:**
Proses ini mengintegrasikan teknologi cloud storage untuk file management dan PDF parsing library untuk ekstraksi teks otomatis.

### 3. Penjelasan Job Application Management Flow

**Sequence Diagram Job Application Management Flow** mengilustrasikan sistem manajemen aplikasi pekerjaan yang komprehensif, mencakup operasi CRUD (Create, Read, Update, Delete) dan interaksi real-time.

**Entitas Utama:**

- **User**: Pengguna yang mengelola aplikasi pekerjaan
- **Job Tracker Page**: Halaman utama pelacakan pekerjaan
- **Add Job Form**: Form penambahan pekerjaan baru
- **Job Table**: Tabel untuk menampilkan daftar pekerjaan
- **Database**: Penyimpanan data aplikasi pekerjaan
- **Job Detail Drawer**: Panel detail pekerjaan

**Skenario Penggunaan:**

1. **Load Data**: Sistem memuat daftar aplikasi pekerjaan dari database dan menampilkannya dalam tabel
2. **Tambah Pekerjaan**: Pengguna mengklik "Add Job" untuk membuka form penambahan
3. **Input Data**: Pengguna mengisi detail pekerjaan (posisi, perusahaan, status, prioritas)
4. **Validasi dan Simpan**: Form melakukan validasi data dan menyimpannya ke database
5. **Refresh Interface**: Tabel diperbarui untuk menampilkan data terbaru
6. **View Detail**: Pengguna dapat mengklik baris untuk membuka detail dalam drawer
7. **Edit Data**: Pengguna dapat mengedit informasi pekerjaan melalui drawer
8. **Real-time Update**: Perubahan langsung disimpan dan direfleksikan dalam interface

**Keunggulan Sistem:**
Diagram menunjukkan sistem yang responsif dengan update real-time dan interface yang user-friendly untuk manajemen data pekerjaan.

### 4. Penjelasan Targeted Resume Analysis Flow

**Sequence Diagram Targeted Resume Analysis Flow** mendemonstrasikan fitur unggulan sistem berupa analisis resume berbasis AI yang disesuaikan dengan deskripsi pekerjaan tertentu.

**Komponen AI Analysis:**

- **Resume Form**: Interface input dan konfigurasi analisis
- **AI Analysis API**: Endpoint untuk pemrosesan AI
- **Results Display**: Tampilan hasil analisis

**Proses Analisis Mendalam:**

1. **Inisiasi**: Pengguna mengakses fitur analisis melalui detail pekerjaan
2. **Load Context**: Sistem memuat data aplikasi pekerjaan yang akan dianalisis
3. **Review Input**: Pengguna dapat meninjau dan mengedit deskripsi pekerjaan
4. **Trigger Analysis**: Sistem mengirim request ke AI Analysis API
5. **AI Processing**:
   - Membandingkan resume dengan job description
   - Menghitung skor kesesuaian (match score)
   - Mengidentifikasi keyword yang hilang
   - Menghasilkan saran perbaikan spesifik
6. **Streaming Results**: Hasil analisis di-stream secara real-time menggunakan Vercel AI SDK
7. **Persistence**: Hasil analisis disimpan untuk referensi masa depan
8. **Visualization**: Data ditampilkan dalam format yang mudah dipahami

**Teknologi AI:**
Sistem menggunakan model AI untuk natural language processing yang dapat memahami konteks pekerjaan dan memberikan analisis yang relevan dan actionable.

### 5. Penjelasan Cover Letter Generation Flow

**Sequence Diagram Cover Letter Generation Flow** menunjukkan proses otomatisasi pembuatan surat lamaran yang dipersonalisasi menggunakan teknologi AI generatif.

**Tahapan Generasi Content:**

1. **Context Loading**: Sistem memuat data aplikasi pekerjaan dan surat lamaran yang sudah ada (jika ada)
2. **Data Review**: Pengguna meninjau dan dapat mengedit informasi aplikasi
3. **Content Generation**: AI menghasilkan surat lamaran yang dipersonalisasi berdasarkan:
   - Job description
   - Konten resume
   - Informasi perusahaan
   - Template yang sesuai
4. **Real-time Streaming**: Konten di-generate secara streaming untuk pengalaman yang responsif
5. **Content Management**: Pengguna dapat meninjau, mengedit, dan menyimpan hasil

**Personalisasi AI:**
Sistem AI menganalisis job description dan resume untuk menciptakan surat lamaran yang:

- Relevan dengan posisi yang dilamar
- Menyoroti kualifikasi yang sesuai
- Menggunakan tone dan struktur yang profesional
- Disesuaikan dengan budaya perusahaan

### 6. Penjelasan Dashboard Overview Flow

**Sequence Diagram Dashboard Overview Flow** mengilustrasikan sistem dashboard yang memberikan ringkasan komprehensif aktivitas dan statistik pengguna.

**Komponen Dashboard:**

- **Dashboard Client**: Komponen utama yang mengatur tampilan
- **Stats Component**: Penghitung statistik otomatis
- **Recent Activities**: Tampilan aktivitas terbaru

**Informasi yang Disajikan:**

1. **Statistik Resume**: Jumlah total resume yang telah diunggah
2. **Status Aplikasi**: Breakdown aplikasi pekerjaan berdasarkan status (applied, interview, rejected, accepted)
3. **Aktivitas Terbaru**: Daftar resume dan aplikasi pekerjaan terbaru
4. **Quick Actions**: Tombol akses cepat ke fitur-fitur utama

**Real-time Analytics:**
Dashboard melakukan kalkulasi statistik secara dinamis dan menyajikan data dalam format yang visual dan informatif.

### 7. Penjelasan Document Management Flow

**Sequence Diagram Document Management Flow** menggambarkan sistem manajemen dokumen yang komprehensif dengan fitur viewing, editing, dan deletion.

**Fitur Manajemen:**

1. **Document Grid**: Tampilan grid untuk browsing dokumen
2. **PDF Viewer**: Viewer terintegrasi untuk melihat konten dokumen
3. **Document Operations**: Fungsi view, analyze, dan delete
4. **Confirmation Dialogs**: Konfirmasi untuk operasi destruktif

**User Experience:**
Sistem menyediakan interface yang intuitif untuk manajemen dokumen dengan preview real-time dan navigasi yang smooth.

### 8. Penjelasan Complete User Journey Flow

**Sequence Diagram Complete User Journey Flow** menyajikan gambaran end-to-end pengalaman pengguna dalam sistem Silamar, menunjukkan integrasi semua fitur utama.

**Journey Phases:**

1. **Authentication Phase**: Proses masuk ke sistem
2. **Document Management Phase**: Pengelolaan resume dan dokumen
3. **Job Application Tracking Phase**: Pelacakan dan manajemen aplikasi pekerjaan
4. **AI-Powered Features Phase**: Penggunaan fitur analisis dan generasi AI
5. **Dashboard Overview Phase**: Monitoring progress dan statistik

**Value Proposition:**
Diagram ini mendemonstrasikan bagaimana sistem Silamar memberikan value end-to-end dari upload resume hingga optimasi aplikasi pekerjaan menggunakan AI, menciptakan workflow yang seamless dan efisien untuk job seekers.

**Integrasi Teknologi:**
Journey ini menunjukkan integrasi berbagai teknologi modern termasuk AI/ML, cloud storage, real-time data processing, dan responsive UI/UX untuk menciptakan pengalaman pengguna yang superior dalam pencarian kerja.
