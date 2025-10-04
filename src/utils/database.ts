import servicesImage1 from '../assets/Rectangle 18.png'
import servicesImage2 from '../assets/Rectangle 19.png'
import servicesAroundImage1 from '../assets/JoshuaBarber.png'
import servicesAroundImage2 from '../assets/MaryPraise.png'

export const user = {
  profileImage: '',
  firstName: 'Leo',
  lastName: 'Justin',
  verified: true,
  service: 'plumber',
  rating: 4,
  totalReviews: 120,
  address: '2, Gandi Street, Ikorodu, Lagos',
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
