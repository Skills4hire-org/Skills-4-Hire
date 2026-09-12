import { useCreateMessage } from '@/hooks/useChats'
import type { UserData } from '@/types/user.types'
import { Loader, SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

interface MessageInputProps {
  conversationId: string
  sendSocketMessage: (data: unknown) => boolean
}

export default function MessageInput({
  conversationId,
  sendSocketMessage,
  
}: MessageInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { user_data }: { user_data: UserData } = useSelector(
      (state: any) => state.userState,
    )

  const MIN_HEIGHT = 40
  const MAX_HEIGHT = 120

  // 🔥 Auto resize logic
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

  const handleSendMessage = () => {
    createMessage(
      {
        conversation_id: conversationId,
        data: {
          content: text,
        },
      },
      {
        onSuccess: (createdMessage) => {
          setText('')
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

  return (
    <div className="p-2 pb-0 border-t flex items-end gap-2">
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
        disabled={text.trim().length == 0 || isPending}
        className="bg-primary text-white p-2 rounded-full cursor-pointer mb-0.5"
      >
        {isPending ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <SendHorizontal className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}
