"use client"

import { CellContext } from "@tanstack/react-table"
import { startTransition, useEffect, useState } from "react"
import CurrencyInput from "react-currency-input-field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JobApplicationTableData } from "@/types/database"

import updateTableCell from "../../server/actions/update-table-cell"

const currencies = [
  { code: "IDR", symbol: "Rp" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "JPY", symbol: "¥" },
  { code: "SGD", symbol: "S$" },
  { code: "MYR", symbol: "RM" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "CHF", symbol: "Fr" },
]

export const SalaryCell = ({
  getValue,
  row,
}: CellContext<JobApplicationTableData, number | null>) => {
  const initialValue = getValue()
  const initialCurrency = row.original.currency || "IDR"
  const rowId = row.original.id

  const [value, setValue] = useState<number | null>(initialValue ?? null)
  const [currency, setCurrency] = useState(initialCurrency)

  useEffect(() => {
    setValue(initialValue ?? null)
  }, [initialValue])

  useEffect(() => {
    setCurrency(initialCurrency)
  }, [initialCurrency])

  const handleBlur = async () => {
    if (value !== initialValue) {
      startTransition(async () => {
        await updateTableCell(rowId, "salary", value?.toString() ?? "")
      })
    }
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    if (newCurrency !== currency) {
      startTransition(async () => {
        await updateTableCell(rowId, "currency", newCurrency)
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className="flex gap-x-2">
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger
          className="flex w-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-center shadow-none focus:ring-0"
          isArrow={false}
        >
          <SelectValue>
            {currencies.find((c) => c.code === currency)?.symbol || "Rp"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {currencies.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <div className="flex items-center gap-2">
                <span>{c.symbol}</span>
                <span className="text-muted-foreground text-xs">{c.code}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CurrencyInput
        id={`salary-${rowId}`}
        value={value ?? ""}
        decimalsLimit={2}
        onValueChange={(val, name, values) => setValue(values?.float ?? null)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full border-0 bg-transparent p-0 text-sm shadow-none outline-none focus:border-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
        placeholder="0.00"
      />
    </div>
  )
}
