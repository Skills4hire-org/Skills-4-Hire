import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDeleteService } from '@/hooks/useUsers'
import { toast } from 'sonner'

export default function DeleteServiceDialog({
  service_id,
}: {
  service_id?: string
}) {
  const { mutate: deleteService, isPending } = useDeleteService()

  const handleDeleteService = () => {
    deleteService(service_id, {
      onSuccess: () => {
        toast.success('Service deleted')
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-1 bg-red-100 absolute -top-1 -right-1 rounded-sm cursor-pointer hover:bg-red-200">
          <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-destructive" />
          <span className="sr-only">delete service</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Delete Service</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Delete a service
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p>
          Are you sure you want to delete this service? This action cannot be
          undone.
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteService}
            disabled={isPending}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
