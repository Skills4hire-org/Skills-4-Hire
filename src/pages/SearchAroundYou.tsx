import { useState } from "react";
import { FaArrowLeft, FaStar, FaRegHeart, FaSearch } from "react-icons/fa";

import JoshuaBarber from "../assets/JoshuaBarber.png";
import MaryPraise from "../assets/MaryPraise.png";
import JoshuaFridayBG from "../assets/JoshuaFriday-bg.png";

type ResultItem = {
  id: number;
  name: string;
  role: string;
  verified: boolean;
  rating: number;
  reviews: number;
  title: string;
  price: string;
  img: string;
};

export default function SearchAroundYou() {
  const [q, setQ] = useState("");

  const results: ResultItem[] = [
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
    {
      id: 4,
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
      id: 5,
      name: "Joshua Friday",
      role: "Plumber",
      verified: true,
      rating: 4.8,
      reviews: 102,
      title: "Included Pipe repairs, Leak fixes, and Maintenance...",
      price: "₦850",
      img: JoshuaFridayBG,
    },
    {
      id: 6,
      name: "Joshua Friday",
      role: "Barber",
      verified: true,
      rating: 4.8,
      reviews: 121,
      title: "Men and Kids Ultimate grooming Hair...",
      price: "₦800",
      img: JoshuaBarber,
    },
  ];

  const filtered = results.filter((r) =>
    `${r.name} ${r.role} ${r.title} ${r.price}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white min-h-screen shadow-md">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <FaArrowLeft className="text-gray-700 w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-lg">
            Service around you
          </h1>
          <div className="w-8" />
        </div>

        {/* Search input */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for what you are looking for"
              className="w-full border rounded-full px-3 pl-10 py-3 text-sm outline-none focus:ring-1 focus:ring-[#222BDE] focus:border-transparent"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="px-4 pb-28 space-y-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="flex items-start gap-3 p-3 bg-white rounded-2xl shadow-sm"
            >
              {/* image */}
              <img
                src={r.img}
                alt={r.name}
                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
              />

              {/* info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {r.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {r.role}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaStar className="text-yellow-400 mr-1" /> {r.rating} (
                        {r.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">
                      {r.price}
                    </div>
                    <FaRegHeart className="text-gray-400 mt-2 cursor-pointer" />
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {r.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center md:relative md:bottom-auto">
          <div className="w-full max-w-md bg-gray-100 border-t p-3">
            <div className="grid grid-cols-10 gap-1 text-center text-sm text-gray-700">
              {"QWERTYUIOP".split("").map((c) => (
                <div
                  key={c}
                  className="bg-white py-2 rounded shadow-sm font-medium text-xs"
                >
                  {c}
                </div>
              ))}
              {"ASDFGHJKL".split("").map((c) => (
                <div
                  key={c}
                  className="bg-white py-2 rounded shadow-sm font-medium text-xs"
                >
                  {c}
                </div>
              ))}
              <div className="col-span-2" />
              {"ZXCVBNM".split("").map((c) => (
                <div
                  key={c}
                  className="bg-white py-2 rounded shadow-sm font-medium text-xs"
                >
                  {c}
                </div>
              ))}
              <div className="col-span-2" />
              <div className="col-span-6 bg-white py-2 rounded shadow-sm font-medium text-xs">
                Space
              </div>
              <div className="col-span-2 bg-white py-2 rounded shadow-sm font-medium text-xs">
                Enter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
