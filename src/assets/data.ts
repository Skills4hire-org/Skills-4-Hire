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
  Settings,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import { CreditCard, User, DollarSign, Search, Users } from 'lucide-react'
import { BsHeart } from 'react-icons/bs'
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6'
import img1 from './Rectangle 20.png'
import img2 from './Rectangle 21.png'
import { TbArticle, TbAward, TbHeart, TbStar } from 'react-icons/tb'

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
    icon: BsHeart,
    label: 'profile',
    url: '/',
  },
  {
    icon: BsHeart,
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
    icon: BsHeart,
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
export const serviceProviderNavLinks = [
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
    label: 'notifications',
    icon: Bell,
    url: '/customer/notifications',
  },
  {
    label: 'settings',
    icon: Settings,
    url: '/customer/settings',
  },
  {
    label: 'help center',
    icon: HelpCircle,
    url: '/customer/help-center',
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

export interface WalletAction {
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

export const walletActions: WalletAction[] = [
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
  fields: ['From', 'To', 'Title', 'Amount', 'Comment', 'Rating'],
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

export const favoritesTabList = [
  {
    status: 'favorite-services',
    label: 'favorite services',
  },
  {
    status: 'favorite-providers',
    label: 'favorite providers',
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
