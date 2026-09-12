import type { Conversation } from '@/types/chat.types'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ProfileImage from '../global/ProfileImage'
import { formatMessageRelativeTime, formatSpaceToString } from '@/utils/format'
import type { UserData } from '@/types/user.types'

interface ConversationProps {
  conversation: Conversation
}

export default function ConversationCard({ conversation }: ConversationProps) {
  const { conversationId } = useParams()
  const { userType, user_data }: { userType: UserType; user_data: UserData } =
    useSelector((state: any) => state.userState)

  const isParticipantTwo =
    conversation.participant_one.user_id === user_data.user_id
      ? conversation.participant_two
      : conversation.participant_one

  const isActive = conversationId === conversation.conversation_id

  const navigate = useNavigate()

  const handleReadMessages = () => {
    navigate(`/${userType}/messages/${conversation.conversation_id}`, {
      state: {
        participant_two: isParticipantTwo,
      },
    })
  }

  return (
    <div
      onClick={handleReadMessages}
      className={`flex items-start p-2 rounded-md cursor-pointer bg-white gap-2 shadow-md 
        ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
    >
      <ProfileImage
        size="size-12 md:size-14"
        noStatus
        avatar={isParticipantTwo.profile.avatar?.avatar}
      />
      <div className="flex flex-1 gap-2">
        <div className="w-full">
          <h3 className="font-semibold text-sm md:text-base capitalize line-clamp-1">
            {isParticipantTwo.profile.display_name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 block -mt-0.5 capitalize ">
            {isParticipantTwo.profile.professional_title &&
              formatSpaceToString(isParticipantTwo.profile.professional_title)}
          </p>
          <p className="text-sm md:text-base break-all line-clamp-1 w-full">
            {conversation.last_message?.content || 'No messages yet'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between shrink-0">
          <span className="text-xs text-gray-500 line-clamp-1">
            {formatMessageRelativeTime(conversation?.updated_at)}
          </span>
          {conversation.unread_count > 0 && (
            <span className="bg-primary text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
