import { currencyFormatter } from '@/utils/format'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Separator } from '../ui/separator'
import { Check, Wallet } from 'lucide-react'
import { user } from '@/utils/database'
import ProfileImage from '../global/ProfileImage'

export default function PaymentDrawer({
  name,
  occupation,
  paymentAmount,
}: {
  name: string
  occupation: string
  paymentAmount: string
}) {
  const content = [
    {
      title: 'Handyman',
      value: name,
    },
    {
      title: 'Handyman Service',
      value: occupation,
    },
  ]
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          type="submit"
          size="lg"
          className="rounded-full px-8 text-base md:text-lg"
          disabled={!paymentAmount}
        >
          Confirm
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-2 sm:px-4 md:max-w-lg lg:max-w-2xl md:translate-x-[6rem] mx-auto pt-6 ">
        <DrawerHeader className="sr-only">
          <DrawerTitle>
            <span>Payment info</span>
          </DrawerTitle>
          <DrawerDescription>
            Service provider name, occupation and amount to be paid
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 mb-8">
          <div className="mx-auto w-max font-medium text-2xl md:text-3xl mb-6">
            {currencyFormatter(Number(paymentAmount))}
          </div>
          <ul className="text-sm md:text-base font-medium space-y-4">
            {content.map(({ title, value }) => (
              <li key={title} className="flex items-center justify-between">
                <span className="text-muted-foreground">{title}</span>
                <span className="capitalize text-foreground flex items-center gap-1">
                  {title == 'Handyman' && (
                    <ProfileImage size="size-8" noStatus />
                  )}
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="bg-gray-300 px-2 py-2.5 md:py-4 rounded-md flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Wallet className="w-10 h-10 md:w-12 md:h-12 text-white bg-primary p-2 rounded-full" />
                <span className="text-base md:text-lg">Wallet</span>
              </div>
              <span className="text-lg md:text-xl">
                ( {currencyFormatter(user?.availableBalance)} )
              </span>
            </div>
            <Check strokeWidth={5} className="w-4 h-4 text-primary" />
          </div>
        </div>

        <Button
          size="lg"
          className="text-xl font-normal h-12 w-full max-w-xs mx-auto mb-6 "
        >
          Pay
        </Button>
      </DrawerContent>
    </Drawer>
  )
}
