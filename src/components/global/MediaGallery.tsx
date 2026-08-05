import type { Gallery } from '@/types/user.types'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'
import { useDeleteFromGallery } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { Loader2, PlayIcon, Trash2 } from 'lucide-react'
import VideoPlayer from './VideoPlayer'
import VideoViewer from './VideoViewer'

export default function MediaGallery({
  media,
  editGallery,
}: {
  media: Gallery[] | undefined
  editGallery?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<Gallery | null>(null)

  const imageItems = useMemo(
    () => media?.filter((item) => item.type !== 'video'),
    [media],
  )

  const slides = useMemo(
    () =>
      imageItems?.map((item) => ({
        src: item.image_url,
        alt: item.description,
      })),
    [imageItems],
  )

  const { mutate: deleteMedia, isPending: deleting } = useDeleteFromGallery()
  const handleDelete = (image_id: string | undefined) => {
    deleteMedia(image_id, {
      onSuccess: () => {
        toast.success('Deleted successfully')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const openMedia = (i: number) => {
    const item = media?.[i]
    if (!item) return
    if (item.type === 'video') {
      setActiveVideo(item)
      setVideoOpen(true)
      return
    }
    const imageIndex = imageItems?.findIndex(
      (img) => img.work_image_id === item.work_image_id,
    )
    setIndex(imageIndex ?? 0)
    setOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        {media?.map((item, index) => (
          <div key={item.work_image_id} className="relative">
            <button
              onClick={() => openMedia(index)}
              className="relative overflow-hidden rounded-lg"
            >
              {item.type === 'video' ? (
                <>
                  <img
                    src={item.thumbnail_url}
                    alt={item.description}
                    className="aspect-square object-cover rounded-lg w-full"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <div className="rounded-full bg-white/90 p-1">
                      <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.image_url}
                  alt={item.description}
                  className="aspect-square object-cover rounded-lg w-full"
                />
              )}
            </button>
            {editGallery && (
              <button
                className="bg-red-100 p-1 absolute top-0 right-0  rounded-sm cursor-pointer hover:shadow-sm text-destructive hover:text-destructive/80"
                onClick={() => handleDelete(item.work_image_id)}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                )}

                <span className="sr-only">delete image</span>
              </button>
            )}
          </div>
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
            src={activeVideo.image_url}
            poster={activeVideo.thumbnail_url}
            fit="contain"
            className="h-full"
          />
        )}
      </VideoViewer>
    </>
  )
}
