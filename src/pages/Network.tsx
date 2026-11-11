import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, UserRound } from 'lucide-react'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import ProfessionalSectionTabs from '@/components/global/ProfessionalSectionTabs'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import { Input } from '@/components/ui/input'
import { useAllProviders } from '@/hooks/useUsers'
import { useHireRequests } from '@/hooks/usePosts'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Provider } from '@/types/user.types'
import type { Post } from '@/types/post.types'
import NetworkProfessionalCard from '@/components/service-provider/NetworkProfessionalCard'
import { useSelector } from 'react-redux'
import type { UserType } from '@/types/user.types'

type NetworkList = 'discover' | 'following' | 'followers'
type NetworkCategory = 'all' | 'professionals' | 'customers'

export default function Network() {
  const { userType }: { userType: UserType } = useSelector((state: any) => state.userState)
  const basePath = userType === 'customer' ? '/customer' : '/professional'
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeList, setActiveList] = useState<NetworkList>(() => {
    const list = searchParams.get('list')
    return list === 'following' || list === 'followers' ? list : 'discover'
  })
  const [activeCategory, setActiveCategory] = useState<NetworkCategory>('all')
  const [search, setSearch] = useState('')
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useAllProviders({ search: search.trim() || undefined })

  const providers: Provider[] =
    data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const {
    data: hiringData,
    isLoading: customersLoading,
    isError: customersError,
    refetch: refetchCustomers,
  } = useHireRequests({})
  const customerPosts: Post[] =
    hiringData?.pages.flatMap((page) => page?.results ?? []) ?? []
  const customerPostByUser = new Map<string, Post>()
  customerPosts.forEach((post) => {
    if (post.user?.is_customer && post.user.user_id) {
      customerPostByUser.set(post.user.user_id, post)
    }
  })
  const customers = [...customerPostByUser.values()].filter((post) => {
    const profile = post.user?.profile
    const term = search.trim().toLowerCase()
    return !term ||
      [profile?.display_name, profile?.city, profile?.state, post.post_content]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term))
  })
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  const setList = (list: NetworkList) => {
    setActiveList(list)
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      if (list === 'discover') next.delete('list')
      else next.set('list', list)
      return next
    }, { replace: true })
  }
  const showProfessionals =
    activeCategory === 'all' || activeCategory === 'professionals'
  const showCustomers = activeCategory === 'all' || activeCategory === 'customers'
  const filteredProviders = providers.filter((provider) => {
    const term = search.trim().toLowerCase()
    return !term ||
      [
        provider.user?.profile?.display_name,
        provider.professional_title,
        provider.headline,
        provider.user?.profile?.city,
        provider.user?.profile?.state,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term))
  })
  const isDiscoverLoading =
    (showProfessionals && isLoading) || (showCustomers && customersLoading)
  const isDiscoverError =
    (showProfessionals && isError) || (showCustomers && customersError)
  const hasVisibleResults =
    (showProfessionals && filteredProviders.length > 0) ||
    (showCustomers && customers.length > 0)

  return (
    <div className="space-y-4 pb-6 md:space-y-6 max-[1023px]:min-[768px]:ml-17 lg:ml-[4.2rem]">
      <Container>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="px-4 pt-5 md:px-6 md:pt-6">
            <h1 className="text-2xl font-bold text-gray-950 md:text-3xl">
              My Network
            </h1>
            <p className="mt-1 text-sm text-gray-600 md:text-base">
              Build your network. Discover skilled professionals and create
              opportunities.
            </p>
          </div>

          <ProfessionalSectionTabs />

          <div className="grid grid-cols-2 gap-3 px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={() => setList('following')}
              className="rounded-md bg-gray-100 px-4 py-3 text-left hover:bg-gray-200"
            >
              <p className="text-2xl font-bold text-gray-950">—</p>
              <p className="text-sm text-gray-600">Following</p>
            </button>
            <button
              type="button"
              onClick={() => setList('followers')}
              className="rounded-md bg-gray-100 px-4 py-3 text-left hover:bg-gray-200"
            >
              <p className="text-2xl font-bold text-gray-950">—</p>
              <p className="text-sm text-gray-600">Followers</p>
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto border-b border-gray-200 px-4 md:px-6">
            {(['discover', 'following', 'followers'] as NetworkList[]).map(
              (list) => (
                <button
                  key={list}
                  type="button"
                  onClick={() => setList(list)}
                  className={`min-h-12 shrink-0 border-b-2 px-1 text-sm font-semibold capitalize transition-colors ${
                    activeList === list
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {list}
                </button>
              ),
            )}
          </div>

          <section
            className="px-4 py-5 md:px-6"
            aria-labelledby="network-list-heading"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  id="network-list-heading"
                  className="text-lg font-semibold text-gray-950"
                >
                  {activeList === 'discover'
                    ? 'People you may want to follow'
                    : activeList === 'following'
                      ? 'People you follow'
                      : 'Your followers'}
                </h2>
                {activeList === 'discover' && (
                  <p className="mt-1 text-sm text-gray-600">
                    Discover professionals and people with skills that interest
                    you.
                  </p>
                )}
              </div>
              {activeList === 'discover' && (
                <label className="relative block w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search people"
                    className="h-10 pl-9"
                    aria-label="Search people"
                  />
                </label>
              )}
            </div>

            {activeList === 'discover' && (
              <div className="mb-5 grid grid-cols-3 gap-2" aria-label="People type">
                {(['all', 'professionals', 'customers'] as NetworkCategory[]).map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={activeCategory === category}
                      className={`min-h-12 rounded-full px-2 py-2 text-sm font-semibold capitalize transition-colors ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            )}

            {activeList !== 'discover' ? (
              <div className="flex min-h-36 flex-col items-center justify-center gap-2 text-center text-sm text-gray-600">
                <UserRound className="size-6 text-gray-400" />
                <p>
                  Follow connections will appear here when followership is
                  enabled.
                </p>
              </div>
            ) : isDiscoverLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : isDiscoverError ? (
              <div className="py-8">
                <Error
                  text="Failed to load people"
                  buttonFunc={() => {
                    if (showProfessionals && isError) refetch()
                    if (showCustomers && customersError) refetchCustomers()
                  }}
                />
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {showProfessionals && filteredProviders.map((provider) => (
                    <NetworkProfessionalCard key={provider.provider_id} provider={provider} />
                  ))}
                  {showCustomers && customers.map((post) => {
                    const customer = post.user
                    const customerName =
                      customer?.profile?.display_name ||
                      `${customer?.first_name ?? ''} ${customer?.last_name ?? ''}`.trim() ||
                      'Customer'
                    return (
                      <article
                        key={customer?.user_id}
                        className="rounded-lg border border-gray-200 py-4 sm:px-3"
                      >
                        <div className="flex items-center gap-3">
                          <Link to={`${basePath}/customers/${customer?.user_id}`} aria-label={`View ${customerName}'s profile`} className="shrink-0">
                            <ProfileImage noStatus size="size-14" avatar={customer?.profile?.avatar?.avatar} />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link to={`${basePath}/customers/${customer?.user_id}`} className="truncate font-semibold text-gray-950 hover:text-primary">{customerName}</Link>
                            <p className="text-sm text-gray-600">
                              {[customer?.profile?.city, customer?.profile?.state]
                                .filter(Boolean)
                                .join(', ') || 'Location unavailable'}
                            </p>
                            <span className="mt-1 inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              Customer
                            </span>
                          </div>
                        </div>
                        {post.post_content && (
                          <p className="mt-3 line-clamp-2 text-sm text-gray-700">
                            {post.post_content}
                          </p>
                        )}
                        <div className="mt-3 flex justify-end gap-2">
                          <button
                            type="button"
                            disabled
                            title="Follow actions are not available until the follow API is enabled"
                            className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary disabled:cursor-not-allowed"
                          >
                            + Follow
                          </button>
                          <button
                            type="button"
                            disabled
                            title="Messaging is available after the customer follows you back"
                            className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed"
                          >
                            Message
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
                {!hasVisibleResults && (
                  <p className="py-10 text-center text-sm text-gray-600">
                    No people found.
                  </p>
                )}
                <div ref={loadMoreRef} />
                {isFetchingNextPage && (
                  <div className="py-4 text-center">
                    <Loading />
                  </div>
                )}
                {hasNextPage && (
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    className="mx-auto mt-3 block px-4 py-2 text-sm font-semibold text-primary hover:underline"
                  >
                    See more people
                  </button>
                )}
                {isFetchNextPageError && (
                  <Error
                    text="Failed to load more professionals"
                    buttonFunc={fetchNextPage}
                    buttonText="Retry"
                  />
                )}
              </>
            )}
          </section>
        </div>
      </Container>
    </div>
  )
}
