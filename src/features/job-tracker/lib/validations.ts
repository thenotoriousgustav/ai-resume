import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"
import * as z from "zod"

import { getSortingStateParser } from "@/lib/parsers"
import { JobApplication } from "@/types/database"

const Status = z.enum(["applied", "interview", "offer", "rejected", "accepted"])
const Priority = z.enum(["low", "medium", "high"])
const JobType = z.enum([
  "full_time",
  "part_time",
  "contract",
  "temporary",
  "internship",
  "remote",
  "hybrid",
  "freelance",
])

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<JobApplication>().withDefault([
    { id: "created_at", desc: true },
  ]),
  position: parseAsString.withDefault(""),
  company: parseAsString.withDefault(""),
  location: parseAsString.withDefault(""),
  status: parseAsArrayOf(Status).withDefault([]),
  priority: parseAsArrayOf(Priority).withDefault([]),
  job_type: parseAsArrayOf(JobType).withDefault([]),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
})

export type GetJobApplicationsInput = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>
