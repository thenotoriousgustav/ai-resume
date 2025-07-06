# 3.4.5 Rancangan Antarmuka Wireframe

## Pendahuluan

Rancangan antarmuka diperlukan dalam proses pembuatan website, dimana tampilan website ini digunakan sebagai interface agar user dapat berinteraksi secara langsung. Dalam pengembangan aplikasi Silamar, rancangan antarmuka memegang peranan penting untuk memastikan pengalaman pengguna yang optimal dan efisien.

## Pentingnya Rancangan Antarmuka

### 1. User Experience (UX)

Rancangan antarmuka yang baik memungkinkan pengguna untuk dengan mudah memahami dan menggunakan fitur-fitur yang tersedia dalam aplikasi Silamar. Interface yang intuitif mengurangi learning curve dan meningkatkan produktivitas pengguna.

### 2. Efisiensi Interaksi

Dengan rancangan yang tepat, pengguna dapat melakukan tugas-tugas seperti upload resume, analisis resume, dan pembuatan cover letter dengan langkah-langkah yang minimal dan jelas.

### 3. Konsistensi Visual

Wireframe membantu memastikan konsistensi visual di seluruh aplikasi, sehingga pengguna memiliki pengalaman yang seragam di setiap halaman.

### 4. Panduan Pengembangan

Wireframe berfungsi sebagai blueprint bagi developer untuk mengimplementasikan design dengan akurat sesuai dengan kebutuhan fungsional.

## Wireframe Aplikasi Silamar

### 1. Halaman Landing Page

```
+----------------------------------------------------------+
|  [LOGO SILAMAR]           [LOGIN] [SIGN UP]             |
+----------------------------------------------------------+
|                                                          |
|        SILAMAR - Smart Resume & Cover Letter            |
|              AI-Powered Job Application Assistant       |
|                                                          |
|                [GET STARTED FREE]                       |
|                                                          |
|  +----------------+  +----------------+  +-------------+ |
|  |   AI Resume    |  | Cover Letter   |  | Job Tracker | |
|  |   Analysis     |  |   Generator    |  |   System    | |
|  |   [ICON]       |  |   [ICON]       |  |   [ICON]    | |
|  +----------------+  +----------------+  +-------------+ |
|                                                          |
|              "Optimize your job applications            |
|               with AI-powered insights"                 |
|                                                          |
+----------------------------------------------------------+
```

**Penjelasan:**

- Header sederhana dengan branding dan aksi utama (Login/Sign Up)
- Hero section dengan value proposition yang jelas
- Feature highlights untuk memperkenalkan fitur utama
- Call-to-action yang prominent untuk mendorong registrasi

### 2. Halaman Dashboard

```
+----------------------------------------------------------+
| [☰] SILAMAR      [🔔] [👤] [Profile Name] [⚙️] [Logout] |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  MAIN CONTENT AREA                    |
| | Dashboard   | |  +----------------------------------+  |
| | Job Tracker | |  |        Welcome, [Name]           |  |
| | Resume      | |  |                                  |  |
| | Cover Letter| |  |  Quick Stats:                    |  |
| | Documents   | |  |  📄 Resumes: 3                   |  |
| |             | |  |  📝 Cover Letters: 5             |  |
| +-------------+ |  |  🎯 Job Applications: 12         |  |
|                 |  |                                  |  |
|                 |  |  Recent Activities:              |  |
|                 |  |  +----------------------------+  |  |
|                 |  |  | • Resume analyzed          |  |  |
|                 |  |  | • Cover letter generated   |  |  |
|                 |  |  | • Job application added    |  |  |
|                 |  |  +----------------------------+  |  |
|                 |  +----------------------------------+  |
+----------------------------------------------------------+
```

**Penjelasan:**

- Layout dengan sidebar navigation untuk akses mudah ke semua fitur
- Dashboard memberikan overview statistik dan aktivitas terbaru
- Header dengan notifikasi dan profile management
- Responsive design untuk berbagai ukuran layar

### 3. Halaman Job Tracker

```
+----------------------------------------------------------+
| [☰] SILAMAR                            Job Tracker      |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  [+ Add New Job] [🔍 Search] [Filter] |
| | Dashboard   | |                                        |
| | Job Tracker*| |  +----------------------------------+  |
| | Resume      | |  | Job Title | Company | Status | 📅 |  |
| | Cover Letter| |  +----------------------------------+  |
| | Documents   | |  | Software Developer | TechCorp |    |  |
| +-------------+ |  | Applied | 2024-01-15           |    |  |
|                 |  +----------------------------------+  |
|                 |  | Product Manager | StartupXYZ |     |  |
|                 |  | Interview | 2024-01-10        |    |  |
|                 |  +----------------------------------+  |
|                 |  | Data Analyst | BigData Inc |      |  |
|                 |  | Rejected | 2024-01-05         |    |  |
|                 |  +----------------------------------+  |
|                 |  |          [Previous] [1][2] [Next] |  |
|                 |  +----------------------------------+  |
+----------------------------------------------------------+
```

**Penjelasan:**

- Tabel data dengan kemampuan sorting dan filtering
- Action buttons untuk menambah job application baru
- Status indicators yang jelas untuk setiap aplikasi
- Pagination untuk mengelola data dalam jumlah besar

### 4. Halaman Resume Upload & Analysis

```
+----------------------------------------------------------+
| [☰] SILAMAR                         Targeted Resume     |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  Step 1: Upload Resume                |
| | Dashboard   | |  +----------------------------------+  |
| | Job Tracker | |  |                                  |  |
| | Resume*     | |  |     [📄 Drag & Drop PDF]        |  |
| | Cover Letter| |  |       or [Browse File]           |  |
| | Documents   | |  |                                  |  |
| +-------------+ |  |   Supported: PDF, DOC, DOCX     |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |  Step 2: Job Description              |
|                 |  +----------------------------------+  |
|                 |  | [Paste job description here...] |  |
|                 |  |                                | |  |
|                 |  |                                | |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |         [Analyze Resume]               |
+----------------------------------------------------------+
```

**Penjelasan:**

- Multi-step process yang mudah diikuti
- Drag & drop interface untuk upload file
- Text area untuk job description
- Clear call-to-action untuk memulai analisis

### 5. Halaman Hasil Analisis Resume

```
+----------------------------------------------------------+
| [☰] SILAMAR                      Analysis Results       |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  📊 Resume Analysis Report            |
| | Dashboard   | |  +----------------------------------+  |
| | Job Tracker | |  | Match Score: 85%     [🟢 Good]   |  |
| | Resume*     | |  +----------------------------------+  |
| | Cover Letter| |                                        |
| | Documents   | |  📈 Strengths:                        |
| +-------------+ |  • Technical skills alignment          |
|                 |  • Relevant work experience           |
|                 |  • Education background               |
|                 |                                        |
|                 |  ⚠️ Areas for Improvement:            |
|                 |  • Missing keyword: "Agile"           |
|                 |  • Lack of quantified achievements    |
|                 |  • Skills section needs updating      |
|                 |                                        |
|                 |  💡 Recommendations:                   |
|                 |  • Add specific metrics to experience |
|                 |  • Include relevant certifications    |
|                 |                                        |
|                 |  [Download Improved Resume] [New Analysis] |
+----------------------------------------------------------+
```

**Penjelasan:**

- Visual indicators untuk match score
- Kategorisasi feedback (Strengths, Improvements, Recommendations)
- Actionable insights untuk improvement
- Download option untuk improved resume

### 6. Halaman Cover Letter Generator

```
+----------------------------------------------------------+
| [☰] SILAMAR                     Cover Letter Generator  |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  Step 1: Select Resume                |
| | Dashboard   | |  +----------------------------------+  |
| | Job Tracker | |  | [📄 Resume_2024.pdf]      [Select]|  |
| | Resume      | |  | [📄 Resume_Tech.pdf]      [Select]|  |
| | Cover Letter*|  +----------------------------------+  |
| | Documents   | |                                        |
| +-------------+ |  Step 2: Job Information              |
|                 |  +----------------------------------+  |
|                 |  | Company: [________________]       |  |
|                 |  | Position: [_______________]       |  |
|                 |  | Job Description:                  |  |
|                 |  | [Paste description here...]      |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |  Step 3: Personal Touch               |
|                 |  +----------------------------------+  |
|                 |  | Tone: [Professional ▼]           |  |
|                 |  | Length: [Medium ▼]               |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |         [Generate Cover Letter]        |
+----------------------------------------------------------+
```

**Penjelasan:**

- Step-by-step wizard interface
- Resume selection dari yang sudah diupload
- Form input untuk job details
- Customization options untuk tone dan length

### 7. Halaman Preview Cover Letter

```
+----------------------------------------------------------+
| [☰] SILAMAR                    Cover Letter Preview     |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  +----------------------------------+  |
| | Dashboard   | |  |        Generated Cover Letter   |  |
| | Job Tracker | |  |                                  |  |
| | Resume      | |  | Dear Hiring Manager,             |  |
| | Cover Letter*|  |                                  |  |
| | Documents   | |  | I am writing to express my       |  |
| +-------------+ |  | strong interest in the Software  |  |
|                 |  | Developer position at TechCorp...  |
|                 |  |                                  |  |
|                 |  | [Full cover letter content]     |  |
|                 |  |                                  |  |
|                 |  | Sincerely,                       |  |
|                 |  | [Your Name]                      |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |  [📝 Edit] [📄 Download] [🔄 Regenerate] |
|                 |                                        |
|                 |         [Save to Documents]            |
+----------------------------------------------------------+
```

**Penjelasan:**

- Preview area dengan generated content
- Action buttons untuk edit, download, dan regenerate
- Option untuk save ke documents untuk future reference

### 8. Halaman Documents Management

```
+----------------------------------------------------------+
| [☰] SILAMAR                         My Documents        |
+----------------------------------------------------------+
| SIDEBAR         |                                        |
| +-------------+ |  [📤 Upload] [🔍 Search] [🗂️ Sort]   |
| | Dashboard   | |                                        |
| | Job Tracker | |  +----------------------------------+  |
| | Resume      | |  | 📄 Type | Name | Date | Actions   |  |
| | Cover Letter| |  +----------------------------------+  |
| | Documents*  | |  | 📄 Resume | Tech_Resume.pdf |     |  |
| +-------------+ |  | 01/15/2024 | [👁️][📥][🗑️]       |  |
|                 |  +----------------------------------+  |
|                 |  | 📝 Cover Letter | TechCorp_CL.pdf||
|                 |  | 01/14/2024 | [👁️][📥][🗑️]       |  |
|                 |  +----------------------------------+  |
|                 |  | 📄 Resume | Marketing_Resume.pdf||
|                 |  | 01/10/2024 | [👁️][📥][🗑️]       |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |  📁 Folders:                          |
|                 |  • Resumes (3)                        |
|                 |  • Cover Letters (5)                  |
|                 |  • Certificates (2)                   |
+----------------------------------------------------------+
```

**Penjelasan:**

- File management interface dengan upload capability
- Table view dengan file information dan actions
- Folder organization untuk better file management
- Quick actions untuk view, download, dan delete

## Prinsip Design Interface

### 1. Simplicity (Kesederhanaan)

- Interface yang clean dan tidak cluttered
- Fokus pada fungsi utama tanpa distraksi
- Minimal cognitive load untuk pengguna

### 2. Consistency (Konsistensi)

- Penggunaan warna, typography, dan spacing yang konsisten
- Pattern interaction yang sama di seluruh aplikasi
- Consistent navigation dan layout structure

### 3. Accessibility (Aksesibilitas)

- Color contrast yang memadai untuk readability
- Keyboard navigation support
- Screen reader friendly elements

### 4. Responsive Design

- Optimized untuk desktop, tablet, dan mobile
- Adaptive layout berdasarkan screen size
- Touch-friendly interface untuk mobile devices

### 5. Feedback & Error Handling

- Clear success dan error messages
- Loading states untuk AI processing
- Validation feedback untuk form inputs

## Kesimpulan

Rancangan antarmuka wireframe untuk aplikasi Silamar dirancang dengan mempertimbangkan user experience yang optimal, efisiensi workflow, dan kemudahan penggunaan. Setiap halaman memiliki tujuan yang jelas dan mendukung user journey dari upload resume hingga generate cover letter yang optimal. Wireframe ini akan menjadi panduan dalam implementasi UI/UX yang akan memberikan pengalaman terbaik bagi pengguna dalam mengoptimalkan aplikasi kerja mereka dengan bantuan AI.
