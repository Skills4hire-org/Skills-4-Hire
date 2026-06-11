import { useState } from 'react'
import ServiceForm from '../form/ServiceForm'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

export default function ServicesDialog({
  servicesLength,
}: {
  servicesLength: number | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-8 md:h-10 md:px-4 px-2 text-sm md:text-base font-medium rounded-sm flex items-center gap-2">
          {servicesLength === 0 ? 'Add a service' : 'Add more services'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Add a service</AlertDialogTitle>
          <AlertDialogDescription>
            Add a specific service you provide with cost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ServiceForm setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  )
}
