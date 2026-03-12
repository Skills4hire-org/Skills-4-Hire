import { serviceAround } from './database'

export const getServiceProvider = (id: string | undefined) => {
  const serviceProvider = serviceAround.find(
    (service) => service.id.toString() == id
  )
  return serviceProvider
}

export const getServiceProviders = () => {
    return serviceAround;
}

export const addServiceProvider = (provider) => {
    serviceAround.push(provider);
}

export const deleteServiceProvider = (id) => {
    const index = serviceAround.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceAround.splice(index, 1);
    }
}
