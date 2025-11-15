import {
  ArrowDownUp,
  Banknote,
  Bell,
  BriefcaseMedical,
  FileText,
  FolderCog,
  HelpCircle,
  House,
  Info,
  Mail,
  MessageCircle,
  MessageCircleQuestion,
  MessageSquareMore,
  Phone,
  PhoneCall,
  Send,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import { CreditCard, User, DollarSign, Search, Users } from 'lucide-react'
import { MessageSquare, BookOpen } from 'lucide-react'
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa6'
import img1 from './Rectangle 20.png'
import img2 from './Rectangle 21.png'
import { TbArticle, TbAward, TbHeart, TbStar, TbUser } from 'react-icons/tb'
import Rect18 from './Rectangle 18.png'
import Rect19 from './Rectangle 19.png'
import Rect20 from './Rectangle 20.png'
import Rect21 from './Rectangle 21.png'

export const images = [img1, img2, img1]

export const sidebarMobileGeneral = [
  {
    icon: TbHeart,
    label: 'favorites',
    url: '/customer/favorites',
  },
  {
    icon: TbArticle,
    label: 'blog',
    url: '/',
  },
  {
    icon: TbAward,
    label: 'my rewards',
    url: '/customer/rewards',
  },
  {
    icon: TbStar,
    label: 'my reviews',
    url: '/',
  },
]
export const sidebarDesktopGeneral = [
  {
    icon: TbUser,
    label: 'profile',
    url: '/customer/profile',
  },
  {
    icon: TbHeart,
    label: 'favorites',
    url: '/customer/favorites',
  },
  {
    icon: TbArticle,
    label: 'blog',
    url: '/',
  },
  {
    icon: TbAward,
    label: 'my rewards',
    url: '/customer/rewards',
  },
  {
    icon: TbStar,
    label: 'my reviews',
    url: '/',
  },
]

export const sidebarAboutUs = [
  {
    icon: Info,
    label: 'about us',
    url: '/about',
  },
  {
    icon: ShieldAlert,
    label: 'privacy policy',
    url: '/privacy-policy',
  },
  {
    icon: FileText,
    label: 'terms & conditions',
    url: '/terms-and-conditions',
  },
  {
    icon: HelpCircle,
    label: 'help & support',
    url: '/customer/support',
  },
  {
    icon: PhoneCall,
    label: 'helpline number',
    url: '/',
  },
]

export const customerMobileNavLinks = [
  {
    label: 'Home',
    icon: House,
    url: '/customer/home',
  },
  {
    key: 'services',
    label: 'Services',
    icon: BriefcaseMedical,
    url: '/customer/services',
  },
  {
    label: 'bookings',
    icon: FolderCog,
    url: '/customer/bookings',
  },
  { label: 'wallet', icon: Wallet, url: '/customer/wallet' },
  { label: 'chats', icon: MessageSquareMore, url: '/customer/chats' },
]
export const customerDesktopNavLinks = [
  {
    label: 'Home',
    icon: House,
    url: '/customer/home',
  },
  {
    key: 'services',
    label: 'Services',
    icon: BriefcaseMedical,
    url: '/customer/services',
  },
  {
    label: 'bookings',
    icon: FolderCog,
    url: '/customer/bookings',
  },
  { label: 'wallet', icon: Wallet, url: '/customer/wallet' },
  { label: 'chats', icon: MessageSquareMore, url: '/customer/chats' },
  {
    label: 'notification',
    icon: Bell,
    url: '/customer/notification',
  },
  {
    label: 'help center',
    icon: HelpCircle,
    url: '/customer/support',
  },
]
export const serviceProviderMobileNavLinks = [
  {
    label: 'Home',
    icon: House,
    url: '/service-provider/home',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: BriefcaseMedical,
    url: '/service-provider/overview',
  },
  {
    label: 'bookings',
    icon: FolderCog,
    url: '/service-provider/bookings',
  },
  { label: 'wallet', icon: Wallet, url: '/service-provider/wallet' },
  { label: 'chats', icon: MessageSquareMore, url: '/service-provider/chats' },
]

export const serviceProviderDesktopNavLinks = [
  {
    label: 'Home',
    icon: House,
    url: '/service-provider/home',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: BriefcaseMedical,
    url: '/service-provider/overview',
  },
  {
    label: 'bookings',
    icon: FolderCog,
    url: '/service-provider/bookings',
  },
  { label: 'wallet', icon: Wallet, url: '/service-provider/wallet' },
  { label: 'chats', icon: MessageSquareMore, url: '/service-provider/chats' },
]

export const bookingsTabsList = [
  {
    status: 'ongoing',
    label: 'Ongoing',
  },
  {
    status: 'completed',
    label: 'Completed',
  },
  {
    status: 'canceled',
    label: 'Canceled',
  },
]
export const walletTabsList = [
  {
    status: 'pending',
    label: 'Pending',
  },
  {
    status: 'sent',
    label: 'Sent',
  },
  {
    status: 'received',
    label: 'Received',
  },
  {
    status: 'canceled',
    label: 'Canceled',
  },
]

export const walletActions = [
  { label: 'Send', icon: Send, path: 'send' },
  { label: 'Receive', icon: ArrowDownUp, path: 'receive' },
  { label: 'Deposit', icon: Banknote, path: 'deposit' },
  { label: 'Withdraw', icon: Wallet, path: 'withdraw' },
]

export const approvePaymentData = {
  title: 'Payment',
  section: 'Pending',
  description:
    'Payment for the service will remain pending until the service provider has successfully completed the agreed-upon task.',
  fields: ['From', 'To', 'Title', 'Amount', 'Comment'],
  buttonLabel: 'Approve',
}

export const withdrawFields = [
  {
    id: 'bank',
    label: 'Select a Bank',
    icon: Banknote,
    type: 'select',
    showChevron: true,
  },
  {
    id: 'accountNumber',
    label: 'Account Number',
    icon: User,
    type: 'text',
    showChevron: true,
  },
  {
    id: 'amount',
    label: 'Amount (NGN)',
    icon: CreditCard,
    type: 'number',
    showChevron: false,
  },
]

export const withdrawData = {
  balance: 0.0,
  minWithdraw: 1000.0,
  title: 'Deposit',
  sectionLabel: 'Withdraw',
  buttonLabel: 'Withdraw',
}

export const transferModes = [
  {
    key: 'inApp',
    label: 'In-App Transfer',
    icon: Users,
    description: 'Send money instantly to any other user on the platform.',
  },
  {
    key: 'bankTransfer',
    label: 'Bank Transfer',
    icon: Banknote,
    description:
      'Transfer funds to external bank accounts (Service Providers/Customers).',
  },
]

export const sendInputIcons = {
  amount: DollarSign,
  search: Search,
  bank: Banknote,
}

export const bankOptions = [
  'Select Bank',
  'First Bank PLC',
  'Zenith Bank',
  'Guaranty Trust Bank',
  'Access Bank',
]

export const customerHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'my-offers',
    label: 'My Offers',
  },
]
export const serviceProviderHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'job-offers',
    label: 'Job Offers',
  },
]

export const providerHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'jobs',
    label: 'Job Offers',
  },
]

export const timeFrameOptions = [
  {
    value: '1',
    label: '1 day',
  },
  {
    value: '2',
    label: '2 days',
  },
  {
    value: '3',
    label: '3 days',
  },
  {
    value: '4',
    label: '4 days',
  },
  {
    value: '5',
    label: '5 days',
  },
  {
    value: '6',
    label: '6 days',
  },
  {
    value: '7',
    label: '1 week',
  },
  {
    value: '14',
    label: '2 weeks',
  },
  {
    value: '30',
    label: '1 month',
  },
  {
    value: '365',
    label: '1 year',
  },
]

export const supportOptions = [
  {
    icon: MessageCircle,
    text: 'Chat with customer support',
    url: '/customer/customer-support',
  },
  {
    icon: Mail,
    text: 'Send an email',
    url: 'skills4hireofficial@gmail.com',
  },
  {
    icon: MessageCircleQuestion,
    text: 'FAQ',
    url: '/faq',
  },
  {
    icon: Phone,
    text: 'Call our help-line',
    url: 'tel:+2347073743287',
  },
]

export const aboutContactOptions = [
  {
    icon: Phone,
    text: 'Call',
    url: 'tel:+2347073743287',
  },
  {
    icon: Mail,
    text: 'Email',
    url: 'skills4hireofficial@gmail.com',
  },
]

export const socialLinks = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/skills4hire',
    Icon: FaLinkedinIn,
    bgClass: 'bg-[#0A66C2] rounded-full',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61581913121945',
    Icon: FaFacebookF,
    bgClass: 'bg-[#1877F2] rounded-full',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/skills4hireofficial/?hl=en',
    Icon: FaInstagram,
    bgClass:
      'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full',
  },
  {
    id: 'twitter',
    href: 'https://x.com/skills4hire?t=ozLzgv65G4SrNAyXAuCL7Q&s=09',
    Icon: FaXTwitter,
    bgClass: 'bg-black rounded-full',
  },
]

export const socialShareOptions = [
  {
    id: 'whatsapp',
    Icon: FaWhatsapp,
    url: 'https://wa.me/?text=Join%20Skills4Hire:%20https://skills4hire.com/ref?code=',
  },
  {
    id: 'facebook',
    Icon: FaFacebookF,
    url: 'https://www.facebook.com/profile.php?id=61581913121945',
  },
  { id: 'instagram', Icon: FaInstagram, url: '#' },
  {
    id: 'x',
    Icon: FaXTwitter,
    url: 'https://twitter.com/intent/tweet?text=Join%20Skills4Hire%20via%20my%20link:%20https://skills4hire.com/ref?code=',
  },
  {
    id: 'linkedin',
    Icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/company/skills4hire',
  },
]

export const mockContacts = [
  { id: 1, name: 'Diana M.', source: 'Contacts', status: 'Invite' },
  { id: 2, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
  { id: 3, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
  { id: 4, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
]

export const serviceProviderTabList = ['about', 'gallery']

export const serviceProviderActivityTabList = ['posts', 'comments', 'images']

export const bookingProgress = [
  {
    number: 1,
    name: 'Date & Time',
  },
  {
    number: 2,
    name: 'Address',
  },
  {
    number: 3,
    name: 'Payment',
  },
]

export const workTypes = ['onsite', 'remote']

export const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

export const mockServices = [
  {
    id: '1',
    provider: 'Joshua Friday',
    rating: 4,
    priceFrom: 800,
    excerpt: 'Included Pipe repairs, Leak fixes, and Maintenance etc.',
    image: Rect18,
  },
  {
    id: '2',
    provider: 'Joshua Friday',
    rating: 5,
    priceFrom: 1200,
    excerpt: 'Routine checks, plumbing maintenance, and quick fixes.',
    image: Rect19,
  },
  {
    id: '3',
    provider: 'Joshua Friday',
    rating: 4,
    priceFrom: 1500,
    excerpt: 'Professional drain unclogging, repairs, and replacements.',
    image: Rect20,
  },
]

export const jobOffers = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'Homeowner',
    location: 'Lagos',
    title: 'Need Plumber to Fix Leaking Tap',
    description:
      'Looking for an experienced plumber to fix a constantly dripping kitchen faucet. I would like for it to be done as quickly as possible.',
    budget: '₦15,000',
    deadline: 'This weekend',
    distanceKm: 10,
    images: [],
  },
  {
    id: 2,
    name: 'Jose Martino',
    role: 'Homeowner',
    location: 'Ibadan',
    title: 'Electrician needed for office rewiring',
    description:
      'Looking for an electrician to handle a complete office rewiring project. Must be safety certified with prior commercial experience.',
    budget: '₦85,000',
    deadline: 'Dec 31, 2024',
    distanceKm: 18,
    images: [Rect20, Rect21],
  },
]

export const providerOverviewData = {
  user: {
    name: 'Joshua Friday',
    role: 'Freelance',
    commission: '2%',
  },
  stats: [
    { label: 'Total Booking', value: 0, icon: BookOpen },
    { label: 'Total Service', value: 0, icon: User },
    { label: 'Total Earning', value: '₦0.00', icon: Wallet },
    { label: 'Wallet', value: 0, icon: Wallet },
  ],
  chart: [
    { name: 'Jan', revenue: 300000 },
    { name: 'Feb', revenue: 150000 },
    { name: 'Mar', revenue: 200000 },
    { name: 'Apr', revenue: 0 },
    { name: 'May', revenue: 0 },
    { name: 'Jun', revenue: 0 },
    { name: 'Jul', revenue: 0 },
    { name: 'Aug', revenue: 0 },
    { name: 'Sep', revenue: 0 },
    { name: 'Oct', revenue: 0 },
    { name: 'Nov', revenue: 0 },
    { name: 'Dec', revenue: 0 },
  ],
  newBookingRequest: {
    title: 'New Booking Request',
    icon: MessageSquare,
  },
  reviews: [
    {
      name: 'Joshua Friday',
      role: 'Plumber',
      rating: 4.8,
      image: '',
    },
    {
      name: 'Joshua Friday',
      role: 'Plumber',
      rating: 4.8,
      image: '',
    },
  ],
}

export const serviceProviderProfileRegistrationSteps = [
  {
    title: 'personal information',
    desc: 'Your full name, email, phone number, and address',
    url: 'personal-information',
  },
  {
    title: 'experience',
    desc: 'Enter your professional experience to be considered by clients',
    url: 'experience',
  },
  {
    title: 'application profile',
    desc: 'Build your job profile to gain recognition by clients',
    url: 'application-profile',
  },
]

export const certificationOptions = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]
export const services = [
  {
    label: 'Plumbing',
    value: 'plumbing',
  },
  {
    label: 'Baking',
    value: 'baking',
  },
  {
    label: 'Vulcanizer',
    value: 'vulcanizer',
  },
  {
    label: 'Mobile App Development',
    value: 'mobile app development',
  },
]
export const yearsOfExperience = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '10+',
    value: '10 above',
  },
]
