import SmallDP from '../../assets/Small-DP.png'
import { Plus, Image as ImageIcon, Paperclip, Smile } from 'lucide-react'

interface PostComposerProps {
  variant?: 'feed' | 'myPosts' | 'customer'
  placeholder?: string
}

export default function PostComposer({
  variant = 'feed',
  placeholder = 'What job do you want to get done?',
}: PostComposerProps) {
  const timeFrameOptions = [
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '1 week',
    '2 weeks',
    '1 month',
    '1 year',
  ]

  if (variant === 'customer') {
    return (
      <div className="bg-white rounded-2xl shadow p-3 sm:p-4 space-y-3 border border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={SmallDP}
            alt="Your profile"
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 rounded-full border border-gray-200 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#222BDE]"
          />
        </div>

        <div className="flex justify-between gap-3 pt-1 pb-2">
          {' '}
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 text-xs font-medium mb-1">
              Budget Amount
            </label>
            <input
              type="number"
              placeholder="₦10,000"
              className="w-full py-1.5 px-2 border border-gray-200 rounded-lg bg-gray-50 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#222BDE]" // py-1.5 for reduction, border-gray-200 for more whitish
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 text-xs font-medium mb-1">
              Time Frame
            </label>
            <div className="relative">
              <select
                defaultValue="3 days"
                className="appearance-none w-full py-1.5 px-2 border border-gray-200 rounded-lg bg-gray-50 text-sm font-semibold pr-8 focus:outline-none focus:ring-1 focus:ring-[#222BDE]" // py-1.5 for reduction, border-gray-200 for more whitish
              >
                {timeFrameOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >{`Within ${option}`}</option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-5 text-sm text-gray-500 justify-start ml-0">
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo</span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attachment</span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Smile className="w-4 h-4" />
              <span>Emoji</span>
            </button>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 
              bg-primary text-white font-medium 
              px-6 py-2 rounded-lg 
              text-sm 
              hover:opacity-90 shadow-md"
          >
            Posts
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'myPosts') {
    return (
      <div className="bg-white rounded-2xl shadow p-3 sm:p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={SmallDP}
              alt="Your profile"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">My Posts</p>
              <p className="text-xs text-gray-500">
                Manage, edit or boost your posts
              </p>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm text-gray-500 justify-start ml-0">
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo</span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attachment</span>
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Smile className="w-4 h-4" />
              <span>Emoji</span>
            </button>
          </div>

          <button
            type="button"
            className="ml-3 flex items-center gap-1.5 
              bg-primary text-primary-foreground font-medium 
              px-2 py-0.5 rounded-full 
              text-xs 
              hover:opacity-90 whitespace-nowrap"
          >
            <Plus className="w-3 h-3" />
            <span>New Post</span>
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4">
      <div className="flex gap-3">
        <img
          src={SmallDP}
          alt="Your profile"
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover"
        />
        <div className="flex-1">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#222BDE]"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-5 text-sm text-gray-500 justify-start ml-0">
              <button
                className="flex items-center gap-1 hover:text-gray-700"
                type="button"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo</span>
              </button>
              <button
                className="flex items-center gap-1 hover:text-gray-700"
                type="button"
              >
                <Paperclip className="w-4 h-4" />
                <span>Attachment</span>
              </button>
              <button
                className="flex items-center gap-1 hover:text-gray-700"
                type="button"
              >
                <Smile className="w-4 h-4" />
                <span>Emoji</span>
              </button>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-1.5 
                bg-primary text-primary-foreground font-medium 
                px-3 py-1 rounded-md 
                text-xs sm:text-sm 
                hover:opacity-90"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
