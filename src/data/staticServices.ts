/**
 * Static service categories with sub-roles.
 * Images are imported from src/assets/images/pro-images/
 * One representative image per category.
 */

// ─── Vocational images ────────────────────────────────────────────────────────
import electricalImg from '@/assets/images/pro-images/Electrician.jpeg'
import plumbingImg from '@/assets/images/pro-images/Plumbing service.jpeg'
import carpentryImg from '@/assets/images/pro-images/Carpenter.jpeg'
import weldingImg from '@/assets/images/pro-images/Aluminum welder.jpeg'
import tilingImg from '@/assets/images/pro-images/Tiling Services.jpeg'
import popCeilingImg from '@/assets/images/pro-images/POP ceiling.jpeg'
import paintingImg from '@/assets/images/pro-images/Painting service.jpeg'
import roofingImg from '@/assets/images/pro-images/Roofer.jpeg'
import boreholeDrillImg from '@/assets/images/pro-images/Borehole driller.jpeg'
import cctvImg from '@/assets/images/pro-images/CCTV Installater.jpeg'
import solarImg from '@/assets/images/pro-images/Solar Installer.jpeg'
import generatorImg from '@/assets/images/pro-images/Generator Technician.jpeg'
import hvacImg from '@/assets/images/pro-images/HvAc trechnician.jpeg'
import autoMechanicImg from '@/assets/images/pro-images/Auto mechanic.jpeg'
import cleaningImg from '@/assets/images/pro-images/Residential Cleaner.jpeg'
import laundryImg from '@/assets/images/pro-images/Laundry Specialist.jpeg'
import fumigationImg from '@/assets/images/pro-images/Fumigation Specialist.jpeg'
import barberImg from '@/assets/images/pro-images/Barber.jpeg'
import beautyImg from '@/assets/images/pro-images/Makeup artist.jpeg'
import spaImg from '@/assets/images/pro-images/Massage Therapist.jpeg'
import fashionImg from '@/assets/images/pro-images/Fashion Designer.jpeg'
import shoeImg from '@/assets/images/pro-images/Cobbler.jpeg'
import photographyImg from '@/assets/images/pro-images/Event Photographer.jpeg'
import electronicsImg from '@/assets/images/pro-images/Electronics Technician.jpeg'
import artImg from '@/assets/images/pro-images/Artist.jpeg'

// ─── Digital images ───────────────────────────────────────────────────────────
import softwareDevImg from '@/assets/images/pro-images/Fullstack-developer.jpeg'
import mobileDevImg from '@/assets/images/pro-images/Mobile Developer.jpeg'
import aiMlImg from '@/assets/images/pro-images/AI content creator.jpeg'
import devopsImg from '@/assets/images/pro-images/DevOps Engineer.jpeg'
import cloudImg from '@/assets/images/pro-images/Backend-developer.jpeg'
import blockchainImg from '@/assets/images/pro-images/Blockchain Developer.jpeg'
import uiuxImg from '@/assets/images/pro-images/UIUX designer.jpeg'
import graphicDesignImg from '@/assets/images/pro-images/Graphic designer.jpeg'
import motionGraphicsImg from '@/assets/images/pro-images/Motion Designer.jpeg'
import illustrationImg from '@/assets/images/pro-images/Portrait Artist.jpeg'
import wordpressImg from '@/assets/images/pro-images/Wordpress developer.jpeg'
import dataAnalyticsImg from '@/assets/images/pro-images/Data Analyst.jpeg'
import dataScienceImg from '@/assets/images/pro-images/Business Intelligence Analyst.jpeg'
import dataEngineeringImg from '@/assets/images/pro-images/Data Engineering.jpeg'
import cybersecurityImg from '@/assets/images/pro-images/Cybersecurity.jpeg'
import itSupportImg from '@/assets/images/pro-images/IT Support Specialist.jpeg'
import digitalMarketingImg from '@/assets/images/pro-images/Digital Marketing.jpeg'
import socialMediaImg from '@/assets/images/pro-images/Social media manager.jpeg'
import contentCreationImg from '@/assets/images/pro-images/UGC creator.jpeg'
import writingImg from '@/assets/images/pro-images/Writing  1.jpeg'
import videoAudioImg from '@/assets/images/pro-images/Videographer.jpeg'
import virtualAssistantImg from '@/assets/images/pro-images/AI content creator.jpeg'
import productMgmtImg from '@/assets/images/pro-images/Product manager.jpeg'
import aiAutomationImg from '@/assets/images/pro-images/Automation Engineer.jpeg'

export type ServiceCategory = {
  id: string
  name: string
  image: string
  roles: string[]
}

// ─── Vocational & On-Site ─────────────────────────────────────────────────────

export const vocationalCategories: ServiceCategory[] = [
  {
    id: 'electrical-services',
    name: 'Electrical Services',
    image: electricalImg,
    roles: ['Electrician', 'Residential Electrician', 'Commercial Electrician', 'Industrial Electrician', 'Maintenance Electrician'],
  },
  {
    id: 'plumbing-services',
    name: 'Plumbing Services',
    image: plumbingImg,
    roles: ['Plumber'],
  },
  {
    id: 'carpentry-services',
    name: 'Carpentry Services',
    image: carpentryImg,
    roles: ['Carpenter', 'Furniture Carpenter'],
  },
  {
    id: 'welding-services',
    name: 'Welding Services',
    image: weldingImg,
    roles: ['Welder', 'Fabricator', 'Aluminum Welder'],
  },
  {
    id: 'tiling-services',
    name: 'Tiling Services',
    image: tilingImg,
    roles: ['Tiler'],
  },
  {
    id: 'pop-ceiling-installation',
    name: 'POP Ceiling Installation',
    image: popCeilingImg,
    roles: ['POP Ceiling Installer'],
  },
  {
    id: 'painting-services',
    name: 'Painting Services',
    image: paintingImg,
    roles: ['Painter'],
  },
  {
    id: 'roofing-services',
    name: 'Roofing Services',
    image: roofingImg,
    roles: ['Roofer', 'Roof Installer'],
  },
  {
    id: 'borehole-services',
    name: 'Borehole Services',
    image: boreholeDrillImg,
    roles: ['Borehole Driller', 'Borehole Technician', 'Water Treatment Technician', 'Pump Installer'],
  },
  {
    id: 'cctv-installation-services',
    name: 'CCTV Installation Services',
    image: cctvImg,
    roles: ['CCTV Installer', 'Security Systems Technician', 'Access Control Installer'],
  },
  {
    id: 'solar-installation-services',
    name: 'Solar Installation Services',
    image: solarImg,
    roles: ['Solar Installer', 'Solar Technician', 'Solar System Designer'],
  },
  {
    id: 'generator-repair-maintenance',
    name: 'Generator Repair & Maintenance',
    image: generatorImg,
    roles: ['Generator Technician', 'Generator Installer', 'Generator Maintenance Technician'],
  },
  {
    id: 'hvac-refrigeration-services',
    name: 'HVAC & Refrigeration Services',
    image: hvacImg,
    roles: ['HVAC Technician', 'Air Conditioner Technician', 'Refrigerator Technician'],
  },
  {
    id: 'auto-repair-maintenance',
    name: 'Auto Repair & Maintenance',
    image: autoMechanicImg,
    roles: ['Auto Mechanic', 'Auto Electrician', 'Panel Beater', 'Auto Painter'],
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    image: cleaningImg,
    roles: ['Residential Cleaner', 'Commercial Cleaner', 'Deep Cleaning Specialist'],
  },
  {
    id: 'laundry-dry-cleaning-services',
    name: 'Laundry & Dry Cleaning Services',
    image: laundryImg,
    roles: ['Laundry Specialist', 'Dry Cleaner'],
  },
  {
    id: 'fumigation-pest-control-services',
    name: 'Fumigation & Pest Control Services',
    image: fumigationImg,
    roles: ['Pest Control Technician', 'Fumigation Specialist'],
  },
  {
    id: 'barbering-services',
    name: 'Barbering Services',
    image: barberImg,
    roles: ['Barber', 'Hair Grooming Specialist'],
  },
  {
    id: 'beauty-services',
    name: 'Beauty Services',
    image: beautyImg,
    roles: ['Hair Stylist', 'Makeup Artist', 'Nail Technician', 'Lash Technician', 'Gele Artist'],
  },
  {
    id: 'spa-massage-services',
    name: 'Spa & Massage Services',
    image: spaImg,
    roles: ['Massage Therapist', 'Spa Therapist', 'Skincare Specialist', 'Esthetician'],
  },
  {
    id: 'fashion-design-tailoring',
    name: 'Fashion Design & Tailoring',
    image: fashionImg,
    roles: ['Fashion Designer', 'Tailor', 'Pattern Maker', 'Garment Maker'],
  },
  {
    id: 'shoe-making-repair',
    name: 'Shoe Making & Repair',
    image: shoeImg,
    roles: ['Shoemaker', 'Cobbler', 'Leather Craftsman'],
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    image: photographyImg,
    roles: ['Photographer', 'Event Photographer', 'Product Photographer', 'Videographer', 'Drone Operator', 'Cinematographer'],
  },
  {
    id: 'electronics-appliance-repair',
    name: 'Electronics & Appliance Repair',
    image: electronicsImg,
    roles: ['Electronics Technician', 'TV Repair Technician', 'Phone Repair Technician', 'Laptop Repair Technician', 'Appliance Repair Technician'],
  },
  {
    id: 'art-creative-services',
    name: 'Art & Creative Services',
    image: artImg,
    roles: ['Artist', 'Sculptor', 'Portrait Artist'],
  },
]

// ─── Digital Services ─────────────────────────────────────────────────────────

export const digitalCategories: ServiceCategory[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    image: softwareDevImg,
    roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Web Developer'],
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    image: mobileDevImg,
    roles: ['Mobile Developer', 'Android Developer', 'iOS Developer', 'Flutter Developer', 'React Native Developer'],
  },
  {
    id: 'ai-machine-learning-services',
    name: 'AI & Machine Learning Services',
    image: aiMlImg,
    roles: ['AI Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer', 'NLP Engineer'],
  },
  {
    id: 'devops-engineering',
    name: 'DevOps Engineering',
    image: devopsImg,
    roles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
  },
  {
    id: 'cloud-engineering',
    name: 'Cloud Engineering',
    image: cloudImg,
    roles: ['Cloud Engineer', 'Cloud Architect', 'Cloud Administrator'],
  },
  {
    id: 'blockchain-development',
    name: 'Blockchain Development',
    image: blockchainImg,
    roles: ['Blockchain Developer', 'Smart Contract Developer', 'Web3 Developer'],
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    image: uiuxImg,
    roles: ['UI/UX Designer', 'Product Designer', 'Interaction Designer'],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    image: graphicDesignImg,
    roles: ['Graphic Designer', 'Brand Designer', 'Logo Designer', 'Print Designer'],
  },
  {
    id: 'motion-graphics-design',
    name: 'Motion Graphics Design',
    image: motionGraphicsImg,
    roles: ['Motion Designer', 'Motion Graphics Artist'],
  },
  {
    id: 'illustration-animation',
    name: 'Illustration & Animation',
    image: illustrationImg,
    roles: ['Illustrator', '2D Animator', '3D Animator', 'Character Designer'],
  },
  {
    id: 'wordpress-development',
    name: 'WordPress Development',
    image: wordpressImg,
    roles: ['WordPress Developer', 'WordPress Designer', 'WooCommerce Developer'],
  },
  {
    id: 'data-analytics-business-intelligence',
    name: 'Data Analytics & Business Intelligence',
    image: dataAnalyticsImg,
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'BI Developer'],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    image: dataScienceImg,
    roles: ['Data Scientist', 'Research Scientist'],
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    image: dataEngineeringImg,
    roles: ['Data Engineer', 'ETL Developer', 'Big Data Engineer'],
  },
  {
    id: 'cybersecurity-services',
    name: 'Cybersecurity Services',
    image: cybersecurityImg,
    roles: ['Cybersecurity Analyst', 'Penetration Tester', 'Security Engineer', 'SOC Analyst', 'Ethical Hacker'],
  },
  {
    id: 'it-support-services',
    name: 'IT Support Services',
    image: itSupportImg,
    roles: ['IT Support Specialist', 'Help Desk Technician', 'System Administrator', 'Network Administrator'],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    image: digitalMarketingImg,
    roles: ['Digital Marketer', 'SEO Specialist', 'SEM Specialist', 'PPC Specialist', 'Email Marketer', 'Performance Marketer'],
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    image: socialMediaImg,
    roles: ['Social Media Manager', 'Community Manager', 'Social Media Strategist'],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    image: contentCreationImg,
    roles: ['Content Creator', 'AI Content Creator', 'UGC Creator', 'Influencer'],
  },
  {
    id: 'writing-services',
    name: 'Writing Services',
    image: writingImg,
    roles: ['Copywriter', 'Content Writer', 'Technical Writer', 'Ghostwriter', 'Script Writer', 'Grant Writer', 'CV Writer'],
  },
  {
    id: 'video-audio-editing',
    name: 'Video & Audio Editing',
    image: videoAudioImg,
    roles: ['Video Editor', 'Audio Editor', 'Podcast Editor'],
  },
  {
    id: 'virtual-assistance',
    name: 'Virtual Assistance',
    image: virtualAssistantImg,
    roles: ['Virtual Assistant'],
  },
  {
    id: 'product-management',
    name: 'Product Management',
    image: productMgmtImg,
    roles: ['Product Manager', 'Product Owner'],
  },
  {
    id: 'ai-automation-services',
    name: 'AI Automation Services',
    image: aiAutomationImg,
    roles: ['AI Automation Specialist', 'Prompt Engineer', 'AI Workflow Engineer', 'No-Code Automation Specialist', 'Automation Engineer'],
  },
]

// ─── Lookup ───────────────────────────────────────────────────────────────────

export const allCategories: ServiceCategory[] = [
  ...vocationalCategories,
  ...digitalCategories,
]

export const categoryBySlug = Object.fromEntries(
  allCategories.map((cat) => [cat.id, cat]),
)
