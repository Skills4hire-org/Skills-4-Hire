import axios from 'axios'

const friendlyField = (field: string): string =>
  field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const messageFromApiData = (data: unknown): string | undefined => {
  if (typeof data === 'string') return data
  if (!data || typeof data !== 'object') return undefined

  const record = data as Record<string, unknown>

  if (typeof record.message === 'string') return record.message
  if (typeof record.detail === 'string') return record.detail
  if (typeof record.error === 'string') return record.error

  if (Array.isArray(record.non_field_errors)) {
    return record.non_field_errors.join(' ')
  }

  const specified: string[] = []
  for (const [field, value] of Object.entries(record)) {
    if (Array.isArray(value) && value.length > 0) {
      specified.push(`${friendlyField(field)}: ${value.join(' ')}`)
    } else if (typeof value === 'string' && value) {
      specified.push(`${friendlyField(field)}: ${value}`)
    }
  }
  if (specified.length > 0) return specified.join(' ')

  return undefined
}

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<unknown>(error)) {
    const status = error.response?.status

    const fromApi = messageFromApiData(error.response?.data)
    if (fromApi) return fromApi

    const fallbacks: Record<number, string> = {
      400: 'There was a problem with the information you provided. Please check and try again.',
      401: 'Your session has expired. Please sign in again.',
      403: "You don't have permission to perform this action.",
      404: "We couldn't find what you were looking for. Please try again.",
      422: 'Some of the information you provided is invalid. Please check and try again.',
      429: 'Too many attempts. Please wait a moment and try again.',
    }
    if (status && fallbacks[status]) return fallbacks[status]
    if (status && status >= 500) {
      return 'Something went wrong on our end. Please try again shortly.'
    }
    if (!status) {
      return 'Unable to connect. Please check your internet connection and try again.'
    }
    return 'Something went wrong. Please try again.'
  }

  return error instanceof Error && error.message
    ? error.message
    : 'Unexpected error occurred. Please try again.'
}

export const handleApiError = (error: unknown): never => {
  throw new Error(getApiErrorMessage(error))
}