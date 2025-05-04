import {
  Asterisk,
  File,
  GalleryVerticalEnd,
  SquareTerminal,
  User,
} from "lucide-react"

export const navigation = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Resume Analyzer",
          url: "/resume",
        },
        {
          title: "Cover Letter",
          url: "/cover-letter",
        },
        {
          title: "Career Path",
          url: "/career-path",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      name: "Documents",
      url: "/documents",
      icon: File,
    },
    {
      name: "Job Tracker",
      url: "/job-tracker",
      icon: Asterisk,
    },
  ],
}
