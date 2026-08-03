import type { PostAttachment } from '@/types/post.types'
import { useMemo, useState } from 'react'
import { getVideoMimeType } from '@/utils/format'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Video from 'yet-another-react-lightbox/plugins/video'
import { PlayIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const MAX_VISIBLE = 4

function AttachmentCell({
  attachment,
  onClick,
  className,
  overlay,
}: {
  attachment: PostAttachment
  onClick: () => void
  className?: string
  overlay?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={attachment.post_attachment_id}
      className={cn(
        'group relative w-full h-full overflow-hidden bg-neutral-100 cursor-pointer focus:outline-none',
        className,
      )}
    >
      {attachment.attachment_type === 'VIDEO' ? (
        <>
          <video
            src={attachment.thumbnail_url || attachment.attachmentURL}
            poster={attachment.thumbnail_url}
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <div className="rounded-full bg-white/90 p-1.5">
              <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </>
      ) : (
        <img
          src={attachment.attachmentURL}
          alt={attachment.post_attachment_id}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      {overlay !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white text-2xl md:text-3xl font-semibold">
            +{overlay}
          </span>
        </div>
      )}
    </button>
  )
}

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

  if (!attachments || attachments.length === 0) return null

  const count = attachments.length
  const visible = attachments.slice(0, MAX_VISIBLE)
  const overflow = count > MAX_VISIBLE ? count - (MAX_VISIBLE - 1) : undefined

  const openAt = (i: number) => {
    setIndex(i)
    setOpen(true)
  }

  const gridClass =
    count === 1
      ? 'grid-cols-1 aspect-[4/5]'
      : count === 2
        ? 'grid-cols-2 aspect-[2/1] auto-rows-fr'
        : 'grid-cols-2 grid-rows-2 aspect-square auto-rows-fr'

  return (
    <>
      <div className={cn('grid w-full gap-1 overflow-hidden rounded-md md:rounded-lg', gridClass)}>
        {visible.map((attachment, i) => (
          <AttachmentCell
            key={attachment.post_attachment_id || i}
            attachment={attachment}
            onClick={() => openAt(i)}
            className={count === 3 && i === 0 ? 'row-span-2' : undefined}
            overlay={i === MAX_VISIBLE - 1 ? overflow : undefined}
          />
        ))}
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
