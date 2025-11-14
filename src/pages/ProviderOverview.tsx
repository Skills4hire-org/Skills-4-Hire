import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell, Settings, MessageSquare, Star } from "lucide-react";
import JoshuaProfile from "@/assets/Joshua Friday.png";
import { providerOverviewData } from "@/assets/data";

export default function ProviderOverview() {
  const { user, stats, chart, newBookingRequest, reviews } =
    providerOverviewData;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-6 md:px-8 lg:px-12">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4">
            <img
              src={JoshuaProfile}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover md:hidden"
            />
            <div>
              <h2 className="text-lg font-semibold text-black">
                Hi <span className="text-black">Joshua </span>
                <span className="text-primary">Friday</span>
              </h2>
              <p className="text-sm text-gray-500 md:hidden">
                2, Gandi Street, Ikorodu, Lagos.
              </p>
              <p className="hidden md:block text-sm text-gray-500">
                Welcome back!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <MessageSquare className="w-6 h-6 text-gray-600" />
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 md:min-w-[250px] flex items-center justify-between">
          <div>
            <p>
              Provider Type: <span className="font-semibold">{user.role}</span>
            </p>
            <p>
              App Commission:{" "}
              <span className="font-semibold">{user.commission}</span>
            </p>
          </div>
          <Settings className="w-5 h-5 text-gray-600 md:hidden" />
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-primary rounded-2xl py-12 px-6 shadow flex justify-between items-start text-white w-full"
            >
              <div className="flex flex-col justify-start">
                <p className="text-3xl font-semibold leading-tight">
                  {item.value}
                </p>
                <h4 className="text-sm opacity-90 mt-6">{item.label}</h4>
              </div>
              <div className="bg-white rounded-full p-3 -mt-2 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          );
        })}
      </section>

      <div className="bg-white rounded-lg p-4 shadow mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">
            {newBookingRequest.title}
          </h3>
          <button className="text-xs text-primary hover:underline">
            View all
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-400 py-6">
          <newBookingRequest.icon className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm">No new booking requests</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow mb-8">
        <h3 className="font-semibold text-gray-900 mb-4 text-center">
          Monthly Revenue (₦)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chart}>
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(val) => val.toLocaleString()}
              tick={{ fill: "#111", fontSize: 12 }}
              domain={[0, 500000]}
              ticks={[
                0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                400000, 450000, 500000,
              ]}
            />
            <Tooltip formatter={(val) => `₦${val.toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#222BDE" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-3">Reviews</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              date={index === 0 ? "31 Mar" : "23 Mar"}
              role={review.role}
              avatar={JoshuaProfile}
              rating={review.rating}
              text={
                index === 0
                  ? "Awesome work. Thank you so much."
                  : "Fast and professional."
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}

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
  rating: number;
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
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-900">{rating}</span>
          </div>
        </div>
        <span className="inline-block text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full mt-2">
          {role}
        </span>
        <p className="text-sm mt-2 text-gray-600">{text}</p>
      </div>
    </div>
  );
}
