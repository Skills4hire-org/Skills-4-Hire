import { AlertTriangle, RotateCcw } from 'lucide-react'
import Container from './Container'
import Logo2 from './Logo2'

export default function ErrorPage({
  error,
  onReload,
}: {
  error?: Error
  onReload?: () => void
}) {
  const handleReload = () => {
    if (onReload) {
      onReload()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Container className="bg-white py-4 flex items-center justify-center">
        <Logo2 />
      </Container>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="mx-auto w-fit rounded-full bg-red-50 p-4">
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            An unexpected error occurred while loading this page. Please reload
            to continue.
          </p>
          {error?.message && (
            <p className="text-xs text-gray-400 break-words">
              {error.message}
            </p>
          )}
          <button
            onClick={handleReload}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md text-sm md:text-base font-medium cursor-pointer hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4" />
            Reload page
          </button>
        </div>
      </div>
    </div>
  )
}
