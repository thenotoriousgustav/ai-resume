import * as cheerio from "cheerio"
import { NextRequest, NextResponse } from "next/server"

interface JobData {
  position: string
  company: string
  location: string
  description: string
  jobType?: string
  salary?: string
  platform: "jobstreet" | "linkedin"
}

interface LinkedInApiResponse {
  title?: string
  companyDetails?: {
    company?: string
  }
  companyName?: string
  formattedLocation?: string
  locationName?: string
  description?:
    | {
        text?: string
      }
    | string
  workplaceTypes?: string[]
  employmentType?: string
  salaryInsights?: {
    salaryRange?: {
      min?: number
      max?: number
      currency?: string
    }
  }
  listedAt?: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Determine platform and validate URL
    let platform: "jobstreet" | "linkedin"
    if (url.includes("jobstreet.com")) {
      platform = "jobstreet"
    } else if (url.includes("linkedin.com")) {
      platform = "linkedin"
    } else {
      return NextResponse.json(
        { error: "Only JobStreet and LinkedIn URLs are supported" },
        { status: 400 }
      )
    }

    // Handle different URL formats based on platform
    let finalUrl = url
    if (platform === "jobstreet" && url.includes("?jobId=")) {
      // Convert JobStreet search result URL to job detail URL
      const urlParams = new URL(url)
      const jobId = urlParams.searchParams.get("jobId")
      if (jobId) {
        finalUrl = `https://id.jobstreet.com/id/job/${jobId}`
      }
    } else if (platform === "linkedin") {
      // Handle LinkedIn URL formats and convert to API endpoint
      let jobId = null

      // Extract jobId from different LinkedIn URL patterns
      if (url.includes("currentJobId=")) {
        // From search URLs: https://www.linkedin.com/jobs/search/?currentJobId=4058541593&origin=...
        const urlParams = new URL(url)
        jobId = urlParams.searchParams.get("currentJobId")
      } else if (url.includes("/jobs/view/")) {
        // From direct job URLs: https://www.linkedin.com/jobs/view/4258966843
        const match = url.match(/\/jobs\/view\/(\d+)(?:\?|$|\/?)/)
        if (match) {
          jobId = match[1]
        }
      } else if (url.includes("/jobs-guest/jobs/api/")) {
        // Already an API URL: https://www.linkedin.com/jobs-guest/jobs/api/4058541593
        const match = url.match(/\/jobs-guest\/jobs\/api\/(\d+)/)
        if (match) {
          jobId = match[1]
        }
      } else {
        // Extract job ID from the end of any LinkedIn URL
        // This handles URLs like: https://www.linkedin.com/jobs/view/4258966843
        const match = url.match(/\/(\d+)(?:\?.*)?(?:#.*)?$/)
        if (match) {
          jobId = match[1]
        }
      }

      // Convert to LinkedIn jobs API endpoint for better data access
      if (jobId) {
        finalUrl = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`
      }
    }

    console.log(finalUrl)

    // Fetch the job page
    const response = await fetch(finalUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch job page" },
        { status: 500 }
      )
    }

    const html = await response.text()

    // Check if the response is JSON (LinkedIn API) or HTML
    let isApiResponse = false
    let apiData = null

    try {
      // Try to parse as JSON first (LinkedIn API response)
      apiData = JSON.parse(html)
      isApiResponse = true
    } catch {
      // Not JSON, continue with HTML parsing
      isApiResponse = false
    }

    // Extract job data from the page
    const jobData: JobData = {
      position: "",
      company: "",
      location: "",
      description: "",
      platform: platform,
    }

    if (platform === "jobstreet") {
      const $ = cheerio.load(html)
      extractJobStreetData($, jobData)
    } else if (platform === "linkedin") {
      if (isApiResponse && apiData) {
        // Extract from LinkedIn API JSON response
        extractLinkedInApiData(apiData, jobData)
      } else {
        // Extract from LinkedIn HTML
        const $ = cheerio.load(html)
        extractLinkedInData($, jobData)
      }
    }

    // Validate that we got the essential information
    if (!jobData.position || !jobData.company) {
      return NextResponse.json(
        {
          error:
            "Could not extract job information from the page. Please check the URL or try again later.",
          extractedData: jobData,
        },
        { status: 400 }
      )
    }

    // Clean up the description (remove excessive whitespace)
    if (jobData.description) {
      jobData.description = jobData.description
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 5000) // Limit to 5000 characters as per schema
    }

    return NextResponse.json({
      success: true,
      data: jobData,
    })
  } catch (error) {
    console.error("Error scraping job:", error)
    return NextResponse.json(
      { error: "Failed to scrape job data" },
      { status: 500 }
    )
  }
}

// JobStreet extraction function
function extractJobStreetData($: cheerio.CheerioAPI, jobData: JobData) {
  // Extract position/job title
  const positionSelectors = [
    'h1[data-automation="job-detail-title"]',
    ".job-title",
    "h1",
    '[data-automation="job-detail-title"]',
    ".xhgj00.xhgj0f",
  ]

  for (const selector of positionSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      jobData.position = element.text().trim()
      break
    }
  }

  // Extract company name
  const companySelectors = [
    '[data-automation="advertiser-name"]',
    ".company-name",
    ".xhgj00.ciuj3f4z.ciuj3fi7.eu0zaq0.eu0zaq1.eu0zaq1t.eu0zaq8._1kdtdvw4",
    ".company-info .company-name",
  ]

  for (const selector of companySelectors) {
    const element = $(selector).first()
    if (element.length) {
      // Remove any SVG icons and extra text
      const companyText = element
        .clone()
        .find("svg")
        .remove()
        .end()
        .text()
        .trim()
      if (companyText) {
        jobData.company = companyText
        break
      }
    }
  }

  // Extract location
  const locationSelectors = [
    '[data-automation="job-detail-location"]',
    ".location",
    ".job-location",
    '[data-testid="job-detail-location"]',
  ]

  for (const selector of locationSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      jobData.location = element.text().trim()
      break
    }
  }

  // Extract job description with improved handling
  const descriptionSelectors = [
    '[data-automation="jobAdDetails"]',
    '[data-automation="job-detail-description"]',
    ".job-description",
    ".job-details",
    '[data-testid="job-detail-description"]',
    ".job-description-content",
  ]

  for (const selector of descriptionSelectors) {
    const element = $(selector).first()
    if (element.length) {
      if (selector === '[data-automation="jobAdDetails"]') {
        let descriptionText = ""

        // Extract from lists (ol, ul)
        element.find("ol, ul").each((_, listEl) => {
          $(listEl)
            .find("li")
            .each((_, li) => {
              const liText = $(li).text().trim()
              if (liText) {
                descriptionText += `• ${liText}\n`
              }
            })
        })

        // Extract from paragraphs not inside lists
        element.find("p").each((_, p) => {
          const $p = $(p)
          if ($p.closest("li").length === 0) {
            const pText = $p.text().trim()
            if (pText) {
              descriptionText += `${pText}\n\n`
            }
          }
        })

        // Extract from divs if no lists or paragraphs found
        if (!descriptionText.trim()) {
          element.find("div").each((_, div) => {
            const divText = $(div).text().trim()
            if (divText && divText.length > 20) {
              descriptionText += `${divText}\n\n`
            }
          })
        }

        // Fallback to entire element text
        if (!descriptionText.trim()) {
          descriptionText = element.text().trim()
        }

        if (descriptionText.trim()) {
          jobData.description = descriptionText.trim()
          break
        }
      } else {
        const descText = element.text().trim()
        if (descText) {
          jobData.description = descText
          break
        }
      }
    }
  }

  // Extract job type and salary (existing logic)
  const jobTypeSelectors = [
    '[data-automation="job-detail-work-type"]',
    ".work-type",
    ".job-type",
  ]

  for (const selector of jobTypeSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      const jobTypeText = element.text().trim().toLowerCase()
      if (
        jobTypeText.includes("full time") ||
        jobTypeText.includes("full-time")
      ) {
        jobData.jobType = "full_time"
      } else if (
        jobTypeText.includes("part time") ||
        jobTypeText.includes("part-time")
      ) {
        jobData.jobType = "part_time"
      } else if (jobTypeText.includes("contract")) {
        jobData.jobType = "contract"
      } else if (jobTypeText.includes("remote")) {
        jobData.jobType = "remote"
      } else if (jobTypeText.includes("hybrid")) {
        jobData.jobType = "hybrid"
      } else if (jobTypeText.includes("internship")) {
        jobData.jobType = "internship"
      }
      break
    }
  }
}

// LinkedIn extraction function
function extractLinkedInData($: cheerio.CheerioAPI, jobData: JobData) {
  // Extract position/job title from LinkedIn specific selectors
  const positionSelectors = [
    "h2.top-card-layout__title.font-sans.text-lg.papabear\\:text-xl.font-bold.leading-open.text-color-text.mb-0.topcard__title",
    ".top-card-layout__title",
    ".topcard__title",
    'h1[data-test-id="job-title"]',
    ".job-details-jobs-unified-top-card__job-title h1",
    "h2.topcard__title",
  ]

  for (const selector of positionSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      jobData.position = element.text().trim()
      break
    }
  }

  // Extract company name from LinkedIn specific selectors
  const companySelectors = [
    "a.topcard__org-name-link.topcard__flavor--black-link",
    ".topcard__org-name-link",
    'a[data-tracking-control-name="public_jobs_topcard-org-name"]',
    ".job-details-jobs-unified-top-card__company-name a",
    '[data-test-id="job-details-company-name"]',
  ]

  for (const selector of companySelectors) {
    const element = $(selector).first()
    if (element.length) {
      const companyText = element.text().trim()
      if (companyText) {
        jobData.company = companyText
        break
      }
    }
  }

  // Extract location from LinkedIn specific selectors
  const locationSelectors = [
    ".topcard__flavor.topcard__flavor--bullet",
    ".topcard__flavor--bullet",
    ".job-details-jobs-unified-top-card__bullet",
    '[data-test-id="job-details-location"]',
    ".topcard__flavor--metadata-item",
  ]

  for (const selector of locationSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      const locationText = element.text().trim()
      // Filter out non-location text and check if it's a valid location format
      if (
        locationText &&
        !locationText.includes("•") &&
        !locationText.includes("ago") &&
        !locationText.includes("applicant") &&
        locationText.length < 100 &&
        locationText.length > 3 &&
        (locationText.includes(",") ||
          locationText.includes("Indonesia") ||
          locationText.includes("Jakarta"))
      ) {
        jobData.location = locationText
        break
      }
    }
  }

  // Extract job description
  const descriptionSelectors = [
    ".description__text",
    ".jobs-description__content",
    ".jobs-box__html-content",
    ".job-details-jobs-unified-top-card__job-description",
    '[data-test-id="job-details-description"]',
    ".show-more-less-html__markup",
  ]

  for (const selector of descriptionSelectors) {
    const element = $(selector).first()
    if (element.length) {
      let descriptionText = ""

      // Clone the element to manipulate it without affecting the original DOM
      const $clone = element.clone()

      // Convert HTML content to readable text format
      // Replace <br> tags with newlines
      $clone.find("br").replaceWith("\n")

      // Process <strong> tags to add emphasis
      $clone.find("strong").each((_, strongEl) => {
        const $strong = $(strongEl)
        const text = $strong.text().trim()
        if (text) {
          $strong.replaceWith(`**${text}**`)
        }
      })

      // Process lists properly
      $clone.find("ul, ol").each((_, listEl) => {
        const $list = $(listEl)
        $list.find("li").each((_, li) => {
          const $li = $(li)
          const liText = $li.text().trim()
          if (liText) {
            $li.replaceWith(`• ${liText}\n`)
          }
        })
      })

      // Get the processed text
      descriptionText = $clone.text()

      // Clean up the text
      descriptionText = descriptionText
        .replace(/\n\s*\n\s*\n/g, "\n\n") // Replace multiple newlines with double newlines
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\n /g, "\n") // Remove spaces after newlines
        .replace(/ \n/g, "\n") // Remove spaces before newlines
        .trim()

      // If we got meaningful content, use it
      if (descriptionText.trim() && descriptionText.length > 50) {
        jobData.description = descriptionText
        break
      }

      // Fallback: Extract structured content manually
      if (!descriptionText.trim() || descriptionText.length <= 50) {
        descriptionText = ""

        // Extract text node by node to preserve structure
        element.contents().each((_, node) => {
          if (node.nodeType === 3) {
            // Text node
            const text = $(node).text().trim()
            if (text) {
              descriptionText += text + " "
            }
          } else if (node.nodeType === 1) {
            // Element node
            const $node = $(node)
            const element = node as unknown as Element
            const tagName = element.tagName?.toLowerCase()

            if (tagName === "br") {
              descriptionText += "\n"
            } else if (tagName === "strong" || tagName === "b") {
              const text = $node.text().trim()
              if (text) {
                descriptionText += `**${text}**`
              }
            } else if (tagName === "ul" || tagName === "ol") {
              $node.find("li").each((_, li) => {
                const liText = $(li).text().trim()
                if (liText) {
                  descriptionText += `\n• ${liText}`
                }
              })
              descriptionText += "\n"
            } else if (tagName === "p" || tagName === "div") {
              const text = $node.text().trim()
              if (text) {
                descriptionText += `\n\n${text}`
              }
            } else {
              const text = $node.text().trim()
              if (text) {
                descriptionText += text + " "
              }
            }
          }
        })

        // Clean up the manually extracted text
        if (descriptionText.trim()) {
          descriptionText = descriptionText
            .replace(/\n\s*\n\s*\n/g, "\n\n")
            .replace(/\s+/g, " ")
            .replace(/\n /g, "\n")
            .replace(/ \n/g, "\n")
            .trim()

          if (descriptionText.length > 20) {
            jobData.description = descriptionText
            break
          }
        }
      }
    }
  }

  // Extract job type if available
  const jobTypeSelectors = [
    '[data-test-id="job-details-job-type"]',
    ".job-details-jobs-unified-top-card__job-type",
    ".topcard__flavor--job-type",
  ]

  for (const selector of jobTypeSelectors) {
    const element = $(selector).first()
    if (element.length && element.text().trim()) {
      const jobTypeText = element.text().trim().toLowerCase()
      if (
        jobTypeText.includes("full time") ||
        jobTypeText.includes("full-time")
      ) {
        jobData.jobType = "full_time"
      } else if (
        jobTypeText.includes("part time") ||
        jobTypeText.includes("part-time")
      ) {
        jobData.jobType = "part_time"
      } else if (jobTypeText.includes("contract")) {
        jobData.jobType = "contract"
      } else if (jobTypeText.includes("remote")) {
        jobData.jobType = "remote"
      } else if (jobTypeText.includes("hybrid")) {
        jobData.jobType = "hybrid"
      } else if (jobTypeText.includes("internship")) {
        jobData.jobType = "internship"
      }
      break
    }
  }

  // Extract salary if available
  const salarySelectors = [
    ".salary.compensation__salary",
    ".compensation__salary",
    ".salary",
    '[data-test-id="job-details-salary"]',
    ".job-details-jobs-unified-top-card__salary",
    ".topcard__flavor--salary",
    ".salary-range",
    ".compensation-range",
  ]

  for (const selector of salarySelectors) {
    const element = $(selector).first()
    if (element.length) {
      const salaryText = element.text().trim()
      if (
        salaryText &&
        (salaryText.includes("$") ||
          salaryText.includes("IDR") ||
          salaryText.includes("Rp") ||
          salaryText.includes("€") ||
          salaryText.includes("£") ||
          salaryText.includes("/yr") ||
          salaryText.includes("/year") ||
          salaryText.includes("annually") ||
          salaryText.match(/\d+,?\d*\s*-\s*\d+,?\d*/))
      ) {
        jobData.salary = salaryText
        break
      }
    }
  }

  // Special handling for internship detection from job title
  if (!jobData.jobType && jobData.position) {
    const positionLower = jobData.position.toLowerCase()
    if (
      positionLower.includes("internship") ||
      positionLower.includes("intern")
    ) {
      jobData.jobType = "internship"
    }
  }

  // Fallback extraction from meta tags or title
  if (!jobData.position || !jobData.company) {
    if (!jobData.position) {
      const metaTitle =
        $('meta[property="og:title"]').attr("content") || $("title").text()
      if (metaTitle) {
        // LinkedIn title format: "Position - Company | LinkedIn" or "Position at Company"
        let titleParts = metaTitle.split(" - ")
        if (titleParts.length === 1) {
          titleParts = metaTitle.split(" at ")
        }
        if (titleParts.length > 0) {
          jobData.position = titleParts[0].trim()
        }
      }
    }

    if (!jobData.company && jobData.position) {
      const metaTitle =
        $('meta[property="og:title"]').attr("content") || $("title").text()
      if (metaTitle) {
        let titleParts = metaTitle.split(" - ")
        if (titleParts.length === 1) {
          titleParts = metaTitle.split(" at ")
        }
        if (titleParts.length > 1) {
          const companyPart = titleParts[1].split(" | ")[0].trim()
          if (companyPart) {
            jobData.company = companyPart
          }
        }
      }
    }
  }

  // Additional fallback for location if not found
  if (!jobData.location) {
    // Try to extract from all flavor elements and find the one that looks like a location
    $(".topcard__flavor").each((_, element) => {
      const text = $(element).text().trim()
      if (
        text &&
        (text.includes("Jakarta") ||
          text.includes("Indonesia") ||
          text.includes("Bandung") ||
          text.includes("Surabaya") ||
          text.includes("Bali") ||
          (text.includes(",") &&
            text.length < 50 &&
            !text.includes("ago") &&
            !text.includes("applicant")))
      ) {
        jobData.location = text
        return false // Break the loop
      }
    })
  }
}

// LinkedIn API extraction function
function extractLinkedInApiData(
  apiData: LinkedInApiResponse,
  jobData: JobData
) {
  try {
    // Extract job title/position
    if (apiData.title) {
      jobData.position = apiData.title.trim()
    }

    // Extract company name
    if (apiData.companyDetails?.company) {
      jobData.company = apiData.companyDetails.company.trim()
    } else if (apiData.companyName) {
      jobData.company = apiData.companyName.trim()
    }

    // Extract location
    if (apiData.formattedLocation) {
      jobData.location = apiData.formattedLocation.trim()
    } else if (apiData.locationName) {
      jobData.location = apiData.locationName.trim()
    }

    // Extract job description
    if (apiData.description) {
      if (typeof apiData.description === "object" && apiData.description.text) {
        jobData.description = apiData.description.text.trim()
      } else if (typeof apiData.description === "string") {
        jobData.description = apiData.description.trim()
      }
    }

    // Extract job type
    if (apiData.workplaceTypes && apiData.workplaceTypes.length > 0) {
      jobData.jobType = apiData.workplaceTypes[0].toLowerCase()
    } else if (apiData.employmentType) {
      jobData.jobType = apiData.employmentType.toLowerCase()
    }

    // Extract salary (if available)
    if (apiData.salaryInsights?.salaryRange) {
      const salaryRange = apiData.salaryInsights.salaryRange
      if (salaryRange.min && salaryRange.max) {
        jobData.salary = `${salaryRange.min} - ${salaryRange.max} ${salaryRange.currency || ""}`
      }
    }

    // Auto-detect internship from job title
    if (!jobData.jobType && jobData.position) {
      const positionLower = jobData.position.toLowerCase()
      if (
        positionLower.includes("internship") ||
        positionLower.includes("intern")
      ) {
        jobData.jobType = "internship"
      }
    }

    // Fallback for missing company name from other fields
    if (!jobData.company && apiData.listedAt) {
      jobData.company = apiData.listedAt.trim()
    }

    // Process HTML content in description if it exists
    if (jobData.description && jobData.description.includes("<")) {
      // Use cheerio to properly parse and convert HTML to readable text
      const $ = cheerio.load(jobData.description)

      // Replace <br> tags with newlines
      $("br").replaceWith("\n")

      // Process <strong> and <b> tags to add emphasis
      $("strong, b").each((_, el) => {
        const $el = $(el)
        const text = $el.text().trim()
        if (text) {
          $el.replaceWith(`**${text}**`)
        }
      })

      // Process lists properly
      $("ul, ol").each((_, listEl) => {
        const $list = $(listEl)
        $list.find("li").each((_, li) => {
          const $li = $(li)
          const liText = $li.text().trim()
          if (liText) {
            $li.replaceWith(`\n• ${liText}`)
          }
        })
      })

      // Get the cleaned text
      let cleanedDescription = $.root().text()

      // Clean up the description text
      cleanedDescription = cleanedDescription
        .replace(/\n\s*\n\s*\n/g, "\n\n") // Replace multiple newlines with double newlines
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\n /g, "\n") // Remove spaces after newlines
        .replace(/ \n/g, "\n") // Remove spaces before newlines
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()

      if (cleanedDescription && cleanedDescription.length > 20) {
        jobData.description = cleanedDescription
      }
    }
  } catch (error) {
    console.error("Error extracting LinkedIn API data:", error)
    // If API extraction fails, we'll rely on the HTML fallback
  }
}
