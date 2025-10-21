import { serviceAround } from './database'

export const getServiceProvider = (id: string | undefined) => {
  const serviceProvider = serviceAround.find(
    (service) => service.id.toString() == id
  )
  return serviceProvider
}
