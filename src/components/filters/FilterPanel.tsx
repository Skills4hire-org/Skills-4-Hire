import { searchFilters } from '@/assets/data'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import Ratings from '@/components/global/Ratings'
import { currencyFormatter } from '@/utils/format'
import { useState } from 'react'
import { MAX_PRICE } from './filterUtils'
import type { AppliedFilters } from './filterUtils'
import { vocationalCategories, digitalCategories } from '@/data/staticServices'

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
          <div className="space-y-4">
            {[
              { title: 'Vocational & On-Site', categories: vocationalCategories },
              { title: 'Digital Skills', categories: digitalCategories },
            ].map(({ title, categories }) => (
              <div key={title}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  {title}
                </p>
                {categories.map(({ id, name, roles }) => (
                  <div key={id} className="mb-3">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {name}
                    </p>
                    <div className="space-y-2">
                      {roles.map((role) => (
                        <div
                          key={role}
                          className="flex items-center gap-2 pl-2"
                        >
                          <Checkbox
                            id={`svc-${role}`}
                            checked={filters.service.includes(role)}
                            onCheckedChange={(checked) =>
                              toggleService(role, checked as boolean)
                            }
                            className="border border-primary rounded-full"
                          />
                          <Label
                            htmlFor={`svc-${role}`}
                            className="text-sm lg:text-base font-normal cursor-pointer"
                          >
                            {role}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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