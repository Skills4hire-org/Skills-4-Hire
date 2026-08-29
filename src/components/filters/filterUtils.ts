import { serviceTypes } from '@/assets/data'
import type { Provider } from '@/types/user.types'
import type { Post } from '@/types/post.types'

export const MAX_PRICE = 1000000

export type AppliedFilters = {
  service: string[]
  price: number[]
  rating: number | undefined
}

export const EMPTY_FILTERS: AppliedFilters = {
  service: [],
  price: [0, MAX_PRICE],
  rating: undefined,
}

function serviceLabel(value: string): string {
  return serviceTypes.find((t) => t.value === value)?.label ?? ''
}

export function matchesProviderFilters(
  provider: Provider,
  services: string[],
  price: number[],
  rating: number | undefined,
): boolean {
  if (services.length > 0) {
    const title = (provider.professional_title || '').toLowerCase()
    const headline = (provider.headline || '').toLowerCase()
    const match = services.some((svc) => {
      const label = serviceLabel(svc).toLowerCase()
      const labelTokens = label.split(/\s+/).filter(Boolean)
      return labelTokens.some(
        (lt) =>
          lt.length > 2 &&
          (title.includes(lt) ||
            headline.includes(lt) ||
            lt.includes(title) ||
            lt.includes(headline)),
      )
    })
    if (!match) return false
  }
  const [minPrice, maxPrice] = price
  const charge = Number(provider.min_charge ?? 0)
  if (minPrice > 0 && charge < minPrice) return false
  if (maxPrice < MAX_PRICE && charge > maxPrice) return false
  if (rating !== undefined && Number(provider.avg_rating ?? 0) < rating)
    return false
  return true
}

export function matchesPostFilters(
  post: Post,
  services: string[],
  price: number[],
): boolean {
  if (services.length > 0) {
    const tag = (post.tags?.[0]?.name ?? '').toLowerCase()
    const match = services.some((svc) => {
      const label = serviceLabel(svc).toLowerCase()
      return !!label && (tag.includes(label) || label.includes(tag))
    })
    if (!match) return false
  }
  const [minPrice, maxPrice] = price
  const amount = Number(post.amount ?? 0)
  if (minPrice > 0 && amount < minPrice) return false
  if (maxPrice < MAX_PRICE && amount > maxPrice) return false
  return true
}

export function countActiveFilters(filters: AppliedFilters): number {
  return (
    filters.service.length +
    (filters.price[0] !== 0 ? 1 : 0) +
    (filters.price[1] !== MAX_PRICE ? 1 : 0) +
    (filters.rating !== undefined ? 1 : 0)
  )
}