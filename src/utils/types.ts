export type AvailableServices = {
  serviceName: string
  serviceImage: string
  category: string
}
export type Booking = {
  service: string
  serviceImage: string
  createdAt: any
  status: 'ongoing' | 'completed' | 'cancelled'
  serviceProviderName: string
  serviceProviderRating: number
  serviceProviderAvatar: string
}
