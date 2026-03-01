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
