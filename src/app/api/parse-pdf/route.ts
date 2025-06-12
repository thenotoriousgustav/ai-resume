import { NextRequest } from "next/server"
import pdfParse from "pdf-parse"

import { normalizeText } from "@/utils/normalize-text"

export async function POST(request: NextRequest) {
  const { resumeUrl } = await request.json()

  const response = await fetch(resumeUrl)
  const arrayBuffer = await response.arrayBuffer()
  const pdfData = await pdfParse(Buffer.from(arrayBuffer))
  const normalizedText = normalizeText(pdfData.text)

  return new Response(JSON.stringify(normalizedText), {
    status: 200,
  })
}
