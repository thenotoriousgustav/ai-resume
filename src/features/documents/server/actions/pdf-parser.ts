import { ResultAsync, tryCatch } from "@/types/result"

export default async function pdfParser(
  url: string
): ResultAsync<string, Error> {
  return tryCatch(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/parse-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeUrl: url }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(
        `Failed to parse PDF: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data = await response.json()

    // Validasi response structure
    if (!data || typeof data !== "string") {
      throw new Error("Invalid PDF parser response format")
    }

    return data as string
  })
}
