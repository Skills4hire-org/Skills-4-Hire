import { useSelector } from 'react-redux'
import ConversationCard from './ConversationCard'
import type { Conversation } from '@/types/chat.types'
import NoChat from './NoChat'
import SearchBar from '../global/SearchBar'
import { useState } from 'react'

export default function ConversationList() {
  const conversationsObject = useSelector(
    (state: any) => state.chatState.conversations,
  )

  const conversations: Conversation[] = Object.values(conversationsObject)
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchQuery = () => {}

  return (
    <div className="h-full overflow-y-auto">
      {conversations.length === 0 ? (
        <NoChat />
      ) : (
        <div className="space-y-4 md:space-y-6">
          <SearchBar
            placeholder="Search"
            maxWidth="max-w-md"
            value={searchQuery}
            onSubmit={handleSearchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="grid grid-cols-1 gap-2">
            {conversations.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
