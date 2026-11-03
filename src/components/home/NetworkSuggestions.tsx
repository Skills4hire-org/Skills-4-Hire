import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileImage from '@/components/global/ProfileImage'
import { useAllProviders } from '@/hooks/useUsers'
import { useHireRequests } from '@/hooks/usePosts'
import type { RootState } from '@/store'
import type { Provider } from '@/types/user.types'
import type { Post } from '@/types/post.types'

export default function NetworkSuggestions() {
  const { userType } = useSelector((state: RootState) => state.userState)
  const isProfessional = userType === 'professional'
  const {
    data: providerData,
    isLoading: providersLoading,
  } = useAllProviders({ enabled: userType === 'customer' })
  const {
    data: hiringData,
    isLoading: customersLoading,
  } = useHireRequests({ enabled: isProfessional })

  const providers: Provider[] =
    providerData?.pages.flatMap((page) => page?.results ?? []).slice(0, 3) ?? []
  const requestPosts: Post[] =
    hiringData?.pages.flatMap((page) => page?.results ?? []) ?? []
  const customers = Array.from(
    new Map(
      requestPosts
        .filter((post) => post.user?.is_customer && post.user.user_id)
        .map((post) => [post.user!.user_id, post]),
    ).values(),
  ).slice(0, 3)

  const isLoading = isProfessional ? customersLoading : providersLoading
  if (isLoading || (!isProfessional && userType !== 'customer')) return null

  return (
    <section className="space-y-3 border-y border-gray-200 bg-white px-4 py-4 md:rounded-lg md:border md:px-5">
      <div>
        <h2 className="font-semibold text-gray-950">People to connect with</h2>
        <p className="text-sm text-gray-600">
          {isProfessional
            ? 'Customers looking for skilled professionals'
            : 'Professionals with skills you may need'}
        </p>
      </div>

      {isProfessional ? (
        customers.length ? (
          <div className="divide-y divide-gray-200">
            {customers.map((post) => {
              const customer = post.user
              const name =
                customer?.profile?.display_name ||
                `${customer?.first_name ?? ''} ${customer?.last_name ?? ''}`.trim() ||
                'Customer'
              return (
                <article key={customer?.user_id} className="py-3 first:pt-0">
                  <div className="flex items-center gap-3">
                    <ProfileImage
                      noStatus
                      size="size-11"
                      avatar={customer?.profile?.avatar?.avatar}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">
                        {name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {[customer?.profile?.city, customer?.profile?.state]
                          .filter(Boolean)
                          .join(', ') || 'Customer'}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled
                      title="Follow actions are not available until the follow API is enabled"
                      className="shrink-0 rounded-full border border-primary px-3 py-1.5 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      + Follow
                    </button>
                  </div>
                  {post.post_content && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-700">
                      {post.post_content}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled
                    title="Messaging is available after the customer follows you back"
                    className="mt-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Message
                  </button>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No customers to suggest right now.</p>
        )
      ) : providers.length ? (
        <div className="divide-y divide-gray-200">
          {providers.map((provider) => (
            <article
              key={provider.provider_id}
              className="flex items-center gap-3 py-3 first:pt-0"
            >
              <Link
                to={`/customer/professionals/${provider.provider_id}`}
                className="shrink-0"
              >
                <ProfileImage
                  noStatus
                  size="size-11"
                  avatar={provider.user?.profile?.avatar?.avatar}
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-gray-950">
                  {provider.user?.profile?.display_name}
                </p>
                <p className="truncate text-sm text-gray-600">
                  {provider.professional_title} ·{' '}
                  {[provider.user?.profile?.city, provider.user?.profile?.state]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
              <button
                type="button"
                disabled
                title="Follow actions are not available until the follow API is enabled"
                className="shrink-0 rounded-full border border-primary px-3 py-1.5 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                + Follow
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No professionals to suggest right now.</p>
      )}
    </section>
  )
}