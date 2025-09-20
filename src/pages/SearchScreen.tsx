import { useState } from "react";
import {
  FaArrowLeft,
  FaStar,
  FaRegHeart,
  FaSearch,
  FaSlidersH,
} from "react-icons/fa";

// Assets
import JoshuaBarber from "../assets/JoshuaBarber.png";
import MaryPraise from "../assets/MaryPraise.png";
import JoshuaFridayBG from "../assets/JoshuaFriday-bg.png";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const results = [
    {
      id: 1,
      name: "Joshua Friday",
      role: "Barber",
      verified: true,
      rating: 4.8,
      reviews: 121,
      title: "Men and Kids Ultimate grooming Hair...",
      price: "₦800",
      img: JoshuaBarber,
    },
    {
      id: 2,
      name: "Mary Praise",
      role: "Carpenter",
      verified: true,
      rating: 4.8,
      reviews: 132,
      title: "Included Kitchen’s ward-robe and Household...",
      price: "₦800",
      img: MaryPraise,
    },
    {
      id: 3,
      name: "Joshua Friday",
      role: "Plumber",
      verified: false,
      rating: 4.8,
      reviews: 102,
      title: "Included Pipe repairs, Leak fixes, and Maintenance...",
      price: "₦800",
      img: JoshuaFridayBG,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center px-4 py-3">
          <FaArrowLeft className="text-gray-700 w-5 h-5 cursor-pointer" />
          <h1 className="flex-1 text-center font-semibold text-base">
            What are you looking for?
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center flex-1 bg-gray-100 rounded-full px-3 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for what you are looking for"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <FaSlidersH className="text-gray-600 w-5 h-5 cursor-pointer" />
        </div>

        <div className="px-4 py-3">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Recommended for you
          </h2>
          <div className="space-y-4">
            {results.map((res) => (
              <div key={res.id} className="flex items-center gap-3 bg-white">
                {/* Profile image */}
                <img
                  src={res.img}
                  alt={res.name}
                  className="w-16 h-16 rounded-md object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {res.name}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <FaStar className="text-yellow-400" />
                      {res.rating}
                      <span className="ml-1">({res.reviews})</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-blue-600 font-medium">
                    {res.role}
                    {res.verified && (
                      <span className="ml-1 text-green-500">✔</span>
                    )}
                  </span>
                  <p className="text-xs text-gray-600 truncate">{res.title}</p>
                  <span className="text-xs font-semibold text-gray-800">
                    {res.price}
                  </span>
                </div>

                <FaRegHeart className="text-gray-400 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto bg-gray-100 p-3">
          <div className="grid grid-cols-10 gap-1 text-center text-sm text-gray-700">
            {"QWERTYUIOP".split("").map((c) => (
              <div key={c} className="bg-white py-2 rounded font-medium">
                {c}
              </div>
            ))}
            {"ASDFGHJKL".split("").map((c) => (
              <div
                key={c}
                className="bg-white py-2 rounded font-medium col-span-1"
              >
                {c}
              </div>
            ))}
            <div className="col-span-2"></div>
            {"ZXCVBNM".split("").map((c) => (
              <div
                key={c}
                className="bg-white py-2 rounded font-medium col-span-1"
              >
                {c}
              </div>
            ))}
            <div className="col-span-2"></div>
            <div className="col-span-6 bg-white py-2 rounded font-medium">
              Space
            </div>
            <div className="col-span-2 bg-white py-2 rounded font-medium">
              Enter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
