import { currencyFormatter } from '@/utils/format'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import type { ServiceProviderServiceCard } from '@/types/user.types'
import { useDispatch, useSelector } from 'react-redux'
import { addService, removeService } from '@/features/booking/bookingSlice'
import DeleteServiceDialog from '../profile/DeleteServiceDialog'

export default function ServiceProviderServicesCard({
  service_id,
  name,
  min_charge,
  attachments,
  check,
  isDeleteable,
}: ServiceProviderServiceCard & { check?: boolean; isDeleteable?: boolean }) {
  const { services }: { services: ServiceProviderServiceCard[] } = useSelector(
    (state: any) => state.bookingState,
  )
  const servicesIds = services.map((service) => service.service_id)
  const checked = servicesIds.includes(service_id)
  const dispatch = useDispatch()
  const action = (serviceSelected: boolean) => {
    if (serviceSelected) {
      dispatch(
        addService({
          service: {
            service_id,
            name,
            min_charge,
            attachments,
          },
        }),
      )
    } else {
      dispatch(removeService({ id: service_id }))
    }
  }
  const toggleAction = (checked: any) => {
    action(checked)
  }

  return (
    <li className="flex items-center justify-between gap-4 relative">
      <div className="flex-1 flex items-center gap-2">
        {!check || (
          <Checkbox
            id={service_id}
            className="border-foreground"
            checked={checked}
            onCheckedChange={(checked) => toggleAction(checked)}
          />
        )}
        <img
          src={attachments[0].image_url}
          alt="service image"
          className="aspect-square object-cover w-16 md:w-24 rounded-md"
          loading="lazy"
        />
        <Label
          htmlFor={service_id}
          className="font-normal line-clamp-3 md:text-base"
        >
          {name}
        </Label>
      </div>
      <span className="shrink-0  text-sm md:text-base font-medium">
        {currencyFormatter(Number(min_charge))}
      </span>
      {isDeleteable && <DeleteServiceDialog />}
    </li>
  )
}
