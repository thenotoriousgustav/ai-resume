import { type NextRequest, NextResponse } from "next/server"

import { updateSession } from "@/utils/supabase/middleware"

import { createClient } from "./utils/supabase/server"

export async function middleware(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

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

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
