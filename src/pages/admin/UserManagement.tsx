import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoreVertical, Pencil, Trash2, X } from "lucide-react";

type Provider = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  booked: string;
  avatar: string;
};

// Start with 25 members to show multi-page pagination
const INITIAL_PROVIDERS: Provider[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `Provider ${i + 1}`,
  email: `provider${i + 1}@gmail.com`,
  phone: "08115923837",
  service: i % 2 === 0 ? "Plumber" : "Electrician",
  booked: Math.floor(Math.random() * 100).toString().padStart(4, "0"),
  avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
}));

export default function UserManagement() {
  // const navigate = useNavigate(); // Removed unused variable to fix build
  useNavigate(); // Keep the hook call if side effects are needed, though here it's likely safe to remove.
  // Actually, I'll just remove it.

  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(providers.length / itemsPerPage);
  
  // Derived state for the table
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProviders = providers.slice(startIndex, startIndex + itemsPerPage);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const openAddModal = () => {
    setEditingProvider(null);
    setFormData({ name: "", email: "", phone: "", service: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (provider: Provider) => {
    setEditingProvider(provider);
    setFormData({
      name: provider.name,
      email: provider.email,
      phone: provider.phone,
      service: provider.service,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProvider) {
      // Edit existing
      setProviders(providers.map(p => 
        p.id === editingProvider.id ? { ...p, ...formData } : p
      ));
    } else {
      // Add new
      const newProvider: Provider = {
        id: providers.length > 0 ? Math.max(...providers.map(p => p.id)) + 1 : 1,
        ...formData,
        booked: "0000",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150",
      };
      // Add to beginning of the list
      setProviders([newProvider, ...providers]);
      setCurrentPage(1); // Jump back to page 1 to see the newly added user
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      setProviders(providers.filter(p => p.id !== id));
      // Adjust page if we delete the last item on the current page
      if (paginatedProviders.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full mt-2 relative">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">User Management</h1>

      <div className="bg-[#EAEBEA]/50 rounded-2xl p-6 sm:p-8 flex-1 box-border">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {providers.length} Service Providers
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={openAddModal}
              className="bg-[#243cd6] hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-full transition-colors"
            >
              Add
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto min-h-[400px]">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="text-gray-800 font-semibold border-b border-transparent">
                <th className="pb-4 font-semibold text-[15px]">Handyman Name</th>
                <th className="pb-4 font-semibold text-[15px]">Email</th>
                <th className="pb-4 font-semibold text-[15px]">Phone</th>
                <th className="pb-4 font-semibold text-[15px]">Service</th>
                <th className="pb-4 font-semibold text-[15px]">Booked</th>
                <th className="pb-4 font-semibold text-[15px] text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {paginatedProviders.map((provider) => (
                <tr 
                  key={provider.id} 
                  className="group text-[15px] font-medium text-gray-700 hover:bg-white/40 rounded-lg transition-colors"
                >
                  <td className="py-3 pl-2 rounded-l-lg truncate max-w-[200px]">
                    <div className="flex items-center gap-3">
                      <img 
                        src={provider.avatar} 
                        alt={provider.name} 
                        className="w-8 h-8 rounded-full object-cover shadow-sm bg-blue-100 shrink-0"
                      />
                      <span className="truncate">{provider.name}</span>
                    </div>
                  </td>
                  <td className="py-3 truncate max-w-[200px]">{provider.email}</td>
                  <td className="py-3">{provider.phone}</td>
                  <td className="py-3">{provider.service}</td>
                  <td className="py-3">{provider.booked}</td>
                  <td className="py-3 pr-2 rounded-r-lg">
                    <div className="flex items-center justify-end gap-3 pr-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(provider);
                        }}
                        className="text-gray-600 hover:text-blue-600 transition-colors p-1 bg-transparent hover:bg-white rounded-md shadow-sm"
                        title="Edit"
                      >
                        <Pencil className="w-[18px] h-[18px]" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(provider.id);
                        }}
                        className="text-gray-600 hover:text-red-500 transition-colors p-1 bg-transparent hover:bg-white rounded-md shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedProviders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No service providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 mb-4 gap-2 text-sm font-medium">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5"/>
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNumber = idx + 1;
              const isActive = pageNumber === currentPage;
              return (
                <button 
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 rounded-full flex flex-col justify-center items-center transition-colors ${
                    isActive ? "bg-[#243cd6] text-white" : "hover:bg-gray-200 text-gray-600 bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProvider ? "Edit Service Provider" : "Add Service Provider"}
              </h3>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="e.g. Joshua Friday"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="e.g. josh@gmail.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  placeholder="e.g. 08115923837"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Service Category</label>
                <select 
                  required
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Painter">Painter</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[#243cd6] text-white font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  {editingProvider ? "Save Changes" : "Add Provider"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
