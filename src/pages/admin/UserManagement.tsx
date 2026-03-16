import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { getServiceProviders, deleteServiceProvider, listenForNewSignups } from "@/utils/loaders";

const UserManagement = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    setServiceProviders(getServiceProviders());

    const unsubscribe = listenForNewSignups((newProviders) => {
      setServiceProviders(prevProviders => [...prevProviders, ...newProviders]);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (id) => {
    console.log("Editing provider with id:", id);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    deleteServiceProvider(id);
    setServiceProviders(getServiceProviders());
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{serviceProviders.length} Service Providers</h2>
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
                {serviceProviders.map((provider) => (
                <tr key={provider.id} className="border-b border-gray-200">
                    <td className="p-4 flex items-center">
                    <Avatar className="h-9 w-9 mr-4">
                        <AvatarImage src={provider.image} alt={provider.name} />
                        <AvatarFallback>
                        {provider.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800">{provider.name}</span>
                    </td>
                    <td className="p-4 text-gray-600">{provider.email || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{provider.phone || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{provider.occupation}</td>
                    <td className="p-4 text-gray-600">{provider.totalJobs}</td>
                    <td className="p-4">
                    <div className="flex items-center gap-4">
                        <Pencil onClick={() => handleEdit(provider.id)} className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                        <Trash2 onClick={() => handleDelete(provider.id)} className="text-red-400 cursor-pointer hover:text-red-600" size={20} />
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

export default UserManagement;
