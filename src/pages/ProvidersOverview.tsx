import BottomNav from "../components/BottomNav";

// Assets
import SmallDP from "../assets/Small-DP.png";
import JoshuaProfile from "../assets/Joshua Friday.png";
import BarChartImage from "../assets/BarChart.png";
import RectangleFrames from "../assets/Rectangle-Frames.png";

import HomeIcon from "../assets/Home.png";
import OverviewIcon from "../assets/Overview.png";
import BookingIcon from "../assets/Booking.png";
import WalletIcon from "../assets/Wallet.png";
import ChatsIcon from "../assets/Chats.png";
import NotificationIcon from "../assets/Notification.png";
import SettingsIcon from "../assets/Settings.png";
import HelpIcon from "../assets/Help.png";

import EarPlugIcon from "../assets/EarPlug.png";
import BellIcon from "../assets/Bell.png";
import MiniSettings from "../assets/Mini_Settings.png";

export default function ProvidersOverview() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className="
          hidden md:flex flex-col fixed
          bg-[#222BDE] text-white 
          px-4 py-6 w-44 rounded-r-xl
          md:h-screen
          lg:h-[105vh]
        "
      >
        <div className="flex flex-col items-center gap-6 flex-1">
          {/* Logo */}
          <div className="flex flex-col items-center font-['Abhaya_Libre'] font-extrabold leading-none w-full">
            <div className="flex items-baseline text-3xl">
              <span className="text-white">S</span>
              <span className="text-[#010431] relative top-1">4</span>
              <span className="text-white">h</span>
            </div>
            <div className="text-sm text-white mt-1">Skills4hire</div>
          </div>

          {/* Nav list */}
          <nav className="flex flex-col gap-3 w-full mt-6">
            <SidebarItem icon={HomeIcon} label="Home" />
            <SidebarItem icon={OverviewIcon} label="Overview" active />
            <SidebarItem icon={BookingIcon} label="Bookings" />
            <SidebarItem icon={WalletIcon} label="Wallet" />
            <SidebarItem icon={ChatsIcon} label="Chats" />
            <SidebarItem icon={NotificationIcon} label="Notifications" />
            {/* Bottom group */}
            <div className="mt-6 flex flex-col gap-3">
              <SidebarItem icon={SettingsIcon} label="Settings" />
              <SidebarItem icon={HelpIcon} label="Help Center" />
            </div>
          </nav>

          <div className="flex items-center gap-3 mt-4">
            <div className="relative">
              <img
                src={SmallDP}
                alt="small profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-white"
              />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-44">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-4">
                <img
                  src={JoshuaProfile}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover md:hidden"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    Hi <span className="text-[#222BDE]">Joshua</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    2, Gandi Street, Ikorodu, Lagos.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:hidden">
                <img src={EarPlugIcon} alt="chat" className="w-6 h-6" />
                <img src={BellIcon} alt="notifications" className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 md:min-w-[250px] flex items-center justify-between">
              <div>
                <p>
                  Provider Type:{" "}
                  <span className="font-semibold">Freelance</span>
                </p>
                <p>
                  App Commission: <span className="font-semibold">2%</span>
                </p>
              </div>
              <img
                src={MiniSettings}
                alt="mini settings"
                className="w-5 h-5 md:hidden"
              />
            </div>
          </header>

          <div className="flex justify-center">
            <img
              src={RectangleFrames}
              alt="Stats"
              className="w-full max-w-3xl object-contain"
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-700">New Booking Request</h3>
              <button className="text-xs text-[#222BDE]">View all</button>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-400 py-6">
              <span className="text-4xl">💬</span>
              <p className="text-sm mt-2">No new booking requests</p>
            </div>
          </div>

          <section>
            <div className="w-full bg-white rounded-lg p-4 shadow">
              <img
                src={BarChartImage}
                alt="Monthly revenue chart"
                className="w-full h-64 object-contain"
              />
            </div>
          </section>

          <section>
            <h3 className="font-medium text-gray-700 mb-3">Reviews</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReviewCard
                name="Joshua Friday"
                date="31 Mar"
                role="Plumber"
                avatar={JoshuaProfile}
                rating="4.8"
                text="Awesome work. Thank you so much."
              />
              <ReviewCard
                name="Joshua Friday"
                date="23 Mar"
                role="Plumber"
                avatar={JoshuaProfile}
                rating="4.7"
                text="Fast and professional."
              />
            </div>
          </section>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <BottomNav active="overview" />
      </div>
    </div>
  );
}

/* SidebarItem */
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 w-full px-3 py-2 ${
        active ? "font-semibold text-white/100" : "text-white/80"
      }`}
    >
      <img src={icon} alt={label} className="w-6 h-6" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* ReviewCard */
function ReviewCard({
  name,
  date,
  role,
  avatar,
  rating,
  text,
}: {
  name: string;
  date: string;
  role: string;
  avatar: string;
  rating: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow flex gap-4 items-start">
      <img
        src={avatar}
        alt={name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <div className="text-yellow-500 text-sm">⭐ {rating}</div>
        </div>
        <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mt-2">
          {role}
        </span>
        <p className="text-sm mt-2 text-gray-600">{text}</p>
      </div>
    </div>
  );
}
