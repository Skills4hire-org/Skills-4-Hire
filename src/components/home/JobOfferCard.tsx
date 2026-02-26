import ProfileImage from "@/components/global/ProfileImage";
import {
  MapPin,
  Clock,
  Wallet,
  RefreshCw,
  MessageSquare,
  X,
} from "lucide-react";
import { useState } from "react";
import OfferImageCarousel from "./OfferImageCarousel";
import OfferFilesCarousel from "./OfferFilesCarousel";

interface JobOffer {
  id: number | string;
  name: string;
  role?: string;
  location?: string;
  title: string;
  description?: string;
  budget?: string;
  deadline?: string;
  distanceKm?: number;
  images?: string[];
}

export default function JobOfferCard({
  name,
  location,
  title,
  description,
  budget,
  deadline,
  distanceKm,
  images = [],
}: JobOffer) {
  const [viewMore, setViewMore] = useState(false);

  const [isNegotiateOpen, setIsNegotiateOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmitNegotiation = () => {
    if (!amount || !reason) return;

    console.log("Negotiation submitted:", {
      amount,
      reason,
    });

    setAmount("");
    setReason("");
    setIsNegotiateOpen(false);
  };

  return (
    <>
      {isNegotiateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Negotiate Offer
            </h2>

            <p className="text-sm text-gray-600">
              Enter your proposed amount and reason for negotiation.
            </p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Proposed Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Reason
              </label>
              <textarea
                placeholder="Explain why you're negotiating..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsNegotiateOpen(false)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
              >
                <X size={16} /> Cancel
              </button>

              <button
                onClick={handleSubmitNegotiation}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-yellow-400 text-white text-sm hover:opacity-90"
              >
                <RefreshCw size={16} /> Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-2.5 md:p-4 space-y-2 md:space-y-3 w-full">
        <p className="text-xs md:text-sm font-medium text-gray-600">
          Posted 34 minutes ago
        </p>

        <div className="flex items-start gap-2">
          <div className="shrink-0">
            <ProfileImage noStatus size="size-10 md:size-12" />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-1">
              {name}
            </p>

            {location && (
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-0.5">
            {title}
          </h3>

          {description && (
            <div>
              <p
                className={`text-xs md:text-sm text-gray-600 ${
                  !viewMore && "line-clamp-2 sm:line-clamp-none"
                }`}
              >
                {description}
              </p>

              <button
                onClick={() => setViewMore(!viewMore)}
                className="text-xs md:text-sm text-primary underline cursor-pointer hover:no-underline sm:hidden"
              >
                {viewMore ? "less" : "more"}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          {typeof distanceKm !== "undefined" && (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-green-50 text-green-700 whitespace-nowrap">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>
                Ibadan, <span className="uppercase">oyo</span>
              </span>
            </span>
          )}

          {deadline && (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-yellow-50 text-yellow-800 whitespace-nowrap">
              <Clock className="w-4 h-4 shrink-0" />
              <span>2 days</span>
            </span>
          )}

          {budget && (
            <span className="inline-flex items-center gap-1 px-2 py-1.5 rounded-sm bg-blue-50 text-blue-700 whitespace-nowrap">
              <Wallet className="w-4 h-4 shrink-0" />
              <span>{budget}</span>
            </span>
          )}
        </div>

        <div className="my-6">
          {images && <OfferImageCarousel images={images} />}
        </div>

        <OfferFilesCarousel />

        <div className="mt-2">
          <div className="flex gap-2 flex-nowrap">
            <button
              onClick={() => setIsNegotiateOpen(true)}
              className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md bg-yellow-400 text-white text-sm md:text-base hover:opacity-90 transition font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Negotiate</span>
            </button>

            <button className="flex-1 min-w-0 flex items-center justify-center gap-1.5 px-3 py-1 md:py-1.5 rounded-md border border-gray-200 text-gray-700 text-sm md:text-base hover:bg-gray-50 transition font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
