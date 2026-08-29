export interface User {
  id: string
  name: string
  avatar?: string
}

export type CreateConversation = {
  participant_two_id: string
}

export interface Avatar {
  avatar_id: string
  avatar: string
}

export interface Profile {
  display_name: string
  professional_title: string | null
  avatar: Avatar | null
}

export interface User {
  user_id: string
  first_name: string
  last_name: string
  email: string
  profile: Profile
}

export type MessagesData = {
  conversation_id: string
  created_at: string
  message_count: number
  messages: Message[]
  participant_one: string
  participant_two: string
}

export type Message = {
  message_id: string
  content: string
  is_read: boolean
  is_edited: boolean
  is_sender: boolean
  created_at: string
  conversation: string
  receiver: {
    email: string
    first_name: string
    is_customer: boolean
    is_provider: boolean
    last_name: string
    phone: string
    profile: {
      avatar: {
        avatar: string
      }
      city: string
      country: string
      cover_photo: {
        image_url: string
      }
      created_at: string
      display_name: string
      location: string
      professional_title: string
      customer_id: string
      provider_id: string
      state: string
    }
    user_id: string
  }
}
export type Conversation = {
  conversation_id: string
  participant_one: User
  participant_two: User
  message_count: number
  unread_count: number
  last_message: {
    message_id: string
    content: string
    created_at: string
    is_read: boolean
  }

  created_at: string
  updated_at: string
}
