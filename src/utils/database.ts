import servicesImage1 from '../assets/Rectangle 18.png'
import servicesImage2 from '../assets/Rectangle 19.png'
import servicesAroundImage1 from '../assets/JoshuaBarber.png'
import servicesAroundImage2 from '../assets/MaryPraise.png'
import AdminProfile from '../assets/Admin profile.jpg'
import AdminElect from '../assets/Admin-Elect.png'
import Rect18 from '../assets/Rectangle 18.png'
import Rect19 from '../assets/Rectangle 19.png'

export const user = {
  profileImage: '',
  firstName: 'Leo',
  lastName: 'Justin',
  verified: true,
  service: 'plumber',
  rating: 4,
  totalReviews: 120,
  address: '2, Gandi Street, Ikorodu, Lagos',
  availableBalance: 77000,
}

export const availableServices = [
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'mobile app development',
    category: 'digital skills & online services',
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'electrical service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'plumbing service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning services',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'cleaning services',
    category: 'digital skills & online services',
  },
]

export const serviceAround = [
  {
    id: 1,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage1,
  },
  {
    id: 2,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
  },
  {
    id: 3,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
  },
]

export const customerPosts = [
  {
    profile: AdminProfile,
    name: 'Michael Chen',
    location: 'Lagos',
    service: 'Plumbing Services',
    rating: '4.9',
    reviews: '234',
    title: 'Affordable plumbing services',
    description:
      'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
    tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
    stats: { likes: 110, comments: 81, shares: 212, downloads: 16 },
  },
  {
    profile: AdminElect,
    name: 'Elite Electrical Solutions',
    location: 'Ibadan',
    service: 'Electrical Services',
    rating: '4.8',
    reviews: '294',
    title: 'Expert Electrical Services',
    description:
      'Specialized in electrical installations, repairs and upgrades for both residential and commercial properties.',
    tags: ['Electrical', 'Certified', 'Repairs', 'Residential'],
    stats: { likes: 96, comments: 44, shares: 138, downloads: 9 },
  },
]

export const customerOffers = [
  {
    title: 'Need plumber to fix leaking tap',
    description:
      'Looking for an experienced plumber to fix a constantly dripping kitchen faucet. It can be done as fast as you want.',
    posted: 'Posted: Dec 15, 2024',
    views: '247 views',
    inquiries: '12 inquiries',
    active: true,
  },
  {
    title: 'Emergency plumbing repairs',
    description:
      'Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues.',
    posted: 'Posted: Dec 18, 2024',
    views: '241 views',
    inquiries: '12 inquiries',
    active: true,
    media: [Rect19, Rect18],
  },
  {
    title: 'Bathroom Renovation Services',
    description:
      'Complete bathroom renovation services, including plumbing, tiling, waterproofing, and finishing to modern standards.',
    posted: 'Posted: Dec 20, 2024',
    views: '198 views',
    inquiries: '8 inquiries',
    active: true,
  },
]

export const customerBookings = [
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'ongoing',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
]

export const transactionHistory = [
  {
    createdAt: Date.now(),
    name: 'Joshua Friday',
    service: 'plumbing services',
    status: 'canceled',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Leo Monday',
    service: 'cleaning services',
    status: 'sent',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Maria Saturday',
    service: 'plumbing services',
    status: 'pending',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Maria Saturday',
    service: 'plumbing services',
    status: 'pending',
    amount: 20000,
  },
]
