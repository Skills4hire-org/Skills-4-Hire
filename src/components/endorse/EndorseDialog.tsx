import { useState } from 'react'
import EndorseForm from '../form/EndorseForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface EndorseDialogProp {
  provider_pk: string | undefined
  name?: string
  triggerClassName?: string
}

export default function EndorseDialog({
  provider_pk,
  name,
  triggerClassName,
}: EndorseDialogProp) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={
            triggerClassName ??
            'capitalize font-semibold text-white text-sm md:text-base cursor-pointer'
          }
        >
          endorse
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle>Endorse {name}</DialogTitle>
          <DialogDescription>
            Write a recommendation to endorse {name}
          </DialogDescription>
        </DialogHeader>
        <EndorseForm provider_pk={provider_pk} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
