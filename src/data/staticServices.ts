/**
 * Static service categories with sub-roles.
 * Images fetched via scripts/fetchCategoryImages.mjs — do not edit manually.
 */

export type ServiceCategory = {
  id: string
  name: string
  image: string
  roles: string[]
}

export const vocationalCategories: ServiceCategory[] = [
  {
    id: 'electrical-services',
    name: 'Electrical Services',
    image: 'https://images.pexels.com/photos/27363017/pexels-photo-27363017.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Electrician',
    'Residential Electrician',
    'Commercial Electrician',
    'Industrial Electrician',
    'Maintenance Electrician',
    ],
  },
  {
    id: 'plumbing-services',
    name: 'Plumbing Services',
    image: 'https://images.pexels.com/photos/16552856/pexels-photo-16552856.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Plumber',
    ],
  },
  {
    id: 'carpentry-services',
    name: 'Carpentry Services',
    image: 'https://images.pexels.com/photos/37250043/pexels-photo-37250043.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Carpenter',
    'Furniture Carpenter',
    ],
  },
  {
    id: 'welding-services',
    name: 'Welding Services',
    image: 'https://images.pexels.com/photos/16005625/pexels-photo-16005625.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Welder',
    'Fabricator',
    'Aluminum Welder',
    ],
  },
  {
    id: 'tiling-services',
    name: 'Tiling Services',
    image: 'https://images.pexels.com/photos/17497857/pexels-photo-17497857.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Tiler',
    ],
  },
  {
    id: 'pop-ceiling-installation',
    name: 'POP Ceiling Installation',
    image: 'https://images.pexels.com/photos/33634506/pexels-photo-33634506.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'POP Ceiling Installer',
    ],
  },
  {
    id: 'painting-services',
    name: 'Painting Services',
    image: 'https://images.pexels.com/photos/994164/pexels-photo-994164.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Painter',
    ],
  },
  {
    id: 'roofing-services',
    name: 'Roofing Services',
    image: 'https://images.pexels.com/photos/27907084/pexels-photo-27907084.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Roofer',
    'Roof Installer',
    ],
  },
  {
    id: 'borehole-services',
    name: 'Borehole Services',
    image: 'https://images.pexels.com/photos/17419782/pexels-photo-17419782.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Borehole Driller',
    'Borehole Technician',
    'Water Treatment Technician',
    'Pump Installer',
    ],
  },
  {
    id: 'cctv-installation-services',
    name: 'CCTV Installation Services',
    image: 'https://images.pexels.com/photos/38735521/pexels-photo-38735521.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'CCTV Installer',
    'Security Systems Technician',
    'Access Control Installer',
    ],
  },
  {
    id: 'solar-installation-services',
    name: 'Solar Installation Services',
    image: 'https://images.pexels.com/photos/9808652/pexels-photo-9808652.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Solar Installer',
    'Solar Technician',
    ],
  },
  {
    id: 'generator-repair-maintenance',
    name: 'Generator Repair & Maintenance',
    image: 'https://images.pexels.com/photos/36398006/pexels-photo-36398006.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Generator Technician',
    'Generator Installer',
    'Generator Maintenance Technician',
    ],
  },
  {
    id: 'hvac-refrigeration-services',
    name: 'HVAC & Refrigeration Services',
    image: 'https://images.pexels.com/photos/5504709/pexels-photo-5504709.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'HVAC Technician',
    'Air Conditioner Technician',
    'Refrigerator Technician',
    ],
  },
  {
    id: 'auto-repair-maintenance',
    name: 'Auto Repair & Maintenance',
    image: 'https://images.pexels.com/photos/17623846/pexels-photo-17623846.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Auto Mechanic',
    'Auto Electrician',
    'Panel Beater',
    'Auto Painter',
    ],
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    image: 'https://images.pexels.com/photos/33300345/pexels-photo-33300345.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Residential Cleaner',
    'Commercial Cleaner',
    'Deep Cleaning Specialist',
    ],
  },
  {
    id: 'laundry-dry-cleaning-services',
    name: 'Laundry & Dry Cleaning Services',
    image: 'https://images.pexels.com/photos/8867980/pexels-photo-8867980.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Laundry Specialist',
    'Dry Cleaner',
    ],
  },
  {
    id: 'fumigation-pest-control-services',
    name: 'Fumigation & Pest Control Services',
    image: 'https://images.pexels.com/photos/28921817/pexels-photo-28921817.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Pest Control Technician',
    'Fumigation Specialist',
    ],
  },
  {
    id: 'barbering-services',
    name: 'Barbering Services',
    image: 'https://images.pexels.com/photos/5584461/pexels-photo-5584461.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Barber',
    ],
  },
  {
    id: 'beauty-services',
    name: 'Beauty Services',
    image: 'https://images.pexels.com/photos/19679199/pexels-photo-19679199.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Hair Stylist',
    'Makeup Artist',
    'Nail Technician',
    'Lash Technician',
    'Gele Artist',
    ],
  },
  {
    id: 'spa-massage-services',
    name: 'Spa & Massage Services',
    image: 'https://images.pexels.com/photos/36593691/pexels-photo-36593691.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Massage Therapist',
    'Spa Therapist',
    'Skincare Specialist',
    'Esthetician',
    ],
  },
  {
    id: 'fashion-design-tailoring',
    name: 'Fashion Design & Tailoring',
    image: 'https://images.pexels.com/photos/36356684/pexels-photo-36356684.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Fashion Designer',
    'Tailor',
    ],
  },
  {
    id: 'shoe-making-repair',
    name: 'Shoe Making & Repair',
    image: 'https://images.pexels.com/photos/27521050/pexels-photo-27521050.png?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Shoemaker',
    'Cobbler',
    'Leather Craftsman',
    ],
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    image: 'https://images.pexels.com/photos/10972243/pexels-photo-10972243.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Photographer',
    'Event Photographer',
    'Product Photographer',
    'Videographer',
    'Drone Operator',
    'Cinematographer',
    ],
  },
  {
    id: 'electronics-appliance-repair',
    name: 'Electronics & Appliance Repair',
    image: 'https://images.pexels.com/photos/19518397/pexels-photo-19518397.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Electronics Technician',
    'TV Repair Technician',
    'Phone Repair Technician',
    'Laptop Repair Technician',
    'Appliance Repair Technician',
    ],
  },
  {
    id: 'art-creative-services',
    name: 'Art & Creative Services',
    image: 'https://images.pexels.com/photos/14869517/pexels-photo-14869517.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Artist',
    'Sculptor',
    'Portrait Artist',
    ],
  },
]

export const digitalCategories: ServiceCategory[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    image: 'https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Web Developer',
    ],
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    image: 'https://images.pexels.com/photos/17505864/pexels-photo-17505864.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Mobile Developer',
    'Android Developer',
    'iOS Developer',
    ],
  },
  {
    id: 'ai-machine-learning-services',
    name: 'AI & Machine Learning Services',
    image: 'https://images.pexels.com/photos/36847304/pexels-photo-36847304.png?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'AI Engineer',
    'Machine Learning Engineer',
    ],
  },
  {
    id: 'devops-engineering',
    name: 'DevOps Engineering',
    image: 'https://images.pexels.com/photos/34956927/pexels-photo-34956927.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'DevOps Engineer',
    ],
  },
  {
    id: 'cloud-engineering',
    name: 'Cloud Engineering',
    image: 'https://images.pexels.com/photos/26765065/pexels-photo-26765065.png?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Cloud Engineer',
    'Cloud Architect',
    'Cloud Administrator',
    ],
  },
  {
    id: 'blockchain-development',
    name: 'Blockchain Development',
    image: 'https://images.pexels.com/photos/4808267/pexels-photo-4808267.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Blockchain Developer',
    'Smart Contract Developer',
    'Web3 Developer',
    ],
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    image: 'https://images.pexels.com/photos/17803200/pexels-photo-17803200.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'UI/UX Designer',
    ],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    image: 'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Graphic Designer',
    'Brand Designer',
    'Logo Designer',
    'Print Designer',
    ],
  },
  {
    id: 'motion-graphics-design',
    name: 'Motion Graphics Design',
    image: 'https://images.pexels.com/photos/8833423/pexels-photo-8833423.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Motion Designer',
    ],
  },

  {
    id: 'wordpress-development',
    name: 'WordPress Development',
    image: 'https://images.pexels.com/photos/890065/pexels-photo-890065.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'WordPress Developer',
    'WordPress Designer',
    ],
  },
  {
    id: 'data-analytics-business-intelligence',
    name: 'Data Analytics & Business Intelligence',
    image: 'https://images.pexels.com/photos/14659258/pexels-photo-14659258.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Data Analyst',
    'Business Intelligence Analyst',
    ],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    image: 'https://images.pexels.com/photos/7793173/pexels-photo-7793173.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Data Scientist',
    'Research Scientist',
    ],
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    image: 'https://images.pexels.com/photos/5503904/pexels-photo-5503904.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Data Engineer',
    ],
  },
  {
    id: 'cybersecurity-services',
    name: 'Cybersecurity Services',
    image: 'https://images.pexels.com/photos/228838/pexels-photo-228838.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Cybersecurity Analyst',
    'Penetration Tester',
    'Security Engineer',
    'SOC Analyst',
    'Ethical Hacker',
    ],
  },
  {
    id: 'it-support-services',
    name: 'IT Support Services',
    image: 'https://images.pexels.com/photos/16764124/pexels-photo-16764124.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'IT Support Specialist',
    'Help Desk Technician',
    'System Administrator',
    'Network Administrator',
    ],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    image: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Digital Marketer',
    'SEO Specialist',
    'SEM Specialist',
    'PPC Specialist',
    'Email Marketer',
    'Performance Marketer',
    ],
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    image: 'https://images.pexels.com/photos/238480/pexels-photo-238480.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Social Media Manager',
    'Community Manager',
    'Social Media Strategist',
    ],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    image: 'https://images.pexels.com/photos/19244211/pexels-photo-19244211.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Content Creator',
    'AI Content Creator',
    'UGC Creator',
    'Influencer',
    ],
  },
  {
    id: 'writing-services',
    name: 'Writing Services',
    image: 'https://images.pexels.com/photos/7793740/pexels-photo-7793740.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Copywriter',
    'Content Writer',
    'Technical Writer',
    'Ghostwriter',
    'Script Writer',
    'Grant Writer',
    'CV Writer',
    ],
  },
  {
    id: 'video-audio-editing',
    name: 'Video & Audio Editing',
    image: 'https://images.pexels.com/photos/4167169/pexels-photo-4167169.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Video Editor',
    'Audio Editor',
    'Podcast Editor',
    ],
  },
  {
    id: 'virtual-assistance',
    name: 'Virtual Assistance',
    image: 'https://images.pexels.com/photos/13104099/pexels-photo-13104099.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Virtual Assistant',
    ],
  },
  {
    id: 'product-management',
    name: 'Product Management',
    image: 'https://images.pexels.com/photos/938582/pexels-photo-938582.jpeg?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'Product Manager',
    'Product Owner',
    ],
  },
  {
    id: 'ai-automation-services',
    name: 'AI Automation Services',
    image: 'https://images.pexels.com/photos/36847304/pexels-photo-36847304.png?auto=compress&cs=tinysrgb&h=350',
    roles: [
    'AI Automation Specialist',
    'Prompt Engineer',
    'AI Workflow Engineer',
    'No-Code Automation Specialist',
    'Automation Engineer',
    ],
  },
]

export const allCategories: ServiceCategory[] = [
  ...vocationalCategories,
  ...digitalCategories,
]

export const categoryBySlug = Object.fromEntries(
  allCategories.map((cat) => [cat.id, cat]),
)
