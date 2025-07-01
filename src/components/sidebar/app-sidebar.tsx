"use client"

import { UserMetadata } from "@supabase/supabase-js"
import {
  Asterisk,
  File,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"

import { NavProjects } from "@/components/sidebar/nav-projects"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"

type AppSidebarProps = {
  user: UserMetadata
} & React.ComponentProps<typeof Sidebar>

const navigation = {
  teams: [
    {
      name: "Silamar",
      logo: GalleryVerticalEnd,
      plan: "Smart Resume",
    },
  ],
  navMain: [
    {
      title: "Job Tracker",
      url: "/",
      icon: Asterisk,
      isActive: true,
      items: [
        {
          title: "Resume",
          url: "/documents",
        },
        {
          title: "Cover Letter",
          url: "/cover-letter",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
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

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/" className="cursor-pointer">
          <TeamSwitcher teams={navigation.teams} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={navigation.navMain} /> */}
        <NavProjects projects={navigation.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
