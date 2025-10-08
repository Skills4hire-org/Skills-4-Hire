import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Container from '../global/Container'

export default function HeaderWithBackNavigation({
  title,
  onlyMobile,
}: {
  title: string
  onlyMobile?: boolean
}) {
  const navigate = useNavigate()
  return (
    <Container className={`bg-white py-1 md:py-4 ${onlyMobile && 'md:hidden'}`}>
      <div className="relative">
        <button
          className="left-0 absolute top-1/2 -translate-y-1/2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-6 h-6 " />
          <span className="sr-only">back</span>
        </button>
        <h1 className="font-bold text-center text-lg md:text-xl">{title}</h1>
      </div>
    </Container>
  )
}
