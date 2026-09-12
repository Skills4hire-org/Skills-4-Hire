import type { SupportMessage } from '@/types/chat.types'

interface MessageProps {
  message: SupportMessage
}

export default function SupportMessageBubble({ message }: MessageProps) {
  const isSent = message.is_staff

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex ${isSent ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm relative
        ${
          isSent
            ? 'bg-primary/20 text-foreground rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
        }`}
      >
        {/* Message text */}
        <div className="break-words pb-2.5 min-w-6">{message.message}</div>

        {/* Timestamp */}
        <span
          className={`absolute bottom-1 right-2 text-[10px]
          ${isSent ? 'text-gray-500' : 'text-foreground/60'}`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
