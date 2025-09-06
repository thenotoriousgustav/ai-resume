"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { authSchema } from "../schemas/auth-schema"
import otpAuth from "../server/actions/otp-auth"

import GoogleOAuthButton from "./google-oauth-button"
export default function AuthForm() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  })

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof authSchema>) {
    startTransition(async () => {
      const [_, error] = await otpAuth(values)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Magic link sent! Please check your email to continue.")
      }
    })
  }
  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="gustam@example.com" {...field} />
                </FormControl>
                <FormDescription className="text-sm text-zinc-500">
                  This is the email that will be used to login to your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleOAuthButton />
    </React.Fragment>
  )
}
