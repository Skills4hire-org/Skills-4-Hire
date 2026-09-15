import type { SelectItems } from '@/utils/types'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { ChevronDownIcon, Search, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

type SelectGroupData = {
  label: string
  options: {
    label: string
    options: SelectItems[]
  }[]
}

interface FormSelectFieldProp {
  name: string
  label?: string
  labelSize?: string
  value: string | undefined
  handleInputChange: (key: string, value: any) => void
  placeholder?: string
  required?: boolean
  selectGroupData: SelectGroupData[]
  className?: string
  disabled?: boolean
  handleBlur?: () => void
  align?: 'end' | 'center' | 'start'
  selectContentClassName?: string
  selectItemClassName?: string
  sideOffset?: number
  indicator?: boolean
  searchable?: boolean
  searchPlaceholder?: string
}

const filterGroupedData = (
  data: SelectGroupData[],
  query: string,
): SelectGroupData[] => {
  const q = query.trim().toLowerCase()
  if (!q) return data

  return data
    .map((group) => {
      const groupMatches = group.label.toLowerCase().includes(q)
      const options = group.options
        .map((sub) => {
          if (sub.label.toLowerCase().includes(q)) return sub
          const matchingOptions = sub.options.filter((option) =>
            option.label.toLowerCase().includes(q),
          )
          return matchingOptions.length > 0
            ? { ...sub, options: matchingOptions }
            : null
        })
        .filter((sub): sub is NonNullable<typeof sub> => sub !== null)
      if (groupMatches || options.length > 0) {
        return groupMatches ? group : { ...group, options }
      }
      return null
    })
    .filter((group): group is NonNullable<typeof group> => group !== null)
}

export default function FormSelectGroup({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  selectGroupData,
  required,
  className,
  disabled,
  handleBlur,
  align,
  selectContentClassName,
  selectItemClassName,
  sideOffset,
  indicator,
  searchable,
  searchPlaceholder = 'Search...',
  labelSize,
}: FormSelectFieldProp) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredData = useMemo(
    () => filterGroupedData(selectGroupData, query),
    [selectGroupData, query],
  )

  const hasResults = filteredData.some((group) =>
    group.options.some((sub) => sub.options.length > 0),
  )

  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className={`text-sm md:text-base ${labelSize}`}>
          {label}
        </Label>
      )}
      <Select
        key={value === undefined ? 'undefined' : 'defined'}
        value={value}
        onValueChange={(value) => handleInputChange(name, value)}
        required={required}
        disabled={disabled}
        name={name}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (isOpen && searchable) {
            requestAnimationFrame(() => inputRef.current?.focus())
          } else {
            setQuery('')
          }
          handleBlur?.()
        }}
      >
        <SelectTrigger
          className={`w-full relative  text-sm md:text-base pl-4 cursor-pointer  ${className}`}
        >
          <SelectValue placeholder={placeholder} />
          {indicator && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              <ChevronDownIcon
                strokeWidth={3}
                className="w-5 h-5 text-foreground"
              />
            </span>
          )}
        </SelectTrigger>
        <SelectContent
          align={align}
          sideOffset={sideOffset}
          className={cn('max-h-80', selectContentClassName)}
        >
          {searchable && (
            <div className="sticky top-0 z-10 -mx-1 mb-1 border-b bg-popover p-1.5 px-2.5">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-9 pl-8 pr-8"
                  onKeyDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  role="combobox"
                  aria-expanded="true"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>
          )}
          {hasResults ? (
            filteredData.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel className="capitalize text-lg">
                  {group.label}
                </SelectLabel>
                {group.options.map((item) => (
                  <SelectGroup key={item.label}>
                    <SelectLabel className="capitalize text-base ml-1">
                      {item.label}
                    </SelectLabel>
                    {item.options.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={cn(selectItemClassName, 'ml-2')}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectGroup>
            ))
          ) : (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}