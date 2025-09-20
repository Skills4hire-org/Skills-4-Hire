import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobOfferCard from "../components/JobOfferCard";
import { Filter, ArrowUpDown } from "lucide-react";

import TopBar from "../components/TopBar";
import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";
import BottomNav from "../components/BottomNav";

// Feed avatars
import AdminProfile from "../assets/Admin profile.jpg";
import AdminElect from "../assets/Admin-Elect.png";
import JoseProfile from "../assets/Jose profile.png";
import Rect20 from "../assets/Rectangle 20.png";
import Rect21 from "../assets/Rectangle 21.png";

import Rect18 from "../assets/Rectangle 18.png";
import Rect19 from "../assets/Rectangle 19.png";

type TabKey = "posts" | "my-posts" | "jobs";

export default function ProvidersHome() {
  const [activeTab, setActiveTab] = useState<TabKey>("posts");
  const [activeNav, setActiveNav] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const seg = location.pathname.split("/")[2];
    if (seg === "myposts") setActiveTab("my-posts");
    else if (seg === "jobs") setActiveTab("jobs");
    else setActiveTab("posts");
  }, [location.pathname]);

  const handleTabChange = (next: TabKey) => {
    setActiveTab(next);
    if (next === "posts") navigate("/providers-home");
    if (next === "my-posts") navigate("/providers-home/myposts");
    if (next === "jobs") navigate("/providers-home/jobs");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <TopBar active={activeTab} onChange={handleTabChange} />

      <div className="flex-1 overflow-y-auto pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-3 sm:px-5 space-y-4">
          {/* ==== POSTS FEED ==== */}
          {activeTab === "posts" && (
            <>
              <PostComposer />

              {/* Michael Chen — Plumbing */}
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
                tags={["Plumbing", "Certified", "Near you", "Emergency"]}
                stats={{ likes: 110, comments: 81, shares: 212, downloads: 16 }}
              />

              {/* Elite Electrical Solutions */}
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
                tags={["Electrical", "Certified", "Repairs", "Residential"]}
                stats={{ likes: 96, comments: 44, shares: 138, downloads: 9 }}
              />
            </>
          )}

          {/* ==== MY POSTS ==== */}
          {activeTab === "my-posts" && (
            <>
              <PostComposer variant="myPosts" />

              <PostCard
                variant="myPosts"
                title="Need plumber to fix leaking tap"
                description="Looking for an experience plumber to fix a constantly dripping kitchen faucet. It can be done as fast as you want."
                posted="Posted: Dec 15, 2024"
                views="247 views"
                inquiries="12 inquiries"
                active
              />

              <PostCard
                variant="myPosts"
                title="Emergency plumbing repairs"
                description="Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues."
                posted="Posted: Dec 18, 2024"
                views="241 views"
                inquiries="12 inquiries"
                active
                media={[Rect19, Rect18]}
              />
            </>
          )}

          {/* ==== JOB OFFERS ==== */}
          {activeTab === "jobs" && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-gray-900 text-lg">
                  Recent Job Offers
                </h2>

                <div className="flex gap-2">
                  <button className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                    <Filter className="h-4 w-4" /> Filter
                  </button>
                  <button className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                    <ArrowUpDown className="h-4 w-4" /> Sort
                  </button>
                </div>
              </div>

              {/* Job Offer 1 */}
              <JobOfferCard
                profile={AdminProfile}
                name="Michael Chen"
                role="Homeowner"
                location="Lagos"
                title="Need Plumber to Fix leaking tap"
                description="Looking for an experienced plumber to fix a constantly dripping kitchen faucet. I would like for it to be done as quickly as possible."
                budget="₦15,000"
                deadline="This weekend"
              />

              {/* Job Offer 2 */}
              <JobOfferCard
                profile={JoseProfile}
                name="Jose Martino"
                role="Homeowner"
                location="Ibadan"
                title="Electrician needed for office rewiring"
                description="Looking for an electrician to handle a complete office rewiring project. Must be safety certified with prior commercial experience."
                budget="₦85,000"
                deadline="Dec 31, 2024"
                images={[Rect20, Rect21]}
              />
            </>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <BottomNav active={activeNav} onNavigate={setActiveNav} />
    </div>
  );
}
