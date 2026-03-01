import type { Conversation } from '@/types/chat.types'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProfileImage from '../global/ProfileImage'

interface ConversationProps {
  conversation: Conversation
}

export default function ConversationCard({ conversation }: ConversationProps) {
  const { conversationId } = useParams()
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  const users = useSelector((state: any) => state.chatState.users)
  const messages = useSelector((state: any) => state.chatState.messages)
  const currentUserId = useSelector(
    (state: any) => state.chatState.currentUserId,
  )

  const otherUserId = conversation.participantIds.find(
    (id) => id !== currentUserId,
  )

  const otherUser = otherUserId ? users[otherUserId] : null
  const lastMessage = conversation.lastMessageId
    ? messages[conversation.lastMessageId]
    : null

  const isActive = conversationId === conversation.id

  return (
    <Link
      to={`/${userType}/chats/${conversation.id}`}
      className={`flex items-center p-2 rounded-md cursor-pointer bg-white gap-2 shadow-md 
        ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      <ProfileImage size="size-12 md:size-14" noStatus />
      <div className="flex flex-1 gap-2">
        <div className="w-full">
          <h3 className="font-semibold text-sm md:text-base">
            {otherUser?.name}
          </h3>
          <span className="text-xs md:text-sm text-gray-500 block -mt-0.5">
            Plumber
          </span>
          <p className="text-sm md:text-base break-all line-clamp-1 w-full">
            {lastMessage?.text || 'No messages yet'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between shrink-0">
          <span className="text-xs text-gray-500">09:15 AM</span>
          {conversation.unreadCount > 0 && (
            <span className="bg-primary text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
