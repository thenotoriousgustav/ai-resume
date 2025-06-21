"use client"

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Edit, GripVertical, Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface SectionItem {
  id: string
  title: string
  enabled: boolean
  locked?: boolean
}

interface SortableSectionItemProps {
  section: SectionItem
  onToggle: (id: string) => void
}

const defaultSections: SectionItem[] = [
  { id: "personal", title: "Personal Information", enabled: true },
  { id: "objective", title: "Professional Summary", enabled: true },
  { id: "experience", title: "Work Experience", enabled: true },
  { id: "education", title: "Education", enabled: true },
  { id: "skills", title: "Skills", enabled: true },
  { id: "certifications", title: "Certifications", enabled: true },
  { id: "projects", title: "Projects", enabled: false },
  { id: "volunteer", title: "Volunteer Experience", enabled: false },
]

// Sortable section item component
function SortableSectionItem({ section, onToggle }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-background flex items-center justify-between rounded-lg border p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium">{section.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant={section.enabled ? "default" : "outline"}
          size="sm"
          onClick={() => onToggle(section.id)}
          className="text-xs"
        >
          {section.enabled ? "ON" : "OFF"}
        </Button>
      </div>
    </div>
  )
}

export default function LayoutStylePanel() {
  const [isMounted, setIsMounted] = useState(false)
  const [sections, setSections] = useState(defaultSections)
  const [fontSize, setFontSize] = useState([11])
  const [dateFormat, setDateFormat] = useState("Jan '24")
  const [lineHeight, setLineHeight] = useState([1.3])
  const [pageSize, setPageSize] = useState("Letter")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSectionToggle = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    )
  }

  // Show static version during SSR
  if (!isMounted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sections</h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="bg-background flex items-center justify-between rounded-lg border p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant={section.enabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSectionToggle(section.id)}
                      className="text-xs"
                    >
                      {section.enabled ? "ON" : "OFF"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Font Size</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setFontSize([Math.max(8, fontSize[0] - 1)])}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="min-w-[3rem] text-center font-mono text-sm">
                  {fontSize[0]}pt
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setFontSize([Math.min(24, fontSize[0] + 1)])}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={24}
                min={8}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Line Height</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setLineHeight([
                      Math.max(1.0, Number((lineHeight[0] - 0.1).toFixed(1))),
                    ])
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="min-w-[3rem] text-center font-mono text-sm">
                  {lineHeight[0].toFixed(1)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setLineHeight([
                      Math.min(3.0, Number((lineHeight[0] + 0.1).toFixed(1))),
                    ])
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Slider
                value={lineHeight}
                onValueChange={setLineHeight}
                max={3}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jan '24">Jan '24</SelectItem>
                  <SelectItem value="January 2024">January 2024</SelectItem>
                  <SelectItem value="01/2024">01/2024</SelectItem>
                  <SelectItem value="2024-01">2024-01</SelectItem>
                  <SelectItem value="Jan 2024">Jan 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Page Size</Label>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Letter">Letter (8.5" × 11")</SelectItem>
                  <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="Legal">Legal (8.5" × 14")</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show interactive version after hydration
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sections</h3>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((section) => section.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {sections.map((section) => (
                  <SortableSectionItem
                    key={section.id}
                    section={section}
                    onToggle={handleSectionToggle}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Font Size</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setFontSize([Math.max(8, fontSize[0] - 1)])}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="min-w-[3rem] text-center font-mono text-sm">
                {fontSize[0]}pt
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setFontSize([Math.min(24, fontSize[0] + 1)])}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              max={24}
              min={8}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Line Height</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setLineHeight([
                    Math.max(1.0, Number((lineHeight[0] - 0.1).toFixed(1))),
                  ])
                }
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="min-w-[3rem] text-center font-mono text-sm">
                {lineHeight[0].toFixed(1)}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setLineHeight([
                    Math.min(3.0, Number((lineHeight[0] + 0.1).toFixed(1))),
                  ])
                }
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Slider
              value={lineHeight}
              onValueChange={setLineHeight}
              max={3}
              min={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Format</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jan '24">Jan '24</SelectItem>
                <SelectItem value="January 2024">January 2024</SelectItem>
                <SelectItem value="01/2024">01/2024</SelectItem>
                <SelectItem value="2024-01">2024-01</SelectItem>
                <SelectItem value="Jan 2024">Jan 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Page Size</Label>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Letter">Letter (8.5" × 11")</SelectItem>
                <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                <SelectItem value="Legal">Legal (8.5" × 14")</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
