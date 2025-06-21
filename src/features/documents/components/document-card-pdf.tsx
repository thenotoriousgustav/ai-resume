"use client"

import React, { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export default function DocumentCardPDF({ url }: { url: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true)
          setIsLoaded(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isLoaded])

  return (
    <div ref={containerRef} className="h-full w-full">
      {isVisible ? (
        <Document
          file={url}
          loading={
            <div className="flex h-full w-full items-center justify-center">
              <div className="animate-pulse text-sm text-gray-500">
                Loading PDF...
              </div>
            </div>
          }
          error={
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-sm text-gray-400">📄 PDF Preview</div>
            </div>
          }
          onLoadError={(error) => {
            console.warn("PDF Load Error (card):", error)
          }}
        >
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={0.55}
            onLoadError={(error) => {
              console.warn("PDF Page Load Error:", error)
            }}
          />
        </Document>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-50">
          <div className="text-gray-400">📄</div>
        </div>
      )}
    </div>
  )
}
