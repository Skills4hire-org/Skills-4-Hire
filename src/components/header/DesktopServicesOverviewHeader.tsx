import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'

export default function DesktopServicesOverviewHeader() {
  const { data } = useMyProfile()
  const user_data: Profile | undefined = data

  return (
    <header className=" hidden md:block text-center py-4">
      <h1 className="text-2xl font-semibold">
        Hi, {user_data?.user?.first_name}{' '}
        <span className="text-primary">{user_data?.user?.last_name}</span>
      </h1>
      <p className="text-base">Welcome back!</p>
    </header>
  )
}
