import {
  FaHeart,
  FaRegHeart,
  FaRegFileAlt,
  FaStar,
  FaGift,
  FaClipboardList,
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
  FaLifeRing,
  FaPhoneAlt,
  FaSignOutAlt,
  FaEllipsisH,
} from "react-icons/fa";
import UserProfile from "../assets/Small-DP.png";

export default function ProfileScreen() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white min-h-screen shadow-md">
        <div className="flex items-center justify-between px-4 py-6 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={UserProfile}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover"
              />

              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-900">
                Leo Justin{" "}
                <span className="text-blue-600 text-sm font-medium">
                  Verified
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                Plumber • 4.5 ⭐ 120 reviews
              </p>
              <button className="text-blue-600 text-xs font-medium hover:underline">
                View profile
              </button>
            </div>
          </div>
          <FaEllipsisH className="text-gray-500 w-5 h-5 cursor-pointer" />
        </div>

        <div className="px-4 py-4">
          <button className="text-blue-600 text-sm font-semibold mb-3 hover:underline">
            General
          </button>
          <div className="space-y-4">
            <MenuItem icon={<FaHeart />} label="Favourite Services" />
            <MenuItem icon={<FaRegHeart />} label="Favourite Provider" />
            <MenuItem icon={<FaRegFileAlt />} label="Blog" />
            <MenuItem icon={<FaStar />} label="Rate Us" />
            <MenuItem icon={<FaGift />} label="My Rewards" />
            <MenuItem icon={<FaClipboardList />} label="My Reviews" />
          </div>
        </div>

        <div className="px-4 py-4">
          <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
            Switch to Service Provider
          </button>
        </div>

        <div className="px-4 py-4">
          <button className="text-blue-600 text-sm font-semibold mb-3 hover:underline">
            About App
          </button>
          <div className="space-y-4">
            <MenuItem icon={<FaInfoCircle />} label="About App" />
            <MenuItem icon={<FaShieldAlt />} label="Privacy Policy" />
            <MenuItem icon={<FaFileContract />} label="Terms & Conditions" />
            <MenuItem icon={<FaLifeRing />} label="Help & Support" />
            <MenuItem icon={<FaPhoneAlt />} label="Hotline Number" />
            <MenuItem icon={<FaSignOutAlt />} label="Sign Out" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition">
      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-lg">{icon}</span>
        <span className="text-gray-800 text-sm">{label}</span>
      </div>
      <span className="text-gray-400">›</span>
    </div>
  );
}
