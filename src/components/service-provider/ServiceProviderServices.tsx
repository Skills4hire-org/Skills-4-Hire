import type { ServiceProvider } from '@/utils/types'
import ServiceProviderServicesCard from './ServiceProviderServicesCard'

export default function ServiceProviderServices({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg md:text-xl ">Services</h2>
      <ul className="grid grid-cols-1 gap-4">
        {getServiceProvider?.services?.map((service, index) => (
          <ServiceProviderServicesCard key={index} {...service} />
        ))}
      </ul>
    </div>
  )
}
