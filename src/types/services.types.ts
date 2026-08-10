export type AvailableServices = {
  serviceImage: string
  serviceName: string
  category: string
}

export type Service = {
  service_id: string
  name: string
  attachments?: {
    image_url: string
  }[]
  /** Local fallback image used when the API does not supply an attachment */
  localImage?: string
}

/** Shape returned by /api/v1/services-categories/ */
export type ServiceCategory = {
  id: string | number
  name: string
  image_url?: string
  image?: string
  category?: string
}
