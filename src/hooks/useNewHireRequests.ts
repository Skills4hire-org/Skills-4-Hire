import { useEffect, useMemo, useState } from 'react'
import { useHireRequests } from './usePosts'
import type { Post } from '@/types/post.types'

const SEEN_STORAGE_KEY = 's4h:seen-hire-requests'
const SEEN_EVENT = 's4h:hire-requests-seen'
const MAX_SEEN = 500

function loadSeen(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed) : new Set()
  } catch {
    return new Set()
  }
}

function saveSeen(seen: Set<string>) {
  try {
    localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify([...seen].slice(-MAX_SEEN)))
  } catch {
    // storage unavailable
  }
}

export const markHireRequestsSeen = (postIds: string[]) => {
  const ids = postIds.filter((id): id is string => Boolean(id))
  if (ids.length === 0) return
  const seen = loadSeen()
  ids.forEach((id) => seen.add(id))
  saveSeen(seen)
  window.dispatchEvent(new Event(SEEN_EVENT))
}

export const useNewHireRequestsCount = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  const [seen, setSeen] = useState<Set<string>>(loadSeen)
  const { data } = useHireRequests({ enabled })

  useEffect(() => {
    const refresh = () => setSeen(loadSeen())
    window.addEventListener(SEEN_EVENT, refresh)
    return () => window.removeEventListener(SEEN_EVENT, refresh)
  }, [])

  const firstPageIds = useMemo(() => {
    const results: Post[] = data?.pages?.[0]?.results ?? []
    return results
      .map((post) => post.post_id)
      .filter((id): id is string => Boolean(id))
  }, [data])

  const count = useMemo(
    () => firstPageIds.filter((id) => !seen.has(id)).length,
    [firstPageIds, seen],
  )

  return { count }
}
