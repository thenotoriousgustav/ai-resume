"use server"

import { redirect } from "next/navigation"

import { getCurrentUser } from "@/server/queries/get-current-user"
import { tryCatch } from "@/types/result"
import { createClient } from "@/utils/supabase/server"

import { GetJobApplicationsInput } from "../../lib/validations"

export async function getJobApplications(input: GetJobApplicationsInput) {
  return tryCatch(async () => {
    const supabase = await createClient()
    const [user, _] = await getCurrentUser()

    if (!user) {
      redirect("/auth")
    }

    const page = input.page ?? 1
    const perPage = input.perPage ?? 10
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from("job_applications")
      .select(
        "id, position, company, location, status, priority, job_type, applied_at, salary, currency",
        { count: "exact" }
      )
      .eq("user_id", user.id)

    if (input.position) {
      query = query.ilike("position", `%${input.position}%`)
    }

    if (input.company) {
      query = query.ilike("company", `%${input.company}%`)
    }

    if (input.location) {
      query = query.ilike("location", `%${input.location}%`)
    }

    if (input.status && input.status.length > 0) {
      query = query.in("status", input.status)
    }

    if (input.priority && input.priority.length > 0) {
      query = query.in("priority", input.priority)
    }

    if (input.job_type && input.job_type.length > 0) {
      query = query.in("job_type", input.job_type)
    }

    const sort =
      input.sort && input.sort.length > 0
        ? input.sort
        : [{ id: "created_at", desc: true }] // Default sorting

    sort.forEach((item) => {
      query = query.order(item.id, { ascending: !item.desc })
    })

    const { data, count, error } = await query.range(from, to)

    if (error) {
      throw new Error(`Failed to fetch job applications: ${error.message}`)
    }

    const pageCount = count ? Math.ceil(count / perPage) : 0

    return {
      data,
      pageCount,
    }
  })
}
