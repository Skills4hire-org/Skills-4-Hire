import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapPin, MessageCircle, UserRound } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ProfileImage from '@/components/global/ProfileImage'
import { Button } from '@/components/ui/button'
import { useCreateConversation } from '@/hooks/useChats'
import { useUserPosts } from '@/hooks/usePosts'
import type { Post } from '@/types/post.types'
import type { UserType } from '@/types/user.types'
import { currencyFormatter } from '@/utils/format'

export default function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useUserPosts({ id })
  const { user_data: viewer, userType }: { user_data: { user_id: string } | null; userType: UserType } = useSelector((state: any) => state.userState)
  const { mutate: createConversation, isPending } = useCreateConversation()
  const posts: Post[] = data?.pages.flatMap((page) => page?.results ?? []) ?? []
  const profilePost = posts.find((post) => post.user?.user_id === id) ?? posts[0]
  const customer = profilePost?.user
  const name = customer?.profile?.display_name || `${customer?.first_name ?? ''} ${customer?.last_name ?? ''}`.trim() || 'Customer'
  const location = [customer?.profile?.city, customer?.profile?.state].filter(Boolean).join(', ')
  const hireRequests = useMemo(() => posts.filter((post) => post.post_type === 'JOB'), [posts])
  const ownProfile = viewer?.user_id === id

  const messageCustomer = () => {
    if (!id) return
    createConversation({ participant_two_id: id }, {
      onSuccess: (conversation) => {
        if (!conversation?.conversation_id) return toast.error('Unable to open a conversation.')
        const basePath = userType === 'customer' ? '/customer' : '/professional'
        navigate(`${basePath}/messages/${conversation.conversation_id}`)
      },
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <div className="mx-auto max-w-3xl pb-10 lg:ml-17 max-[1023px]:min-[768px]:ml-17 pt-5">
      <Container>
        <Link to={`/${userType ?? 'customer'}/network`} className="mb-4 inline-block text-sm font-medium text-primary hover:underline">← Back to network</Link>
        {isLoading ? <div className="h-32"><Loading /></div> : isError ? (
          <Error text="Could not load this customer profile" buttonFunc={refetch} />
        ) : !customer ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-600">
            <UserRound className="mx-auto mb-2 size-8 text-gray-400" />
            <p>This customer profile is not available yet.</p>
          </div>
        ) : (
          <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 md:p-7">
            <div className="flex items-center gap-4">
              <ProfileImage noStatus size="size-20" avatar={customer.profile?.avatar?.avatar} />
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold text-gray-950 md:text-2xl">{name}</h1>
                <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">Customer</span>
                {location && <p className="mt-1 flex items-center gap-1 text-gray-600"><MapPin className="size-4" />{location}</p>}
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="text-gray-600">{profilePost?.post_content || 'This customer has not added an about section yet.'}</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold">Interested in</h2>
              <p className="text-sm text-gray-500">No interests shared yet.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Active hire requests</h2>
              {hireRequests.length ? hireRequests.map((post) => (
                <article key={post.post_id} className="rounded-xl bg-gray-100 p-4">
                  <h3 className="font-semibold text-gray-950">{post.post_title || 'Hire request'}</h3>
                  {post.post_content && <p className="mt-1 text-sm text-gray-600">{post.post_content}</p>}
                  {post.amount && <p className="mt-1 text-sm text-gray-600">Budget: {currencyFormatter(Number(post.amount))}</p>}
                </article>
              )) : <p className="text-sm text-gray-500">No hire requests to show.</p>}
            </section>

            <div className="grid grid-cols-2 gap-3 border-y py-4 text-center">
              <div><p className="font-semibold">—</p><p className="text-sm text-gray-500">Followers</p></div>
              <div><p className="font-semibold">—</p><p className="text-sm text-gray-500">Following</p></div>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Recent posts</h2>
              {posts.length ? posts.slice(0, 3).map((post) => (
                <article key={post.post_id} className="rounded-lg border border-gray-100 p-3">
                  <p className="line-clamp-3 text-sm text-gray-700">{post.post_content || post.post_title}</p>
                </article>
              )) : <p className="text-sm text-gray-500">No recent posts to show.</p>}
            </section>

            {!ownProfile && <div className="flex gap-3 pt-2">
              <Button type="button" disabled className="flex-1">+ Follow</Button>
              <Button type="button" variant="outline" className="flex-1" onClick={messageCustomer} disabled={isPending}>
                <MessageCircle className="mr-2 size-4" />Message
              </Button>
            </div>}
          </div>
        )}
      </Container>
    </div>
  )
}
