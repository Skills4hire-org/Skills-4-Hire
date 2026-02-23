import { currencyFormatter, dateFormatter } from '@/utils/format'
import { Pencil, Trash2, X, Calendar, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import OfferImageCarousel from './OfferImageCarousel'
import { images } from '@/assets/data'
import { Link } from 'react-router-dom'
import OfferFilesCarousel from './OfferFilesCarousel'

interface OfferCardProps {
  title: string
  description: string
  media?: string[]
  active: boolean
  id: string
}

export default function OfferCard({
  id,
  title,
  description,
  media,
  active,
}: OfferCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [viewMore, setViewMore] = useState(false)

  const handleDelete = () => {
    //delete mutation function
    setIsDeleteOpen(false)
  }

  return (
    <>
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Offer?
            </h2>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this offer? This action cannot be
              undone.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 cursor-pointer"
              >
                <X size={16} /> Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[var(--destructive)] text-white text-sm hover:opacity-90 cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 w-full">
        <div className="flex items-start justify-between gap-2 md:gap-4 mb-1">
          <span className="text-xs md:text-sm bg-primary/10 text-primary rounded-sm px-4 md:px-6 py-1 w-max mb-1 font-medium">
            Plumbing
          </span>
          <span
            className={`text-xs sm:text-sm font-medium px-3 md:px-8 py-1 bg-green-100 text-green-700 rounded-full ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {active ? 'Active' : 'Closed'}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
          {title}
        </h3>

        <div>
          <p
            className={`text-xs md:text-sm text-gray-600 ${!viewMore && 'line-clamp-2 sm:line-clamp-none'}`}
          >
            {description}
          </p>
          <button
            onClick={() => setViewMore(!viewMore)}
            className="text-xs md:text-sm text-primary underline cursor-pointer hover:no-underline sm:hidden"
          >
            {viewMore ? 'less' : 'more'}
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-2 text-sm md:text-base text-gray-500 mb-4 text-xs md:text-sm">
          <div className="flex flex-col gap-0.5 md:gap-1">
            <span className="flex items-center gap-1">
              Amount: {currencyFormatter(2000)} {/* amount */}
            </span>

            <span className="flex items-center gap-1">
              Time Frame: 2 days {/* time frame */}
            </span>
          </div>

          <span className="flex items-center gap-1 capitalize">
            Location: Ibadan, {/* city */}{' '}
            <span className="uppercase">OYO {/* state */}</span>
          </span>
        </div>
        {media && <OfferImageCarousel images={images} />}

        <OfferFilesCarousel />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> Posted: {dateFormatter(Date.now())}{' '}
            {/* date value here*/}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} /> Inquiries: 12{' '}
            {/* inquiries value here*/}
          </span>
        </div>
        {!active || (
          <div className="flex gap-2 mt-4">
            <Link
              to={`/customer/edit-offer/${id}`}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-[var(--primary)] text-white text-sm md:text-base hover:opacity-90"
            >
              <Pencil size={16} /> Edit
            </Link>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 text-sm hover:bg-gray-50  cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </>
  )
}
