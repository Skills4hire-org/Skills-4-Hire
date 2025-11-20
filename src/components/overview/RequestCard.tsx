import { currencyFormatter, dateFormatter, timeFormatter } from '@/utils/format'
import { Button } from '../ui/button'

interface RequestCardProp {
  id: string
  name: string
  avatar: string
  status: string
  service: string
  price: number
  address: string
  date: string | number
  time: string | number
}

export default function RequestCard({
  id,
  name,
  avatar,
  status,
  service,
  price,
  address,
  date,
  time,
}: RequestCardProp) {
  const statusColor = (status: string) =>
    status === 'Pending' ? 'bg-red-500' : 'bg-primary'
  return (
    <div className="rounded-md shadow-md border border-gray-200 overflow-hidden bg-white">
      <div className="px-2 md:px-3 md:py-6 py-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <img src={avatar} alt={name} />

          <div className="flex flex-col flex-1">
            <span
              className={`${statusColor(
                status
              )} text-white text-xs px-3 py-1 rounded-full w-fit`}
            >
              {status}
            </span>

            {service && (
              <p className="mt-1 text-gray-600 italic text-sm">{service}</p>
            )}

            <span className="text-gray-900 font-medium mt-1">
              {currencyFormatter(price)}
            </span>
          </div>

          <span className="text-gray-500 font-semibold">#{id}</span>
        </div>

        <div className="bg-gray-100 p-3 rounded-xl text-sm text-gray-700">
          <h2 className="mt-1 font-medium text-gray-700">{name}</h2>
          <p className="font-medium">{address}</p>
          <p className="mt-1 text-gray-500 flex items-center gap-2 ">
            <span> {dateFormatter(date)}</span> —
            <span>{timeFormatter(time)}</span>
          </p>
        </div>

        {status === 'Pending' && (
          <div className="flex items-center justify-between gap-3 mt-2">
            <Button className="flex-1 bg-primary text-white rounded-full py-2">
              Accept
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-gray-400 text-gray-700 rounded-full py-2"
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
