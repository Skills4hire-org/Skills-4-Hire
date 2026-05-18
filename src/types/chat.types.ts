export interface User {
  id: string
  name: string
  avatar?: string
}

export interface Conversation {
  id: string
  participantIds: string[]
  lastMessageId?: string
  unreadCount: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: number
}

export type CreateConversation = {
  participant_one: {
    email?: string
    first_name: string
    last_name: string
    is_active?: boolean
  }
  participant_two: {
    email?: string
    first_name: string
    last_name: string
    is_active?: boolean
  }
  participant_two_id: string
}

export type ChatMessage = {
  message_id: string
  sender_name: string
  content: string
  is_read: boolean
  created_at: string
}

export type ChatMessageParams = {
  conversation_id?: string
  page_size?: number
  cursor?: string
  ordering?: string
}
