import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = [
  "/dashboard",
  "/resume-analysis/",
  "/job-tracker/",
  "/cover-letter/",
  "/documents/",
]

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with any protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  )

  const session = await supabase.auth.getUser()

  if (isProtectedRoute && session.error) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return supabaseResponse
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
