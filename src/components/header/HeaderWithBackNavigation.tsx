import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Container from '../global/Container'

export default function HeaderWithBackNavigation({
  title,
  onlyMobile,
}: {
  title: string | undefined
  onlyMobile?: boolean
}) {
  const navigate = useNavigate()

  return (
    <Container
      className={`bg-white py-2 md:py-4 border-b border-gray-100 mb-4 ${
        onlyMobile && 'md:hidden'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <button
          className="absolute left-0 flex items-center justify-center p-1 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="sr-only">Back</span>
        </button>

        <h1 className="font-bold text-center text-lg md:text-2xl truncate px-8">
          {title}
        </h1>
      </div>
    </Container>
  )
}
