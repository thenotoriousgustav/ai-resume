# ARSITEKTUR SISTEM SILAMAR

## AI-Powered Resume Analysis & Cover Letter Generator

---

## 1. OVERVIEW SISTEM

### 1.1 Deskripsi Sistem

SILAMAR (Sistem Intelligent Lamaran) adalah aplikasi web berbasis AI yang dirancang untuk membantu pencari kerja dalam:

- Mengoptimalkan resume berdasarkan deskripsi pekerjaan
- Menghasilkan cover letter yang dipersonalisasi
- Melacak status lamaran pekerjaan
- Menganalisis kesesuaian resume dengan lowongan pekerjaan

### 1.2 Tujuan Sistem

- Meningkatkan efektivitas lamaran kerja melalui analisis AI
- Memberikan rekomendasi perbaikan resume yang berbasis data
- Mengotomatisasi pembuatan cover letter yang relevan
- Menyediakan platform terpusat untuk manajemen lamaran kerja

---

## 2. ARSITEKTUR TINGKAT TINGGI

### 2.1 Architectural Pattern

Sistem menggunakan **Layered Architecture** dengan **Clean Architecture** principles, yang terdiri dari:

```mermaid
graph TB
    subgraph "Client Layer"
        UI[User Interface]
        Components[React Components]
    end

    subgraph "Presentation Layer"
        Pages[Next.js Pages]
        API[API Routes]
        Middleware[Middleware]
    end

    subgraph "Business Logic Layer"
        Features[Feature Modules]
        Hooks[Custom Hooks]
        Utils[Utility Functions]
    end

    subgraph "Data Layer"
        Server[Server Actions]
        Queries[Data Queries]
        Types[Type Definitions]
    end

    subgraph "External Services"
        Supabase[(Supabase Database)]
        OpenAI[OpenAI API]
        Storage[File Storage]
    end

    UI --> Pages
    Components --> Features
    Pages --> API
    API --> Features
    Features --> Server
    Server --> Supabase
    Features --> OpenAI
    Server --> Storage

    style UI fill:#e1f5fe
    style Features fill:#f3e5f5
    style Server fill:#e8f5e8
    style Supabase fill:#fff3e0
```

### 2.2 Technology Stack

| Layer            | Technology                         | Purpose                        |
| ---------------- | ---------------------------------- | ------------------------------ |
| Frontend         | Next.js 14, React, TypeScript      | User interface dan routing     |
| UI Framework     | Tailwind CSS, Radix UI             | Styling dan komponen UI        |
| State Management | React Hooks, Zustand               | State lokal dan global         |
| Backend          | Next.js API Routes, Server Actions | API endpoints dan server logic |
| Database         | PostgreSQL via Supabase            | Data persistence               |
| Authentication   | Supabase Auth                      | User management                |
| AI/ML            | OpenAI GPT-4o-mini                 | Natural language processing    |
| File Storage     | Supabase Storage                   | Resume dan dokumen             |
| Deployment       | Vercel                             | Hosting dan CI/CD              |

---

## 3. ARSITEKTUR KOMPONEN

### 3.1 Frontend Architecture

```mermaid
graph LR
    subgraph "App Router Structure"
        Root[app/]
        Auth[auth/]
        Dashboard[dashboard/]
        API[api/]
    end

    subgraph "Feature Modules"
        AuthFeature[auth/]
        JobTracker[job-tracker/]
        ResumeAnalysis[resume-analysis/]
        CoverLetter[cover-letter/]
        Documents[documents/]
    end

    subgraph "Shared Components"
        UI[ui/]
        DataTable[data-table/]
        Sidebar[sidebar/]
    end

    subgraph "Utilities"
        Hooks[hooks/]
        Lib[lib/]
        Utils[utils/]
    end

    Root --> AuthFeature
    Dashboard --> JobTracker
    Dashboard --> ResumeAnalysis
    Dashboard --> CoverLetter
    Dashboard --> Documents

    JobTracker --> DataTable
    ResumeAnalysis --> UI
    CoverLetter --> UI

    AuthFeature --> Hooks
    JobTracker --> Lib

    style AuthFeature fill:#ffebee
    style JobTracker fill:#e8f5e8
    style ResumeAnalysis fill:#e3f2fd
    style CoverLetter fill:#fce4ec
```

### 3.2 Feature Module Structure

Setiap feature module mengikuti struktur yang konsisten:

```
features/
├── auth/
│   ├── components/
│   ├── actions/
│   └── types/
├── job-tracker/
│   ├── components/
│   ├── schemas/
│   └── types/
├── resume-analysis/
│   ├── components/
│   ├── actions/
│   └── utils/
└── cover-letter/
    ├── components/
    ├── actions/
    └── schemas/
```

---

## 4. ARSITEKTUR DATA

### 4.1 Database Schema

```mermaid
erDiagram
    users {
        uuid id PK
        string email
        string full_name
        timestamp created_at
        timestamp updated_at
    }

    resumes {
        uuid id PK
        uuid user_id FK
        string title
        string description
        string file_name
        string file_type
        integer file_size
        string storage_path
        string storage_url
        text extracted_text
        timestamp created_at
        timestamp updated_at
    }

    job_applications {
        uuid id PK
        uuid user_id FK
        uuid resume_id FK
        string position
        string company
        string location
        text description
        enum job_type
        enum status
        enum priority
        decimal salary
        string currency
        string source_url
        timestamp applied_at
        timestamp created_at
        timestamp updated_at
    }

    resume_analysis {
        uuid id PK
        uuid resume_id FK
        uuid job_application_id FK
        integer match_score
        jsonb suggestions
        jsonb job_title_missing
        array keywords_present
        array keywords_missing
        array keywords_suggestions
        timestamp created_at
        timestamp updated_at
    }

    cover_letters {
        uuid id PK
        uuid job_application_id FK
        text content
        timestamp generated_at
        timestamp created_at
        timestamp updated_at
    }

    users ||--o{ resumes : "owns"
    users ||--o{ job_applications : "creates"
    resumes ||--o{ job_applications : "used_for"
    job_applications ||--o{ resume_analysis : "analyzed"
    job_applications ||--o{ cover_letters : "has"
    resumes ||--o{ resume_analysis : "analyzed"
```

### 4.2 Data Types dan Enums

```typescript
// Job Status Enum
type JobStatus = "applied" | "interview" | "offer" | "rejected" | "accepted"

// Job Priority Enum
type JobPriority = "low" | "medium" | "high"

// Job Type Enum
type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "temporary"
  | "internship"
  | "remote"
  | "hybrid"
  | "freelance"
```

---

## 5. ARSITEKTUR API

### 5.1 API Endpoints Structure

```mermaid
graph TD
    subgraph "API Routes"
        ParsePDF["/api/parse-pdf"]
        ResumeAnalyze["/api/resume-analyze"]
        CoverLetter["/api/cover-letter-generator"]
        ScrapeJob["/api/scrape-job"]
    end

    subgraph "Server Actions"
        JobActions["Job Application Actions"]
        DocumentActions["Document Actions"]
        AnalysisActions["Analysis Actions"]
        AuthActions["Auth Actions"]
    end

    subgraph "External APIs"
        OpenAI["OpenAI API"]
        JobSites["Job Scraping APIs"]
        Storage["Supabase Storage API"]
    end

    ParsePDF --> Storage
    ResumeAnalyze --> OpenAI
    CoverLetter --> OpenAI
    ScrapeJob --> JobSites

    JobActions --> Database[(Database)]
    DocumentActions --> Database
    AnalysisActions --> Database
    AuthActions --> Database

    style ParsePDF fill:#e3f2fd
    style ResumeAnalyze fill:#e8f5e8
    style CoverLetter fill:#fce4ec
    style ScrapeJob fill:#fff3e0
```

### 5.2 API Flow Patterns

#### Resume Analysis Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant OpenAI
    participant DB as Database

    Client->>API: POST /api/resume-analyze
    API->>DB: Get resume & job data
    API->>OpenAI: Analyze compatibility
    OpenAI-->>API: Analysis results
    API->>DB: Store analysis
    API-->>Client: Return recommendations
```

#### Cover Letter Generation Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant OpenAI
    participant DB as Database

    Client->>API: POST /api/cover-letter-generator
    API->>DB: Get user profile & job details
    API->>OpenAI: Generate cover letter
    OpenAI-->>API: Generated content
    API->>DB: Store cover letter
    API-->>Client: Return formatted letter
```

---

## 6. ARSITEKTUR KEAMANAN

### 6.1 Security Layers

```mermaid
graph TB
    subgraph "Client Security"
        CSP[Content Security Policy]
        HTTPS[HTTPS Encryption]
        Auth[Client Authentication]
    end

    subgraph "Application Security"
        Middleware[Auth Middleware]
        Validation[Input Validation]
        CSRF[CSRF Protection]
    end

    subgraph "Data Security"
        RLS[Row Level Security]
        Encryption[Data Encryption]
        Backup[Encrypted Backups]
    end

    subgraph "API Security"
        RateLimit[Rate Limiting]
        APIKeys[API Key Management]
        CORS[CORS Policy]
    end

    Client --> Middleware
    Middleware --> RLS
    Validation --> Encryption
    APIKeys --> OpenAI[External APIs]

    style CSP fill:#ffebee
    style RLS fill:#e8f5e8
    style RateLimit fill:#e3f2fd
```

### 6.2 Authentication & Authorization

- **Authentication**: Supabase Auth dengan OAuth (Google, GitHub)
- **Authorization**: Row Level Security (RLS) policies
- **Session Management**: JWT tokens dengan refresh mechanism
- **API Protection**: Bearer token validation

---

## 7. ARSITEKTUR DEPLOYMENT

### 7.1 Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        DevEnv[Local Development]
        Testing[Unit & Integration Tests]
    end

    subgraph "CI/CD Pipeline"
        GitHub[GitHub Repository]
        Vercel[Vercel Deployment]
        Preview[Preview Deployments]
    end

    subgraph "Production Environment"
        CDN[Vercel Edge Network]
        App[Next.js Application]
        Database[Supabase Database]
        Storage[Supabase Storage]
    end

    subgraph "Monitoring"
        Analytics[Vercel Analytics]
        Logs[Application Logs]
        Alerts[Error Monitoring]
    end

    DevEnv --> GitHub
    GitHub --> Vercel
    Vercel --> CDN
    CDN --> App
    App --> Database
    App --> Storage
    App --> Analytics

    style DevEnv fill:#e8f5e8
    style Vercel fill:#e3f2fd
    style Database fill:#fff3e0
    style Analytics fill:#fce4ec
```

### 7.2 Environment Configuration

```typescript
// Environment Variables
interface Config {
  // Database
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string

  // AI Services
  OPENAI_API_KEY: string
  TOGETHER_AI_API_KEY: string

  // Application
  NEXT_PUBLIC_BASE_URL: string
  NODE_ENV: "development" | "production"
}
```

---

## 8. PERFORMANCE & SCALABILITY

### 8.1 Performance Optimizations

```mermaid
graph LR
    subgraph "Frontend Optimizations"
        SSR[Server-Side Rendering]
        ISR[Incremental Static Regeneration]
        CodeSplit[Code Splitting]
        ImageOpt[Image Optimization]
    end

    subgraph "Caching Strategies"
        CDN[CDN Caching]
        DBCache[Database Query Caching]
        APICache[API Response Caching]
    end

    subgraph "Database Optimizations"
        Indexes[Database Indexes]
        Queries[Optimized Queries]
        Pooling[Connection Pooling]
    end

    SSR --> CDN
    CodeSplit --> CDN
    DBCache --> Queries
    APICache --> Indexes

    style SSR fill:#e3f2fd
    style DBCache fill:#e8f5e8
    style Indexes fill:#fff3e0
```

### 8.2 Scalability Considerations

- **Horizontal Scaling**: Vercel automatic scaling
- **Database Scaling**: Supabase managed PostgreSQL
- **File Storage**: CDN distribution
- **API Rate Limiting**: Per-user limits untuk external APIs

---

## 9. MONITORING & OBSERVABILITY

### 9.1 Monitoring Stack

```mermaid
graph TD
    subgraph "Application Monitoring"
        Metrics[Performance Metrics]
        Errors[Error Tracking]
        Logs[Application Logs]
    end

    subgraph "User Analytics"
        PageViews[Page Analytics]
        UserFlow[User Journey]
        Conversion[Conversion Tracking]
    end

    subgraph "Infrastructure Monitoring"
        Uptime[Uptime Monitoring]
        Response[Response Times]
        Resources[Resource Usage]
    end

    App[Application] --> Metrics
    App --> PageViews
    App --> Uptime

    Metrics --> Dashboard[Monitoring Dashboard]
    PageViews --> Dashboard
    Uptime --> Dashboard

    style Metrics fill:#e3f2fd
    style PageViews fill:#e8f5e8
    style Uptime fill:#fff3e0
```

---

## 10. QUALITY ASSURANCE

### 10.1 Testing Strategy

```mermaid
graph TB
    subgraph "Testing Levels"
        Unit[Unit Tests]
        Integration[Integration Tests]
        E2E[End-to-End Tests]
    end

    subgraph "Quality Gates"
        Lint[ESLint]
        Format[Prettier]
        TypeCheck[TypeScript Check]
        Security[Security Audit]
    end

    subgraph "CI/CD Validation"
        Build[Build Validation]
        Deploy[Deployment Tests]
        Smoke[Smoke Tests]
    end

    Unit --> Build
    Integration --> Deploy
    E2E --> Smoke

    Lint --> Build
    Format --> Build
    TypeCheck --> Build

    style Unit fill:#e8f5e8
    style Lint fill:#e3f2fd
    style Build fill:#fff3e0
```

---

## 11. KESIMPULAN ARSITEKTUR

### 11.1 Keunggulan Arsitektur

1. **Modular Design**: Komponen terpisah untuk maintainability
2. **Scalable**: Dapat berkembang seiring pertumbuhan user
3. **Secure**: Multi-layer security implementation
4. **Performance**: Optimized untuk user experience
5. **Maintainable**: Clean code practices dan documentation

### 11.2 Design Patterns yang Digunakan

- **Repository Pattern**: Data access abstraction
- **Factory Pattern**: AI service initialization
- **Observer Pattern**: Real-time updates
- **Strategy Pattern**: Multiple AI providers support
- **Singleton Pattern**: Database connection management

### 11.3 Future Enhancements

- **Microservices**: Migration ke arsitektur microservices
- **GraphQL**: API layer optimization
- **Machine Learning**: Custom ML models untuk analysis
- **Real-time**: WebSocket untuk live updates
- **Mobile**: React Native mobile application

---

_Dokumentasi ini menjelaskan arsitektur sistem SILAMAR secara komprehensif untuk keperluan skripsi dan pengembangan lebih lanjut._
