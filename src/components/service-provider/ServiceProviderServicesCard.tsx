import { currencyFormatter } from '@/utils/format'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import type { ServiceProviderServiceCard } from '@/utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { addService, removeService } from '@/features/booking/bookingSlice'

export default function ServiceProviderServicesCard({
  image,
  desc,
  price,
  id,
}: ServiceProviderServiceCard) {
  const { services }: { services: ServiceProviderServiceCard[] } = useSelector(
    (state: any) => state.bookingState
  )
  const servicesIds = services.map((service) => service.id)
  const checked = servicesIds.includes(id)
  const dispatch = useDispatch()
  const action = (serviceSelected: boolean) => {
    if (serviceSelected) {
      dispatch(
        addService({
          service: {
            image,
            desc,
            price,
            id,
          },
        })
      )
    } else {
      dispatch(removeService({ id }))
    }
  }
  const toggleAction = (checked: any) => {
    action(checked)
  }

  return (
    <li className="flex items-center justify-between gap-4">
      <div className="flex-1 flex items-center gap-2">
        <Checkbox
          id={id.toString()}
          className="border-foreground"
          checked={checked}
          onCheckedChange={(checked) => toggleAction(checked)}
        />
        <img
          src={image}
          alt="service image"
          className="aspect-square object-cover w-16 md:w-24 rounded-md"
          loading="lazy"
        />
        <Label
          htmlFor={id.toString()}
          className="font-normal line-clamp-3 md:text-base"
        >
          {desc}
        </Label>
      </div>
      <span className="shrink-0  text-sm md:text-base font-medium">
        {currencyFormatter(price)}
      </span>
    </li>
  )
}
