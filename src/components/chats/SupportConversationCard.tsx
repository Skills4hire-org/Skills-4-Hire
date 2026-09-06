import type { SupportConversation } from '@/types/chat.types'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { formatMessageRelativeTime } from '@/utils/format'

interface ConversationProps {
  conversation: SupportConversation
}

export default function SupportConversationCard({
  conversation,
}: ConversationProps) {
  console.log(conversation)

  const { conversationId } = useParams()
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const isActive = conversationId === conversation.conversation_id

  const navigate = useNavigate()

  const handleReadMessages = () => {
    navigate(`/${userType}/customer-support/${conversation.conversation_id}`, {
      state: {
        ticket_no: conversation.support.support_id,
        ticket_status: conversation?.support?.status,
      },
    })
  }

  return (
    <div
      onClick={handleReadMessages}
      className={` p-2 rounded-md cursor-pointer bg-white gap-2 shadow-md 
        ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      <div className="flex flex-1 gap-2">
        <div className="w-full space-y-1">
          <h3 className="font-semibold text-sm md:text-base capitalize line-clamp-1 text-gray-500 ">
            Ticket No:
            <span className="pl-1 text-foreground">
              {conversation.support.support_id}
            </span>
          </h3>
          <p
            className={`text-xs md:text-sm block -mt-0.5 capitalize text-gray-500 `}
          >
            Ticket Status:{' '}
            <span
              className={`pl-1  ${conversation?.support?.status == 'open' ? 'text-green-600' : 'text-red-600'}`}
            >
              {' '}
              {conversation?.support?.status}
            </span>
          </p>
          <p className="text-sm md:text-base break-all line-clamp-1 w-full">
            {conversation.last_message.message || 'No messages yet'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between shrink-0">
          <span className="text-xs text-gray-500 line-clamp-1">
            {formatMessageRelativeTime(conversation?.support?.updated_at)}
          </span>
        </div>
      </div>
    </div>
  )
}
