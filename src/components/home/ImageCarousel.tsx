import type { PostAttachment } from '@/types/post.types'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { cn } from '@/lib/utils'
import VideoPlayer from '../global/VideoPlayer'
import VideoViewer from '../global/VideoViewer'

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
        <VideoPlayer
          src={attachment.attachmentURL}
          poster={attachment.thumbnail_url}
          autoPlay
          muted
          loop
          controls={false}
          fit="cover"
          className="h-full"
        />
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
  const [videoOpen, setVideoOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<PostAttachment | null>(null)

  const imageAttachments = useMemo(
    () => attachments?.filter((item) => item.attachment_type !== 'VIDEO'),
    [attachments],
  )

  const slides = useMemo(
    () =>
      imageAttachments?.map((item) => ({
        src: item.attachmentURL,
        alt: item.post_attachment_id,
      })),
    [imageAttachments],
  )

  if (!attachments || attachments.length === 0) return null

  const count = attachments.length
  const visible = attachments.slice(0, MAX_VISIBLE)
  const overflow = count > MAX_VISIBLE ? count - (MAX_VISIBLE - 1) : undefined

  const openAt = (i: number) => {
    const attachment = attachments[i]
    if (!attachment) return
    if (attachment.attachment_type === 'VIDEO') {
      setActiveVideo(attachment)
      setVideoOpen(true)
      return
    }
    const imageIndex = imageAttachments?.findIndex(
      (item) => item.post_attachment_id === attachment.post_attachment_id,
    )
    setIndex(imageIndex ?? 0)
    setOpen(true)
  }

  const gridClass =
    count === 1
      ? 'grid-cols-1 aspect-[4/5] md:aspect-[16/9]'
      : count === 2
        ? 'grid-cols-2 aspect-[2/1] md:aspect-[3/1] auto-rows-fr'
        : 'grid-cols-2 grid-rows-2 aspect-square md:aspect-[5/4] auto-rows-fr'

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
        plugins={[Zoom]}
      />
      <VideoViewer open={videoOpen} onClose={setVideoOpen}>
        {activeVideo && (
          <VideoPlayer
            src={activeVideo.attachmentURL}
            poster={activeVideo.thumbnail_url}
            autoPlay
            muted
            fit="contain"
            className="h-full"
          />
        )}
      </VideoViewer>
    </>
  )
}
export default ImageCarousel
