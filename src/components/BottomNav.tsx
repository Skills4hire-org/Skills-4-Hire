import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../assets/Home.png";
import OverviewIcon from "../assets/Overview.png";
import BookingIcon from "../assets/Booking.png";
import WalletIcon from "../assets/Wallet.png";
import ChatsIcon from "../assets/Chats.png";

interface BottomNavProps {
  active?: string;
  onNavigate?: (key: string) => void;
  variant?: "provider" | "customer";
}

export default function BottomNav({
  active,
  onNavigate,
  variant,
}: BottomNavProps) {
  const location = useLocation();

  const detectedVariant =
    variant ??
    (location.pathname.startsWith("/customers") ? "customer" : "provider");

  const current = active ?? "home";

  const navItems =
    detectedVariant === "provider"
      ? [
          {
            key: "home",
            label: "Home",
            icon: HomeIcon,
            path: "/providers-home",
          },
          {
            key: "overview",
            label: "Overview",
            icon: OverviewIcon,
            path: "/providers-overview",
          },
          {
            key: "booking",
            label: "Booking",
            icon: BookingIcon,
            path: "/booking",
          },
          { key: "wallet", label: "Wallet", icon: WalletIcon, path: "/wallet" },
          { key: "chats", label: "Chats", icon: ChatsIcon, path: "/chats" },
        ]
      : [
          {
            key: "home",
            label: "Home",
            icon: HomeIcon,
            path: "/customers-home",
          },
          {
            key: "services",
            label: "Services",
            icon: OverviewIcon,
            path: "/customers-services",
          },
          {
            key: "booking",
            label: "Booking",
            icon: BookingIcon,
            path: "/booking",
          },
          { key: "wallet", label: "Wallet", icon: WalletIcon, path: "/wallet" },
          { key: "chats", label: "Chats", icon: ChatsIcon, path: "/chats" },
        ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#222BDE] shadow-lg">
      <div className="relative mx-auto max-w-md flex justify-around items-center h-16 font-sans">
        {navItems.map((it) => {
          const isActive = it.key === current;
          return (
            <NavLink
              key={it.key}
              to={it.path}
              onClick={() => onNavigate?.(it.key)}
              className="relative flex flex-col items-center justify-center h-full w-full focus:outline-none"
            >
              {isActive && (
                <div className="absolute -top-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 bg-[#222BDE] rounded-full flex items-center justify-center">
                      <img
                        src={it.icon}
                        alt={it.label}
                        className="w-7 h-7 filter brightness-0 invert"
                      />
                    </div>
                  </div>
                  <span className="mt-1 text-[12px] text-white">
                    {it.label}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <img src={it.icon} alt={it.label} className="w-6 h-6" />
                <span className="mt-1 text-[12px] text-white">{it.label}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
