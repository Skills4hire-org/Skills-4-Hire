import SmallDP from '../assets/Small-DP.png'

// Assets
import HomeIcon from '../assets/Home.png'
import OverviewIcon from '../assets/Overview.png'
import BookingIcon from '../assets/Booking.png'
import WalletIcon from '../assets/Wallet.png'
import ChatsIcon from '../assets/Chats.png'
import NotificationIcon from '../assets/Notification.png'
import SettingsIcon from '../assets/Settings.png'
import HelpIcon from '../assets/Help.png'
import { Sidebar } from './ui/sidebar'

export default function CustomerSidebar({ active }: { active: string }) {
  return (
    <Sidebar
      className="
        hidden md:flex flex-col
        fixed top-0 left-0
        bg-[#222BDE] text-white
        px-4 py-6 w-44 rounded-r-xl
        h-screen 
        z-40
      "
    >
      <div className="flex flex-col items-center gap-6 flex-1">
        {/* Logo */}
        <div className="flex flex-col items-center font-['Abhaya_Libre'] font-extrabold leading-none w-full">
          <div className="flex items-baseline text-3xl">
            <span className="text-white">S</span>
            <span className="text-[#010431] relative top-1">4</span>
            <span className="text-white">h</span>
          </div>
          <div className="text-sm text-white mt-1">Skills4hire</div>
        </div>

        {/* Nav list */}
        <nav className="flex flex-col gap-3 w-full mt-6">
          <SidebarItem
            icon={HomeIcon}
            label="Home"
            active={active === 'home'}
          />
          <SidebarItem
            icon={OverviewIcon}
            label="Overview"
            active={active === 'overview'}
          />
          <SidebarItem
            icon={BookingIcon}
            label="Bookings"
            active={active === 'bookings'}
          />
          <SidebarItem
            icon={WalletIcon}
            label="Wallet"
            active={active === 'wallet'}
          />
          <SidebarItem
            icon={ChatsIcon}
            label="Chats"
            active={active === 'chats'}
          />
          <SidebarItem
            icon={NotificationIcon}
            label="Notifications"
            active={active === 'notifications'}
          />

          <div className="mt-6 flex flex-col gap-3">
            <SidebarItem
              icon={SettingsIcon}
              label="Settings"
              active={active === 'settings'}
            />
            <SidebarItem
              icon={HelpIcon}
              label="Help Center"
              active={active === 'help'}
            />
          </div>
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-3 mt-4">
          <div className="relative">
            <img
              src={SmallDP}
              alt="small profile"
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>
    </Sidebar>
  )
}

/* ===== Sidebar Item ===== */
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 w-full px-3 py-2 ${
        active ? 'font-semibold text-white/100' : 'text-white/80'
      }`}
    >
      <img src={icon} alt={label} className="w-6 h-6" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
