import { supportOptions } from '@/assets/data'
import Container from '@/components/global/Container'
import SupportOptionsCard from '@/components/support/SupportOptionsCard'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { UserType } from '@/types/user.types'
import { useSelector } from 'react-redux'

export default function Support() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )

  return (
    <div className="space-y-2 md:space-y-4 lg:w-[64rem] lg:ml-17 max-[1023px]:min-[768px]:ml-17">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Support" />
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          <Link
            to={`/${userType}/customer-support`}
            className=" flex items-center gap-2 md:gap-4 rounded-md bg-white p-2 md:p-3 cursor-pointer"
          >
            <div className="p-2 md:p-4 bg-gray-300 w-max rounded-full">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h2 className="text-sm md:text-base">Chat with customer support</h2>
          </Link>
          {supportOptions.map((support) => (
            <SupportOptionsCard key={support.text} {...support} />
          ))}
        </div>
      </Container>
    </div>
  )
}
