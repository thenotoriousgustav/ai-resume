# Class Diagram - Silamar Database Schema

## Mermaid Class Diagram

```mermaid
classDiagram
    class JobApplication {
        +String id
        +String position
        +String company
        +String location
        +String country
        +String description
        +JobType job_type
        +JobStatus status
        +JobPriority priority
        +String user_id
        +String resume_id
        +Number salary
        +String currency
        +String source_url
        +DateTime applied_at
        +DateTime created_at
        +DateTime updated_at
    }

    class Resume {
        +String id
        +String title
        +String description
        +String file_name
        +String file_type
        +Number file_size
        +String storage_path
        +String storage_url
        +String extracted_text
        +Boolean is_active
        +String user_id
        +DateTime created_at
        +DateTime updated_at
    }

    class CoverLetter {
        +String id
        +String content
        +String job_application_id
        +DateTime generated_at
        +DateTime created_at
        +DateTime updated_at
    }

    class TargetedResumeAnalysis {
        +String id
        +String job_application_id
        +String resume_id
        +Number match_score
        +String[] keywords_present
        +String[] keywords_missing
        +String[] keywords_suggestions
        +Json job_title_missing
        +Json suggestions
        +DateTime created_at
        +DateTime updated_at
    }

    class JobStatus {
        <<enumeration>>
        applied
        interview
        offer
        rejected
        accepted
    }

    class JobPriority {
        <<enumeration>>
        low
        medium
        high
    }

    class JobType {
        <<enumeration>>
        full_time
        part_time
        contract
        temporary
        internship
        remote
        hybrid
        freelance
    }

    %% Relationships
    JobApplication ||--o| Resume : "resume_id"
    JobApplication ||--|| CoverLetter : "has"
    JobApplication ||--|| TargetedResumeAnalysis : "analyzed_by"
    Resume ||--|| TargetedResumeAnalysis : "analyzed"

    JobApplication --> JobStatus : "status"
    JobApplication --> JobPriority : "priority"
    JobApplication --> JobType : "job_type"

    %% Notes
    note for JobApplication "Main entity representing a job application\nwith all relevant job details"
    note for Resume "User's resume documents\nwith extracted text for analysis"
    note for CoverLetter "Generated cover letters\nfor specific job applications"
    note for TargetedResumeAnalysis "AI analysis results comparing\nresume with job requirements"
```

## Entity Relationships

### Primary Entities

1. **JobApplication** - Central entity representing a job application

   - Contains job details (position, company, location, salary, etc.)
   - Links to user's resume and generates analysis/cover letter

2. **Resume** - User's resume documents

   - Stores file metadata and extracted text
   - Can be linked to multiple job applications

3. **CoverLetter** - Generated cover letters

   - One-to-one relationship with job applications
   - Contains AI-generated content based on job requirements

4. **TargetedResumeAnalysis** - AI analysis results
   - Analyzes match between resume and job requirements
   - Provides keywords analysis and improvement suggestions

### Enumerations

1. **JobStatus** - Application status tracking
2. **JobPriority** - User-defined priority levels
3. **JobType** - Employment type categorization

### Key Relationships

- **JobApplication ↔ Resume**: Many-to-one (optional)

  - A job application can reference one resume
  - A resume can be used for multiple applications

- **JobApplication ↔ CoverLetter**: One-to-one

  - Each job application can have one cover letter

- **JobApplication ↔ TargetedResumeAnalysis**: One-to-one

  - Each job application can have one analysis

- **Resume ↔ TargetedResumeAnalysis**: One-to-many
  - A resume can be analyzed against multiple job applications

## TypeScript Type Definitions

Based on the schema, several TypeScript types are defined:

### Base Database Types

- `DbJobApplication` - Direct mapping to job_applications table
- `DbResume` - Direct mapping to resumes table
- `DbCoverLetter` - Direct mapping to cover_letters table
- `DbTargetedResumeAnalysis` - Direct mapping to targeted_resume_analysis table

### Extended Types

- `JobApplication` - JobApplication with resume relation
- `JobApplicationLimited` - JobApplication with limited resume data
- `JobApplicationWithResumes` - JobApplication with array of resumes
- `JobApplicationTableData` - Simplified data for table display

### Enum Types

- `JobApplicationStatus` - Application status values
- `JobApplicationPriority` - Priority level values
- `JobType` - Employment type values

---

## Penjelasan Class Diagram untuk Skripsi

### 1. Overview Arsitektur Database

**Class Diagram Sistem Silamar** menggambarkan struktur database dan relasi antar entitas dalam sistem manajemen aplikasi pekerjaan berbasis AI. Diagram ini menunjukkan empat entitas utama yang saling berinteraksi untuk menyediakan fitur-fitur core aplikasi.

**Desain Database** mengikuti prinsip normalisasi untuk menghindari redundansi data dan memastikan integritas referensial. Setiap entitas memiliki primary key berupa UUID yang unik dan foreign key untuk membangun relasi antar tabel.

### 2. Penjelasan Detail Entitas Utama

#### 2.1 JobApplication (Aplikasi Pekerjaan)

**JobApplication** merupakan entitas sentral dalam sistem yang merepresentasikan sebuah aplikasi pekerjaan yang dibuat oleh pengguna.

**Atribut Utama:**

- **Identifikasi**: `id` (UUID), `user_id` (foreign key ke user)
- **Informasi Pekerjaan**: `position`, `company`, `location`, `country`
- **Deskripsi**: `description` (job description lengkap)
- **Status dan Prioritas**: `status` (enum), `priority` (enum)
- **Tipe Pekerjaan**: `job_type` (enum)
- **Informasi Finansial**: `salary`, `currency`
- **Referensi**: `source_url` (link ke posting pekerjaan)
- **Relasi**: `resume_id` (optional foreign key ke Resume)
- **Timestamp**: `applied_at`, `created_at`, `updated_at`

**Fungsi dalam Sistem:**
Entitas ini berfungsi sebagai pusat data untuk melacak setiap aplikasi pekerjaan, menyimpan semua informasi relevan, dan menjadi basis untuk analisis AI dan generasi cover letter.

#### 2.2 Resume (Dokumen Resume)

**Resume** menyimpan informasi dokumen resume pengguna beserta metadata yang diperlukan untuk analisis AI.

**Atribut Utama:**

- **Identifikasi**: `id` (UUID), `user_id` (foreign key)
- **Metadata File**: `file_name`, `file_type`, `file_size`
- **Storage**: `storage_path`, `storage_url`
- **Content**: `extracted_text` (teks terekstrak untuk analisis AI)
- **Informasi**: `title`, `description`
- **Status**: `is_active` (boolean untuk soft delete)
- **Timestamp**: `created_at`, `updated_at`

**Teknologi Integrasi:**
Resume terhubung dengan cloud storage untuk penyimpanan file PDF dan sistem ekstraksi teks untuk keperluan analisis AI.

#### 2.3 CoverLetter (Surat Lamaran)

**CoverLetter** menyimpan surat lamaran yang dihasilkan oleh AI untuk aplikasi pekerjaan tertentu.

**Atribut Utama:**

- **Identifikasi**: `id` (UUID)
- **Konten**: `content` (teks surat lamaran lengkap)
- **Relasi**: `job_application_id` (foreign key ke JobApplication)
- **Timestamp**: `generated_at`, `created_at`, `updated_at`

**AI Integration:**
Entitas ini menyimpan hasil generasi AI yang mempertimbangkan job description, resume content, dan template surat lamaran profesional.

#### 2.4 TargetedResumeAnalysis (Analisis Resume Tertarget)

**TargetedResumeAnalysis** menyimpan hasil analisis AI yang membandingkan resume dengan requirement pekerjaan tertentu.

**Atribut Analisis:**

- **Identifikasi**: `id` (UUID)
- **Relasi**: `job_application_id`, `resume_id`
- **Skor**: `match_score` (persentase kesesuaian)
- **Analisis Keywords**:
  - `keywords_present` (keywords yang ada di resume)
  - `keywords_missing` (keywords yang hilang)
  - `keywords_suggestions` (saran keywords)
- **Analisis Mendalam**:
  - `job_title_missing` (JSON dengan saran job title)
  - `suggestions` (JSON dengan saran perbaikan detail)
- **Timestamp**: `created_at`, `updated_at`

**Machine Learning Integration:**
Entitas ini menyimpan output dari model AI yang melakukan Natural Language Processing untuk analisis semantic antara resume dan job description.

### 3. Penjelasan Enumerasi

#### 3.1 JobStatus (Status Aplikasi)

**Enumerasi JobStatus** mendefinisikan tahapan dalam proses aplikasi pekerjaan:

- **applied**: Status awal setelah aplikasi dikirim
- **interview**: Tahap wawancara atau assessment
- **offer**: Mendapat tawaran pekerjaan
- **rejected**: Aplikasi ditolak
- **accepted**: Aplikasi diterima dan offer diterima

**Workflow Management:**
Enumerasi ini memungkinkan pelacakan progress aplikasi dan memberikan insights untuk dashboard analytics.

#### 3.2 JobPriority (Prioritas)

**Enumerasi JobPriority** untuk kategorisasi prioritas aplikasi:

- **low**: Prioritas rendah
- **medium**: Prioritas sedang
- **high**: Prioritas tinggi

**User Experience:**
Membantu pengguna dalam mengorganisir dan memprioritaskan aplikasi pekerjaan mereka.

#### 3.3 JobType (Tipe Pekerjaan)

**Enumerasi JobType** mengkategorisasi jenis employment:

- **full_time**: Pekerjaan penuh waktu
- **part_time**: Pekerjaan paruh waktu
- **contract**: Kontrak jangka waktu tertentu
- **temporary**: Pekerjaan sementara
- **internship**: Magang
- **remote**: Kerja remote
- **hybrid**: Kombinasi remote dan office
- **freelance**: Pekerjaan freelance

### 4. Analisis Relasi Antar Entitas

#### 4.1 JobApplication ↔ Resume (Many-to-One Optional)

**Kardinalitas**: Satu resume dapat digunakan untuk banyak aplikasi pekerjaan, tetapi satu aplikasi pekerjaan hanya menggunakan satu resume (atau tidak ada).

**Business Logic**:

- Pengguna dapat membuat aplikasi pekerjaan tanpa resume (draft mode)
- Satu resume dapat di-reuse untuk multiple aplikasi
- Fleksibilitas untuk mengganti resume yang digunakan

#### 4.2 JobApplication ↔ CoverLetter (One-to-One)

**Kardinalitas**: Setiap aplikasi pekerjaan memiliki maksimal satu cover letter.

**Design Rationale**:

- Cover letter bersifat spesifik untuk satu pekerjaan
- Memungkinkan regenerasi cover letter untuk aplikasi yang sama
- Optimasi storage dengan menghindari duplikasi

#### 4.3 JobApplication ↔ TargetedResumeAnalysis (One-to-One)

**Kardinalitas**: Setiap kombinasi job application dan resume memiliki satu analisis.

**AI Workflow**:

- Analisis dilakukan ketika resume di-link ke job application
- Hasil analisis disimpan untuk performa dan audit trail
- Memungkinkan re-analisis ketika job description berubah

#### 4.4 Resume ↔ TargetedResumeAnalysis (One-to-Many)

**Kardinalitas**: Satu resume dapat dianalisis terhadap banyak job applications.

**Scalability**:

- Efisiensi dalam re-analisis resume yang sama
- Memungkinkan comparison analysis antar pekerjaan
- Historical tracking untuk improvement resume

### 5. Keunggulan Arsitektur Database

#### 5.1 Normalisasi dan Integritas Data

**Third Normal Form (3NF)**: Database telah dinormalisasi untuk menghindari anomali insert, update, dan delete.

**Referential Integrity**: Foreign key constraints memastikan konsistensi data antar tabel.

#### 5.2 Scalability dan Performance

**UUID Primary Keys**: Menggunakan UUID untuk distributed system compatibility dan security.

**Indexing Strategy**: Foreign keys dan frequently queried columns dapat diindex untuk performance optimization.

#### 5.3 Flexibility dan Extensibility

**JSON Fields**: Penggunaan JSON untuk data kompleks (`job_title_missing`, `suggestions`) memberikan fleksibilitas schema.

**Soft Delete**: Boolean `is_active` pada Resume memungkinkan soft delete untuk audit trail.

#### 5.4 AI/ML Integration Ready

**Text Extraction**: Field `extracted_text` pada Resume siap untuk processing AI.

**Analysis Storage**: Struktur TargetedResumeAnalysis mendukung complex AI output dengan format yang terstruktur.

### 6. Implementasi TypeScript Integration

#### 6.1 Type Safety

Database schema di-mapping ke TypeScript types untuk compile-time type checking dan better developer experience.

#### 6.2 ORM Integration

Struktur yang kompatibel dengan modern ORM seperti Prisma atau TypeORM untuk type-safe database operations.

#### 6.3 API Contract

TypeScript types berfungsi sebagai contract antara frontend dan backend, memastikan konsistensi data flow.

### 7. Security dan Privacy Considerations

#### 7.1 Data Isolation

Setiap entitas memiliki `user_id` untuk memastikan data isolation antar pengguna.

#### 7.2 Sensitive Data Handling

Resume content disimpan sebagai extracted text, bukan file binary, untuk optimasi AI processing namun tetap menjaga privacy.

#### 7.3 Audit Trail

Timestamp fields (`created_at`, `updated_at`) memungkinkan audit trail untuk compliance dan debugging.

Arsitektur database ini dirancang untuk mendukung sistem yang scalable, maintainable, dan secure dengan fokus pada integrasi AI/ML untuk meningkatkan pengalaman pengguna dalam pencarian kerja.
