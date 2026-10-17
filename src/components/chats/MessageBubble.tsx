import type { Message, MessageAttachment } from '@/types/chat.types'
import { decodeHtmlEntities } from '@/utils/format'

interface MessageProps {
  message: Message
}

const isVideoAttachment = (attachment: MessageAttachment) => {
  const type = (attachment.type ?? '').toLowerCase()
  if (type.includes('video')) return true
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(attachment.url ?? '')
}

export default function MessageBubble({ message }: MessageProps) {
  const isSent = message.is_sender

  const attachments: MessageAttachment[] = message.attachments
    ? Array.isArray(message.attachments)
      ? message.attachments
      : [message.attachments]
    : []

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm relative
        ${
          isSent
            ? 'bg-primary/20 text-foreground rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
        }`}
      >
        {attachments.length > 0 && (
          <div className="flex flex-col gap-2 pb-2">
            {attachments.map((attachment, index) =>
              isVideoAttachment(attachment) ? (
                <video
                  key={index}
                  src={attachment.url}
                  controls
                  className="rounded-md w-full max-w-[240px] max-h-64 object-cover"
                />
              ) : (
                <img
                  key={index}
                  src={attachment.url}
                  alt="Attachment"
                  className="rounded-md w-full max-w-[240px] max-h-64 object-cover"
                />
              ),
            )}
          </div>
        )}

        {/* Message text */}
        {message.content && (
          <div className="break-words pb-2.5 min-w-6">
            {decodeHtmlEntities(message.content)}
          </div>
        )}

        {/* Timestamp */}
        <span
          className={`absolute bottom-1 right-2 text-[10px]
          ${isSent ? 'text-foreground/60' : 'text-gray-500'}`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
