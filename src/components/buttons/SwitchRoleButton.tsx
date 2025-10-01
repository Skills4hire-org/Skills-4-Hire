import { Button } from '../ui/button'
import { MdHandyman } from 'react-icons/md'

export default function SwitchRoleButton() {
  return (
    <Button
      variant="default"
      className="justify-start px-2 rounded-full w-max font-normal text-xs gap-2.5"
    >
      <MdHandyman className="w-5 h-5 font-bold" />
      Switch to Service Provider
    </Button>
  )
}
