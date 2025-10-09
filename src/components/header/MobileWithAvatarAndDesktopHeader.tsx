import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SidebarTrigger } from '../ui/sidebar'
import ProfileImage from '../global/ProfileImage'

export default function MobileWithAvatarAndDesktopHeader({
  title,
}: {
  title: string
}) {
  const navigate = useNavigate()
  return (
    <header className="flex md:block items-center justify-between items-center py-3.5 md:py-4">
      <button onClick={() => navigate(-1)} className="md:hidden">
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">back</span>
      </button>
      <h1 className="font-bold text-lg md:text-2xl md:text-start">{title}</h1>
      <SidebarTrigger size="lg" className="md:hidden">
        <ProfileImage />
      </SidebarTrigger>
    </header>
  )
}
