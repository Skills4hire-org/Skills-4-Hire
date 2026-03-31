import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical, Pencil, Trash2, Star, X } from "lucide-react";
import { cn } from "../../lib/utils";

type JobStatus = "Completed" | "Pending" | "Caceled";

type WorkHistoryRow = {
  id: number;
  name: string;
  paymentMethod: string;
  review: string;
  rating: number;
  date: string;
  status: JobStatus;
  avatar: string;
};

const INITIAL_HISTORY: WorkHistoryRow[] = Array.from({ length: 9 }).map((_, i) => {
  const statuses: JobStatus[] = ["Completed", "Pending", "Caceled"];
  return {
    id: i + 1,
    name: "Joshua Philip",
    paymentMethod: ["Bank Transfer", "USSD", "Wallet"][i % 3],
    review: "I had a fantas...",
    rating: 5,
    date: "12/19/2025",
    status: statuses[i % 3],
    avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150"
  };
});

type ProviderProfile = {
  name: string;
  email: string;
  number: string;
  gender: string;
  service: string;
  verificationId: string;
  registeredSince: string;
  bookings: string;
};

const INITIAL_PROFILE = {
  name: "Joshua Friday",
  email: "Josh@gmail.com",
  number: "08115923837",
  gender: "Male",
  service: "Plumber",
  verificationId: "0000",
  registeredSince: "16/09/2025",
  bookings: "100"
};

const StatusPill = ({ status }: { status: JobStatus }) => {
  return (
    <span
      className={cn(
        "px-4 py-1.5 rounded-full text-[13px] font-medium w-24 text-center inline-block border",
        status === "Completed" && "bg-[#d1fae5] text-[#10b981] border-transparent", 
        status === "Pending" && "bg-[#fef3c7] text-[#f59e0b] border-transparent",   
        status === "Caceled" && "bg-[#ffe4e6] text-[#f43f5e] border-transparent"     
      )}
    >
      {status}
    </span>
  );
};

export default function AdminServices() {
  const [history, setHistory] = useState<WorkHistoryRow[]>(INITIAL_HISTORY);
  const [profile, setProfile] = useState<ProviderProfile>(INITIAL_PROFILE);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(history.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = history.slice(startIndex, startIndex + itemsPerPage);

  // Modals Data
  const [isAddHistoryOpen, setIsAddHistoryOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Form State for History
  const [historyForm, setHistoryForm] = useState({
    name: "", paymentMethod: "Bank Transfer", review: "", rating: 5, status: "Completed" as JobStatus
  });

  // Form State for Profile
  const [profileForm, setProfileForm] = useState(profile);

  const openEditProfile = () => {
    setProfileForm(profile);
    setIsEditProfileOpen(true);
  };

  const handleAddHistory = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkHistoryRow = {
      id: history.length > 0 ? Math.max(...history.map(h => h.id)) + 1 : 1,
      name: historyForm.name,
      paymentMethod: historyForm.paymentMethod,
      review: historyForm.review,
      rating: Number(historyForm.rating),
      date: "12/19/2025", // Mocking current date insertion for UI consistency
      status: historyForm.status,
      avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150"
    };
    setHistory([newEntry, ...history]);
    setCurrentPage(1);
    setIsAddHistoryOpen(false);
    setHistoryForm({ name: "", paymentMethod: "Bank Transfer", review: "", rating: 5, status: "Completed" });
  };

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete this provider account entirely?")) {
      alert("Provider deletion flow triggered.");
    }
  };

  return (
    <div className="flex gap-6 w-full h-full mt-2 relative overflow-hidden text-[#333333]">
      
      {/* Left Sidebar Profile Panel */}
      <div className="w-[280px] bg-[#EBEBEB] rounded-[20px] p-6 flex flex-col shrink-0 overflow-y-auto hidden lg:flex">
        <div className="flex flex-col items-center mt-2 mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-sm bg-blue-100 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150" 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-medium text-gray-800 tracking-tight">{profile.name}</h2>
        </div>

        <div className="space-y-5 flex-1 text-[14px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-gray-800 font-medium">{profile.email}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Number</span>
            <span className="text-gray-800 font-medium">{profile.number}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Gender</span>
            <span className="text-gray-800 font-medium">{profile.gender}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Service</span>
            <span className="text-gray-800 font-medium">{profile.service}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Verification ID</span>
            <span className="text-gray-800 font-medium">{profile.verificationId}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Registered Since</span>
            <span className="text-gray-800 font-medium">{profile.registeredSince}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500 font-medium">Bookings</span>
            <span className="text-gray-800 font-medium">{profile.bookings}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-4 mt-8 pt-4">
          <button 
            onClick={openEditProfile}
            className="text-gray-700 hover:text-blue-600 transition-colors p-1 bg-transparent hover:bg-white rounded-md"
          >
            <Pencil className="w-[20px] h-[20px]" />
          </button>
          <button 
            onClick={handleDeleteProfile}
            className="text-red-500 hover:text-red-600 transition-colors p-1 bg-transparent hover:bg-white rounded-md"
          >
            <Trash2 className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Right Main Panel (Work History) */}
      <div className="bg-[#EBEBEB] rounded-[20px] p-6 lg:p-8 flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] lg:text-[22px] font-semibold text-gray-800 tracking-tight">Work History</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddHistoryOpen(true)}
              className="bg-[#243cd6] hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-full transition-colors shadow-sm"
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
                <th className="pb-4 font-semibold text-[15px]">Name</th>
                <th className="pb-4 font-semibold text-[15px]">Payment method</th>
                <th className="pb-4 font-semibold text-[15px]">Review</th>
                <th className="pb-4 font-semibold text-[15px]">Rating</th>
                <th className="pb-4 font-semibold text-[15px]">Date</th>
                <th className="pb-4 font-semibold text-[15px]">Jobs</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {paginatedHistory.map((row) => (
                <tr key={row.id} className="group text-[14px] font-medium text-gray-700 hover:bg-white/40 rounded-lg transition-colors">
                  <td className="py-3 pl-2 rounded-l-lg">
                    <div className="flex items-center gap-3">
                      <img 
                        src={row.avatar} 
                        alt={row.name} 
                        className="w-8 h-8 rounded-full object-cover shadow-sm bg-blue-100 shrink-0"
                      />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="py-3">{row.paymentMethod}</td>
                  <td className="py-3 text-gray-500">{row.review}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4", 
                            i < row.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          )} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-3">{row.date}</td>
                  <td className="py-3 pr-2 rounded-r-lg">
                    <StatusPill status={row.status} />
                  </td>
                </tr>
              ))}
              {paginatedHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No work history records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder mapped closely to Figma */}
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
                    isActive ? "bg-[#243cd6] text-white" : "hover:bg-gray-300 text-gray-600 bg-transparent"
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
      
      {/* Editor Modal for Profile */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Edit Provider Profile</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" required value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" required value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" required value={profileForm.number} onChange={e => setProfileForm({...profileForm, number: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Service</label>
                  <input type="text" required value={profileForm.service} onChange={e => setProfileForm({...profileForm, service: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsEditProfileOpen(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#243cd6] text-white font-medium hover:bg-blue-700 rounded-lg shadow-sm transition-colors">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Work History Modal */}
      {isAddHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add Work History</h3>
              <button onClick={() => setIsAddHistoryOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddHistory} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Hiring Name</label>
                <input type="text" required value={historyForm.name} onChange={e => setHistoryForm({...historyForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e.g. Samuel John" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Payment Method</label>
                  <select value={historyForm.paymentMethod} onChange={e => setHistoryForm({...historyForm, paymentMethod: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                    <option>Bank Transfer</option>
                    <option>USSD</option>
                    <option>Wallet</option>
                    <option>Cash</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select value={historyForm.status} onChange={e => setHistoryForm({...historyForm, status: e.target.value as JobStatus})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Caceled">Canceled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700">Rating (1-5)</label>
                 <input type="number" min="1" max="5" required value={historyForm.rating} onChange={e => setHistoryForm({...historyForm, rating: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsAddHistoryOpen(false)} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#243cd6] text-white font-medium hover:bg-blue-700 rounded-lg shadow-sm transition-colors">Add Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
