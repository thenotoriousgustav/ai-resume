"use client"

import { XIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
  fieldTitle: string
  nameInSchema: string
  placeholder?: string
  labelLeft?: boolean
  readOnly?: boolean
}

export function InputWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  labelLeft,
  readOnly,
}: Props) {
  const form = useFormContext()

  const fieldTitleNoSpaces = fieldTitle.replaceAll(" ", "-")

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={labelLeft ? "flex w-full items-center gap-2" : ""}>
          <FormLabel
            className={`text-base ${labelLeft ? "mt-2 w-1/3" : ""}`}
            htmlFor={fieldTitleNoSpaces}
          >
            {fieldTitle}
          </FormLabel>

          <div
            className={`flex items-center gap-2 ${labelLeft ? "w-2/3" : "w-full max-w-xs"}`}
          >
            <div className="border-input ring-offset-background focus-within:ring-ring flex w-full max-w-xs items-center rounded-md border focus-within:ring-2 focus-within:ring-offset-2">
              <FormControl>
                <Input
                  {...field}
                  id={fieldTitleNoSpaces}
                  className="w-full max-w-xs"
                  placeholder={placeholder || fieldTitle}
                  readOnly={readOnly}
                  disabled={readOnly}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </div>
            {!readOnly ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear"
                title="Clear"
                className="rounded-mdl grid place-content-center text-red-500 hover:bg-transparent hover:text-rose-400"
                onClick={(e) => {
                  e.preventDefault()
                  form.setValue(nameInSchema, "", { shouldDirty: true })
                }}
              >
                <XIcon className="m-0 h-6 w-6 p-0" />
              </Button>
            ) : null}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
