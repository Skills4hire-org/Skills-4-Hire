import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export default function SignOutButton() {
  return (
    <Button
      variant="destructive"
      className="justify-start mx-2 rounded-full w-max font-normal text-xs gap-2.5"
    >
      <LogOut className="w-5 h-5 font-bold" />
      Sign out
    </Button>
  )
}
