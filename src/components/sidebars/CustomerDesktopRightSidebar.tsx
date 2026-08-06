import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import defaultImage from '../../assets/images/profile.jpg'
import Error from '../global/Error'
import Loading from '../global/Loading'
import { useAllProviders } from '@/hooks/useUsers'
import { useHireRequests } from '@/hooks/usePosts'
import type { RootState } from '@/store'
import type { Provider, UserType } from '@/types/user.types'
import type { Post } from '@/types/post.types'

function SuggestedProfessionals() {
  const {
    data: providersData,
    isLoading,
    isError,
    refetch,
  } = useAllProviders({})

  const providers: Provider[] =
    providersData?.pages.flatMap((page) => page?.results ?? []) ?? []
  const suggestedProfessionals = providers.slice(0, 3)

  return (
    <>
      <section className="p-3">
        <h3 className="font-semibold text-gray-700 mb-3">
          Suggested professionals
        </h3>
        {isLoading ? (
          <div className="py-4">
            <Loading />
          </div>
        ) : isError ? (
          <Error text="Failed to load professionals" buttonFunc={refetch} />
        ) : suggestedProfessionals.length === 0 ? (
          <p className="text-sm text-gray-500">
            No suggested professionals available right now.
          </p>
        ) : (
          <div className="space-y-3">
            {suggestedProfessionals.map((provider) => (
              <Link
                key={provider.provider_id}
                to={`/customer/professionals/${provider.provider_id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    provider?.user?.profile?.avatar?.avatar ?? defaultImage
                  }
                  alt={
                    provider?.user?.profile?.display_name || 'professional'
                  }
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {provider?.user?.profile?.display_name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="text-yellow-500">★</span>{' '}
                    {Number(provider.avg_rating ?? 0).toFixed(1)} ·{' '}
                    {provider.professional_title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link
          to="/customer/services/search"
          className="mt-3 inline-block text-sm text-[#222BDE] font-medium hover:underline"
        >
          See all
        </Link>
      </section>
      <section className="p-3">
        <h3 className="font-semibold text-gray-700 mb-3">Suggested services</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Moving', 'Painting', 'Handyman', 'Cleaning'].map((service) => (
            <span
              key={service}
              className="px-3 py-4 text-xs text-gray-600 border border-gray-300 rounded-md text-center"
            >
              {service}
            </span>
          ))}
        </div>
      </section>
      <section className="p-3">
        <h3 className="font-semibold text-gray-700 mb-3">Quick Tips</h3>
        <div className="bg-[#ECF4FB] rounded-lg p-3 space-y-3">
          {[
            'Check provider reviews and ratings before hiring.',
            'Always verify provider credentials and insurance.',
            'Communicate clearly about your service needs.',
            'Get multiple quotes before meeting with the provider.',
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#222BDE] text-white flex items-center justify-center text-xs mt-0.5">
                ✓
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function PeopleCurrentlyHiring() {
  const {
    data: hireRequestsData,
    isLoading,
    isError,
    refetch,
  } = useHireRequests({})

  const hiringPosts: Post[] =
    hireRequestsData?.pages
      .flatMap((page) => page?.results ?? [])
      .filter((post) => post?.post_type?.toUpperCase() === 'JOB') ?? []

  const seenUserIds = new Set<string>()
  const peopleHiring = hiringPosts
    .filter((post) => {
      const userId = post.user?.user_id
      if (!userId || seenUserIds.has(userId)) return false
      seenUserIds.add(userId)
      return true
    })
    .slice(0, 3)

  return (
    <>
      <section className="p-3">
        <h3 className="font-semibold text-gray-700 mb-3">
          People currently hiring
        </h3>
        {isLoading ? (
          <div className="py-4">
            <Loading />
          </div>
        ) : isError ? (
          <Error text="Failed to load hiring people" buttonFunc={refetch} />
        ) : peopleHiring.length === 0 ? (
          <p className="text-sm text-gray-500">
            No one is hiring right now. Check back soon.
          </p>
        ) : (
          <div className="space-y-3">
            {peopleHiring.map((post) => {
              const name =
                post.user?.profile?.display_name ||
                `${post.user?.first_name ?? ''} ${post.user?.last_name ?? ''}`.trim() ||
                'Customer'
              const hiringFor = post.tags?.[0]?.name || post.post_title
              return (
                <Link
                  key={post.post_id}
                  to="/professional/home/request"
                  className="flex items-center gap-3"
                >
                  <img
                    src={post.user?.profile?.avatar?.avatar ?? defaultImage}
                    alt={name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="text-green-500">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />
                        Hiring
                      </span>
                      {hiringFor && (
                        <>
                          <span>·</span>
                          <span className="truncate">{hiringFor}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <Link
          to="/professional/home/request"
          className="mt-3 inline-block text-sm text-[#222BDE] font-medium hover:underline"
        >
          See all
        </Link>
      </section>
      <section className="p-3">
        <h3 className="font-semibold text-gray-700 mb-3">Suggested services</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Moving', 'Painting', 'Handyman', 'Cleaning'].map((service) => (
            <span
              key={service}
              className="px-3 py-4 text-xs text-gray-600 border border-gray-300 rounded-md text-center"
            >
              {service}
            </span>
          ))}
        </div>
      </section>
      <section className="flex-1 p-3">
        <h3 className="font-semibold text-gray-700 mb-3">Quick Tips</h3>
        <div className="bg-[#ECF4FB] rounded-lg p-3 space-y-3">
          {[
            'Respond quickly to hire requests to win more jobs.',
            'Showcase your skills with a complete profile and gallery.',
            'Keep your service pricing clear and competitive.',
            'Deliver quality work to earn great reviews and referrals.',
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#222BDE] text-white flex items-center justify-center text-xs mt-0.5">
                ✓
              </span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default function CustomerDesktopRightSidebar() {
  const { userType }: { userType: UserType } = useSelector(
    (state: RootState) => state.userState,
  )

  if (userType === 'customer') return <SuggestedProfessionals />

  return <PeopleCurrentlyHiring />
}
