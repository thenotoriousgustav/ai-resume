# Activity Diagram Silamar - PlantUML

## 1. Main User Flow Activity Diagram

```plantuml
@startuml
!theme plain
title Sistem Silamar - Main User Flow

|User|
start
:Visit landing page;
:Click "Sign In";
:Enter credentials;

|System|
:Authenticate user;

if (Authentication successful?) then (yes)
  :Redirect to dashboard;
  :Load user data;
  :Display statistics;

  |User|
  repeat
    :Select action;

    if (Action type?) then (Upload Resume)
      :Navigate to documents page;
      :Select PDF file;

      |System|
      :Upload file to storage;
      :Extract text content;
      :Save resume to database;
      :Display upload success;

    elseif (Add Job Application)
      |User|
      :Navigate to job tracker;
      :Fill job application form;

      |System|
      :Validate form data;
      :Save job application;
      :Update job table;

    elseif (Analyze Resume)
      |User|
      :Select job application;
      :Navigate to targeted resume;

      |AI System|
      :Analyze resume vs job description;
      :Calculate match score;
      :Generate suggestions;

      |System|
      :Save analysis results;
      :Display results to user;

    elseif (Generate Cover Letter)
      |User|
      :Select job application;
      :Navigate to cover letter page;

      |AI System|
      :Generate personalized cover letter;

      |System|
      :Display generated content;
      :Save cover letter;

    else (View Documents)
      |System|
      :Load document list;
      :Display documents;
    endif

    |User|
  repeat while (Continue using system?) is (yes)

  :Logout;

  |System|
  :Clear session;

else (no)
  |System|
  :Display error message;
  :Return to login page;
endif

stop

@enduml
```

## 2. Resume Upload Flow

```plantuml
@startuml
!theme plain
title Resume Upload Activity

|User|
start
:Navigate to documents page;
:Click "Upload Resume";
:Select PDF file from device;

|System|
if (File is valid PDF?) then (yes)
  :Upload file to storage;
  :Extract text content from PDF;
  :Save resume metadata to database;
  :Display success message;
  :Update document list;

else (no)
  :Display error message;
  :Prompt to select valid PDF;
endif

stop

@enduml
```

## 3. Targeted Resume Analysis Flow

```plantuml
@startuml
!theme plain
title Targeted Resume Analysis Activity

|User|
start
:Navigate to job tracker;
:Select existing job application;
:Click "Targeted Resume" action;
:Navigate to analysis page;

|System|
:Load job application data;
:Load linked resume data;
:Display job details form;

|User|
:Review job details;
if (Need to update job info?) then (yes)
  :Edit job description;

  |System|
  :Save updated job information;
else (no)
endif

|User|
:Click "Generate Analysis";

|AI System|
:Analyze resume vs job description;
:Calculate compatibility score;
:Identify missing keywords;
:Identify present keywords;
:Generate improvement suggestions;
:Generate job title recommendations;

|System|
:Save analysis to database;
:Display analysis results;
note right
  - Match score percentage
  - Missing keywords
  - Present keywords
  - Improvement suggestions
  - Job title recommendations
end note

|User|
:Review analysis results;
if (Satisfied with analysis?) then (yes)
  :Use results for resume improvement;
else (no)
  :Click "Regenerate Analysis";

  |AI System|
  :Re-analyze with updated parameters;

  |System|
  :Update analysis results;
endif

stop

@enduml
```

## 4. Job Application Management Flow

```plantuml
@startuml
!theme plain
title Job Application Management Activity

|User|
start
:Navigate to job tracker;

|System|
:Load existing job applications;
:Display job table;

|User|
if (User action?) then (Add New Job)
  :Click "Add Job Application";
  :Fill job details form;
  note right
    - Position title
    - Company name
    - Location
    - Salary range
    - Status
    - Priority
    - Job type
    - Description
  end note
  :Submit form;

  |System|
  :Validate input data;
  :Save to database;
  :Refresh job table;

elseif (Edit Existing Job)
  |User|
  :Click job row in table;

  |System|
  :Open job detail drawer;
  :Load job information;

  |User|
  :Edit job information;

  |System|
  :Auto-save changes on blur;
  :Update database;

elseif (Link Resume)
  |User|
  :Open documents tab in drawer;
  :Select resume from dropdown;

  |System|
  :Update job-resume relation;
  :Save changes;

else (Delete Job)
  |User|
  :Click delete button;
  :Confirm deletion;

  |System|
  :Remove from database;
  :Update job list;
endif

|System|
:Display updated job applications;

stop

@enduml
```

## 5. AI Cover Letter Generation Flow

```plantuml
@startuml
!theme plain
title AI Cover Letter Generation Activity

|User|
start
:Select job application;
:Click "Cover Letter" action;
:Navigate to cover letter page;

|System|
:Load job application data;
:Display job details form;

|User|
if (Need to update job info?) then (yes)
  :Edit job details;

  |System|
  :Save updated information;
else (no)
endif

|User|
:Click "Generate Cover Letter";

|AI System|
:Process request;
fork
  :Analyze job description;
fork again
  :Extract resume content;
fork again
  :Apply personalization rules;
end fork
:Generate cover letter content;
:Stream generated text;

|System|
:Display generated cover letter;

|User|
if (User satisfied with content?) then (yes)
  |System|
  :Save cover letter to database;
  :Display success message;
else (no)
  |User|
  :Edit content manually;

  |System|
  :Save edited version;
endif

|User|
:Option to regenerate or export;

stop

@enduml
```

## 6. Dashboard Overview Flow

```plantuml
@startuml
!theme plain
title Dashboard Overview Activity

|User|
start
:Log into system;
:Navigate to dashboard;

|System|
fork
  :Load user resumes;
  :Count total resumes;
fork again
  :Load job applications;
  :Calculate status statistics;
fork again
  :Load recent activities;
  :Format activity data;
end fork

:Display dashboard cards;
note right
  - Total resumes
  - Job applications count
  - Interview status
  - Application statistics
end note

:Display recent activities;
note right
  - Recent resumes uploaded
  - Recent job applications
  - Quick action buttons
end note

|User|
:Click quick actions;

|System|
if (Quick action selected?) then (Upload Resume)
  :Navigate to documents page;
elseif (Add Job Application)
  :Navigate to job tracker;
elseif (View All Applications)
  :Navigate to job tracker;
else (View All Resumes)
  :Navigate to documents page;
endif

stop

@enduml
```

## 7. Complete System Activity Flow

```plantuml
@startuml
!theme plain
title Complete Sistem Silamar Activity Flow

|User|
start
:Visit landing page;
:Login/Register;

|System|
:Authenticate user;
:Load dashboard data;

|User|
:View dashboard overview;

repeat

  if (User chooses?) then (Document Management)
    |User|
    :Upload/manage resumes;
    |System|
    :Process PDF files;
    :Extract text content;
    :Store in database;

  elseif (Job Tracking)
    |User|
    :Add/edit job applications;
    |System|
    :Save job data;
    :Update application status;

  elseif (AI Analysis)
    |User|
    :Request resume analysis;
    |AI System|
    :Analyze resume vs job;
    :Calculate match score;
    :Generate suggestions;
    |System|
    :Save analysis results;

  elseif (Cover Letter)
    |User|
    :Request cover letter generation;
    |AI System|
    :Generate personalized content;
    |System|
    :Save generated letter;

  else (View Reports)
    |User|
    :View statistics and reports;
    |System|
    :Generate analytics data;
  endif

repeat while (Continue using system?)

|User|
:Logout;

|System|
:Clear session;

stop

@enduml
```
