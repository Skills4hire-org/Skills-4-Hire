import { searchFilters, serviceTypes } from '@/assets/data'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import Ratings from '@/components/global/Ratings'
import { currencyFormatter } from '@/utils/format'
import { useState } from 'react'
import { MAX_PRICE } from './filterUtils'
import type { AppliedFilters } from './filterUtils'

export function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: {
  filters: AppliedFilters
  onFiltersChange: (next: AppliedFilters) => void
  onApply: () => void
  onReset: () => void
}) {
  const [filterType, setFilterType] = useState('services')

  const toggleService = (value: string, checked: boolean) => {
    const next = checked
      ? [...filters.service, value]
      : filters.service.filter((s) => s !== value)
    onFiltersChange({ ...filters, service: next })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        {searchFilters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilterType(value)}
            className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
              filterType === value
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filterType === 'services' && (
          <div className="space-y-3">
            {serviceTypes.map(({ label, value }) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`svc-${value}`}
                  checked={filters.service.includes(value)}
                  onCheckedChange={(checked) =>
                    toggleService(value, checked as boolean)
                  }
                  className="border border-primary rounded-full"
                />
                <Label
                  htmlFor={`svc-${value}`}
                  className="text-sm lg:text-base font-normal cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {filterType === 'price' && (
          <div className="space-y-4">
            <span className="text-sm font-medium block">Price Range</span>
            <Slider
              value={filters.price}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, price: value })
              }
              min={0}
              max={MAX_PRICE}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>{currencyFormatter(filters.price[0])}</span>
              <span>{currencyFormatter(filters.price[1])}</span>
            </div>
          </div>
        )}

        {filterType === 'rating' && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((value) => (
              <div
                key={value}
                className="flex items-center gap-2 justify-between"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`rating-${value}`}
                    checked={filters.rating === value}
                    onCheckedChange={(checked) =>
                      onFiltersChange({
                        ...filters,
                        rating: checked ? value : undefined,
                      })
                    }
                    className="rounded-full border border-primary w-4 h-4"
                  />
                  <Label
                    htmlFor={`rating-${value}`}
                    className="cursor-pointer"
                  >
                    <Ratings rating={value} />
                  </Label>
                </div>
                <span className="text-sm lg:text-base">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium underline text-primary cursor-pointer"
        >
          Reset filters
        </button>
        <button
          type="button"
          onClick={onApply}
          className="px-6 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 cursor-pointer transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>
  )
}