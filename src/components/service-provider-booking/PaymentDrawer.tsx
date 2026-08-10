import { currencyFormatter, formatSpaceToString } from '@/utils/format'
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
import { Check, Loader2, RefreshCcw, Wallet } from 'lucide-react'
import ProfileImage from '../global/ProfileImage'
import { useAddBooking } from '@/hooks/useBookings'
import type { BookingInfo } from '@/types/bookings.type'
import type { Service } from '@/types/user.types'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import type { WalletBalance } from '@/types/wallet.types'

export default function PaymentDrawer({
  name,
  occupation,
  paymentAmount,
  avatar,
  info,
  provider_id,
  services,
}: {
  name: string | undefined
  occupation: string | undefined
  paymentAmount: string
  avatar?: string
  info: BookingInfo
  provider_id: string | undefined
  services: Service[]
}) {
  const { data, isLoading, isError, refetch } = useWallet()

  const wallet: WalletBalance = data
  const content = [
    {
      title: 'Skilled Professional',
      value: name,
    },
    {
      title: 'Professional Title',
      value: formatSpaceToString(occupation),
    },
  ]

  const servicesIds = services.map((service) => service.service_id)
  const { mutate: bookProvider, isPending } = useAddBooking()
  const navigate = useNavigate()
  const handlePayment = () => {
    const data = {
      address: info.address,
      provider: provider_id,
      price: info.price,
      notes: info.notes,
      descriptions: info.descriptions,
      start_date: `${info.date}T${info.time}`,
      is_urgent: info.is_urgent,
      is_remote: info.is_remote,
      provider_service: servicesIds,
    }

    bookProvider(data, {
      onSuccess: () => {
        navigate('/customer/bookings')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

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
                    <ProfileImage size="size-8" noStatus avatar={avatar} />
                  )}
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <Separator />
          <div className="bg-gray-300 px-2 py-2.5 md:py-4 rounded-md flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-8 h-8 md:w-10 md:h-10 text-white bg-primary p-2 rounded-full" />
                <span className="text-base md:text-lg">Wallet</span>
                {isError && (
                  <button onClick={() => refetch()}>
                    <RefreshCcw className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}
              </div>
              <span className="text-lg md:text-xl">
                {isError
                  ? '---'
                  : currencyFormatter(Number(wallet?.available_balance))}
              </span>
            </div>
            <Check strokeWidth={5} className="w-4 h-4 text-primary" />
          </div>
        </div>
        <Button
          size="lg"
          className="text-xl font-normal h-12 w-full max-w-xs mx-auto mb-6"
          onClick={handlePayment}
          disabled={
            isPending || isLoading || info.price > wallet?.available_balance
          }
        >
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          Pay
        </Button>
      </DrawerContent>
    </Drawer>
  )
}
