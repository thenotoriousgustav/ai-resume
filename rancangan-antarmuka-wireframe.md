# 3.4.5 Rancangan Antarmuka Wireframe

## Pengertian Wireframe

Rancangan antarmuka diperlukan dalam proses pembuatan website, dimana tampilan website ini digunakan sebagai interface agar user dapat berinteraksi secara langsung. Wireframe merupakan blueprint atau sketsa visual yang menggambarkan struktur dan tata letak elemen-elemen pada halaman web sebelum tahap pengembangan dimulai.

Wireframe berfungsi sebagai panduan untuk developer dan designer dalam membangun antarmuka yang user-friendly, konsisten, dan sesuai dengan kebutuhan fungsional sistem. Dalam konteks aplikasi Silamar, wireframe dirancang untuk mendukung interaksi pengguna dalam mengelola lamaran kerja, menganalisis resume, dan menghasilkan cover letter yang disesuaikan.

## Tujuan Pembuatan Wireframe

1. **Visualisasi Struktur**: Memberikan gambaran jelas tentang hierarki informasi dan navigasi
2. **Komunikasi Tim**: Memfasilitasi diskusi antara stakeholder, designer, dan developer
3. **Efisiensi Pengembangan**: Mengidentifikasi masalah usability sebelum implementasi
4. **Konsistensi UI/UX**: Memastikan pengalaman pengguna yang konsisten di seluruh aplikasi
5. **Fokus Fungsional**: Menekankan pada fungsi daripada estetika visual

## Prinsip Desain Wireframe Silamar

### 1. Clarity (Kejelasan)

- Informasi disajikan dengan hierarki yang jelas
- Penggunaan white space yang optimal
- Typography yang mudah dibaca

### 2. Consistency (Konsistensi)

- Pattern navigasi yang seragam
- Placement komponen yang konsisten
- Terminologi yang standar

### 3. Accessibility (Aksesibilitas)

- Kontras warna yang memadai
- Size elemen yang sesuai standar
- Support untuk screen reader

### 4. Responsiveness (Responsivitas)

- Adaptasi layout untuk berbagai ukuran layar
- Touch-friendly untuk mobile device
- Progressive enhancement

## Wireframe Halaman Utama Aplikasi Silamar

### 1. Landing Page

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO Silamar]              [Login] [Get Started]           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              TRANSFORM YOUR JOB SEARCH                     │
│           AI-Powered Resume & Cover Letter                 │
│                                                             │
│        [Upload Resume] [Try Demo] [Learn More]             │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Resume    │ │ Job Tracker │ │Cover Letter │          │
│  │  Analysis   │ │  Management │ │  Generator  │          │
│  │ [Icon/Img]  │ │ [Icon/Img]  │ │ [Icon/Img]  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│                  [Features Section]                        │
│                  [Testimonials]                            │
│                  [Footer]                                  │
└─────────────────────────────────────────────────────────────┘
```

**Deskripsi Komponen:**

- **Header**: Logo, navigasi utama, dan CTA login/register
- **Hero Section**: Value proposition utama dengan CTA primer
- **Feature Cards**: 3 fitur utama aplikasi
- **Content Sections**: Penjelasan detail fitur dan testimoni
- **Footer**: Link navigasi, kontak, dan informasi legal

### 2. Dashboard Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Dashboard                    [Profile] [⚙️]  │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  Welcome back, [User Name]!                  │
│ Job Tracker │                                               │
│ Resume      │  ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│ Cover Letter│  │  Total  │ │Applied  │ │Response │         │
│ Documents   │  │   Jobs  │ │  Jobs   │ │  Rate   │         │
│ Settings    │  │   [24]  │ │  [12]   │ │  [8%]   │         │
│             │  └─────────┘ └─────────┘ └─────────┘         │
│             │                                               │
│             │  Recent Applications                          │
│             │  ┌─────────────────────────────────────────┐   │
│             │  │ Company A - Frontend Dev   [Applied]   │   │
│             │  │ Company B - Backend Dev    [Interview] │   │
│             │  │ Company C - Fullstack     [Rejected]   │   │
│             │  └─────────────────────────────────────────┘   │
│             │                                               │
│             │  Quick Actions                                │
│             │  [Upload Resume] [Add Job] [Generate Cover]   │
└─────────────┴───────────────────────────────────────────────┘
```

**Deskripsi Komponen:**

- **Sidebar Navigation**: Menu utama aplikasi dengan hierarki yang jelas
- **Header Bar**: Breadcrumb, profil pengguna, dan pengaturan
- **Stats Cards**: Metrik penting dalam format visual yang mudah dipahami
- **Recent Activity**: Daftar aktivitas terbaru dengan status indicator
- **Quick Actions**: Tombol aksi cepat untuk fungsi utama

### 3. Job Tracker Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Job Tracker              [Add Job] [Export]  │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  [Search: Company/Position] [Filter ▼] [🔄]  │
│ Job Tracker │                                               │
│ Resume      │  ┌─ Job Applications ─────────────────────────┐ │
│ Cover Letter│  │                                           │ │
│ Documents   │  │ ☑️ Company    Position     Status   Date  │ │
│ Settings    │  │ ────────────────────────────────────────  │ │
│             │  │ □ TechCorp   Frontend Dev  Applied  12/01 │ │
│             │  │ □ StartupXY  Backend Dev   Interview 11/28│ │
│             │  │ □ BigTech    Fullstack    Rejected  11/25 │ │
│             │  │ □ LocalCo    UI/UX Dev    Pending   11/20 │ │
│             │  │                                           │ │
│             │  │ [< Previous] Page 1 of 5 [Next >]        │ │
│             │  └───────────────────────────────────────────┘ │
│             │                                               │
│             │  Bulk Actions: [Delete] [Export] [Archive]    │
└─────────────┴───────────────────────────────────────────────┘
```

**Deskripsi Komponen:**

- **Search & Filter Bar**: Pencarian real-time dan filter lanjutan
- **Data Table**: Tabel responsif dengan sorting, pagination, dan bulk actions
- **Status Indicators**: Visual status untuk setiap aplikasi
- **Action Buttons**: Operasi CRUD untuk manajemen data
- **Pagination**: Navigasi halaman untuk dataset besar

### 4. Resume Upload & Analysis Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Resume Analysis                              │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  Step 1: Upload Resume                        │
│ Job Tracker │                                               │
│ Resume      │  ┌─ Upload Area ─────────────────────────────┐ │
│ Cover Letter│  │                                           │ │
│ Documents   │  │       📄 Drag & drop PDF here            │ │
│ Settings    │  │         or [Browse Files]                 │ │
│             │  │                                           │ │
│             │  │    Supported: PDF (max 10MB)             │ │
│             │  └───────────────────────────────────────────┘ │
│             │                                               │
│             │  Step 2: Job Description (Optional)           │
│             │  ┌─────────────────────────────────────────┐   │
│             │  │ Paste job description here...           │   │
│             │  │                                         │   │
│             │  │                                         │   │
│             │  └─────────────────────────────────────────┘   │
│             │                                               │
│             │  [Cancel] [Previous] [Analyze Resume →]       │
└─────────────┴───────────────────────────────────────────────┘
```

### 5. Analysis Results Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Analysis Results                             │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  Resume Analysis for [filename.pdf]          │
│ Job Tracker │                                               │
│ Resume      │  ┌─ Overall Score ──────────────────────────┐ │
│ Cover Letter│  │                                          │ │
│ Documents   │  │        ● 78/100                          │ │
│ Settings    │  │     ████████░░ Good Match                │ │
│             │  └──────────────────────────────────────────┘ │
│             │                                               │
│             │  ┌─ Detailed Analysis ─────────────────────┐   │
│             │  │ ✅ Strong Points:                       │   │
│             │  │ • Technical skills match               │   │
│             │  │ • Relevant experience                  │   │
│             │  │                                        │   │
│             │  │ ⚠️  Areas for Improvement:               │   │
│             │  │ • Add more keywords                    │   │
│             │  │ • Quantify achievements                │   │
│             │  └────────────────────────────────────────┘   │
│             │                                               │
│             │  [Download Report] [Generate Cover Letter]    │
└─────────────┴───────────────────────────────────────────────┘
```

### 6. Cover Letter Generator Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Cover Letter Generator                       │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  Generate Personalized Cover Letter          │
│ Job Tracker │                                               │
│ Resume      │  ┌─ Job Information ───────────────────────┐   │
│ Cover Letter│  │ Company: [TechCorp Ltd.]               │   │
│ Documents   │  │ Position: [Frontend Developer]        │   │
│ Settings    │  │ Job URL: [https://...]                │   │
│             │  └────────────────────────────────────────┘   │
│             │                                               │
│             │  ┌─ Template Selection ───────────────────┐    │
│             │  │ ○ Professional  ○ Creative  ○ Technical│    │
│             │  └────────────────────────────────────────┘    │
│             │                                               │
│             │  ┌─ Tone & Style ─────────────────────────┐    │
│             │  │ Tone: [Formal ▼]                      │    │
│             │  │ Length: [Medium ▼]                    │    │
│             │  │ Focus: [Technical Skills ▼]          │    │
│             │  └────────────────────────────────────────┘    │
│             │                                               │
│             │  [Cancel] [Preview] [Generate Cover Letter]   │
└─────────────┴───────────────────────────────────────────────┘
```

### 7. Cover Letter Preview Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Cover Letter Preview                         │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  Generated Cover Letter                       │
│ Job Tracker │                                               │
│ Resume      │  ┌─ Preview ────────────────────────────────┐ │
│ Cover Letter│  │                                          │ │
│ Documents   │  │ Dear Hiring Manager,                     │ │
│ Settings    │  │                                          │ │
│             │  │ I am writing to express my interest...   │ │
│             │  │                                          │ │
│             │  │ My experience in frontend development... │ │
│             │  │                                          │ │
│             │  │ [Full letter content preview]           │ │
│             │  │                                          │ │
│             │  │ Sincerely,                               │ │
│             │  │ [Your Name]                              │ │
│             │  └──────────────────────────────────────────┘ │
│             │                                               │
│             │  ┌─ Actions ──────────────────────────────┐    │
│             │  │ [Edit] [Regenerate] [Download PDF]    │    │
│             │  │ [Copy Text] [Save to Documents]       │    │
│             │  └────────────────────────────────────────┘    │
└─────────────┴───────────────────────────────────────────────┘
```

### 8. Documents Management Page

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ [Silamar] │ Documents                   [Upload] [New]   │
├─────────────┼───────────────────────────────────────────────┤
│             │                                               │
│ Dashboard   │  [Search documents...] [Filter ▼] [Grid/List]│
│ Job Tracker │                                               │
│ Resume      │  ┌─ Documents ──────────────────────────────┐ │
│ Cover Letter│  │                                          │ │
│ Documents   │  │ 📄 Resume_v2.pdf        Modified: 12/01  │ │
│ Settings    │  │ 📝 Cover_Letter_Tech.docx Modified: 11/28│ │
│             │  │ 📄 Portfolio.pdf        Modified: 11/25  │ │
│             │  │ 📝 Cover_Letter_Bank.docx Modified: 11/20│ │
│             │  │                                          │ │
│             │  │ ┌─ Folders ─────────────────────────────┐│ │
│             │  │ │ 📁 Resumes                           ││ │
│             │  │ │ 📁 Cover Letters                     ││ │
│             │  │ │ 📁 Certificates                      ││ │
│             │  │ │ 📁 Portfolio                         ││ │
│             │  │ └──────────────────────────────────────┘│ │
│             │  └──────────────────────────────────────────┘ │
│             │                                               │
│             │  Selected: [Delete] [Download] [Share]        │
└─────────────┴───────────────────────────────────────────────┘
```

## Desain Responsif

### Mobile Layout Considerations

```
┌─────────────────┐
│ ☰ Silamar   👤  │
├─────────────────┤
│                 │
│  Dashboard      │
│                 │
│ ┌─────────────┐ │
│ │   Stats     │ │
│ │   Cards     │ │
│ └─────────────┘ │
│                 │
│  Recent Apps    │
│ ┌─────────────┐ │
│ │ Company A   │ │
│ │ Status      │ │
│ └─────────────┘ │
│                 │
│ [Quick Actions] │
│                 │
│ [Bottom Nav]    │
└─────────────────┘
```

### Tablet Layout

```
┌───────────────────────────────────┐
│ [Logo] Silamar      [Profile] [⚙️] │
├─────────────┬─────────────────────┤
│ Dashboard   │                     │
│ Job Tracker │   Main Content      │
│ Resume      │     Area            │
│ Cover Letter│                     │
│ Documents   │                     │
│             │                     │
└─────────────┴─────────────────────┘
```

## Komponen UI yang Digunakan

### 1. Navigation Components

- **Sidebar**: Navigasi utama dengan collapse/expand
- **Header**: Breadcrumb dan user actions
- **Mobile Menu**: Hamburger menu untuk mobile

### 2. Data Display Components

- **Data Table**: Dengan sorting, filtering, dan pagination
- **Cards**: Untuk statistik dan informasi overview
- **Progress Bars**: Untuk menampilkan score dan progress

### 3. Input Components

- **File Upload**: Drag & drop dengan preview
- **Forms**: Input fields dengan validation
- **Search & Filter**: Real-time search dengan advanced filters

### 4. Feedback Components

- **Loading States**: Skeleton screens dan spinners
- **Success/Error Messages**: Toast notifications
- **Empty States**: Ilustrasi untuk data kosong

## Interaksi dan Navigasi

### 1. User Flow Navigation

```
Landing → Auth → Dashboard → Job Tracker
                      ↓           ↓
               Cover Letter ← Resume Upload
                      ↓           ↓
                 Documents ← Analysis Results
```

### 2. State Management

- **Loading States**: Feedback visual saat proses berlangsung
- **Error Handling**: Pesan error yang informatif dengan action recovery
- **Success Feedback**: Konfirmasi aksi berhasil dilakukan

### 3. Accessibility Features

- **Keyboard Navigation**: Tab order yang logis
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: Memenuhi standar WCAG 2.1 AA
- **Focus Indicators**: Visual focus yang jelas

## Kesimpulan

Wireframe yang dirancang untuk aplikasi Silamar mengutamakan:

1. **User Experience**: Navigasi yang intuitif dan alur kerja yang logis
2. **Functional Priority**: Fitur utama mudah diakses dan prominent
3. **Scalability**: Layout yang dapat berkembang seiring penambahan fitur
4. **Responsive Design**: Adaptasi optimal untuk berbagai perangkat
5. **Accessibility**: Inklusif untuk semua pengguna

Rancangan wireframe ini menjadi blueprint untuk implementasi antarmuka yang user-friendly, efisien, dan mendukung tujuan utama aplikasi Silamar dalam membantu pengguna mengelola proses pencarian kerja dengan teknologi AI.
