import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Search, Bell, LayoutGrid, Users, List, Banknote, BarChart, FileCheck, ShieldHelp, PieChart, UserCog
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminLayout = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/admin/overview", icon: <LayoutGrid className="mr-4" />, text: "Overview" },
    { to: "/admin/user-management", icon: <Users className="mr-4" />, text: "User Management" },
    { to: "/admin/services", icon: <List className="mr-4" />, text: "Service Categories" },
    { to: "/admin/transactions", icon: <Banknote className="mr-4" />, text: "Bookings & Transactions" },
    { to: "/admin/financial", icon: <BarChart className="mr-4" />, text: "Financial Dashboard" },
    { to: "/admin/content-moderation", icon: <FileCheck className="mr-4" />, text: "Content Moderation" },
    { to: "/admin/support", icon: <ShieldHelp className="mr-4" />, text: "Support & Disputes" },
    { to: "/admin/notifications", icon: <Bell className="mr-4" />, text: "Notifications" },
    { to: "/admin/analytics", icon: <PieChart className="mr-4" />, text: "Analytics" },
    { to: "/admin/roles", icon: <UserCog className="mr-4" />, text: "Admin Roles" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#222BDE] text-white p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold">S4h</h1>
            <p className="text-sm text-gray-300">Skills4hire</p>
          </div>
          <nav>
            <ul>
              {navLinks.map(link => (
                <li key={link.to} className="mb-2">
                  <Link 
                    to={link.to} 
                    className={`flex items-center p-3 rounded-lg text-sm font-medium ${location.pathname === link.to ? 'bg-white/10' : 'hover:bg-white/10'}`}>
                    {link.icon}
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 flex justify-between items-center border-b">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search Here" className="bg-gray-50 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none text-sm" />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="text-gray-500 cursor-pointer" />
            <Avatar>
              <AvatarImage src="/src/assets/Admin profile.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
