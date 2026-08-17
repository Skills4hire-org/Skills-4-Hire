import axios from 'axios'

interface ApiErrorResponse {
  success?: string
  message?: string
}

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data

    console.log(data)

    const message =
      data?.message ||
      (data && typeof data === 'object'
        ? Object.entries(data)
            .map(
              ([field, details]) =>
                `${field}: ${Array.isArray(details) ? details.join(', ') : String(details)}`,
            )
            .join(' ')
        : undefined) ||
      error.message ||
      'Something went wrong'
    throw new Error(message)
  }

  throw new Error('Unexpected error occurred')
}
