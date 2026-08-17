export type Booking = {
  booking_id: string
  booking_status: string
  customer: {
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
  provider: {
    provider_id: string
    professional_title: string
    avg_rating: number
    user: {
      profile: {
        display_name: string
        avatar: {
          avatar: string
        }
      }
    }
  }
  price: number
  descriptions: string
  created_at: string
}

export type Address = {
  address_id?: string
  user_profile_id?: string
  street_address: string
  apartment?: string
  city: string
  state: string
  country: string
  postal_code?: string
  is_default: boolean
}

export type BookingInfo = {
  address?: Address | null
  provider: string | undefined
  price: string
  notes: string
  descriptions: string
  start_date?: string
  date?: string
  is_urgent: boolean
  time?: string
  is_remote: boolean
  provider_service?: (string | undefined)[] | undefined | null
}
