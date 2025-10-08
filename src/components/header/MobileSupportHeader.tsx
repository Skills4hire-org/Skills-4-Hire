import { useNavigate } from 'react-router-dom'
import ProfileImage from '../global/ProfileImage'
import { SidebarTrigger } from '../ui/sidebar'
import { ChevronLeft } from 'lucide-react'

export default function MobileSupportHeader() {
  const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between py-3.5 md:hidden">
      <button onClick={() => navigate(-1)} className=" ">
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">back</span>
      </button>
      <h1 className="font-bold text-lg">Support</h1>
      <SidebarTrigger size="lg">
        <ProfileImage />
      </SidebarTrigger>
    </header>
  )
}
