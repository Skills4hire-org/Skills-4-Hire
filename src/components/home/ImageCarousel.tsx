import type { PostAttachment } from '@/types/post.types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { useMemo, useState } from 'react'
import { getVideoMimeType } from '@/utils/format'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Video from 'yet-another-react-lightbox/plugins/video'
import { PlayIcon } from 'lucide-react'

function ImageCarousel({
  attachments,
}: {
  attachments: PostAttachment[] | undefined
}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const slides = useMemo(
    () =>
      attachments?.map((item) =>
        item.attachment_type === 'VIDEO'
          ? {
              type: 'video' as const,
              width: 1920,
              height: 1080,
              poster: item.thumbnail_url,
              sources: [
                {
                  src: item.attachmentURL,
                  type: getVideoMimeType(item.attachmentURL),
                },
              ],
            }
          : {
              src: item.attachmentURL,
              alt: item.post_attachment_id,
            },
      ),
    [attachments],
  )

  return (
    <>
      <div className="relative">
        <Carousel
          opts={{
            align: 'end',
          }}
          className="w-full h-max px-6  -my-4"
        >
          <CarouselContent className="pl-2 justify-center">
            {attachments?.map((attachment, index) => (
              <CarouselItem
                key={index}
                className={`  ${attachments.length > 1 ? 'basis-1/2' : 'basis-1/1'} ${attachments.length > 2 ? 'sm:basis-1/3' : 'sm:basis-1/2'} ${attachments.length > 3 ? 'xl:basis-1/4' : 'xl:basis-1/3'} pl-2`}
                onClick={() => {
                  setIndex(index)
                  setOpen(true)
                }}
              >
                {attachment.attachment_type === 'VIDEO' && (
                  <>
                    <img
                      src={attachment.thumbnail_url}
                      alt={attachment.attachment_type}
                      className="w-full aspect-4/3 object-contain"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="rounded-full bg-white/90 p-1">
                        <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </>
                )}
                {attachment.attachment_type === 'PHOTO' && (
                  <img
                    src={attachment.attachmentURL}
                    alt={attachment.attachment_type}
                    className="w-full aspect-4/3 object-contain"
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            size="lg"
            className={`-left-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none  `}
          />
          <CarouselNext
            variant="ghost"
            className={`-right-2 cursor-pointer bg-transparent hover:bg-transparent hover:text-primary border-0 shadow-none`}
          />
        </Carousel>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Video]}
      />
    </>
  )
}
export default ImageCarousel
