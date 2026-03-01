import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import { useDispatch, useSelector } from 'react-redux'
import { useIsMobile } from '@/hooks/use-mobile'
import { clearUnread } from '@/features/chat/chatSlice'
import { ChevronLeft } from 'lucide-react'
import ProfileImage from '../global/ProfileImage'
import type { UserType } from '@/utils/types'
import { Icon } from '@iconify/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import FormInput from '../form-fields/FormInput'
import { currencyFormatter } from '@/utils/format'
import FormTextArea from '../form-fields/FormTextArea'

const PAGE_SIZE = 10

export default function ChatWindow() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const [formData, setFormData] = useState({
    price: '',
    note: '',
  })
  const handleInputChange = (field: string, value: string) => {
    if (field === 'price') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({
        ...prev,
        [field]: newValue && `${currencyFormatter(Number(newValue))}`,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const {
    conversations,
    users,
    messages,
    conversationMessages,
    currentUserId,
  } = useSelector((state: any) => state.chatState)

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!conversationId) return null

  const conversation = conversations[conversationId]

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Conversation not found
      </div>
    )
  }

  useEffect(() => {
    dispatch(clearUnread(conversationId))
    setVisibleCount(PAGE_SIZE)
  }, [conversationId, dispatch])

  const otherUserId = conversation.participantIds.find(
    (id: string) => id !== currentUserId,
  )

  const otherUser = otherUserId ? users[otherUserId] : null

  const allMessageIds = conversationMessages[conversationId] || []

  const visibleMessageIds = allMessageIds.slice(-visibleCount)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setVisibleCount((prev) =>
        prev + PAGE_SIZE <= allMessageIds.length
          ? prev + PAGE_SIZE
          : allMessageIds.length,
      )
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b pb-2 -mt-2">
        {isMobile && (
          <Link to={`/${userType}/chats`} className="text-sm">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        )}
        <div className="flex items-center gap-2">
          <ProfileImage size="size-10" noStatus />
          <div>
            <h2 className="font-semibold text-lg">
              {otherUser?.name || 'Unknown User'}
            </h2>
            <div className="text-xs md:text-sm flex items-center gap-2 font-medium -mt-0.5">
              <span className="w-2 h-2 block bg-primary  rounded-full"></span>
              <span> Active</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center max-w-xs mx-auto border mt-3 rounded-sm text-xs/3.5  py-1 ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="border-r-1 border-foreground px-1  flex items-center gap-1 cursor-pointer hover:text-primary text-start">
              <Icon
                icon="material-symbols-light:money-bag-outline"
                className="w-6.5 h-6.5 shrink-0"
              />
              <span>Propose Price</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-60 px-2 py-4">
            <AlertDialogHeader>
              <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
                <Icon
                  icon="material-symbols-light:money-bag-outline"
                  className="w-6.5 h-6.5 "
                />
                <span>Propose Price</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Propose a price
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form className="space-y-4">
              <FormInput
                name="price"
                value={formData.price}
                handleInputChange={handleInputChange}
                type="text"
                label="Price"
                className="bg-gray-300"
                placeholder="Enter a price"
                labelSize="text-xs md:text-sm"
              />
              <FormTextArea
                name="note"
                value={formData.note}
                handleInputChange={handleInputChange}
                label="Note (Optional)"
                rows={1}
                className="bg-gray-300 mt-2 min-h-8  h-9 md:h-10 text-xs md:text-sm"
              />
            </form>
            <AlertDialogFooter className="grid grid-cols-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Send</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="border-r-1 border-foreground px-1  flex items-center gap-1 cursor-pointer hover:text-primary text-start">
              <Icon
                icon="material-symbols-light:cycle"
                className="w-6.5 h-6.5 shrink-0"
              />
              <span>Negotiate Price</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-56 px-2 py-4">
            <AlertDialogHeader>
              <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
                <Icon
                  icon="material-symbols-light:cycle"
                  className="w-6.5 h-6.5 "
                />
                <span>Negotiate Price</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Negotiate price
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form className="space-y-4">
              <FormInput
                name="price"
                value={formData.price}
                handleInputChange={handleInputChange}
                type="text"
                label="Counter offer"
                className="bg-gray-300"
                placeholder="Enter a price"
                labelSize="text-xs md:text-sm"
              />
              <FormTextArea
                name="note"
                value={formData.note}
                handleInputChange={handleInputChange}
                label="Note (Optional)"
                rows={1}
                className="bg-gray-300 mt-2 min-h-8 h-9 text-xs md:text-sm md:h-10"
              />
            </form>
            <AlertDialogFooter className="grid grid-cols-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Send</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className=" px-1  flex items-center gap-1 cursor-pointer  group text-start">
              <Icon
                strokeWidth={5}
                icon="mdi-light:check-circle"
                className="w-6.5 h-6.5 group-hover:text-primary shrink-0"
              />
              <span className="group-hover:text-primary">
                Agree on Final Price
              </span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-60 px-2 py-4">
            <AlertDialogHeader>
              <AlertDialogTitle className=" flex items-center gap-1 text-sm justify-center  w-full">
                <Icon
                  icon="material-symbols-light:money-bag-outline"
                  className="w-6.5 h-6.5"
                />
                <span>Do you Agree on Final Price?</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Agree on Final price
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form className="space-y-4">
              <FormInput
                name="price"
                value={formData.price}
                handleInputChange={handleInputChange}
                type="text"
                label="Final Price"
                className="bg-gray-300"
                placeholder="Enter a price"
                labelSize="text-xs md:text-sm"
              />
            </form>
            <AlertDialogFooter className="grid grid-cols-2">
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* MESSAGES */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        onScroll={handleScroll}
      >
        {visibleMessageIds.map((id: string) => {
          const message = messages[id]
          if (!message) return null
          return <MessageBubble key={id} message={message} />
        })}
      </div>

      {/* INPUT */}
      <MessageInput conversationId={conversationId} />
    </div>
  )
}
