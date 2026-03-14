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

let nextId = serviceAround.length + 1;

export const listenForNewSignups = (callback) => {
    const interval = setInterval(() => {
        const newProviders = [
            {
                id: nextId++,
                name: "New User",
                occupation: "New Service",
                totalJobs: 0,
                image: "/src/assets/Admin profile.jpg",
            },
        ];
        callback(newProviders);
    }, 5000);

    return () => clearInterval(interval);
}
