import {
  ArrowDownUp,
  Banknote,
  FileText,
  HelpCircle,
  Info,
  Mail,
  MessageCircle,
  MessageCircleQuestion,
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
import JoshuaFridayBG from './JoshuaFriday-bg.png'
import MaryPraise from './MaryPraise.png'
import carpentry from './images/carpentry.jpg'
import cleaning from './images/cleaning.jpg'
import cybersecurity from './images/cybersecurity.jpg'
import dataAnalysis from './images/dataAnalysis.jpg'
import devops from './images/devops.jpg'
import digitalMarketing from './images/digitalMarketing.jpg'
import electrical from './images/electrical.jpg'
import fitnessTraining from './images/fitnessTraining.jpg'
import graphicDesign from './images/graphicDesign.jpg'
import hairDressing from './images/hairDressing.jpg'
import motionGraphics from './images/motionGraphics.jpg'
import plumbing from './images/plumbing.jpg'
import projectManagement from './images/projectManagement.jpg'
import videoEditing from './images/videoEditing.jpg'
import webDevelopment from './images/webDevelopment.jpg'

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
    url: '/customer/reviews',
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
    url: '/customer/reviews',
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
    icon: 'si:home-line',
    url: '/customer/home',
    activeIcon: 'si:home-fill',
  },
  {
    key: 'services',
    label: 'Services',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/customer/services',
    activeIcon: 'fluent:briefcase-medical-16-filled',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/customer/bookings',
    activeIcon: 'fluent:clipboard-settings-24-filled',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/customer/wallet',
    activeIcon: 'solar:wallet-bold',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/customer/chats',
    activeIcon: 'material-symbols:chat-rounded',
  },
]
export const customerDesktopNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/customer/home',
  },
  {
    key: 'services',
    label: 'Services',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/customer/services',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/customer/bookings',
  },
  { label: 'wallet', icon: 'solar:wallet-outline', url: '/customer/wallet' },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/customer/chats',
  },
  {
    label: 'notification',
    icon: 'lucide:bell',
    url: '/customer/notification',
  },
  {
    label: 'help center',
    icon: 'lucide:circle-help',
    url: '/customer/support',
  },
]
export const serviceProviderMobileNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/service-provider/home',
    activeIcon: 'si:home-fill',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/service-provider/overview',
    activeIcon: 'fluent:briefcase-medical-16-filled',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/service-provider/bookings',
    activeIcon: 'fluent:clipboard-settings-24-filled',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/service-provider/wallet',
    activeIcon: 'solar:wallet-bold',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/service-provider/chats',
    activeIcon: 'material-symbols:chat-rounded',
  },
]

export const serviceProviderDesktopNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/service-provider/home',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: 'fluent:briefcase-medical-20-regular',
    url: '/service-provider/overview',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/service-provider/bookings',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/service-provider/wallet',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/service-provider/chats',
  },
  {
    label: 'notification',
    icon: 'lucide:bell',
    url: '/service-provider/notification',
  },
  {
    label: 'help center',
    icon: 'lucide:circle-help',
    url: '/service-provider/support',
  },
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
    url: 'mailto:skills4hireofficial@gmail.com',
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
    href: 'https://www.instagram.com/skills4hireapp?igsh=MmEyZ2EzcjRycnd1',
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

export const serviceProviderActivityTabList: ['posts', 'comments', 'images'] = [
  'posts',
  'comments',
  'images',
]

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
    location: 'Ikeja, Lagos',
    priceFrom: 800,
    excerpt: 'Included Pipe repairs, Leak fixes, and Maintenance etc.',
    image: Rect18,
  },
  {
    id: '2',
    provider: 'Joshua Friday',
    rating: 5,
    location: 'Yaba, Lagos',
    priceFrom: 1200,
    excerpt: 'Routine checks, plumbing maintenance, and quick fixes.',
    image: Rect19,
  },
  {
    id: '3',
    provider: 'Joshua Friday',
    rating: 4,
    location: 'Surulere, Lagos',
    priceFrom: 1500,
    excerpt: 'Professional drain unclogging, repairs, and replacements.',
    image: Rect20,
  },
]

export const jobOffers = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'User',
    location: 'Yaba, Lagos',
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
    role: 'User',
    location: 'Moniya, Ibadan',
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
    role: 'Plumber',
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
    title: 'Booking Request',
    icon: MessageSquare,
    requests: [
      {
        id: '01',
        name: 'Joshua Friday',
        avatar: JoshuaFridayBG,
        status: 'Pending',
        service: 'Plumbing',
        price: 20000,
        address: 'No 19, IyeruOkin Street, Tanke, Ilorin',
        date: Date.now(),
        time: Date.now(),
      },
      {
        id: '02',
        name: 'Mary Praise',
        avatar: MaryPraise,
        status: 'Accepted',
        service: 'Plumbing',
        price: 20000,
        address: 'No 18, IyeruOkin Street, Tanke, Ilorin',
        date: Date.now(),
        time: Date.now(),
      },
    ],
  },
  reviews: [
    {
      id: '1',
      name: 'Joshua Friday',
      rating: 4,
      image: '',
      createdAt: Date.now(),
      comment: 'Awesome work. Thank you so much.',
    },
    {
      id: '2',
      name: 'Joshua Friday',
      rating: 3,
      image: '',
      createdAt: Date.now(),
      comment: 'Fast and professional.',
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

export const requests = [
  {
    id: '01',
    name: 'Joshua Friday',
    avatar: JoshuaFridayBG,
    status: 'Pending',
    service: 'Plumbing',
    price: 20000,
    address: 'No 19, IyeruOkin Street, Tanke, Ilorin',
    date: Date.now(),
    time: Date.now(),
  },
  {
    id: '02',
    name: 'Mary Praise',
    avatar: MaryPraise,
    status: 'Accepted',
    service: 'Plumbing',
    price: 20000,
    address: 'No 18, IyeruOkin Street, Tanke, Ilorin',
    date: Date.now(),
    time: Date.now(),
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services', sectionId: 'services' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/#faqs', sectionId: 'faqs' },
  { label: 'Contact Us', href: '/#contact', sectionId: 'contact' },
]

export const footerLinks = [
  {
    heading: 'quick links',
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'About',
        url: '/about',
      },
      {
        label: 'Blog',
        url: '/blog',
      },
    ],
  },
  {
    heading: 'Contact Information',
    links: [
      {
        label: 'Email: support@skills4hireapp.com',
        url: 'mailto:support@skills4hireapp.com',
      },
      {
        label: 'Phone: +234-707-374-3287',
        url: 'tel:+2347073743287',
      },
    ],
  },
  {
    heading: 'legal',
    links: [
      {
        label: 'Privacy Policy',
        url: '/legal?type=privacy-policy',
      },
      {
        label: 'Terms & Conditions',
        url: '/legal?type=terms-conditions',
      },
    ],
  },
]

export const contact = [
  {
    label: 'email',
    text: 'support@skills4hireapp.com',
    url: 'mailto:support@skills4hireapp.com',
    icon: Mail,
  },
  {
    label: 'phone number',
    text: '+234-707-374-3287',
    url: 'tel:+2347073743287',
    icon: Phone,
  },
]

export const faqs = [
  {
    trigger: 'How do I hire a provider on Skills4Hire?',
    desc1: 'Hiring on Skills4Hire is simple and secure.',
    desc2:
      'Browse service categories or search for a skill, view the providers profile, compare reviews and prices, then book a provider directly through the platform. You can also post a job with your budget and let skilled providers reach out to you. Once you agree, make payment in-app and the job begins.',
  },
  {
    trigger: 'How are providers verified?',
    desc1:
      'All service providers on Skills4Hire go through a verification process before they can accept jobs.',
    desc2:
      'This includes identity verification, contact confirmation, skill review, and ongoing performance checks based on ratings and completed jobs. This ensures you’re hiring trusted professionals and enjoying the safest way to hire.',
  },
  {
    trigger: 'What services are available on Skills4Hire?',
    desc1:
      'Skills4Hire offers both vocational and digital services in one platform.',
    desc2:
      'Available services include (but are not limited to): Cleaning, Plumbing, Electrical, HVAC & Handyman services, Carpentry, Painting, Lawn Care & Pest Control, Automobile & Appliance Repair. Hairdressing, Barbering, Makeup, Nail Care & Massage, Fitness Training, Photography & Videography.',
    desc3:
      'Also with Digital services like Design, Tech, Marketing, Writing, and more',
  },
  {
    trigger: 'How are payments handled?',
    desc1: 'Payments on Skills4Hire are handled securely through the platform.',
    desc2:
      'Customers pay upfront, and funds are safely held until the service is completed. Once the job is confirmed as done, the provider gets paid. This protects both customers and service providers and prevents payment disputes or scams.',
  },
  {
    trigger: 'Is there a fee for using Skills4Hire?',
    desc1: 'Creating an account and browsing services on Skills4Hire is free.',
    desc2:
      'But the service providers are charged a small service fee only when a job is successfully completed. This fee helps us maintain platform security, verification, customer support, and continuous improvement of the service.',
  },
]

export const blogCategories = [
  {
    label: 'View all',
    value: 'all',
  },
  {
    label: 'Articles',
    value: 'articles',
  },
  {
    label: 'Resources',
    value: 'resources',
  },
  {
    label: 'News',
    value: 'news',
  },
]

export const features = [
  {
    icon: 'stash:badge-verified-solid',
    title: 'Verified Providers',
    desc: 'Every professional on Skills4Hire goes through a verification process, giving you peace of mind that you’re connecting with trusted providers who are qualified and reliable.',
  },
  {
    icon: 'mingcute:bank-card-fill',
    title: 'Proof of Work',
    desc: 'Unlike other platforms, Skills4Hire uses social feeds as living portfolios, where providers share real projects, updates, and results so you see their work before you hire.',
  },
  {
    icon: 'ic:baseline-work',
    title: 'Secure Payments',
    desc: 'All payments are handled safely within the platform, protecting both customers and providers. No risks, no scams just fast, transparent transactions you can trust.',
  },
]

export const carouselServices = [
  {
    image: webDevelopment,
    text: 'Web development',
  },
  {
    image: projectManagement,
    text: 'Project Management',
  },
  {
    image: fitnessTraining,
    text: 'Fitness Training',
  },
  {
    image: dataAnalysis,
    text: 'Data Analysis',
  },
  {
    image: hairDressing,
    text: 'Hairdressing',
  },
  {
    image: graphicDesign,
    text: 'Graphic Design',
  },
  {
    image: digitalMarketing,
    text: 'Digital Marketing',
  },
  {
    image: cybersecurity,
    text: 'Cybersecurity',
  },
  {
    image: carpentry,
    text: 'Carpentry',
  },
  {
    image: motionGraphics,
    text: 'Motion Graphics',
  },
  {
    image: electrical,
    text: 'Electrical',
  },
  {
    image: devops,
    text: 'DevOps',
  },
  {
    image: plumbing,
    text: 'Plumbing',
  },
  {
    image: videoEditing,
    text: 'Video Editing',
  },
  {
    image: cleaning,
    text: 'Cleaning',
  },
]

export const howItWorks = {
  customer: [
    'Register',
    'Create an offer or book a provider directly',
    'Pay securely',
  ],
  provider: [
    'Register as a service provider',
    'Set-up your profile',
    'Post your skill',
    'Get booked',
  ],
  platform: [
    'All service categories',
    "Visibility for the service providers and customer's offer",
    'Job offers',
    'Transparency',
  ],
}
