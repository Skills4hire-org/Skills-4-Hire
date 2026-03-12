import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import React from "react";

const serviceProviders = [
  {
    name: "Joshua Friday",
    email: "Josh@gmail.com",
    phone: "08115923837",
    service: "Plumber",
    booked: "0000",
    avatar: "/src/assets/Jose profile.png",
  },
];

const UserManagementPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">4000 Service Providers</h2>
          <div className="flex items-center gap-4">
            <Button className="bg-[#4A3AFF] text-white rounded-lg px-6 py-2 text-sm font-semibold hover:bg-[#4A3AFF]/90">Add</Button>
            <MoreHorizontal className="text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="text-left text-sm font-medium text-gray-500 bg-gray-50 rounded-t-lg">
                <th className="p-4">Handyman Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Booked</th>
                <th className="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {Array(10).fill(serviceProviders[0]).map((provider, index) => (
                <tr key={index} className="border-b border-gray-200">
                    <td className="p-4 flex items-center">
                    <Avatar className="h-9 w-9 mr-4">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback>
                        {provider.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800">{provider.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{provider.email}</td>
                    <td className="p-4 text-gray-600">{provider.phone}</td>
                    <td className="p-4 text-gray-600">{provider.service}</td>
                    <td className="p-4 text-gray-600">{provider.booked}</td>
                    <td className="p-4">
                    <div className="flex items-center gap-4">
                        <Pencil className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                        <Trash2 className="text-red-400 cursor-pointer hover:text-red-600" size={20} />
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="flex justify-center items-center mt-6 gap-2">
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">&lt;</button>
            <button className="px-3 py-1 text-white bg-gray-800 rounded-md">1</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">2</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">3</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">4</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">5</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">6</button>
            <button className="px-3 py-1 text-gray-500 rounded-md hover:bg-gray-200">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
