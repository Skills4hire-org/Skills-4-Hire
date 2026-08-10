/**
 * One-time script: fetches unique Pexels image URLs for every service.
 * Each entry: [id, displayName, searchQuery, page]
 * Different queries + page offsets ensure unique images for similar roles.
 *
 * Run with:  node scripts/fetchPexelsImages.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const API_KEY = 'wQlvVd9N1KLlU30yWBVsDHP4uBdsZc6EyvFq2hQJjMrfrf3616VPij3k'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_FILE = path.resolve(__dirname, '../src/data/staticServices.ts')

// ─── Vocational services [id, displayName, searchQuery, page] ─────────────────

const vocationalServices = [
  ['static-electrician', 'Electrician', 'electrician wiring work', 1],
  ['static-residential-electrician', 'Residential Electrician', 'home electrical wiring', 1],
  ['static-commercial-electrician', 'Commercial Electrician', 'commercial electrical panel', 1],
  ['static-industrial-electrician', 'Industrial Electrician', 'industrial electrical factory', 1],
  ['static-maintenance-electrician', 'Maintenance Electrician', 'electrical maintenance repair', 1],
  ['static-plumber', 'Plumber', 'plumber pipe repair', 1],
  ['static-carpenter', 'Carpenter', 'carpenter woodwork', 1],
  ['static-furniture-carpenter', 'Furniture Carpenter', 'furniture making wood', 1],
  ['static-welder', 'Welder', 'welder welding sparks', 1],
  ['static-fabricator', 'Fabricator', 'metal fabrication workshop', 1],
  ['static-aluminum-welder', 'Aluminum Welder', 'aluminum welding torch', 1],
  ['static-tiler', 'Tiler', 'tiler laying tiles floor', 1],
  ['static-pop-ceiling-installer', 'POP Ceiling Installer', 'ceiling installation plaster', 1],
  ['static-painter', 'Painter', 'painter painting wall', 1],
  ['static-roofer', 'Roofer', 'roofer rooftop work', 1],
  ['static-roof-installer', 'Roof Installer', 'roof installation construction', 1],
  ['static-borehole-driller', 'Borehole Driller', 'borehole drilling rig', 1],
  ['static-borehole-technician', 'Borehole Technician', 'water well drilling', 1],
  ['static-water-treatment-technician', 'Water Treatment Technician', 'water treatment plant', 1],
  ['static-pump-installer', 'Pump Installer', 'water pump installation', 1],
  ['static-cctv-installer', 'CCTV Installer', 'cctv camera installation', 1],
  ['static-security-systems-technician', 'Security Systems Technician', 'security system technician', 1],
  ['static-access-control-installer', 'Access Control Installer', 'access control door lock', 1],
  ['static-solar-installer', 'Solar Installer', 'solar panel installation roof', 1],
  ['static-solar-technician', 'Solar Technician', 'solar energy technician', 1],
  ['static-solar-system-designer', 'Solar System Designer', 'solar power system design', 1],
  ['static-generator-technician', 'Generator Technician', 'generator repair technician', 1],
  ['static-generator-installer', 'Generator Installer', 'generator installation power', 1],
  ['static-generator-maintenance-technician', 'Generator Maintenance Technician', 'generator engine maintenance', 1],
  ['static-hvac-technician', 'HVAC Technician', 'hvac technician ductwork', 1],
  ['static-air-conditioner-technician', 'Air Conditioner Technician', 'air conditioner repair service', 1],
  ['static-refrigerator-technician', 'Refrigerator Technician', 'refrigerator appliance repair', 1],
  ['static-auto-mechanic', 'Auto Mechanic', 'auto mechanic car engine', 1],
  ['static-auto-electrician', 'Auto Electrician', 'car electrical wiring mechanic', 1],
  ['static-panel-beater', 'Panel Beater', 'car body repair dent', 1],
  ['static-auto-painter', 'Auto Painter', 'car spray painting workshop', 1],
  ['static-residential-cleaner', 'Residential Cleaner', 'house cleaning mop bucket', 1],
  ['static-commercial-cleaner', 'Commercial Cleaner', 'office building cleaning janitorial', 1],
  ['static-deep-cleaning-specialist', 'Deep Cleaning Specialist', 'deep cleaning scrubbing floor', 1],
  ['static-laundry-specialist', 'Laundry Specialist', 'laundry washing clothes machine', 1],
  ['static-dry-cleaner', 'Dry Cleaner', 'dry cleaning garment press', 1],
  ['static-pest-control-technician', 'Pest Control Technician', 'pest control spraying exterminator', 1],
  ['static-fumigation-specialist', 'Fumigation Specialist', 'fumigation tent spray', 1],
  ['static-barber', 'Barber', 'barber haircut shop chair', 1],
  ['static-hair-grooming-specialist', 'Hair Grooming Specialist', 'hair grooming styling salon', 1],
  ['static-hair-stylist', 'Hair Stylist', 'hair stylist salon braiding', 1],
  ['static-makeup-artist', 'Makeup Artist', 'makeup artist application brush', 1],
  ['static-nail-technician', 'Nail Technician', 'nail art manicure pedicure', 1],
  ['static-lash-technician', 'Lash Technician', 'eyelash extension beauty', 1],
  ['static-gele-artist', 'Gele Artist', 'african head wrap traditional', 1],
  ['static-massage-therapist', 'Massage Therapist', 'massage therapy spa table', 1],
  ['static-spa-therapist', 'Spa Therapist', 'spa treatment relaxation wellness', 1],
  ['static-skincare-specialist', 'Skincare Specialist', 'skincare facial treatment cream', 1],
  ['static-esthetician', 'Esthetician', 'esthetician facial beauty mask', 1],
  ['static-fashion-designer', 'Fashion Designer', 'fashion designer sketching clothes', 1],
  ['static-tailor', 'Tailor', 'tailor sewing machine fabric', 1],
  ['static-pattern-maker', 'Pattern Maker', 'sewing pattern cutting fabric', 1],
  ['static-garment-maker', 'Garment Maker', 'garment clothing manufacturing', 1],
  ['static-shoemaker', 'Shoemaker', 'shoemaker craft leather shoe', 1],
  ['static-cobbler', 'Cobbler', 'shoe repair cobbler bench', 1],
  ['static-leather-craftsman', 'Leather Craftsman', 'leather crafting handmade bag', 1],
  ['static-photographer', 'Photographer', 'photographer camera studio portrait', 1],
  ['static-event-photographer', 'Event Photographer', 'event photography wedding crowd', 1],
  ['static-product-photographer', 'Product Photographer', 'product photography studio lightbox', 1],
  ['static-videographer', 'Videographer', 'videographer camera filming event', 1],
  ['static-drone-operator', 'Drone Operator', 'drone aerial photography sky', 1],
  ['static-cinematographer', 'Cinematographer', 'cinematographer film set camera', 1],
  ['static-electronics-technician', 'Electronics Technician', 'electronics repair circuit board', 1],
  ['static-tv-repair-technician', 'TV Repair Technician', 'television repair screen', 1],
  ['static-phone-repair-technician', 'Phone Repair Technician', 'phone screen repair tools', 1],
  ['static-laptop-repair-technician', 'Laptop Repair Technician', 'laptop repair screwdriver tools', 1],
  ['static-appliance-repair-technician', 'Appliance Repair Technician', 'home appliance washing machine repair', 1],
  ['static-artist', 'Artist', 'artist painting canvas brush', 1],
  ['static-sculptor', 'Sculptor', 'sculptor clay sculpture hands', 1],
  ['static-portrait-artist', 'Portrait Artist', 'portrait painting drawing face', 1],
]

// ─── Digital services [id, displayName, searchQuery, page] ───────────────────

const digitalServices = [
  // Each developer role gets a completely different query + unique page
  ['static-frontend-developer', 'Frontend Developer', 'web developer laptop code screen', 1],
  ['static-backend-developer', 'Backend Developer', 'programmer server terminal dark', 1],
  ['static-full-stack-developer', 'Full Stack Developer', 'software engineer dual monitor office', 1],
  ['static-web-developer', 'Web Developer', 'html css website design desktop', 1],
  ['static-mobile-developer', 'Mobile Developer', 'smartphone mobile app screen', 1],
  ['static-android-developer', 'Android Developer', 'android phone app green', 1],
  ['static-ios-developer', 'iOS Developer', 'iphone apple smartphone app', 1],
  ['static-flutter-developer', 'Flutter Developer', 'cross platform app tablet phone', 1],
  ['static-react-native-developer', 'React Native Developer', 'javascript mobile coding workspace', 2],
  ['static-ai-engineer', 'AI Engineer', 'artificial intelligence robot brain', 1],
  ['static-machine-learning-engineer', 'Machine Learning Engineer', 'machine learning data chart', 1],
  ['static-deep-learning-engineer', 'Deep Learning Engineer', 'neural network visualization', 1],
  ['static-nlp-engineer', 'NLP Engineer', 'text processing language technology', 1],
  ['static-devops-engineer', 'DevOps Engineer', 'server data center rack', 1],
  ['static-sre', 'Site Reliability Engineer (SRE)', 'monitoring dashboard operations center', 1],
  ['static-platform-engineer', 'Platform Engineer', 'cloud infrastructure cables', 1],
  ['static-cloud-engineer', 'Cloud Engineer', 'cloud computing sky network', 1],
  ['static-cloud-architect', 'Cloud Architect', 'architecture blueprint technology', 1],
  ['static-cloud-administrator', 'Cloud Administrator', 'server room data admin', 2],
  ['static-blockchain-developer', 'Blockchain Developer', 'blockchain bitcoin cryptocurrency', 1],
  ['static-smart-contract-developer', 'Smart Contract Developer', 'ethereum crypto contract', 1],
  ['static-web3-developer', 'Web3 Developer', 'decentralized nft digital token', 1],
  ['static-ui-ux-designer', 'UI/UX Designer', 'ux wireframe prototype tablet pen', 1],
  ['static-product-designer', 'Product Designer', 'product design prototype model', 1],
  ['static-interaction-designer', 'Interaction Designer', 'user interface touch screen design', 1],
  ['static-graphic-designer', 'Graphic Designer', 'graphic designer creative studio desk', 1],
  ['static-brand-designer', 'Brand Designer', 'brand identity packaging logo', 1],
  ['static-logo-designer', 'Logo Designer', 'logo design pen vector paper', 1],
  ['static-print-designer', 'Print Designer', 'print brochure flyer layout', 1],
  ['static-motion-designer', 'Motion Designer', 'motion graphics screen animation', 1],
  ['static-motion-graphics-artist', 'Motion Graphics Artist', 'visual effects compositing', 1],
  ['static-illustrator', 'Illustrator', 'digital illustration drawing tablet', 1],
  ['static-2d-animator', '2D Animator', '2d cartoon animation frame', 1],
  ['static-3d-animator', '3D Animator', '3d render blender modeling', 1],
  ['static-character-designer', 'Character Designer', 'character art concept sketch', 1],
  ['static-wordpress-developer', 'WordPress Developer', 'wordpress cms blog website', 1],
  ['static-wordpress-designer', 'WordPress Designer', 'website layout theme design', 1],
  ['static-woocommerce-developer', 'WooCommerce Developer', 'ecommerce online shopping cart', 1],
  ['static-data-analyst', 'Data Analyst', 'data analytics bar chart dashboard', 1],
  ['static-bi-analyst', 'Business Intelligence Analyst', 'business report graph presentation', 1],
  ['static-bi-developer', 'BI Developer', 'power bi visualization pie chart', 1],
  ['static-data-scientist', 'Data Scientist', 'data science python jupyter notebook', 1],
  ['static-research-scientist', 'Research Scientist', 'laboratory science research microscope', 1],
  ['static-data-engineer', 'Data Engineer', 'data pipeline database warehouse', 1],
  ['static-etl-developer', 'ETL Developer', 'database sql query table', 1],
  ['static-big-data-engineer', 'Big Data Engineer', 'big data hadoop server cluster', 1],
  ['static-cybersecurity-analyst', 'Cybersecurity Analyst', 'cybersecurity hacker dark monitor', 1],
  ['static-penetration-tester', 'Penetration Tester', 'hacking security testing code', 1],
  ['static-security-engineer', 'Security Engineer', 'network firewall protection shield', 1],
  ['static-soc-analyst', 'SOC Analyst', 'security operations multiple monitors', 1],
  ['static-ethical-hacker', 'Ethical Hacker', 'ethical hacking terminal keyboard', 1],
  ['static-it-support-specialist', 'IT Support Specialist', 'it support computer technician repair', 1],
  ['static-help-desk-technician', 'Help Desk Technician', 'customer support headset call center', 1],
  ['static-system-administrator', 'System Administrator', 'system admin server installation', 1],
  ['static-network-administrator', 'Network Administrator', 'network cables router switch ethernet', 1],
  ['static-digital-marketer', 'Digital Marketer', 'digital marketing strategy whiteboard', 1],
  ['static-seo-specialist', 'SEO Specialist', 'seo keyword search google ranking', 1],
  ['static-sem-specialist', 'SEM Specialist', 'search engine google ads campaign', 1],
  ['static-ppc-specialist', 'PPC Specialist', 'pay per click advertising budget', 1],
  ['static-email-marketer', 'Email Marketer', 'email newsletter marketing inbox', 1],
  ['static-performance-marketer', 'Performance Marketer', 'marketing performance analytics metric', 1],
  ['static-social-media-manager', 'Social Media Manager', 'social media phone scrolling apps', 1],
  ['static-community-manager', 'Community Manager', 'online community group people', 1],
  ['static-social-media-strategist', 'Social Media Strategist', 'social media content planning calendar', 1],
  ['static-content-creator', 'Content Creator', 'content creator filming youtube vlog', 1],
  ['static-ai-content-creator', 'AI Content Creator', 'artificial intelligence writing tool', 1],
  ['static-ugc-creator', 'UGC Creator', 'user review video unboxing creator', 1],
  ['static-influencer', 'Influencer', 'influencer lifestyle selfie blog', 1],
  ['static-copywriter', 'Copywriter', 'copywriter writing marketing ad', 1],
  ['static-content-writer', 'Content Writer', 'writer typing laptop article blog', 1],
  ['static-technical-writer', 'Technical Writer', 'technical documentation manual guide', 1],
  ['static-ghostwriter', 'Ghostwriter', 'ghostwriter book author desk writing', 1],
  ['static-script-writer', 'Script Writer', 'screenplay script film writing', 1],
  ['static-grant-writer', 'Grant Writer', 'grant proposal funding document pen', 1],
  ['static-cv-writer', 'CV Writer', 'resume cv career job paper', 1],
  ['static-video-editor', 'Video Editor', 'video editing timeline adobe premiere', 1],
  ['static-audio-editor', 'Audio Editor', 'audio mixing studio sound wave', 1],
  ['static-podcast-editor', 'Podcast Editor', 'podcast microphone recording booth', 1],
  ['static-virtual-assistant', 'Virtual Assistant', 'remote work virtual assistant home office', 1],
  ['static-product-manager', 'Product Manager', 'product manager roadmap sticky notes', 1],
  ['static-product-owner', 'Product Owner', 'agile scrum kanban board sprint', 1],
  ['static-ai-automation-specialist', 'AI Automation Specialist', 'automation robot ai workflow', 1],
  ['static-prompt-engineer', 'Prompt Engineer', 'chatgpt ai prompt screen', 1],
  ['static-ai-workflow-engineer', 'AI Workflow Engineer', 'workflow automation process diagram', 1],
  ['static-no-code-automation-specialist', 'No-Code Automation Specialist', 'no code drag drop app builder', 1],
  ['static-automation-engineer', 'Automation Engineer', 'factory robot automation arm', 1],
]

// ─── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchImageUrl(query, page = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&page=${page}&orientation=square`
  const res = await fetch(url, { headers: { Authorization: API_KEY } })
  if (!res.ok) {
    console.warn(`  ⚠ Failed for "${query}": ${res.status}`)
    return null
  }
  const data = await res.json()
  return data.photos?.[0]?.src?.medium ?? null
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchAll(services) {
  const results = {}
  for (const [id, name, query, page] of services) {
    process.stdout.write(`  Fetching: ${name} ... `)
    const url = await fetchImageUrl(query, page)
    results[id] = url ?? ''
    console.log(url ? '✓' : '✗')
    await sleep(150)
  }
  return results
}

// ─── Code generation ───────────────────────────────────────────────────────────

function buildBlock(services, urls) {
  return services
    .map(([id, name]) => {
      const url = urls[id] ?? ''
      const escaped = name.replace(/'/g, "\\'")
      return `  { service_id: '${id}', name: '${escaped}', localImage: '${url}' },`
    })
    .join('\n')
}

function generateFile(vocUrls, digUrls) {
  return `/**
 * Static services list with Pexels image URLs.
 * AUTO-GENERATED by scripts/fetchPexelsImages.mjs — do not edit manually.
 */

import type { Service } from '@/types/services.types'

export const staticVocationalServices: Service[] = [
${buildBlock(vocationalServices, vocUrls)}
]

export const staticDigitalServices: Service[] = [
${buildBlock(digitalServices, digUrls)}
]
`
}

// ─── Main ──────────────────────────────────────────────────────────────────────

console.log('\nFetching vocational service images from Pexels...')
const vocUrls = await fetchAll(vocationalServices)

console.log('\nFetching digital service images from Pexels...')
const digUrls = await fetchAll(digitalServices)

console.log('\nWriting staticServices.ts...')
fs.writeFileSync(OUT_FILE, generateFile(vocUrls, digUrls), 'utf8')
console.log(`✓ Done! Written to ${OUT_FILE}`)
