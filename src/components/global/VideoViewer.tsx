import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function VideoViewer({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: (open: boolean) => void
  children: ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="inset-0! top-0! left-0! translate-x-0! translate-y-0! w-screen! h-screen! max-w-none! sm:max-w-none! rounded-none! border-0! bg-black p-0! gap-0! overflow-hidden"
      >
        <button
          type="button"
          aria-label="Close video"
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 z-20 rounded-full bg-black/60 hover:bg-black/80 text-white p-2 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute inset-0">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
