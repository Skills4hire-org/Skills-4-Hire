import { NavLink } from "react-router-dom";
import SmallDP from "../assets/Small-DP.png";
import CircleBar from "../assets/Circle-Icon.png";
import SearchIcon from "../assets/SearchBar-Icon.png";
import OptionIcon from "../assets/Option-Icon.png";

export type TabKey = "posts" | "my-offers";

const tabs: { key: TabKey; name: string; path: string }[] = [
  { key: "posts", name: "Posts", path: "/customer-home" },
  { key: "my-offers", name: "My Offers", path: "/customer-home/myoffers" },
];

interface CustomerTopBarProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export default function CustomerTopBar({
  active,
  onChange,
}: CustomerTopBarProps) {
  return (
    <div className="w-full fixed top-0 left-0 z-10 bg-[#F9FAFB] border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        <img
          src={SmallDP}
          alt="Profile"
          className="h-8 w-8 rounded-full sm:h-9 sm:w-9"
        />

        <img src={CircleBar} alt="Logo" className="h-7 w-7 sm:h-8 sm:w-8" />

        <div className="flex items-center gap-4 relative">
          <img
            src={SearchIcon}
            alt="Search"
            className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
          />
          <div className="relative">
            <img
              src={OptionIcon}
              alt="Options"
              className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
            />
            <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
          </div>
        </div>
      </div>

      <div className="flex justify-around max-w-5xl mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.path}
            onClick={() => onChange(tab.key)}
            className={`relative flex-1 text-center py-2 text-sm font-medium transition ${
              active === tab.key ? "text-[#222BDE]" : "text-gray-500"
            }`}
          >
            {tab.name}
            {active === tab.key && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-[#222BDE] rounded-t-full transition-all duration-300"></span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
