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
      state.users[action.payload.user_id] = action.payload
    },

    addConversation: (state, action) => {
      state.conversations[action.payload.conversation_id] = action.payload
      state.conversationMessages[action.payload.conversation_id] = []
    },

    addMessage: (state, action) => {
      const msg = action.payload

      state.messages[msg.message_id] = msg

      if (!state.conversationMessages[msg.conversation]) {
        state.conversationMessages[msg.conversation] = []
      }

      state.conversationMessages[msg.conversation].push(msg.message_id)

      const conversation = state.conversations[msg.conversation]
      if (conversation) {
        conversation.last_message = {
          message_id: msg.message_id,
          content: msg.content,
          created_at: msg.created_at,
          is_read: msg.is_read
        }

        if (msg.sender.user_id !== state.currentUserId) {
          conversation.unread_count += 1
        }
      }
    },

    clearUnread: (state, action) => {
      const conversationId = action.payload
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].unread_count = 0
      }
    },
  },
})

export const { addUser, addConversation, addMessage, clearUnread } =
  chatSlice.actions

export default chatSlice.reducer
