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
  address: '2, Gandi Street, Ikosodu, Lagos',
  availableBalance: 77000,
}

export const availableServices = [
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning service',
    category: 'vocational & on-site services',
    favorite: true,
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'mobile app development',
    category: 'digital skills & online services',
    favorite: false,
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'electrical service',
    category: 'vocational & on-site services',
    favorite: true,
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'plumbing service',
    category: 'vocational & on-site services',
    favorite: true,
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning services',
    category: 'vocational & on-site services',
    favorite: false,
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'cleaning services',
    category: 'digital skills & online services',
    favorite: false,
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
    favorite: true,
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
    favorite: false,
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
    favorite: true,
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

export const rewardPoints = [
  { createdAt: Date.now(), point: 1 },
  { createdAt: Date.now(), point: 2 },
  { createdAt: Date.now(), point: 3 },
]

export const aboutPageData = {
  title: 'About',
  subtitle: 'On-Demand Home Services App',
  description: [
    `Skills4Hire is a platform that makes it easy to discover, trust, and book digital or vocational service providers. With social feeds serving as living portfolios, providers showcase their skills while customers gain confidence through real work and authentic interactions.`,
    `From barbers, plumbers, and cleaners to designers, developers, and marketers, we give every skilled individual the opportunity to be seen, hired, and rewarded for their talent.`,
    `What makes Skills4Hire different is that it doesn’t just connect people for transactions—it builds trust through interaction. At the heart of the platform is a social feed, where service providers can showcase their work, share updates, and engage with potential clients.`,
    `Whether you’re booking a haircut, fixing your home, designing a logo, or hiring a developer, Skills4Hire makes the process safe, engaging, and transparent. Secure payments, verified providers, reviews, and a built-in dispute resolution system ensure that both customers and providers are protected every step of the way.`,
    `At its core, Skills4Hire is more than a marketplace—it’s a platform that empowers skilled individuals with visibility, credibility, and sustainable income, while giving customers the easiest and safest way to hire talent at their fingertips.`,
  ],
}

export const termsPageData = {
  title: 'Terms and Conditions',
  description: [
    `By accessing or using the Skills4Hire platform, mobile app, or website, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our platform.`,

    `1. Account Registration and Security  
Users are responsible for safeguarding their login credentials.  
Skills4Hire is not liable for unauthorized use of any account.  
You agree not to share your account or impersonate another person.`,

    `2. Use of Services  
Customers may post service requests and hire verified providers.  
Service Providers may accept jobs, complete tasks professionally, and earn payments.  
All jobs must be processed and paid within the platform. Any attempt to bypass the platform or engage in offline transactions is a violation of these Terms and may result in account termination and loss of earnings.`,

    `3. Fees and Payments  
Customers are not charged any fee while Service Providers pay a 2% commission on earnings.  
All payments must go through the Skills4Hire platform.  
Payment is released to providers only after the job is marked Completed by the customer or auto-completes after the agreed time window.`,

    `4. Escrow Policy  
Payments are held securely in escrow until job confirmation.  
If disputes arise:  
Skills4Hire will investigate using evidence provided by both parties.  
Skills4Hire reserves the right to refund the customer, release funds to the provider, or split payment based on the outcome.`,

    `5. User Conduct  
You agree not to:  
• Misrepresent your identity or services  
• Upload false or misleading content  
• Harass, threaten, or defraud any user  
• Promote or attempt off-platform transactions  
• Post illegal, offensive, or stolen content  
Violation may lead to suspension or permanent ban.`,

    `6. Content and Intellectual Property  
You retain ownership of content you upload, but grant Skills4Hire a non-exclusive license to use, display, and promote such content in connection with the platform.  
You must not upload content you don’t have rights to.`,

    `7. Reviews and Ratings  
Customers can review providers after service completion.  
Skills4Hire does not edit or alter reviews unless they violate community guidelines.`,

    `8. Dispute Resolution  
If a conflict arises between a customer and a provider:  
1. Contact must be made within 48 hours of the incident.  
2. Both parties must submit evidence (e.g., photos, chat history).  
3. Skills4Hire’s decision is final and binding.`,

    `9. Suspension and Termination  
We may suspend or terminate your account if:  
• You violate any part of these Terms  
• You attempt to manipulate or defraud users  
• You repeatedly receive poor ratings or complaints  
Termination may result in forfeiture of pending earnings.`,

    `10. Limitation of Liability 
Skills4Hire is a marketplace, not the employer of any service provider.  
We are not liable for:  
• Poor service delivery  
• Physical injury or property damage  
• Missed appointments or delays`,

    `11. Amendments 
We may modify these Terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.`,

    `12. Contact Us  
For support, questions, or disputes, contact us at:  
skills4hireofficial@gmail.com`,

    `13. Acceptance  
By clicking “Sign Up” or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.`,
  ],
}

export const privacyPolicyData = {
  title: 'Skills4Hire Privacy Policy',
  description: [
    `By accessing or using the Skills4Hire platform, mobile app, or website, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our platform.`,

    `1. Account Registration and Security
Users are responsible for safeguarding their login credentials.
Skills4Hire is not liable for unauthorized use of any account.
You agree not to share your account or impersonate another person.`,

    `2. Use of Services
Customers may post service requests and hire verified providers.
Service Providers may accept jobs, complete tasks professionally, and earn payments.
All jobs must be processed and paid within the platform. Any attempt to bypass the platform or engage in offline transactions is a violation of these Terms and may result in account termination and loss of earnings.`,

    `3. Fees and Payments
Customers are not charged any fee while Service Providers pay a 2% commission on earnings.
All payments must go through the Skills4Hire platform.
Payment is released to providers only after the job is marked Completed by the customer or auto-completes after the agreed time window.`,

    `4. Escrow Policy
Payments are held securely in escrow until job confirmation.
If disputes arise:
Skills4Hire will investigate using evidence provided by both parties.
Skills4Hire reserves the right to refund the customer, release funds to the provider, or split payment based on the outcome.`,

    `5. User Conduct
You agree not to:
Misrepresent your identity or services
Upload false or misleading content
Harass, threaten, or defraud any user
Promote or attempt off-platform transactions
Post illegal, offensive, or stolen content
Violation may lead to suspension or permanent ban.`,

    `6. Content and Intellectual Property
You retain ownership of content you upload, but grant Skills4Hire a non-exclusive license to use, display, and promote such content in connection with the platform.
You must not upload content you don’t have rights to.`,

    `7. Reviews and Ratings
Customers can review providers after service completion.
Skills4Hire does not edit or alter reviews unless they violate community guidelines.`,

    `8. Dispute Resolution
If a conflict arises between a customer and a provider:
1. Contact must be made within 48 hours of the incident.
2. Both parties must submit evidence (e.g., photos, chat history).
3. Skills4Hire’s decision is final and binding.`,

    `9. Suspension and Termination
We may suspend or terminate your account if:
You violate any part of these Terms
You attempt to manipulate or defraud users
You repeatedly receive poor ratings or complaints
Termination may result in forfeiture of pending earnings.`,

    `10. Limitation of Liability
Skills4Hire is a marketplace, not the employer of any service provider.
We are not liable for:
Poor service delivery
Physical injury or property damage
Missed appointments or delays.`,

    `11. Amendments
We may modify these Terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.`,

    `12. Contact Us
For support, questions, or disputes, contact us at:
skills4hireofficial@gmail.com`,

    `13. Acceptance
By clicking “Sign Up” or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.`,
  ],
}
