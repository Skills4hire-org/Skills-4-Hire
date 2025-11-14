import { toast } from 'sonner'
import type { ZodType } from 'zod'

export function useValidateSchema<T>(schema: ZodType<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message)
    toast.error(errors.join(', '))
    return
  }
  return result.data
}
