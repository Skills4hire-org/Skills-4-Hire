import { useQuery } from '@tanstack/react-query'
import { serviceTypes } from '@/assets/data'
import { getServiceCategories } from '@/api/services'
import type { ServiceCategory } from '@/types/services.types'
import type { SelectItems } from '@/utils/types'

const fallbackOptions: SelectItems[] = serviceTypes.map(({ label }) => ({
  label,
  value: label,
}))

function categorizeNames(list: ServiceCategory[]): string[] {
  const names: string[] = []
  for (const item of list) {
    const candidate = item.category?.name ?? item.name ?? item.category_name
    const name = typeof candidate === 'string' ? candidate.trim() : ''
    if (name && !names.includes(name)) names.push(name)
  }
  return names.slice().sort((a, b) => a.localeCompare(b))
}

function toSelectGroupData(options: SelectItems[]) {
  return [
    {
      label: 'Profession',
      options: [
        {
          label: 'Professions',
          options,
        },
      ],
    },
  ]
}

export function useProfessionOptions() {
  const { data: categories } = useQuery<ServiceCategory[]>({
    queryKey: ['profession-categories'],
    queryFn: getServiceCategories,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })

  const apiNames = categorizeNames(categories ?? [])
  const options: SelectItems[] =
    apiNames.length > 0
      ? apiNames.map((name) => ({ label: name, value: name }))
      : fallbackOptions

  return {
    options,
    selectGroupData: toSelectGroupData(options),
    isUsingApi: apiNames.length > 0,
  }
}