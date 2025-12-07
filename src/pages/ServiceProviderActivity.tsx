import { serviceProviderActivityTabList } from '@/assets/data'
import CommentCard from '@/components/global/CommentCard'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import PostCard from '@/components/home/PostCard'
import ServiceProviderGallery from '@/components/service-provider/ServiceProviderGallery'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { serviceAround } from '@/utils/database'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ServiceProviderActivity() {
  const { id } = useParams()
  const serviceProvider = serviceAround?.find(
    (provider) => provider.id === Number(id)
  )
  const getEmptyTab = (status: 'posts' | 'comments' | 'images') => {
    if (serviceProvider && !serviceProvider[status]) {
      return status
    }
  }
  const [visiblePostsCount, setVisiblePostsCount] = useState(1)
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(1)
  const [visibleImagesCount, setVisibleImagesCount] = useState(1)
  const handleVisibleTabContent = (
    prev: number,
    setPrev: (value: number) => void
  ) => {
    setPrev(prev + 12)
  }

  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="All Activity" />
      <Container>
        <Tabs defaultValue="posts" className="space-y-1 ">
          <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8">
            {serviceProviderActivityTabList.map((status, index) => {
              const emptyTab = getEmptyTab(status)
              if (emptyTab) {
                return
              }
              return (
                <TabsTrigger
                  key={index}
                  value={status}
                  className={cn(
                    'bg-background cursor-pointer capitalize border border-muted-foreground px-4 pt-2 pb-2.5 rounded-full text-base md:text-lg text-muted-foreground data-[state=active]:bg-green-700 data-[state=active]:border-green-700 data-[state=active]:text-white data-[state=active]:border-b-1 font-medium'
                  )}
                >
                  {status}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {serviceProviderActivityTabList.map((status) => {
            return (
              <TabsContent key={status} value={status}>
                {status === 'posts' && (
                  <div className="grid gap-2 md:gap-4">
                    {serviceProvider?.posts
                      ?.slice(0, visiblePostsCount)
                      ?.map((post, index) => (
                        <PostCard key={index} {...post} />
                      ))}
                    {(serviceProvider?.services &&
                      serviceProvider?.services?.length <=
                        visiblePostsCount) || (
                      <button
                        className="text-xs md:text-sm mx-auto my-2 font-medium hover:text-primary cursor-pointer "
                        onClick={() =>
                          handleVisibleTabContent(
                            visiblePostsCount,
                            setVisiblePostsCount
                          )
                        }
                      >
                        Show more posts
                      </button>
                    )}
                  </div>
                )}
                {status === 'images' && (
                  <>
                    {' '}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                      {serviceProvider?.postImages
                        ?.slice(0, visibleImagesCount)
                        ?.map((image, index) => (
                          <ServiceProviderGallery key={index} image={image} />
                        ))}
                    </div>
                    {(serviceProvider?.services &&
                      serviceProvider?.services?.length <=
                        visibleImagesCount) || (
                      <button
                        className="text-xs md:text-sm mx-auto my-4 font-medium hover:text-primary cursor-pointer block"
                        onClick={() =>
                          handleVisibleTabContent(
                            visibleImagesCount,
                            setVisibleImagesCount
                          )
                        }
                      >
                        Show more images
                      </button>
                    )}
                  </>
                )}
                {status === 'comments' && (
                  <>
                    <div className="grid gap-2 md:gap-4">
                      {serviceProvider?.comments
                        ?.slice(0, visibleCommentsCount)
                        ?.map((comment) => (
                          <div className=" rounded-sm shadow-sm border border-gray-200 overflow-hidden">
                            {/* Original Post Preview */}

                            <div className="p-2 md:p-4 space-y-2 md:space-y-4">
                              <p className="text-xs font-medium tracking-wide flex items-center gap-1 pb-2 md:pb-4 border-b">
                                <span className="text-foreground">
                                  {comment.name}
                                </span>
                                <span className="text-muted-foreground">
                                  commented on this
                                </span>
                              </p>

                              <PostCard {...comment.post} />
                            </div>

                            {/* Comment Section */}
                            <div className="p-2 md:p-4 bg-white grid gap-6">
                              {/* Comment Content */}
                              {comment.comments.map((singleComment, index) => (
                                <CommentCard key={index} {...singleComment} />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                    {(serviceProvider?.comments &&
                      serviceProvider?.comments?.length <=
                        visibleCommentsCount) || (
                      <button
                        className="text-xs md:text-sm mx-auto my-4 font-medium hover:text-primary cursor-pointer block"
                        onClick={() =>
                          handleVisibleTabContent(
                            visibleCommentsCount,
                            setVisibleCommentsCount
                          )
                        }
                      >
                        Show more comments
                      </button>
                    )}
                  </>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </Container>
    </div>
  )
}
