export type UserType = 'customer' | 'professional'
export type UserData = {
  user_id: string
  email: string
  name: string
  is_customer: boolean
  is_provider: boolean
}

export type AuthUser = {
  userType: UserType | null
  access: string | null
  refresh: string | null
  user_data: UserData | null
}

export type Provider = {
  provider_id: string
  profile: {
    display_name: string
    city: string
    state: string
    avatar: {
      avatar: string
      is_active: boolean
    }
  }
  professional_title: string
  avg_rating: string
  total_reviews: string
  skills: [
    {
      skill: {
        image: string
      }
    },
  ]
  providerIDs?: string[]
  favouriteID?: string
  min_charge: number
  headline: string
}

export type ProviderParams = {
  search?: string | null
  profession?: string | null
  min_charge?: number | null
  max_charge?: number | null
  ratings?: number | null
  pageParam?: string
}
