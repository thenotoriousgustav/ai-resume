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
    <h1 className="text-2xl font-bold">Magang Gue</h1>
    <p>
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
      deserunt, eligendi impedit debitis obcaecati quos?" - Gustam Rheza
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
