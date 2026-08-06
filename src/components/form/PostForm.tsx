import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import FormTextArea from '../form-fields/FormTextArea'
import { toast } from 'sonner'
import { Check, ImageIcon, Plus, VideoIcon, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import FormSubmitButton from '../buttons/FormSubmitButton'
import type { CreatePost, Post } from '@/types/post.types'
import { uploadToCloudinary } from '@/utils/cloudinary'
import ImageEditor from '../global/ImageEditor'
import VideoPlayer from '../global/VideoPlayer'

type PostFormProps = {
  post?: Post
  onSubmit: (data: CreatePost) => void
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
}

export default function PostForm({
  post,
  onSubmit,
  isSubmitting,
  setIsSubmitting,
}: PostFormProps) {
  const isEdit = !!post
  const [formData, setFormData] = useState<{
    post: string
    photos: File[]
    videos: File[]
  }>({
    post: post?.post_content ?? '',
    photos: [],
    videos: [],
  })

  const getMediaType = (url: string) => {
    if (/\.(mp4|webm|ogg)$/i.test(url)) return 'VIDEO'
    return 'PHOTO'
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'budget') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const editQueueRef = useRef<File[]>([])
  const [editingSrc, setEditingSrc] = useState<string | null>(null)
  const [editingFile, setEditingFile] = useState<File | null>(null)

  const videoFile = formData.videos[0]
  const videoPreviewUrl = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : null
  }, [videoFile])

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
    }
  }, [videoPreviewUrl])

  const openNextEditor = () => {
    const next = editQueueRef.current.shift()
    if (!next) {
      setEditingSrc(null)
      setEditingFile(null)
      return
    }
    setEditingFile(next)
    setEditingSrc(URL.createObjectURL(next))
  }

  const handleEditConfirm = (file: File) => {
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, file] }))
    openNextEditor()
  }

  const handleEditCancel = () => {
    openNextEditor()
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 10 * 1024 * 1024
    const selectedFiles = e.target.files || []
    const files: File[] = Array.from(selectedFiles)
    const acceptedImageFiles: File[] = []
    if (files.length === 0) return
    files.forEach((newFile) => {
      const fileType = newFile.type.startsWith('image/')
      if (!fileType && imageRef.current) {
        toast.warning(`${newFile.name} file type is not acceptable`)
        return
      }
      const isOverSize = newFile.size > MAX_SIZE_MB

      if (isOverSize && imageRef.current) {
        toast.warning(
          `${newFile.name}'s size exceeds maximum upload size (2MB)`,
        )
        return
      }
      acceptedImageFiles.push(newFile)
    })
    if (imageRef.current) {
      imageRef.current.value = ''
    }
    if (acceptedImageFiles.length === 0) return
    editQueueRef.current.push(...acceptedImageFiles)
    if (!editingSrc) {
      openNextEditor()
    }
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 250 * 1024 * 1024
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

  /* const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const newKeyword = input.trim()
    if (!newKeyword) return

    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }

    setInput('')
  } */
  /* const handleAddKeyword = () => {
    const newKeyword = input.trim()
    if (!keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword])
      setShowInput(false)
    }
    setInput('')
  } */
  /*  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  } */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (isEdit) {
      const allData: CreatePost = {
        post_content: formData.post,
        post_type: 'GENERAL',
      }
      onSubmit(allData)
      return
    }
    const files = [...formData.videos, ...formData.photos]
    try {
      const uploadedUrls = await uploadToCloudinary(files)
      const formatUrls = uploadedUrls?.map((url) => {
        return {
          public_id: url.public_id,
          attachment_type: getMediaType(url.url),
          attachmentURL: url.url,
        }
      })

      const allData: CreatePost = {
        post_content: formData.post,
        post_type: 'GENERAL',
        attachments: formatUrls,
      }

      onSubmit(allData)
    } catch (error: any) {
      setIsSubmitting(false)
      toast.error('Uploading of media files failed. Please try again')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <FormTextArea
        name="post"
        placeholder="Post your latest work or service"
        value={formData.post}
        handleInputChange={handleInputChange}
        className="text-xs md:text-sm p-2 py-2 md:py-4 h-66 min-h-[48px]"
        rows={3}
        required
      />
      {/*  <div className="w-full">
        <div className="space-y-1">
          <span className="text-xs md:text-sm font-medium block">Keywords</span>
          <p className="text-xs md:text-sm text-muted-foreground">
            Add up to 5 keywords relevant to your post.
          </p>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 mb-2">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="text-xs font-bold cursor-pointer text-primary/80 hover:text-primary"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3">
          {showInput ? (
            <div className="relative max-w-xs">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type keyword and press Enter"
                className="w-full border border-input rounded-md px-3 h-9 text-xs md:text-sm shadow-xs focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[1px] outline-none pr-14"
              />
              <button
                onClick={handleAddKeyword}
                className="bg-primary text-white rounded-r-md w-12 font-medium absolute top-0 right-0 h-full text-xs md:text-sm cursor-pointer hover:primary/80  disabled:opacity-50"
                disabled={!input}
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="text-primary font-medium flex items-center gap-1 text-xs md:text-sm outline outline-primary  px-3 py-1.5 rounded-full hover:bg-primary/10 cursor-pointer hover:outline-2 disabled:opacity-50"
              disabled={keywords.length == 5}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Keyword
            </button>
          )}
        </div>
      </div>  */}

      {!isEdit && (
        <>
          {formData.videos.length > 0 && videoPreviewUrl && (
            <div className="relative overflow-hidden rounded-lg bg-black">
              <VideoPlayer
                src={videoPreviewUrl}
                className="aspect-video"
              />
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

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-2 mt-2">
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
              <span className="text-xs md:text-sm font-medium">Photo</span>
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
        </>
      )}
      <div className="border-t pt-2 md:pt-4 flex justify-end">
        <FormSubmitButton
          size="sm"
          submitting={isSubmitting}
          text={isEdit ? 'Update' : 'Post'}
          texting={isEdit ? 'Updating' : 'Posting'}
          disabled={isSubmitting}
          className="px-4 md:px-8 text-sm md:text-base"
        />
      </div>
      <ImageEditor
        open={!!editingSrc}
        imageSrc={editingSrc ?? ''}
        originalFile={editingFile}
        aspect={4 / 5}
        outputWidth={1024}
        outputHeight={1280}
        fileName={editingFile?.name}
        onCancel={handleEditCancel}
        onConfirm={handleEditConfirm}
      />
    </form>
  )
}
