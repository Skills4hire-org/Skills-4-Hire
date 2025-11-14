import z from 'zod'

export const personalInfoFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: 'Phone number must start with 0' })
    .length(11, {
      message: 'Please enter a valid 11-digit phone number',
    }),
  nin: z.string().length(10, {
    message: 'Please enter a valid 10-digit NIN',
  }),
})

export const applicationProfileFormSchema = z.object({
  headline: z
    .string()
    .min(25, 'Headline must be at least 25 characters.')
    .max(90, 'Headline not exceed 90 characters.'),
})
