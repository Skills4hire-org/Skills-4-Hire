import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function CustomerHome() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-44 z-20">
        <Sidebar active="home" />
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-44">
        <div className="md:hidden sticky top-0 z-30 bg-white">
          <div className="flex justify-center gap-16 border-b">
            <NavLink
              to="posts"
              className={({ isActive }) =>
                `py-3 text-sm font-medium relative ${
                  isActive
                    ? "text-[#222BDE] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-1 after:bg-[#222BDE] after:rounded-full"
                    : "text-gray-500"
                }`
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="my-offers"
              className={({ isActive }) =>
                `py-3 text-sm font-medium relative ${
                  isActive
                    ? "text-[#222BDE] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-14 after:h-1 after:bg-[#222BDE] after:rounded-full"
                    : "text-gray-500"
                }`
              }
            >
              My Offers
            </NavLink>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-3 sm:px-5 py-5 space-y-6">
          <Outlet />
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40"></div>
    </div>
  );
}
