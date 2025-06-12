"use client"

import React from "react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export default function DocumentCardPDF({ url }: { url: string }) {
  return (
    <React.Fragment>
      <Document
        file={url}
        loading={
          <div className="flex h-full w-full items-center justify-center">
            Loading...
          </div>
        }
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={0.55}
        />
      </Document>
    </React.Fragment>
  )
}
