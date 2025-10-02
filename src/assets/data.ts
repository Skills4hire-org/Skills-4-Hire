import {
  Bell,
  BriefcaseMedical,
  FileText,
  FolderCog,
  HelpCircle,
  House,
  Info,
  MessageSquareMore,
  PhoneCall,
  Settings,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import { BsHeart } from 'react-icons/bs'
import HomeIcon from './Home.png'
import OverviewIcon from './Overview.png'
import BookingIcon from './Booking.png'
import WalletIcon from './Wallet.png'
import ChatsIcon from './Chats.png'

export const sidebarGeneral = [
  {
    icon: BsHeart,
    label: 'favourite service',
    url: '/',
  },
  {
    icon: BsHeart,
    label: 'favourite provider',
    url: '/',
  },
  {
    icon: BsHeart,
    label: 'blog',
    url: '/',
  },
  {
    icon: BsHeart,
    label: 'my rewards',
    url: '/',
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
    url: '/',
  },
  {
    icon: ShieldAlert,
    label: 'privacy policy',
    url: '/',
  },
  {
    icon: FileText,
    label: 'terms & conditions',
    url: '/',
  },
  {
    icon: HelpCircle,
    label: 'help & support',
    url: '/',
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
export const serviceProviderNavLinks = [
  {
    label: 'Home',
    icon: HomeIcon,
    url: '/customer/home',
  },
  {
    label: 'overview',
    icon: OverviewIcon,
    url: '/customer/overview',
  },
  {
    label: 'booking',
    icon: BookingIcon,
    url: '/customer/booking',
  },
  { label: 'wallet', icon: WalletIcon, url: '/customer/wallet' },
  { label: 'chats', icon: ChatsIcon, url: '/customer/chats' },
]
