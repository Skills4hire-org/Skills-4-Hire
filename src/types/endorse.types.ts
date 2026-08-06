import type { User } from './user.types'

export type Endorse = {
  provider: string | undefined
  message: string
}

export type Endorser = {
  endorsement_id: string
  endorsed_by: {
    user_id: string
    phone: string
    email: string
    first_name: string
    last_name: string
    is_provider: true
    is_customer: true
    is_verified: true
    profile: {
      professional_title: string
      gender: string
      display_name: string
      trust_score: number
      country: string
      city: string
      state: string
      location: string
      created_at: string
      avatar: {
        description: string
        avatar: string
        avatar_public_id: string
      }
      customer_id: string
      provider_id: string
      cover_photo: string
    }
  }
  provider: {
    provider_id: string
    professional_title: string
    avg_rating: string
    total_reviews: string
    min_charge: string
    max_charge: string
    overview: string
    headline: string
    user: User
  }
  message: string
  extra_message: string
  endorsed_at: '2026-08-06T08:29:54.437Z'
  is_active: true
}
