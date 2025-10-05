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

import img1 from './Rectangle 20.png'
import img2 from './Rectangle 21.png'

export const images = [img1, img2, img1]

export const sidebarMobileGeneral = [
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
export const sidebarDesktopGeneral = [
  {
    icon: BsHeart,
    label: 'profile',
    url: '/',
  },
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
