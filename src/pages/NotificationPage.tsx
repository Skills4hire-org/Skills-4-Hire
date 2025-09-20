import { ArrowLeft } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdChatbubbles, IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const navigate = useNavigate();

  
  const notifications = {
    today: [
      {
        id: 1,
        title: "Job canceled",
        message:
          "The client has canceled the request. Stay tuned for more opportunities",
        time: "12:15",
        icon: <MdCancel className="text-red-500 h-6 w-6" />,
      },
      {
        id: 2,
        title: "Earnings update",
        message: "You’ve made ₦100,000 this week. Keep up the great work",
        time: "12:15",
        icon: <FaMoneyBillWave className="text-green-500 h-6 w-6" />,
      },
    ],
    yesterday: [
      {
        id: 3,
        title: "New message",
        message:
          "A client has sent you a message regarding a job. Check your inbox.",
        time: "12:15",
        icon: <IoMdChatbubbles className="text-blue-500 h-6 w-6" />,
      },
      {
        id: 4,
        title: "New job alert",
        message:
          "A client has sent you a message regarding a job. Check your inbox.",
        time: "12:15",
        icon: <IoMdNotifications className="text-yellow-500 h-6 w-6" />,
      },
    ],
    earlier: [
      {
        id: 5,
        title: "Job canceled",
        message:
          "The client has canceled the request. Stay tuned for more opportunities",
        time: "12:15",
        icon: <MdCancel className="text-red-500 h-6 w-6" />,
      },
      {
        id: 6,
        title: "Earnings update",
        message: "You’ve made ₦100,000 this week. Keep up the great work",
        time: "12:15",
        icon: <FaMoneyBillWave className="text-green-500 h-6 w-6" />,
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Notification</h1>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="mx-auto w-full max-w-md sm:max-w-2xl lg:max-w-4xl space-y-8">
          
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">Today</h2>
            <div className="space-y-3">
              {notifications.today.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-start bg-gray-100 rounded-lg p-3"
                >
                  <div className="flex gap-3">
                    {n.icon}
                    <div>
                      <p className="font-semibold text-gray-800">{n.title}</p>
                      <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">
              Yesterday
            </h2>
            <div className="space-y-3">
              {notifications.yesterday.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-start bg-gray-100 rounded-lg p-3"
                >
                  <div className="flex gap-3">
                    {n.icon}
                    <div>
                      <p className="font-semibold text-gray-800">{n.title}</p>
                      <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">
              Saturday, 1 March
            </h2>
            <div className="space-y-3">
              {notifications.earlier.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-start bg-gray-100 rounded-lg p-3"
                >
                  <div className="flex gap-3">
                    {n.icon}
                    <div>
                      <p className="font-semibold text-gray-800">{n.title}</p>
                      <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
