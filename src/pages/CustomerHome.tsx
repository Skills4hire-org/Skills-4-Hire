import { useState } from 'react'
import PostComposer from '../components/PostComposer'
import PostCard from '../components/PostCard'
// Assets
import AdminProfile from '../assets/Admin profile.jpg'
import AdminElect from '../assets/Admin-Elect.png'
import SmallDP from '../assets/Small-DP.png'
import NotificationBell from '../assets/NotificationBell.png'
import MessageIcon from '../assets/Message.png'

type TabKey = 'posts' | 'my-offers'

export default function CustomerHome() {
  const [activeTab, setActiveTab] = useState<TabKey>('posts')
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden md:block fixed left-0 top-0 h-full w-44 z-20"></aside>

      <main className="flex-1 md:ml-44 flex flex-col">
        <div className="hidden md:block bg-white shadow rounded-lg w-full px-4 py-3 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Search bar */}
            <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2 mr-4">
              <input
                type="text"
                placeholder="Search for jobs, services or providers"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <img
                src={NotificationBell}
                alt="notifications"
                className="h-5 w-5 cursor-pointer"
              />
              <img
                src={MessageIcon}
                alt="messages"
                className="h-5 w-5 cursor-pointer"
              />

              <div className="flex items-center gap-2">
                <img
                  src={SmallDP}
                  alt="Leo Justin"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Leo Justin</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 px-3 sm:px-5 lg:px-6 py-4 overflow-y-auto">
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0 space-y-6">
            <div className="hidden md:flex items-center gap-12 border-b pb-2">
              <button
                className={`pb-2 ${
                  activeTab === 'posts'
                    ? 'text-[#222BDE] border-b border-[#222BDE] font-semibold'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </button>
              <button
                className={`pb-2 ${
                  activeTab === 'my-offers'
                    ? 'text-[#222BDE] border-b border-[#222BDE] font-semibold'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('my-offers')}
              >
                My Offers
              </button>
            </div>

            {/* Posts feed */}
            {activeTab === 'posts' && (
              <>
                <PostComposer variant="customer" />

                <PostCard
                  variant="default"
                  profile={AdminProfile}
                  name="Michael Chen"
                  location="Lagos"
                  service="Plumbing Services"
                  rating="4.9"
                  reviews="234"
                  title="Affordable plumbing services"
                  description="Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years."
                  tags={['Plumbing', 'Certified', 'Near you', 'Emergency']}
                  stats={{
                    likes: 110,
                    comments: 81,
                    shares: 212,
                    downloads: 16,
                  }}
                />

                <PostCard
                  variant="default"
                  profile={AdminElect}
                  name="Elite Electrical Solutions"
                  location="Ibadan"
                  service="Electrical Services"
                  rating="4.8"
                  reviews="294"
                  title="Expert Electrical Services"
                  description="Specialized in electrical installations, repairs and upgrades for both residential and commercial properties. Licensed electricians with a strong focus on safety and efficiency."
                  tags={['Electrical', 'Certified', 'Repairs', 'Residential']}
                  stats={{ likes: 96, comments: 44, shares: 138, downloads: 9 }}
                />
              </>
            )}

            {activeTab === 'my-offers' && (
              <>
                <OfferCard
                  title="Need plumber to fix leaking tap"
                  description="Looking for an experienced plumber to fix a constantly dripping kitchen faucet. I will like for it to be done as quickly as possible."
                  posted="Dec 15, 2024"
                  views={247}
                  inquiries={12}
                  status="Active"
                />

                <OfferCard
                  title="Emergency plumbing repairs"
                  description="Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues."
                  posted="Dec 10, 2024"
                  views={447}
                  inquiries={15}
                  status="Active"
                />
              </>
            )}

            <aside className="block lg:hidden space-y-6 mt-6">
              <RightSidebar />
            </aside>
          </div>

          <aside className="hidden lg:flex flex-col w-72 shrink-0 space-y-6 mr-2">
            <RightSidebar />
          </aside>
        </div>
      </main>

      {/* Bottom navigation (mobile only) */}
      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <BottomNav active={activeNav} onNavigate={setActiveNav} />
      </div> */}
    </div>
  )
}

function RightSidebar() {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      {/* Top-rated providers */}
      <section>
        <h3 className="font-semibold text-gray-700 mb-3">
          Top-rated providers
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img
                src={SmallDP}
                alt="provider"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">James Carpentry</p>
                <p className="text-xs text-gray-500">⭐ 4.9 • Carpentry</p>
              </div>
            </div>
          ))}
          <button className="text-xs text-[#222BDE] mt-2">See all</button>
        </div>
      </section>

      {/* Suggested services */}
      <section>
        <h3 className="font-semibold text-gray-700 mb-2">Suggested services</h3>
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          {['Moving', 'Painting', 'Handyman', 'Cleaning'].map((srv) => (
            <span
              key={srv}
              className="px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            >
              {srv}
            </span>
          ))}
        </div>
      </section>

      {/* Quick tips */}
      <section>
        <h3 className="font-semibold text-gray-700 mb-2">Quick Tips</h3>
        <div className="space-y-3 bg-[#ECF4FB] rounded-lg p-3">
          {[
            'Check provider reviews and ratings before hiring.',
            'Always verify provider credentials and insurance.',
            'Communicate clearly about your service needs.',
            'Get multiple quotes before meeting with the provider.',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-[#222BDE] mt-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="12" fill="#222BDE" />
                <path
                  d="M16 9l-5.5 6L8 12.5"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-xs text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
function OfferCard({
  title,
  description,
  posted,
  views,
  inquiries,
  status,
}: {
  title: string
  description: string
  posted: string
  views: number
  inquiries: number
  status: string
}) {
  return (
    <div className="bg-white rounded-lg shadow p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <span className="text-xs text-green-600 font-medium">{status}</span>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      <div className="flex items-center gap-6 text-xs text-gray-500">
        <span>📅 Posted: {posted}</span>
        <span>👁️ {views} Views</span>
        <span>📩 {inquiries} Inquiries</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button className="px-4 py-1.5 text-sm rounded-md bg-[#222BDE] text-white font-medium">
          Edit
        </button>
        <button className="px-4 py-1.5 text-sm rounded-md bg-yellow-400 text-gray-800 font-medium">
          Boost
        </button>
        <button className="px-4 py-1.5 text-sm rounded-md border border-gray-300 text-gray-600 font-medium">
          Delete
        </button>
      </div>
    </div>
  )
}
