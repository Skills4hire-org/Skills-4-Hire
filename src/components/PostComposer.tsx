import SmallDP from "../assets/Small-DP.png";
import { Plus, Image as ImageIcon, Paperclip, Smile } from "lucide-react";

interface PostComposerProps {
  variant?: "feed" | "myPosts" | "customer";
  placeholder?: string;
}

export default function PostComposer({
  variant = "feed",
  placeholder = "Post about your latest work or services",
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

        {/* Budget + Time frame */}
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>₦10,000</span>
          <span>Within 3 days</span>
        </div>

        {/* Actions */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <ImageIcon className="w-4 h-4" /> Photo
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Paperclip className="w-4 h-4" /> Attachment
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Smile className="w-4 h-4" /> Emoji
            </button>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-[#222BDE] text-white text-sm sm:text-base hover:opacity-90"
          >
            Posts
          </button>
        </div>
      </div>
    );
  }

  if (variant === "myPosts") {
    return (
      <div className="bg-white rounded-2xl shadow p-3 sm:p-4 space-y-3">
        {/* Header */}
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

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#222BDE] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#222BDE]"
        />

        {/* Actions */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <ImageIcon className="w-4 h-4" /> Photo
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Paperclip className="w-4 h-4" /> Attachment
            </button>
            <button
              className="flex items-center gap-1 hover:text-gray-700"
              type="button"
            >
              <Smile className="w-4 h-4" /> Emoji
            </button>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-[#222BDE] text-white text-sm sm:text-base hover:opacity-90"
          >
            Post
          </button>
        </div>
      </div>
    );
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
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button className="hover:text-gray-700" type="button">
                📷 Photo
              </button>
              <button className="hover:text-gray-700" type="button">
                📎 Attachment
              </button>
              <button className="hover:text-gray-700" type="button">
                😊 Emoji
              </button>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-[#222BDE] text-white text-sm sm:text-base hover:opacity-90"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
