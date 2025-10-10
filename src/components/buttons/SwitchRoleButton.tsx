import { MdHandyman } from 'react-icons/md'

export default function SwitchRoleButton({ className }: { className: string }) {
  return (
    <button
      className={`flex items-center justify-start px-2 py-2.5 rounded-full w-max text-xs font-medium gap-2.5 ${className} cursor-pointer`}
    >
      <MdHandyman className="w-5 h-5 font-bold" />
      Register as a Service Provider {/* Switch to Service Provider */}
    </button>
  )
}
