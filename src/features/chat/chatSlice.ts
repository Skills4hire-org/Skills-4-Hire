import type { Conversation, Message, User } from '@/types/chat.types'
import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
  currentUserId: string
  users: Record<string, User>
  conversations: Record<string, Conversation>
  messages: Record<string, Message>
  conversationMessages: Record<string, string[]>
}

const initialState: ChatState = {
  currentUserId: '1', // mock logged-in user
  users: {},
  conversations: {},
  messages: {},
  conversationMessages: {},
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users[action.payload.id] = action.payload
    },

    addConversation: (state, action) => {
      state.conversations[action.payload.id] = action.payload
      state.conversationMessages[action.payload.id] = []
    },

    addMessage: (state, action) => {
      const msg = action.payload

      state.messages[msg.id] = msg

      if (!state.conversationMessages[msg.conversationId]) {
        state.conversationMessages[msg.conversationId] = []
      }

      state.conversationMessages[msg.conversationId].push(msg.id)

      const conversation = state.conversations[msg.conversationId]
      conversation.lastMessageId = msg.id

      if (msg.senderId !== state.currentUserId) {
        conversation.unreadCount += 1
      }
    },

    clearUnread: (state, action) => {
      const conversationId = action.payload
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].unreadCount = 0
      }
    },
  },
})

export const { addUser, addConversation, addMessage, clearUnread } =
  chatSlice.actions

export default chatSlice.reducer
