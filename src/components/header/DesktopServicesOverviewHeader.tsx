import { user } from '@/utils/database'

export default function DesktopServicesOverviewHeader() {
  return (
    <header className="hidden md:block text-center py-4">
      <h1 className="text-2xl font-semibold">
        Hi, {user?.firstName}{' '}
        <span className="text-primary">{user?.lastName}</span>
      </h1>
      <p className="text-base">Welcome back!</p>
    </header>
  )
}
