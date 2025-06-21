import { NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard" // Redirect ke dashboard setelah login

  console.log("Callback received:", { code: !!code, origin, next })

  if (code) {
    const supabase = await createClient()

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Auth exchange error:", error)
        return NextResponse.redirect(
          `${origin}/auth?error=${encodeURIComponent(error.message)}`
        )
      }

      if (data?.user) {
        console.log("Auth successful for user:", data.user.id)

        // Buat clean redirect URL tanpa code parameter
        const redirectUrl = new URL(next, origin)
        redirectUrl.searchParams.delete("code")
        redirectUrl.searchParams.delete("next")

        return NextResponse.redirect(redirectUrl.toString())
      }
    } catch (error) {
      console.error("Unexpected error during auth exchange:", error)
      return NextResponse.redirect(`${origin}/auth?error=auth_failed`)
    }
  }

  console.log("No code parameter found, redirecting to auth error")
  return NextResponse.redirect(`${origin}/auth?error=missing_code`)
}
