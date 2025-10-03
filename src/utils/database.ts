import AdminProfile from "../assets/Admin profile.jpg";
import AdminElect from "../assets/Admin-Elect.png";
import Rect18 from "../assets/Rectangle 18.png";
import Rect19 from "../assets/Rectangle 19.png";

export const user = {
  profileImage: "",
  firstName: "Leo",
  lastName: "Justin",
  verified: true,
  service: "plumber",
  rating: 4,
  totalReviews: 120,
};

export const customerPosts = [
  {
    profile: AdminProfile,
    name: "Michael Chen",
    location: "Lagos",
    service: "Plumbing Services",
    rating: "4.9",
    reviews: "234",
    title: "Affordable plumbing services",
    description:
      "Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.",
    tags: ["Plumbing", "Certified", "Near you", "Emergency"],
    stats: { likes: 110, comments: 81, shares: 212, downloads: 16 },
  },
  {
    profile: AdminElect,
    name: "Elite Electrical Solutions",
    location: "Ibadan",
    service: "Electrical Services",
    rating: "4.8",
    reviews: "294",
    title: "Expert Electrical Services",
    description:
      "Specialized in electrical installations, repairs and upgrades for both residential and commercial properties.",
    tags: ["Electrical", "Certified", "Repairs", "Residential"],
    stats: { likes: 96, comments: 44, shares: 138, downloads: 9 },
  },
];

export const customerOffers = [
  {
    title: "Need plumber to fix leaking tap",
    description:
      "Looking for an experienced plumber to fix a constantly dripping kitchen faucet. It can be done as fast as you want.",
    posted: "Posted: Dec 15, 2024",
    views: "247 views",
    inquiries: "12 inquiries",
    active: true,
  },
  {
    title: "Emergency plumbing repairs",
    description:
      "Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues.",
    posted: "Posted: Dec 18, 2024",
    views: "241 views",
    inquiries: "12 inquiries",
    active: true,
    media: [Rect19, Rect18],
  },
  {
    title: "Bathroom Renovation Services",
    description:
      "Complete bathroom renovation services, including plumbing, tiling, waterproofing, and finishing to modern standards.",
    posted: "Posted: Dec 20, 2024",
    views: "198 views",
    inquiries: "8 inquiries",
    active: true,
  },
];
