import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

import { env } from "@/config/env"
import { Database } from "@/types/supabase-types"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get user directly from supabase in middleware (don't use getCurrentUser to avoid circular dependency)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error("Error fetching user:", userError)
  }

  const pathname = request.nextUrl.pathname
  const protectedRoutes = [
    "/resume",
    "/profile",
    "/job-tracker",
    "/dashboard",
    "/documents",
  ]

  if (!user && protectedRoutes.some((path) => pathname.includes(path))) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  if (user && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return supabaseResponse
}
