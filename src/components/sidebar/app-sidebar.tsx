"use client"

import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navigation } from "@/config/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigation.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigation.navMain} />
        <NavProjects projects={navigation.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigation.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
