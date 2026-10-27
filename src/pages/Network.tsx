import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, UserRound } from 'lucide-react'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import ProfessionalSectionTabs from '@/components/global/ProfessionalSectionTabs'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import { Input } from '@/components/ui/input'
import { useAllProviders } from '@/hooks/useUsers'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import type { Provider } from '@/types/user.types'

type NetworkList = 'discover' | 'following' | 'followers'

export default function Network() {
  const [activeList, setActiveList] = useState<NetworkList>('discover')
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
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

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
            <div className="rounded-md bg-gray-100 px-4 py-3">
              <p className="text-2xl font-bold text-gray-950">—</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
            <div className="rounded-md bg-gray-100 px-4 py-3">
              <p className="text-2xl font-bold text-gray-950">—</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto border-b border-gray-200 px-4 md:px-6">
            {(['discover', 'following', 'followers'] as NetworkList[]).map(
              (list) => (
                <button
                  key={list}
                  type="button"
                  onClick={() => setActiveList(list)}
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
                    placeholder="Search professionals"
                    className="h-10 pl-9"
                    aria-label="Search professionals"
                  />
                </label>
              )}
            </div>

            {activeList !== 'discover' ? (
              <div className="flex min-h-36 flex-col items-center justify-center gap-2 text-center text-sm text-gray-600">
                <UserRound className="size-6 text-gray-400" />
                <p>
                  Follow connections will appear here when followership is
                  enabled.
                </p>
              </div>
            ) : isLoading ? (
              <div className="h-24">
                <Loading />
              </div>
            ) : isError ? (
              <div className="py-8">
                <Error
                  text="Failed to load professionals"
                  buttonFunc={() => refetch()}
                />
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {providers.map((provider) => (
                    <article
                      key={provider.provider_id}
                      className="flex items-center gap-3 py-4 first:pt-1"
                    >
                      <Link
                        to={`/professional/professionals/${provider.provider_id}`}
                        aria-label={`View ${provider.user?.profile?.display_name ?? 'professional'} profile`}
                        className="shrink-0"
                      >
                        <ProfileImage
                          noStatus
                          size="size-14"
                          avatar={provider.user?.profile?.avatar?.avatar}
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/professional/professionals/${provider.provider_id}`}
                          className="font-semibold text-gray-950 hover:text-primary"
                        >
                          {provider.user?.profile?.display_name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          {provider.professional_title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {provider.headline}
                        </p>
                        <p className="text-sm text-gray-600">
                          {[provider.user?.profile?.city, provider.user?.profile?.state]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled
                        title="Follow actions are not available until the follow API is enabled"
                        className="shrink-0 rounded-full border border-primary px-3 py-1.5 text-sm font-semibold text-primary opacity-60 disabled:cursor-not-allowed"
                      >
                        + Follow
                      </button>
                    </article>
                  ))}
                </div>
                {providers.length === 0 && (
                  <p className="py-10 text-center text-sm text-gray-600">
                    No professionals found.
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