import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import GalleryDialog from '@/components/profile/GalleryDialog'
import ServiceProviderGallery from '@/components/service-provider/ServiceProviderGallery'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMyGallery } from '@/hooks/useUsers'
import type { Gallery } from '@/types/user.types'
import { Edit2, Undo2 } from 'lucide-react'
import { useState } from 'react'

export default function ProfileGallery() {
  const [editGallery, setEditGallery] = useState(false)
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useMyGallery()

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const gallery: Gallery[] = data?.pages.flatMap((page) => page.results) ?? []

  const handleGalleryFetchingError = async () => {
    refetch()
  }
  return (
    <div className="space-y-2 md:space-y-6">
      <HeaderWithBackNavigation title="Gallery" />
      <Container>
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-10">
                <Error
                  text="Failed to load gallery"
                  buttonFunc={handleGalleryFetchingError}
                />
              </div>
            ) : (
              <div className="relative">
                {editGallery ? (
                  <div className="flex items-center gap-2 absolute top-0 right-0">
                    <GalleryDialog />
                    <button
                      className="text-gray-600 hover:text-gray-500 cursor-pointer shadow-sm hover:shadow-md rounded-sm p-0.5"
                      onClick={() => setEditGallery(false)}
                    >
                      <Undo2
                        strokeWidth={2}
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                      <span className="sr-only">close edit</span>
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-primary absolute top-0 right-0 cursor-pointer text-primary/80"
                    onClick={() => setEditGallery(true)}
                  >
                    <Edit2 strokeWidth={2} className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="sr-only">open edit</span>
                  </button>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {gallery?.map((gallery) => (
                    <ServiceProviderGallery
                      key={gallery.description}
                      image={gallery.image_url}
                      editGallery={editGallery}
                    />
                  ))}
                </div>

                <div ref={loadMoreRef} />

                {isFetchingNextPage && (
                  <div className="py-4 text-center">
                    <Loading />
                  </div>
                )}
                {hasNextPage && (
                  <button
                    className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
                    onClick={() => fetchNextPage()}
                  >
                    Load more media
                  </button>
                )}
                {isFetchNextPageError && (
                  <Error
                    text="Failed to load more media"
                    buttonFunc={fetchNextPage}
                    buttonText="Retry"
                  />
                )}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
