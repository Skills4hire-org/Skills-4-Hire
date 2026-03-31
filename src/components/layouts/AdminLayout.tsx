import { Outlet, NavLink } from "react-router-dom";
import { 
  Search, 
  Bell, 
  LayoutGrid, 
  Users, 
  List, 
  Building2, 
  BarChart2, 
  ShieldAlert, 
  HeadphonesIcon, 
  TrendingUp, 
  UserCog 
} from "lucide-react";
import { cn } from "../../lib/utils"; // Assuming a standard utility

const SIDEBAR_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutGrid, exact: true },
  { name: "User Management", href: "/admin/user-management", icon: Users },
  { name: "Services", href: "/admin/services", icon: List },
  { name: "Transactions", href: "/admin/transactions", icon: Building2 },
  { name: "Financial", href: "/admin/financial", icon: BarChart2 },
  { name: "Content Moderation", href: "/admin/content-moderation", icon: ShieldAlert },
  { name: "Support & Disputes", href: "/admin/support", icon: HeadphonesIcon },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { name: "Admin Roles", href: "/admin/roles", icon: UserCog },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#243cd6] text-white flex flex-col h-full rounded-tr-xl rounded-br-xl shadow-xl z-20">
        <div className="p-6 flex flex-col items-center justify-center border-b border-white/10">
          {/* Logo Placeholder */}
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-white">S</span><span className="text-black">4</span><span className="text-white">h</span>
          </div>
          <div className="font-semibold text-lg">Skills4hire</div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto w-full px-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium w-full",
                    isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  )
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden opacity-100">
        {/* Top Header */}
        <header className="h-20 w-full flex items-center justify-between px-10 bg-white z-10">
          <div className="flex items-center gap-4 text-2xl font-bold text-gray-800">
            {/* Contextual Title based on route can go here, but omitted to match design which has it in the page content */}
          </div>
          <div className="flex items-center gap-8 w-full justify-between pl-8">
            {/* Search Bar */}
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search Here"
                className="w-full pl-6 pr-12 py-3 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#243cd6]/50 placeholder:text-gray-400"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Profile & Notifications */}
            <div className="flex items-center gap-6 shrink-0">
              <button className="relative text-blue-400 hover:text-blue-600 transition-colors">
                <Bell className="w-7 h-7" />
                {/* Notification Badge if needed */}
              </button>
              
              <div className="relative group cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150"
                  alt="Admin User"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-white z-10" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 bg-white">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
