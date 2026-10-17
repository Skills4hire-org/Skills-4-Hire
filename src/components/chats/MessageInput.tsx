import { useCreateMessage } from '@/hooks/useChats'
import type { MessageAttachment } from '@/types/chat.types'
import type { UserData } from '@/types/user.types'
import { ImageIcon, Loader, SendHorizontal, VideoIcon, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { uploadToR2 } from '@/utils/mediaUpload'

const MAX_IMAGE_MB = 10
const MAX_VIDEO_MB = 100

interface MessageInputProps {
  conversationId: string
  sendSocketMessage: (data: unknown) => boolean
}

export default function MessageInput({
  conversationId,
  sendSocketMessage,
}: MessageInputProps) {
  const [text, setText] = useState('')
  const [pendingAttachment, setPendingAttachment] = useState<
    (MessageAttachment & { name: string }) | null
  >(null)
  const [isUploading, setIsUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const videoInputRef = useRef<HTMLInputElement | null>(null)
  const { user_data }: { user_data: UserData } = useSelector(
    (state: any) => state.userState,
  )

  const MIN_HEIGHT = 40
  const MAX_HEIGHT = 120

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT)

    textarea.style.height = `${newHeight}px`
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
  }, [text])

  const { mutate: createMessage, isPending } = useCreateMessage()

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    kind: 'image' | 'video',
  ) => {
    const input = e.target
    const file = input.files?.[0]
    input.value = ''
    if (!file) return

    const isVideo = kind === 'video'
    const maxMb = isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB
    const expectedPrefix = isVideo ? 'video/' : 'image/'

    if (!file.type.startsWith(expectedPrefix)) {
      toast.warning(`Please select a${isVideo ? ' video' : 'n image'} file`)
      return
    }
    if (file.size > maxMb * 1024 * 1024) {
      toast.warning(
        `${file.name}'s size exceeds maximum upload size (${maxMb}MB)`,
      )
      return
    }

    setIsUploading(true)
    try {
      const uploaded = await uploadToR2([file])
      const first = uploaded?.[0]
      if (!first) throw new Error('Upload failed')
      setPendingAttachment({
        url: first.url,
        type: isVideo ? 'video' : 'image',
        name: file.name,
      })
    } catch {
      toast.error('Uploading of media file failed. Please try again')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSendMessage = () => {
    if (isUploading || isPending) return
    if (!text.trim() && !pendingAttachment) return

    const attachment = pendingAttachment

    createMessage(
      {
        conversation_id: conversationId,
        data: {
          content: text,
          ...(attachment
            ? {
                attachments: [
                  { url: attachment.url, type: attachment.type },
                ],
              }
            : {}),
        },
      },
      {
        onSuccess: (createdMessage) => {
          setText('')
          setPendingAttachment(null)
          if (textareaRef.current) {
            textareaRef.current.style.height = `${MIN_HEIGHT}px`
          }
          sendSocketMessage({
            event: 'message',
            message_id: createdMessage.message_id,
          })
          sendSocketMessage({
            event: 'online',
            user_id: user_data?.user_id,
            is_online: true,
          })
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const isBusy = isPending || isUploading

  return (
    <div className="p-2 pb-0 border-t">
      {pendingAttachment && (
        <div className="mb-2 flex items-center gap-2 rounded-md border bg-gray-50 p-1.5 w-max max-w-full">
          {pendingAttachment.type === 'video' ? (
            <video
              src={pendingAttachment.url}
              className="w-14 h-14 object-cover rounded"
              muted
            />
          ) : (
            <img
              src={pendingAttachment.url}
              alt={pendingAttachment.name}
              className="w-14 h-14 object-cover rounded"
            />
          )}
          <span className="text-xs truncate max-w-[140px]">
            {pendingAttachment.name}
          </span>
          <button
            type="button"
            aria-label="Remove attachment"
            onClick={() => setPendingAttachment(null)}
            className="text-gray-500 hover:text-red-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1 pb-2">
          <button
            type="button"
            aria-label="Attach photo"
            onClick={() => imageInputRef.current?.click()}
            disabled={isBusy}
            className="text-gray-500 hover:text-gray-800 disabled:opacity-50 cursor-pointer"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Attach video"
            onClick={() => videoInputRef.current?.click()}
            disabled={isBusy}
            className="text-gray-500 hover:text-gray-800 disabled:opacity-50 cursor-pointer"
          >
            <VideoIcon className="w-5 h-5" />
          </button>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileSelect(e, 'image')}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileSelect(e, 'video')}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none border rounded-lg px-3 py-2 text-sm focus:outline-none"
          style={{
            minHeight: MIN_HEIGHT,
            maxHeight: MAX_HEIGHT,
          }}
        />

        <button
          onClick={handleSendMessage}
          disabled={(!text.trim() && !pendingAttachment) || isBusy}
          className="bg-primary text-white p-2 rounded-full cursor-pointer mb-0.5 disabled:opacity-50"
        >
          {isBusy ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <SendHorizontal className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  )
}
