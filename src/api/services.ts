import { api } from '@/utils/axiosConfig'
import { handleApiError } from './error'
import type { ServiceCategory } from '@/types/services.types'

export const getAllServices = async ({
  category,
  pageParam,
}: {
  category?: string
  pageParam?: string
}) => {
  try {
    if (pageParam) {
      const response = await api.get(pageParam)
      return response?.data
    }
    const response = await api.get('/api/v1/services/', {
      params: category ? { category__name: category } : undefined,
    })
    return response?.data
  } catch (error) {
    handleApiError(error)
  }
}

type GroupedSkill = { main_service_id?: string; name?: string; description?: string | null }
type CategoryGroup = {
  service_category_id?: string
  name?: string
  services?: GroupedSkill[]
}

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const response = await api.get('/api/v1/services-categories/')
    const payload = response.data
    const list: unknown[] = Array.isArray(payload)
      ? payload
      : payload?.results ?? payload?.data ?? []
    if (!Array.isArray(list)) return []

    const firstSkill = list[0] as unknown as { services?: unknown } | undefined
    const isGrouped = !!firstSkill && Array.isArray(firstSkill.services)

    if (!isGrouped) return list as unknown as ServiceCategory[]

    const flat: ServiceCategory[] = []
    for (const raw of list) {
      const group = raw as unknown as CategoryGroup
      const categoryId = group.service_category_id ?? ''
      const categoryName = group.name || 'Other'
      for (const skill of group.services ?? []) {
        if (!skill.name) continue
        flat.push({
          main_service_id: skill.main_service_id,
          name: skill.name,
          category: { service_category_id: categoryId, name: categoryName },
        })
      }
    }
    return flat
  } catch (error) {
    handleApiError(error)
    throw error
  }
}
