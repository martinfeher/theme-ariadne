"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: readonly ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  boxClassName?: string
  disabled?: boolean
  /** e.g. map pin for location picker */
  leadingIcon?: React.ReactNode
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  boxClassName,
  disabled = false,
  leadingIcon,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[150px] justify-between gap-2 truncate border-0 px-4 py-2 hover:bg-transparent",
            leadingIcon ? "rounded-lg" : "rounded-none pr-4 hover:bg-transparent",
            className
          )}
          disabled={disabled}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {leadingIcon}
            <span
              className={cn(
                "min-w-0 truncate text-left",
                leadingIcon && !selectedOption && "text-green-600",
                leadingIcon && selectedOption && "text-green-700"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          {leadingIcon ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", boxClassName)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    onValueChange?.(newValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-100"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Alternative simpler version for basic use cases
export function SimpleCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
}: {
  options: string[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}) {
  const comboboxOptions: ComboboxOption[] = options.map((option) => ({
    value: option.toLowerCase(),
    label: option,
  }))

  return (
    <Combobox
      options={comboboxOptions}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  )
}
