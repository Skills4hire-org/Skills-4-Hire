import { LogOut } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/features/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function SignOutButton({ className }: { className: string }) {
  const { toggleSidebar } = useSidebar()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logoutUser())
    navigate('/')
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
