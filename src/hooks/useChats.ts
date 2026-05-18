import { createConversation } from '@/api/chat'
import type { CreateConversation } from '@/types/chat.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateConversation = () => {
  const createConversationAction = async (data: CreateConversation) => {
    try {
      await createConversation(data)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const createConversationFunction = useMutation({
    mutationFn: createConversationAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  return createConversationFunction
}
