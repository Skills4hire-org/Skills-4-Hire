import { LogOut } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/features/user/userSlice'

export default function SignOutButton({ className }: { className: string }) {
  const { toggleSidebar } = useSidebar()
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(logoutUser())
  }
  return (
    <button
      className={`flex items-center justify-start rounded-full w-max text-xs gap-2.5 py-1.5 pl-0 pr-8 font-medium cursor-pointer ${className}`}
      onClick={() => {
        toggleSidebar()
        handleSignOut()
      }}
    >
      <LogOut className="w-5 h-5 font-bold" />
      Sign out
    </button>
  )
}
