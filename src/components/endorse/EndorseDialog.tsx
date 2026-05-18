import EndorseForm from '../form/EndorseForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface EndorseDialogProp {
  open: boolean
  onOpenChange: (value: boolean) => void
  provider_pk: string | undefined
  name: string
}

export default function EndorseDialog({
  open,
  onOpenChange,
  provider_pk,
  name,
}: EndorseDialogProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-1">
          <DialogTitle>Endorse {name}</DialogTitle>
          <DialogDescription>
            Write a recommendation to endorse {name}
          </DialogDescription>
        </DialogHeader>
        <EndorseForm provider_pk={provider_pk} />
      </DialogContent>
    </Dialog>
  )
}
