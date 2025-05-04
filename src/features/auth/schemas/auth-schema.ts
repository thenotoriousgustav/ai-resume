import { z } from "zod"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email cannot be empty" })
    .email({ message: "Please enter a valid email address" })
    .regex(EMAIL_REGEX, { message: "Invalid email format" })
    .refine(
      (email: string) => {
        const domain = email.split("@")[1]
        return domain && !domain.startsWith(".")
      },
      { message: "Email domain is invalid" }
    ),
})
