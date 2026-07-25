import { Briefcase, Search, Sliders, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import NoJobsFound from '@/components/global/NoResultFound'
import JobListingCard, { type JobListing } from '@/components/home/JobListingCard'

const mockJobListings: JobListing[] = [
  {
    id: '1',
    title: 'Senior Electrician',
    company: 'Lagos State Government',
    location: 'Lagos, Nigeria',
    description:
      'We are seeking experienced electricians for ongoing infrastructure projects across Lagos. Must have valid certifications and 5+ years experience in industrial electrical work.',
    salary_min: 150000,
    salary_max: 250000,
    job_type: 'Full-time',
    category: 'Electrical',
    website_url: 'https://lagosstate.gov.ng/careers',
    created_at: '2026-07-22T08:00:00Z',
    is_direct_apply: true,
    requirements: [
      'Valid electrical certification',
      '5+ years industrial experience',
      'Knowledge of safety regulations',
      'Ability to read technical diagrams',
    ],
    responsibilities: [
      'Install and maintain electrical systems',
      'Inspect and test electrical components',
      'Troubleshoot electrical issues',
      'Ensure compliance with safety standards',
    ],
  },
  {
    id: '2',
    title: 'Plumbing Contractor',
    company: 'Dangote Industries',
    location: 'Lagos, Nigeria',
    description:
      'Looking for skilled plumbers for commercial building projects. Experience with industrial piping systems required. Long-term contract available.',
    salary_min: 120000,
    salary_max: 200000,
    job_type: 'Contract',
    category: 'Plumbing',
    website_url: 'https://dangote.com/careers',
    created_at: '2026-07-21T10:30:00Z',
    is_direct_apply: false,
    requirements: [
      '3+ years plumbing experience',
      'Commercial plumbing expertise',
      'Knowledge of building codes',
    ],
    responsibilities: [
      'Install pipe systems',
      'Repair and maintain plumbing fixtures',
      'Inspect plumbing installations',
    ],
  },
  {
    id: '3',
    title: 'Web Developer',
    company: 'TechHub Nigeria',
    location: 'Remote',
    description:
      'Join our team of developers building innovative solutions for African businesses. React, Node.js, and TypeScript experience required.',
    salary_min: 200000,
    salary_max: 400000,
    job_type: 'Remote',
    category: 'Technology',
    website_url: 'https://techhub.ng/careers',
    created_at: '2026-07-20T14:15:00Z',
    is_direct_apply: true,
    requirements: [
      'Proficiency in React, Node.js, TypeScript',
      'Experience with REST APIs',
      'Knowledge of database systems',
      'Strong problem-solving skills',
    ],
    responsibilities: [
      'Develop web applications',
      'Write clean, maintainable code',
      'Collaborate with design team',
      'Participate in code reviews',
    ],
  },
  {
    id: '4',
    title: 'Graphic Designer',
    company: 'Creative Studio NG',
    location: 'Abuja, Nigeria',
    description:
      'Creative designer needed for branding and marketing projects. Proficiency in Adobe Creative Suite and strong portfolio required.',
    salary_min: 80000,
    salary_max: 150000,
    job_type: 'Full-time',
    category: 'Design',
    website_url: 'https://creativestudio.ng/jobs',
    created_at: '2026-07-19T09:45:00Z',
    is_direct_apply: false,
    requirements: [
      'Adobe Creative Suite expertise',
      'Strong portfolio',
      'Understanding of branding',
    ],
    responsibilities: [
      'Create visual concepts',
      'Design marketing materials',
      'Develop brand identities',
    ],
  },
  {
    id: '5',
    title: 'Fitness Trainer',
    company: 'FitLife Gym',
    location: 'Port Harcourt, Nigeria',
    description:
      'Certified fitness trainer wanted for our premium gym facility. Must have CPR certification and experience with diverse clientele.',
    salary_min: 60000,
    salary_max: 100000,
    job_type: 'Part-time',
    category: 'Fitness',
    website_url: 'https://fitlife.ng/careers',
    created_at: '2026-07-18T11:00:00Z',
    is_direct_apply: true,
    requirements: [
      'Fitness certification',
      'CPR/First Aid certified',
      '2+ years training experience',
    ],
    responsibilities: [
      'Create personalized workout plans',
      'Guide clients during sessions',
      'Monitor client progress',
      'Maintain equipment',
    ],
  },
  {
    id: '6',
    title: 'Carpentry Expert',
    company: 'WoodCraft Furniture',
    location: 'Kano, Nigeria',
    description:
      'Skilled carpenter needed for custom furniture production. Experience with modern and traditional woodworking techniques preferred.',
    salary_min: 70000,
    salary_max: 120000,
    job_type: 'Full-time',
    category: 'Carpentry',
    website_url: 'https://woodcraft.ng/jobs',
    created_at: '2026-07-17T16:30:00Z',
    is_direct_apply: false,
    requirements: [
      '3+ years carpentry experience',
      'Knowledge of wood types',
      'Attention to detail',
    ],
    responsibilities: [
      'Build custom furniture',
      'Finish and polish products',
      'Read and interpret designs',
    ],
  },
  {
    id: '7',
    title: 'Data Analyst',
    company: 'FinTech Solutions',
    location: 'Remote',
    description:
      'Data analyst to join our growing team. SQL, Python, and data visualization skills required. Experience in financial services a plus.',
    salary_min: 180000,
    salary_max: 300000,
    job_type: 'Remote',
    category: 'Technology',
    website_url: 'https://fintechsolutions.ng/careers',
    created_at: '2026-07-16T13:20:00Z',
    is_direct_apply: true,
    requirements: [
      'Proficiency in SQL and Python',
      'Data visualization experience',
      'Analytical mindset',
      'Excellent communication skills',
    ],
    responsibilities: [
      'Analyze large datasets',
      'Create reports and dashboards',
      'Identify trends and insights',
      'Support decision-making processes',
    ],
  },
  {
    id: '8',
    title: 'Hair Stylist',
    company: 'Glamour Salon',
    location: 'Ibadan, Nigeria',
    description:
      'Creative hair stylist needed for busy salon. Must be skilled in both natural hair styling and chemical treatments. Client interaction skills essential.',
    salary_min: 50000,
    salary_max: 90000,
    job_type: 'Full-time',
    category: 'Hair Dressing',
    website_url: 'https://glamoursalon.ng/apply',
    created_at: '2026-07-15T10:10:00Z',
    is_direct_apply: true,
    requirements: [
      'Hair styling certification',
      'Experience with natural hair',
      'Knowledge of chemical treatments',
      'Good customer service skills',
    ],
    responsibilities: [
      'Style hair according to client preferences',
      'Perform hair treatments',
      'Advise clients on hair care',
      'Maintain clean workstations',
    ],
  },
]

const categories = [
  'All',
  'Electrical',
  'Plumbing',
  'Technology',
  'Design',
  'Fitness',
  'Carpentry',
  'Hair Dressing',
]

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredJobs = useMemo(() => {
    return mockJobListings.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || job.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="lg:px-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-sm md:text-base text-gray-900">
            Job Listings
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`
              inline-flex
              items-center
              gap-2
              h-[36px]
              px-4
              rounded-md
              border
              text-xs md:text-sm
              shadow-sm
              transition cursor-pointer
              ${
                filterOpen || selectedCategory !== 'All'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <Sliders className="w-4 h-4" />
            Filter
          </button>
        </div>

        {filterOpen && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  md:text-sm
                  font-medium
                  transition
                  cursor-pointer
                  ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length === 0 ? (
            <NoJobsFound
              icon={Briefcase}
              text="No jobs found"
              subtitle="Try adjusting your search or filters"
            />
          ) : (
            filteredJobs.map((job) => (
              <JobListingCard key={job.id} {...job} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
