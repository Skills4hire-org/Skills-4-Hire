import {
  BriefcaseMedical,
  FileText,
  FolderCog,
  HelpCircle,
  House,
  Info,
  MessageSquareMore,
  PhoneCall,
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

export const customerNavLinks = [
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
    label: 'booking',
    icon: FolderCog,
    url: '/customer/booking',
  },
  { label: 'wallet', icon: Wallet, url: '/customer/wallet' },
  { label: 'chats', icon: MessageSquareMore, url: '/customer/chats' },
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
