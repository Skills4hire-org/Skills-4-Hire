import { user } from '@/utils/database'

export default function DesktopServicesHeader() {
  return (
    <header className="hidden md:block text-center">
      <h1 className="text-lg font-semibold">
        Hi, {user?.firstName}{' '}
        <span className="text-primary">{user?.lastName}</span>
      </h1>
      <p className="text-sm">Welcome back!</p>
    </header>
  )
}
