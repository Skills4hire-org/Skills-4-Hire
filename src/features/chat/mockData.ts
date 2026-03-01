import { store } from '@/store'
import { addUser, addConversation, addMessage } from './chatSlice'

export const initializeMockChat = () => {
  const dispatch = store.dispatch

  dispatch(addUser({ id: '1', name: 'Alice' }))
  dispatch(addUser({ id: '2', name: 'Bob' }))

  dispatch(
    addConversation({
      id: 'conv1',
      participantIds: ['1', '2'],
      unreadCount: 1,
    }),
  )

  dispatch(
    addMessage({
      id: 'm1',
      conversationId: 'conv1',
      senderId: '2',
      text: 'Hey! Are you available today?',
      createdAt: Date.now() - 100000,
    }),
  )

  dispatch(
    addMessage({
      id: 'm2',
      conversationId: 'conv1',
      senderId: '1',
      text: 'Yes, I am available 👌',
      createdAt: Date.now() - 50000,
    }),
  )
}
