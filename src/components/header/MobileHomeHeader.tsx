import { Bell } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import ProfileImage from "../global/ProfileImage";
import RecentNotification from "../global/RecentNotification";
import SearchBar from "../global/SearchBar";
import Logo from "../global/Logo2";
import { Link } from "react-router-dom";
import type { UserType } from "@/utils/types";
import { useSelector } from "react-redux";

export default function MobileHomeHeader() {
  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState
  );

  return (
    <header className="md:hidden w-full">
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex items-center">
          <Logo size="h-[28px] w-auto" />
        </div>

        <div className="w-8 h-8">
          {userType === "customer" ? (
            <SidebarTrigger size="lg">
              <ProfileImage />
            </SidebarTrigger>
          ) : (
            <Link to="/service-provider/profile">
              <ProfileImage />
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 pt-3">
        <div className="flex-1">
          <SearchBar
            placeholder="Search for plumbers, electricians..."
            maxWidth="w-full"
          />
        </div>

        <Link to="/customer/notification">
          <RecentNotification icon={Bell} newAlert />
        </Link>
      </div>
    </header>
  );
}
