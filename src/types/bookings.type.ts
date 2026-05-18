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
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
    professional_title: string
    avg_rating: number
  }
  price: number
  descriptions: string
  created_at: string
}
