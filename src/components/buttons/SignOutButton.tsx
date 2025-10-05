import { LogOut } from 'lucide-react'

export default function SignOutButton({ className }: { className: string }) {
  return (
    <button
      className={`flex items-center justify-start rounded-full w-max text-xs gap-2.5 py-2 pl-0 pr-8 font-medium ${className}`}
    >
      <LogOut className="w-5 h-5 font-bold" />
      Sign out
    </button>
  )
}
