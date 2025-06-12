"use client"

import { create } from "zustand"

type PdfStore = {
  scale: number
  setScale: (scale: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
}

export const usePdfStore = create<PdfStore>((set) => ({
  scale: 1.0,
  setScale: (scale) => set({ scale }),
  zoomIn: () => set((state) => ({ scale: Math.min(state.scale + 0.2, 2.5) })),
  zoomOut: () => set((state) => ({ scale: Math.max(state.scale - 0.2, 0.5) })),
  resetZoom: () => set({ scale: 1.0 }),
}))
