import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { Input } from '../ui/input'
import { Check, ImageIcon, Plus, VideoIcon, X } from 'lucide-react'
import { Button } from '../ui/button'
import FormSubmitButton from '../buttons/FormSubmitButton'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { uploadToCloudinary } from '@/utils/cloudinary'
import { useAddToGallery } from '@/hooks/useUsers'
import VideoPlayer from '../global/VideoPlayer'

export default function GalleryForm({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void
}) {
  const [formData, setFormData] = useState<{
    photos: File[]
    videos: File[]
  }>({
    photos: [],
    videos: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: updateProfileGallery, isPending } = useAddToGallery()
  const getMediaType = (url: string) => {
    if (/\.(mp4|webm|ogg)$/i.test(url)) return 'video'
    return 'image'
  }
  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const videoFile = formData.videos[0]
  const videoPreviewUrl = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : null
  }, [videoFile])

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
    }
  }, [videoPreviewUrl])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedImageFiles: File[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const fileType = newFile.type.startsWith('image/')
      if (!fileType && imageRef.current) {
        imageRef.current.value = ''
        toast.warning(`${newFile.name} file type is not acceptable`)

        return
      }
      const isOverSize = newFile.size > MAX_SIZE_MB

      if (isOverSize && imageRef.current) {
        imageRef.current.value = ''
        toast.warning(
          `${newFile.name}'s size exceeds maximum upload size (2MB)`,
        )
        return
      }
      acceptedImageFiles.push(newFile)
    })
    setFormData({ ...formData, photos: acceptedImageFiles })
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    let acceptedVideoFiles: File[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const fileType = newFile.type.startsWith('video/')
      if (!fileType && videoRef.current) {
        videoRef.current.value = ''
        toast.warning(`${newFile.name} file type is not acceptable`)
        return
      }
      const isOverSize = newFile.size > MAX_SIZE_MB
      if (isOverSize && videoRef.current) {
        videoRef.current.value = ''
        toast.warning(`${newFile.name}'s size maximum upload size (100MB)`)
        return
      }

      acceptedVideoFiles.push(newFile)
    })
    setFormData({ ...formData, videos: acceptedVideoFiles })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const files = [...formData.photos, ...formData.videos]
      const uploadedUrls = await uploadToCloudinary(files)
      const formatUrls = uploadedUrls?.map((url) => {
        return {
          image_url: url.url,
          public_id: url.public_id,
          description: getMediaType(url.url),
          type: getMediaType(url.url),
        }
      })
      if (formatUrls) {
        updateProfileGallery(formatUrls, {
          onSuccess: () => {
            setIsOpen(false)
            setFormData({
              photos: [],
              videos: [],
            })
            toast.success('Upload successful')
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error('Upload Failed. Please try again')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      {formData.videos.length > 0 && videoPreviewUrl && (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <VideoPlayer src={videoPreviewUrl} className="aspect-video" />
          <button
            type="button"
            aria-label="Remove video"
            onClick={() =>
              setFormData((prev) => ({ ...prev, videos: [] }))
            }
            className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-2">
        <Label
          htmlFor="photo"
          className="flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Input
            id="photo"
            name="photo"
            type="file"
            multiple
            ref={imageRef}
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <ImageIcon className="w-5 h-5 text-green-600" />
          <span className="text-xs md:text-sm font-medium">Image</span>
          <span className="text-white font-medium p-0.5 bg-green-600 rounded-full relative">
            {formData.photos.length !== 0 ? (
              <>
                <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute text-[10px] -top-2 -right-2 bg-green-600 w-4 h-4 rounded-full flex items-center justify-center">
                  {formData.photos.length}
                </span>
              </>
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
        <Label
          htmlFor="video"
          className="flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Input
            id="video"
            name="video"
            type="file"
            multiple
            ref={videoRef}
            accept="video/*"
            onChange={(e) => handleVideoChange(e)}
            className="hidden"
          />
          <VideoIcon className="w-5 h-5 text-[#2E5BEA]" />
          <span className="text-xs md:text-sm font-medium">Video</span>
          <span className="text-white font-medium p-0.5 bg-[#2E5BEA] rounded-full relative">
            {formData.videos.length !== 0 ? (
              <>
                <Check strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
                <span className="absolute text-[10px] -top-2 -right-2 bg-[#2E5BEA] w-4 h-4 rounded-full flex items-center justify-center">
                  {formData.videos.length}
                </span>
              </>
            ) : (
              <Plus strokeWidth={4} className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </span>
        </Label>
      </div>

      <div className="ml-auto w-max flex items-center gap-2">
        <Button
          variant="destructive"
          className="w-20"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          Close
        </Button>
        <FormSubmitButton
          texting="uploading"
          text="upload"
          submitting={isPending || isLoading}
          disabled={(!formData.photos && !formData.videos) || isPending}
          className="capitalize w-20"
        />
      </div>
    </form>
  )
}
