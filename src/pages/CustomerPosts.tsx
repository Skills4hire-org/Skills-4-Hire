import PostComposer from '../components/PostComposer'
import PostCard from '../components/PostCard'
import AdminProfile from '../assets/Admin profile.jpg'
import AdminElect from '../assets/Admin-Elect.png'

export default function CustomerPosts() {
  return (
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
        stats={{ likes: 110, comments: 81, shares: 212, downloads: 16 }}
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
        description="Specialized in electrical installations, repairs and upgrades for both residential and commercial properties."
        tags={['Electrical', 'Certified', 'Repairs', 'Residential']}
        stats={{ likes: 96, comments: 44, shares: 138, downloads: 9 }}
      />
    </>
  )
}
