"use client"

import { Edit, Settings, Sparkles } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { EditorPanel } from "./editor-panel"
import LayoutStylePanel from "./layout-style-panel"
import type { ResumeBuilderData } from "./types"

type TabType = "ai-review" | "editor" | "layout-style"

interface ResumeTabsPanelProps {
  handleUpdateField: <K extends keyof ResumeBuilderData>(
    field: K,
    value: ResumeBuilderData[K]
  ) => void
  isSaving: boolean
  lastSaved: Date | null
  saveError: string | null
}

export function ResumeTabsPanel({
  handleUpdateField,
  isSaving,
  lastSaved,
  saveError,
}: ResumeTabsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("editor")

  const tabs = [
    {
      id: "ai-review" as TabType,
      label: "AI Review",
      icon: Sparkles,
    },
    {
      id: "editor" as TabType,
      label: "Editor",
      icon: Edit,
    },
    {
      id: "layout-style" as TabType,
      label: "Layout & Style",
      icon: Settings,
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "ai-review":
        return (
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">AI Review</h3>
            <p className="text-gray-600">
              AI-powered resume analysis and suggestions will be implemented
              here.
            </p>
          </div>
        )
      case "editor":
        return (
          <EditorPanel
            handleUpdateField={handleUpdateField}
            isSaving={isSaving}
            lastSaved={lastSaved}
            saveError={saveError}
          />
        )
      case "layout-style":
        return <LayoutStylePanel />
      default:
        return null
    }
  }

  return (
    <Card className="h-full">
      {/* Tab Headers */}
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-none border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{renderTabContent()}</div>
    </Card>
  )
}
