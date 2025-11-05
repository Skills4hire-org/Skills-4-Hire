export type AvailableServices = {
  serviceName: string
  serviceImage: string
  category: string
  favorite: boolean
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

export type Notification = {
  id: number
  createdAt: string | number
  type: string
}

export type TransactionHistory = {
  createdAt: number | string
  name: string
  service: string
  status: string
  amount: number
}
export type PostCard = {
  id: number
  profile: string
  name: string
  location: string
  service: string
  rating: string
  reviews: string
  tags: string[]
  description: string
  stats: FeedStats
}

export type ServiceProvider = {
  id: number
  name: string
  online: boolean
  occupation: string
  verified: boolean
  desc: string
  features: string
  minCharge: number
  averageRating: number
  totalReviews: number
  image: string
  favorite: boolean
  maxCharge: number
  address: string
  totalJobs: number
  about: string
  gallery: string[] | null
  posts: PostCard[]
  postImages: string[]
  services: {
    id: number
    image: string
    desc: string
    price: number
  }[]
  comments: [] | never[]
  accountNumber: string
}

export type FeedStats = {
  likes: number
  comments: number
  shares: number
  impressions: number
}

export type ServiceProviderServiceCard = {
  id: number
  image: string
  desc: string
  price: number
}

export type BookingInfo = {
  emergency: boolean
  notes: string
  date: string
  time: string
  type: 'onsite' | 'remote' | null
  address: string
  savedAddress: string
  paymentAmount: string
  paymentRemark: string
  serviceProviderName: string
  serviceProviderOccupation: string
}

export type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  profileImage: string
}
