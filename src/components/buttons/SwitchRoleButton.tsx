import { MdHandyman } from 'react-icons/md'

export default function SwitchRoleButton({ className }: { className: string }) {
  return (
    <button
      className={`flex items-center justify-start px-4 py-2 rounded-full w-max text-xs gap-2.5 ${className}`}
    >
      <MdHandyman className="w-5 h-5 font-bold" />
      Switch to Service Provider
    </button>
  )
}
