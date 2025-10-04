import SmallDP from "../assets/Small-DP.png";
import { Plus, Image as ImageIcon, Paperclip, Smile } from "lucide-react";

interface PostComposerProps {
  variant?: "feed" | "myPosts" | "customer";
  placeholder?: string;
}

export default function PostComposer({
  variant = "feed",
  placeholder = "What job do you want to get done?",
}: PostComposerProps) {
  if (variant === "customer") {
    return (
      <div className="bg-white rounded-2xl shadow p-3 sm:p-4 space-y-3">
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

        
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>₦10,000</span>
          <span>Within 3 days</span>
        </div>

        {/* Actions */}
        <div className="mt-1 flex items-center justify-between">
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
              bg-[#222BDE] text-white font-medium 
              px-3 py-1 rounded-md 
              text-xs sm:text-sm 
              hover:opacity-90"
          >
            Post
          </button>
        </div>
      </div>
    );
  }

  if (variant === "myPosts") {
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

        {/* Input */}
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
            className="ml-3 flex items-center gap-1.5 
              bg-[#222BDE] text-white font-medium 
              px-2 py-0.5 rounded-full 
              text-xs 
              hover:opacity-90 whitespace-nowrap"
          >
            <Plus className="w-3 h-3" />
            <span>New Post</span>
          </button>
        </div>
      </div>
    );
  }

  // Feed composer
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
                bg-[#222BDE] text-white font-medium 
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
  );
}
