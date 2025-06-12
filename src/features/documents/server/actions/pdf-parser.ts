export default async function pdfParser(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  try {
    const response = await fetch(`${baseUrl}/api/parse-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeUrl: url }),
    })

    if (!response.ok) {
      throw new Error("Failed to parse PDF")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error parsing PDF:", error)
    throw new Error("Failed to parse PDF")
  }
}
