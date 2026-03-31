import { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Search, Send, MoreVertical, Paperclip, AlertCircle, Clock, PlayCircle, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

type DisputeStatus = "Yet to start" | "On hold" | "Escalate" | "completed";

type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  status: DisputeStatus;
  avatar: string;
  unread?: boolean;
};

const CHART_DATA = [
  { name: 'JAN', value: 20 },
  { name: 'FEB', value: 35 },
  { name: 'MAR', value: 25 },
  { name: 'APR', value: 65 },
  { name: 'MAY', value: 30 },
  { name: 'JUN', value: 85 },
  { name: 'JUL', value: 70 },
  { name: 'AUG', value: 110 },
  { name: 'SEPT', value: 90 },
  { name: 'OCT', value: 130 },
  { name: 'NOV', value: 100 },
  { name: 'DEC', value: 140 },
];

const INITIAL_CHATS: ChatPreview[] = [
  { id: "1", name: "Joshua Philip", lastMessage: "I need help with my recent payment.", time: "10:30 AM", status: "Yet to start", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150", unread: true },
  { id: "2", name: "Sarah Jenkins", lastMessage: "Can you review my account limits?", time: "09:15 AM", status: "On hold", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150" },
  { id: "3", name: "Michael Scott", lastMessage: "This is completely unacceptable!!", time: "Yesterday", status: "Escalate", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150" },
  { id: "4", name: "Angela Martin", lastMessage: "Thanks for the swift resolution.", time: "Monday", status: "completed", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150" },
  { id: "5", name: "David Wallace", lastMessage: "When will my dispute be reviewed?", time: "Last Week", status: "Yet to start", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150" },
  { id: "6", name: "Dwight Schrute", lastMessage: "I sent the proofs.", time: "Last Week", status: "On hold", avatar: "https://images.unsplash.com/photo-1546456073-ea246a7bd25f?auto=format&fit=crop&q=80&w=150" },
];

const StatusPill = ({ status }: { status: DisputeStatus }) => {
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 w-max",
        status === "completed" && "bg-green-100 text-green-700", 
        status === "On hold" && "bg-yellow-100 text-yellow-700",   
        status === "Escalate" && "bg-red-100 text-red-700",
        status === "Yet to start" && "bg-gray-100 text-gray-700"     
      )}
    >
      {status === "completed" && <CheckCircle2 className="w-3 h-3" />}
      {status === "On hold" && <Clock className="w-3 h-3" />}
      {status === "Escalate" && <AlertCircle className="w-3 h-3" />}
      {status === "Yet to start" && <PlayCircle className="w-3 h-3" />}
      {status}
    </span>
  );
};

export default function SupportDisputes() {
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(INITIAL_CHATS[0]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    alert(`Message sent to ${selectedChat?.name}: ${messageText}`);
    setMessageText("");
  };

  return (
    <div className="flex flex-col w-full h-full mt-2 relative">
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">Support & Disputes</h1>

      <div className="flex gap-6 h-full flex-col xl:flex-row pb-6">
        
        {/* Left Column (Chat Interface replacing Tables) */}
        <div className="flex-1 border border-gray-200 rounded-3xl bg-white overflow-hidden flex min-h-[600px] shadow-sm">
          
          {/* Conversation List Sidebar */}
          <div className="w-[320px] border-r border-gray-200 flex flex-col bg-gray-50/50">
            <div className="p-5 border-b border-gray-200 bg-white">
               <h2 className="font-semibold text-gray-800 tracking-tight mb-4 text-lg">Active Tickets</h2>
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search discussions..." 
                   className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
                 />
                 <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full">
              {INITIAL_CHATS.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setSelectedChat(chat)}
                  className={cn(
                    "p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-white flex flex-col gap-2 relative", 
                    selectedChat?.id === chat.id && "bg-white"
                  )}
                >
                  {/* Selection Indicator */}
                  {selectedChat?.id === chat.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#243cd6]" />
                  )}

                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                        {chat.unread && <div className="absolute right-0 top-0 w-2.5 h-2.5 bg-blue-600 rounded-full border border-white" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm tracking-tight">{chat.name}</h4>
                        <span className="text-[11px] text-gray-400 font-medium">{chat.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1 pl-13">
                    <p className="text-gray-500 text-[13px] truncate pr-4 w-full">{chat.lastMessage}</p>
                  </div>
                  <div className="mt-1">
                    <StatusPill status={chat.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Window */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10 sticky top-0">
                  <div className="flex items-center gap-4">
                    <img src={selectedChat.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="avatar" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{selectedChat.name}</h3>
                      <StatusPill status={selectedChat.status} />
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 flex flex-col">
                  {/* Mock Incoming Message */}
                  <div className="flex justify-start">
                     <div className="bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-2xl rounded-tl-sm text-[15px] max-w-[75%] shadow-sm leading-relaxed">
                       {selectedChat.lastMessage}
                     </div>
                  </div>

                  {/* Mock System Notification if Escalated */}
                  {selectedChat.status === "Escalate" && (
                    <div className="flex justify-center my-4">
                      <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-red-100 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Ticket escalated to high priority
                      </span>
                    </div>
                  )}

                  {/* Mock Outgoing Message */}
                  {selectedChat.status !== "Yet to start" && (
                     <div className="flex justify-end">
                       <div className="bg-[#243cd6] text-white py-3 px-4 rounded-2xl rounded-tr-sm text-[15px] max-w-[75%] shadow-sm leading-relaxed">
                         Hello {selectedChat.name}, I am looking directly into your issue right now. Expect an update shortly.
                       </div>
                     </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-colors shadow-sm">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Paperclip className="w-5 h-5"/>
                    </button>
                    <input 
                      type="text" 
                      placeholder="Reply to customer..." 
                      className="flex-1 bg-transparent px-2 py-2 text-[15px] focus:outline-none placeholder:text-gray-400 text-gray-700"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="p-2.5 bg-[#243cd6] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!messageText.trim()}
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 pb-20">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                   <Send className="w-6 h-6 text-gray-400 ml-1" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">No ticket selected</h3>
                <p className="text-gray-500 mt-2 text-sm">Select a conversation from the sidebar to start chatting</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Metrics & Recharts - Retained from previous state) */}
        <div className="w-full xl:w-[350px] bg-[#EBEBEB] rounded-3xl p-6 flex flex-col shrink-0">
          <h2 className="text-center text-[20px] font-semibold text-gray-800 tracking-tight mt-2 mb-6">
            Dispute Resolution
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-10 text-[#333333]">
            <div className="border border-gray-300 rounded-xl py-3 flex flex-col items-center shadow-sm bg-transparent">
              <span className="text-xl font-bold">18</span>
              <span className="text-[13px] font-medium text-gray-700">Open</span>
            </div>
            <div className="border border-gray-300 rounded-xl py-3 flex flex-col items-center shadow-sm bg-transparent">
              <span className="text-xl font-bold">5</span>
              <span className="text-[13px] font-medium text-gray-700">In progress</span>
            </div>
            <div className="border border-gray-300 rounded-xl py-3 flex flex-col items-center shadow-sm bg-transparent">
              <span className="text-xl font-bold">18</span>
              <span className="text-[13px] font-medium text-gray-700">Resolved</span>
            </div>
          </div>

          <div className="w-full h-[220px] mb-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#243cd6" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#243cd6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CBD5E1" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: '#4B5563', fontWeight: 600 }} 
                  dy={10} 
                  interval="preserveStartEnd"
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                  itemStyle={{ color: '#243cd6', fontWeight: 500 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#243cd6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-gray-300 rounded-2xl p-5 shadow-sm bg-transparent mt-auto">
            <h3 className="text-center font-semibold text-lg text-gray-800 mb-4">Assign Support</h3>
            <div className="relative mb-4">
              <select className="w-full appearance-none border border-gray-300 bg-transparent rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>James Arthur</option>
                <option>Sarah Jenkins</option>
                <option>Michael Scott</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <button className="w-full bg-[#243cd6] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm">
              Assign
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
