import { serviceProviderTabList } from '@/assets/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'
import type { ServiceProvider } from '@/utils/types'
import ServiceProviderAbout from './ServiceProviderAbout'
import ServiceProviderGallery from './ServiceProviderGallery'

export default function ServiceProviderTab({
  getServiceProvider,
}: {
  getServiceProvider: ServiceProvider | undefined
}) {
  return (
    <Tabs defaultValue="about" className="space-y-2 ">
      <TabsList className="border-b-0 bg-background  rounded-none relative p-0 space-x-12 md:space-x-24">
        {serviceProviderTabList.map((status, index) => {
          return (
            <TabsTrigger
              key={index}
              value={status}
              className={cn(
                'bg-background cursor-pointer capitalize border-b-1 border-b-transparent text-lg md:text-xl text-muted-foreground data-[state=active]:border-b-foreground data-[state=active]:border-b-1 px-0 data-[state=active]:text-foreground'
              )}
            >
              {status}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {serviceProviderTabList.map((status) => {
        return (
          <TabsContent key={status} value={status} className="md:pt-1">
            {status === 'about' ? (
              <ServiceProviderAbout about={getServiceProvider?.about} />
            ) : (
              <ServiceProviderGallery gallery={getServiceProvider?.gallery} />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
