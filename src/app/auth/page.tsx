import AuthForm from "@/features/auth/components/auth-form"

export default function AuthenticationPage() {
  return (
    <section className="flex min-h-screen w-full">
      <AuthBrandingPanel />
      <AuthFormPanel />
    </section>
  )
}

const AuthBrandingPanel = () => (
  <div className="hidden w-1/2 bg-zinc-900 p-8 text-white lg:flex lg:flex-col lg:justify-between">
    <h1 className="text-2xl font-bold">Silamar</h1>
    <p>
      Silamar is a job application management platform designed to help you
      track and organize your job applications efficiently. Create an account to
      get started and take control of your job search.
    </p>
  </div>
)

const AuthFormPanel = () => (
  <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h2 className="mb-1 text-3xl font-semibold">Create an account</h2>
        <p className="text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <AuthForm />
    </div>
  </div>
)
