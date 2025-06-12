"use client"

import { countries } from "country-data-list"
import { CheckIcon, Globe } from "lucide-react"
import React, { forwardRef, useCallback, useEffect, useState } from "react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface Country {
  alpha2: string
  alpha3: string
  countryCallingCodes: string[]
  currencies: string[]
  emoji?: string
  ioc: string
  languages: string[]
  name: string
  status: string
}

// Dropdown props
interface CountryDropdownProps {
  options?: Country[]
  onChange?: (country: Country) => void
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  slim?: boolean
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  )

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => country.alpha3 === defaultValue
      )
      if (initialCountry) {
        setSelectedCountry(initialCountry)
      } else {
        // Reset selected country if defaultValue is not found
        setSelectedCountry(undefined)
      }
    } else {
      // Reset selected country if defaultValue is undefined or null
      setSelectedCountry(undefined)
    }
  }, [defaultValue, options])

  const handleSelect = useCallback(
    (country: Country) => {
      // console.log("🌍 CountryDropdown value: ", country)
      setSelectedCountry(country)
      onChange?.(country)
      setOpen(false)
    },
    [onChange]
  )

  const triggerClasses = cn(
    "flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-0 shadow-none",
    slim === true && "h-8 w-8 p-0"
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountry ? (
          <div className="flex w-0 flex-grow items-center overflow-hidden">
            <span className="text-2xl leading-none">
              {selectedCountry.emoji || "🏳️"}
            </span>
            {slim === false && (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            )}
          </div>
        ) : (
          <span>{slim === false ? placeholder : <Globe size={20} />}</span>
        )}
        {/* <ChevronDown size={16} /> */}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="max-h-[200px] w-full sm:max-h-[270px]">
          <CommandList>
            <div className="bg-popover sticky top-0 z-10">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex w-full items-center gap-2"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                      <span className="flex-shrink-0 text-lg leading-none">
                        {option.emoji || "🏳️"}
                      </span>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        option.name === selectedCountry?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

CountryDropdownComponent.displayName = "CountryDropdownComponent"

export const CountryDropdown = forwardRef(CountryDropdownComponent)
