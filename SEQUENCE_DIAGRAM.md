# Sequence Diagram - Silamar Application

## 1. User Authentication Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant auth as Auth Service
    participant supabase as Supabase
    participant db as Database

    Note over user,db: User Authentication Process
    user->>web: Access application
    web->>auth: Check authentication status
    auth->>supabase: Validate session

    alt No valid session
        supabase->>auth: No session found
        auth->>web: Redirect to login
        web->>user: Show login page
        user->>web: Enter credentials
        web->>auth: Submit login request
        auth->>supabase: Authenticate user
        supabase->>db: Verify credentials
        db->>supabase: Return user data
        supabase->>auth: Authentication result

        alt Authentication successful
            auth->>web: Set session & redirect
            web->>user: Show dashboard
        else Authentication failed
            auth->>web: Show error message
            web->>user: Display login error
        end
    else Valid session exists
        supabase->>auth: Session valid
        auth->>web: User authenticated
        web->>user: Show dashboard
    end
```

## 2. Job Tracking & Scraping Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant jobAPI as Job Scrape API
    participant scraper as Web Scraper
    participant parser as Job Parser
    participant db as Database

    Note over user,db: Job Tracking Process
    user->>web: Add new job opportunity
    web->>user: Show job form
    user->>web: Submit job URL/details
    web->>jobAPI: POST /api/scrape-job

    alt Job URL provided
        jobAPI->>scraper: Scrape job posting
        scraper->>parser: Parse job content
        parser->>jobAPI: Return structured data
    else Manual entry
        jobAPI->>parser: Process manual input
        parser->>jobAPI: Validate job data
    end

    jobAPI->>db: Store job information
    db->>jobAPI: Confirm storage
    jobAPI->>web: Return job data
    web->>user: Show updated job list

    Note over user,db: Job Status Updates
    user->>web: Update application status
    web->>db: Update job record
    db->>web: Confirm update
    web->>user: Show status change
```

## 3. Resume Analysis & Generation Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant uploadAPI as Upload API
    participant pdfAPI as PDF Parse API
    participant resumeAPI as Resume Analyze API
    participant ai as AI Service
    participant db as Database

    Note over user,db: Targeted Resume Creation
    user->>web: Upload current resume
    web->>uploadAPI: POST resume file
    uploadAPI->>pdfAPI: Parse PDF content
    pdfAPI->>db: Store parsed text

    user->>web: Select target job
    web->>resumeAPI: POST /api/resume-analyze
    resumeAPI->>db: Get job requirements
    resumeAPI->>db: Get user resume data
    resumeAPI->>ai: Analyze job-resume match

    ai->>resumeAPI: Return optimization suggestions
    resumeAPI->>db: Store analysis results
    resumeAPI->>web: Return recommendations
    web->>user: Show targeted resume suggestions

    user->>web: Generate optimized resume
    web->>resumeAPI: Request resume generation
    resumeAPI->>ai: Generate tailored content
    ai->>resumeAPI: Return optimized resume
    resumeAPI->>db: Store generated resume
    resumeAPI->>web: Return downloadable resume
    web->>user: Provide download link
```

## 4. Cover Letter Generation Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant coverAPI as Cover Letter API
    participant ai as AI Service
    participant db as Database

    Note over user,db: AI-Powered Cover Letter Generation
    user->>web: Request cover letter
    web->>user: Show cover letter form
    user->>web: Submit job details & preferences
    web->>coverAPI: POST /api/cover-letter-generator

    coverAPI->>db: Get user profile data
    coverAPI->>db: Get job information
    coverAPI->>ai: Generate personalized cover letter

    ai->>coverAPI: Return generated content
    coverAPI->>db: Store cover letter
    coverAPI->>web: Return formatted letter
    web->>user: Display cover letter preview

    user->>web: Edit/customize letter
    web->>coverAPI: Update cover letter
    coverAPI->>db: Save modifications
    coverAPI->>web: Confirm changes
    web->>user: Show updated letter

    user->>web: Download/export letter
    web->>coverAPI: Generate export format
    coverAPI->>web: Return downloadable file
    web->>user: Provide download
```

## 5. Document Management Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant docAPI as Document API
    participant storage as File Storage
    participant db as Database

    Note over user,db: Document Management System
    user->>web: Access documents page
    web->>docAPI: GET user documents
    docAPI->>db: Query user files
    db->>docAPI: Return file metadata
    docAPI->>web: Return document list
    web->>user: Display documents

    user->>web: Upload new document
    web->>docAPI: POST document file
    docAPI->>storage: Store file
    storage->>docAPI: Return file URL
    docAPI->>db: Save file metadata
    db->>docAPI: Confirm storage
    docAPI->>web: Return success response
    web->>user: Show updated document list

    user->>web: Download document
    web->>docAPI: Request file download
    docAPI->>storage: Get file URL
    storage->>docAPI: Return secure URL
    docAPI->>web: Provide download link
    web->>user: Download file
```

## 6. Dashboard Analytics Flow

```mermaid
sequenceDiagram
    participant user as User
    participant web as Web Browser
    participant dashboard as Dashboard API
    participant analytics as Analytics Service
    participant db as Database

    Note over user,db: Dashboard Data Aggregation
    user->>web: Access dashboard
    web->>dashboard: GET dashboard data

    par Job Statistics
        dashboard->>db: Get job applications count
        db->>dashboard: Return job stats
    and Resume Analytics
        dashboard->>db: Get resume performance
        db->>dashboard: Return resume metrics
    and Activity Timeline
        dashboard->>db: Get recent activities
        db->>dashboard: Return activity data
    end

    dashboard->>analytics: Process statistics
    analytics->>dashboard: Return formatted metrics
    dashboard->>web: Return dashboard data
    web->>user: Display analytics dashboard
```
