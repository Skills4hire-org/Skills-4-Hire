import {
  Pencil,
  Trash2,
  Check,
  X,
  Calendar,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

interface OfferCardProps {
  title: string;
  description: string;
  posted: string;
  views: string;
  inquiries: string;
  media?: string[];
  active?: boolean;
}

export default function OfferCard({
  title,
  description,
  posted,
  views,
  inquiries,
  media,
  active,
}: OfferCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Updated:", { draftTitle, draftDescription });
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log("Post deleted (frontend only)");
    setIsDeleteOpen(false);
  };

  return (
    <>
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Post?
            </h2>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                <X size={16} /> Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[var(--destructive)] text-white text-sm hover:opacity-90"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-4 w-full">
        <div className="flex items-start justify-between">
          {isEditing ? (
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="w-full font-semibold text-gray-900 text-base sm:text-lg border rounded px-2 py-1"
            />
          ) : (
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
              {draftTitle}
            </h3>
          )}

          {active && !isEditing && (
            <span className="text-xs sm:text-sm font-medium px-3 md:px-8 py-1 bg-green-100 text-green-700 rounded-full">
              Active
            </span>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            className="w-full text-sm border rounded p-2 text-gray-600"
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-600">{draftDescription}</p>
        )}

        {media && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {media.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`media-${i}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {!isEditing && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {posted}
            </span>

            <span className="flex items-center gap-1">
              <Eye size={14} /> {views}
            </span>

            <span className="flex items-center gap-1">
              <MessageSquare size={14} /> {inquiries}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[var(--primary)] text-white text-sm hover:opacity-90"
              >
                <Pencil size={16} /> Edit
              </button>

              <button
                onClick={() => setIsDeleteOpen(true)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-gray-200 text-gray-700 text-sm hover:bg-gray-50"
              >
                <Trash2 size={16} /> Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:opacity-90"
              >
                <Check size={16} /> Save
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-300 text-gray-800 text-sm hover:opacity-90"
              >
                <X size={16} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
