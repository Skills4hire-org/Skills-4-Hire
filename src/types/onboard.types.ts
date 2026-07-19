export type FileStructure = {
  file: File[] | null
  name: string
  selectNewFile: boolean
}

export type ApplicationProfileFormData = {
  service: string | undefined
  country: string
  state: string
  city: string
  address: string
  dateOfBirth: string
  headline: string
}

export type Registration = {
  additionalInfo: ApplicationProfileFormData
}

export type RequiredFormData = {
  country: string
  city: string
  address: string
  dateOfBirth: string
  headline: string
  firstName: string
  lastName: string
  phone: string
  nin: string
  service: string | undefined
}
