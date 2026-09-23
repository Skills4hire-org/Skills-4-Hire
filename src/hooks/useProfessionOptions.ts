import { useQuery } from '@tanstack/react-query'
import { skillsTypes } from '@/assets/data'
import { getServiceCategories } from '@/api/services'
import type { ServiceCategory } from '@/types/services.types'
import type { SelectItems } from '@/utils/types'

type SkillGroup = {
  label: string
  options: { label: string; options: SelectItems[] }[]
}

function flattenSkills(types: SkillGroup[]): SelectItems[] {
  return types.flatMap((group) =>
    group.options.flatMap((sub) => sub.options),
  )
}

function groupSkills(list: ServiceCategory[]): SkillGroup {
  const categoryMap = new Map<string, Set<string>>()

  for (const item of list) {
    const skill = typeof item.name === 'string' ? item.name.trim() : ''
    if (!skill) continue

    const rawCategory = item.category?.name
    const categoryName =
      typeof rawCategory === 'string' && rawCategory.trim()
        ? rawCategory.trim()
        : 'Other'

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, new Set())
    }
    categoryMap.get(categoryName)?.add(skill)
  }

  const subgroups = Array.from(categoryMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([categoryName, skills]) => ({
      label: categoryName,
      options: Array.from(skills)
        .sort((a, b) => a.localeCompare(b))
        .map((skill) => ({ label: skill, value: skill })),
    }))

  return { label: 'Profession', options: subgroups }
}

export function useProfessionOptions() {
  const { data: categories } = useQuery<ServiceCategory[]>({
    queryKey: ['profession-categories'],
    queryFn: getServiceCategories,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })

  const grouped =
    categories && categories.length > 0 ? groupSkills(categories) : null

  if (!grouped || grouped.options.length === 0) {
    return {
      options: flattenSkills(skillsTypes),
      selectGroupData: skillsTypes,
      isUsingApi: false,
    }
  }

  return {
    options: flattenSkills([grouped]),
    selectGroupData: [grouped],
    isUsingApi: true,
  }
}