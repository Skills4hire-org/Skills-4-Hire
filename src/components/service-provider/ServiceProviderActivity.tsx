import { serviceProviderActivityTabList } from '@/assets/data'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'
import { TabsContent } from '@radix-ui/react-tabs'
import PostCard from '../home/PostCard'
import type { ServiceProvider } from '@/utils/types'
import { Link } from 'react-router-dom'
import ServiceProviderGallery from './ServiceProviderGallery'
import { ArrowRight } from 'lucide-react'
import EmptyTab from './EmptyTab'
import CommentCard from '../global/CommentCard'

export default function ServiceProviderActivity({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg md:text-xl ">Activity</h2>
      <Tabs defaultValue="posts" className="space-y-1 ">
        <TabsList className="border-b-0 bg-background  rounded-none  p-0 space-x-4 md:space-x-8">
          {serviceProviderActivityTabList.map((status, index) => {
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
            <TabsContent key={status} value={status} className="pb-10 md:pb-12">
              {status === 'posts' && (
                <>
                  {getServiceProvider?.posts
                    ?.slice(0, 1)
                    ?.map((post, index) => (
                      <PostCard key={index} {...post} />
                    ))}

                  {getServiceProvider?.posts?.length == 0 ||
                  !getServiceProvider?.posts ? (
                    <div className="pt-10 md:pt-12">
                      <EmptyTab label="posts" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/service-provider/${getServiceProvider?.id}/activity`}
                      className="border-t py-2  text-base md:text-lg font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all posts
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </>
              )}
              {status === 'images' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {getServiceProvider?.postImages
                    ?.slice(0, 4)
                    ?.map((image, index) => (
                      <ServiceProviderGallery key={index} image={image} />
                    ))}
                  {getServiceProvider?.postImages?.length == 0 ||
                  !getServiceProvider?.postImages ? (
                    <div className="pt-10 md:pt-12 mb-1 ">
                      <EmptyTab label="image uploaded" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/service-provider/${getServiceProvider?.id}/activity`}
                      className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all images
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
              {status === 'comments' && (
                <>
                  <div className="grid gap-2 md:gap-4">
                    {getServiceProvider?.comments
                      ?.slice(0, 1)
                      ?.map((comment) => (
                        <div className=" rounded-sm shadow-sm border border-gray-200 overflow-hidden">
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
                  {getServiceProvider?.comments?.length == 0 ||
                  !getServiceProvider?.comments ? (
                    <div className="pt-10 md:pt-12">
                      <EmptyTab label="comments" />
                    </div>
                  ) : (
                    <Link
                      to={`/customer/service-provider/${getServiceProvider?.id}/activity`}
                      className="border-t py-2  text-base md:text-lg mt-2 font-medium absolute left-1/2 -translate-x-1/2 bottom-0 w-full  flex items-center justify-center gap-2 hover:bg-gray-300"
                    >
                      Show all comments
                      <ArrowRight strokeWidth={3} className="w-4 h-4" />
                    </Link>
                  )}
                </>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
