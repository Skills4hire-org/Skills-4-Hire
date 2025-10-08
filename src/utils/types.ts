export type AvailableServices = {
  serviceName: string
  serviceImage: string
  category: string
}

export type Booking = {
  service: string
  serviceImage: string
  createdAt: any
  serviceProviderName: string
  serviceProviderRating: number
  status: string
  desc: string
}

export type SelectItems = {
  value: string
  label: string
}
