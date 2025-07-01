import React from "react"

import { HeroSection } from "@/features/home/components/hero-section"
import NavbarSection from "@/features/home/components/navbar-section"

export default function LandingPage() {
  return (
    <div>
      <NavbarSection />
      <HeroSection />
    </div>
  )
}
