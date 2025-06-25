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
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )

          // Re-create the response with updated cookies
          supabaseResponse = NextResponse.next({ request })

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

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
