/**
 * Fetches one Pexels image per service category and writes them into
 * src/data/staticServices.ts
 *
 * Run with:  node scripts/fetchCategoryImages.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const API_KEY = 'wQlvVd9N1KLlU30yWBVsDHP4uBdsZc6EyvFq2hQJjMrfrf3616VPij3k'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_FILE = path.resolve(__dirname, '../src/data/staticServices.ts')

// ─── [id, searchQuery] ────────────────────────────────────────────────────────

const vocational = [
  ['electrical-services', 'electrician wiring work'],
  ['plumbing-services', 'plumber pipe repair'],
  ['carpentry-services', 'carpenter woodwork'],
  ['welding-services', 'welder welding sparks'],
  ['tiling-services', 'tiler floor tiles'],
  ['pop-ceiling-installation', 'ceiling plaster installation'],
  ['painting-services', 'painter wall painting'],
  ['roofing-services', 'roofer roof construction'],
  ['borehole-services', 'borehole water drilling'],
  ['cctv-installation-services', 'cctv security camera'],
  ['solar-installation-services', 'solar panel installation'],
  ['generator-repair-maintenance', 'generator repair power'],
  ['hvac-refrigeration-services', 'air conditioner hvac technician'],
  ['auto-repair-maintenance', 'auto mechanic car repair'],
  ['cleaning-services', 'house cleaning mop'],
  ['laundry-dry-cleaning-services', 'laundry dry cleaning garment'],
  ['fumigation-pest-control-services', 'pest control fumigation spray'],
  ['barbering-services', 'barber haircut shop'],
  ['beauty-services', 'makeup artist beauty salon'],
  ['spa-massage-services', 'massage therapy spa'],
  ['fashion-design-tailoring', 'fashion designer sewing tailor'],
  ['shoe-making-repair', 'shoemaker cobbler leather'],
  ['photography-videography', 'photographer camera studio'],
  ['electronics-appliance-repair', 'electronics phone repair technician'],
  ['art-creative-services', 'artist painting canvas'],
]

const digital = [
  ['software-development', 'software developer coding laptop'],
  ['mobile-app-development', 'mobile app smartphone developer'],
  ['ai-machine-learning-services', 'artificial intelligence robot technology'],
  ['devops-engineering', 'devops server data center'],
  ['cloud-engineering', 'cloud computing network'],
  ['blockchain-development', 'blockchain cryptocurrency technology'],
  ['ui-ux-design', 'ux designer wireframe tablet'],
  ['graphic-design', 'graphic designer creative studio'],
  ['motion-graphics-design', 'motion graphics animation screen'],
  ['illustration-animation', 'digital illustration drawing art'],
  ['wordpress-development', 'wordpress website design'],
  ['data-analytics-business-intelligence', 'data analytics dashboard chart'],
  ['data-science', 'data science python analysis'],
  ['data-engineering', 'data pipeline database engineering'],
  ['cybersecurity-services', 'cybersecurity hacker dark screen'],
  ['it-support-services', 'it support technician computer'],
  ['digital-marketing', 'digital marketing strategy'],
  ['social-media-management', 'social media phone content'],
  ['content-creation', 'content creator filming video'],
  ['writing-services', 'writer typing laptop'],
  ['video-audio-editing', 'video editing studio screen'],
  ['virtual-assistance', 'virtual assistant remote work'],
  ['product-management', 'product manager roadmap planning'],
  ['ai-automation-services', 'ai automation robot workflow'],
]

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchImage(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`
  const res = await fetch(url, { headers: { Authorization: API_KEY } })
  if (!res.ok) { console.warn(`  ⚠ ${res.status} for "${query}"`); return '' }
  const data = await res.json()
  return data.photos?.[0]?.src?.medium ?? ''
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function fetchAll(list) {
  const map = {}
  for (const [id, query] of list) {
    process.stdout.write(`  ${id} ... `)
    map[id] = await fetchImage(query)
    console.log(map[id] ? '✓' : '✗')
    await sleep(150)
  }
  return map
}

// ─── Generate file ────────────────────────────────────────────────────────────

function q(s) { return s.replace(/'/g, "\\'") }

function buildCategories(list, images, rolesMap) {
  return list.map(([id]) => {
    const { name, roles } = rolesMap[id]
    const img = images[id] ?? ''
    const rolesStr = roles.map(r => `    '${q(r)}'`).join(',\n')
    return `  {\n    id: '${id}',\n    name: '${q(name)}',\n    image: '${img}',\n    roles: [\n${rolesStr},\n    ],\n  },`
  }).join('\n')
}

// ─── Static role data (names only — images come from Pexels) ─────────────────

const vocationalRoles = {
  'electrical-services':           { name: 'Electrical Services',              roles: ['Electrician','Residential Electrician','Commercial Electrician','Industrial Electrician','Maintenance Electrician'] },
  'plumbing-services':             { name: 'Plumbing Services',                roles: ['Plumber'] },
  'carpentry-services':            { name: 'Carpentry Services',               roles: ['Carpenter','Furniture Carpenter'] },
  'welding-services':              { name: 'Welding Services',                 roles: ['Welder','Fabricator','Aluminum Welder'] },
  'tiling-services':               { name: 'Tiling Services',                  roles: ['Tiler'] },
  'pop-ceiling-installation':      { name: 'POP Ceiling Installation',         roles: ['POP Ceiling Installer'] },
  'painting-services':             { name: 'Painting Services',                roles: ['Painter'] },
  'roofing-services':              { name: 'Roofing Services',                 roles: ['Roofer','Roof Installer'] },
  'borehole-services':             { name: 'Borehole Services',                roles: ['Borehole Driller','Borehole Technician','Water Treatment Technician','Pump Installer'] },
  'cctv-installation-services':    { name: 'CCTV Installation Services',       roles: ['CCTV Installer','Security Systems Technician','Access Control Installer'] },
  'solar-installation-services':   { name: 'Solar Installation Services',      roles: ['Solar Installer','Solar Technician','Solar System Designer'] },
  'generator-repair-maintenance':  { name: 'Generator Repair & Maintenance',   roles: ['Generator Technician','Generator Installer','Generator Maintenance Technician'] },
  'hvac-refrigeration-services':   { name: 'HVAC & Refrigeration Services',    roles: ['HVAC Technician','Air Conditioner Technician','Refrigerator Technician'] },
  'auto-repair-maintenance':       { name: 'Auto Repair & Maintenance',        roles: ['Auto Mechanic','Auto Electrician','Panel Beater','Auto Painter'] },
  'cleaning-services':             { name: 'Cleaning Services',                roles: ['Residential Cleaner','Commercial Cleaner','Deep Cleaning Specialist'] },
  'laundry-dry-cleaning-services': { name: 'Laundry & Dry Cleaning Services',  roles: ['Laundry Specialist','Dry Cleaner'] },
  'fumigation-pest-control-services': { name: 'Fumigation & Pest Control Services', roles: ['Pest Control Technician','Fumigation Specialist'] },
  'barbering-services':            { name: 'Barbering Services',               roles: ['Barber','Hair Grooming Specialist'] },
  'beauty-services':               { name: 'Beauty Services',                  roles: ['Hair Stylist','Makeup Artist','Nail Technician','Lash Technician','Gele Artist'] },
  'spa-massage-services':          { name: 'Spa & Massage Services',           roles: ['Massage Therapist','Spa Therapist','Skincare Specialist','Esthetician'] },
  'fashion-design-tailoring':      { name: 'Fashion Design & Tailoring',       roles: ['Fashion Designer','Tailor','Pattern Maker','Garment Maker'] },
  'shoe-making-repair':            { name: 'Shoe Making & Repair',             roles: ['Shoemaker','Cobbler','Leather Craftsman'] },
  'photography-videography':       { name: 'Photography & Videography',        roles: ['Photographer','Event Photographer','Product Photographer','Videographer','Drone Operator','Cinematographer'] },
  'electronics-appliance-repair':  { name: 'Electronics & Appliance Repair',   roles: ['Electronics Technician','TV Repair Technician','Phone Repair Technician','Laptop Repair Technician','Appliance Repair Technician'] },
  'art-creative-services':         { name: 'Art & Creative Services',          roles: ['Artist','Sculptor','Portrait Artist'] },
}

const digitalRoles = {
  'software-development':                    { name: 'Software Development',                        roles: ['Frontend Developer','Backend Developer','Full Stack Developer','Web Developer'] },
  'mobile-app-development':                  { name: 'Mobile App Development',                      roles: ['Mobile Developer','Android Developer','iOS Developer','Flutter Developer','React Native Developer'] },
  'ai-machine-learning-services':            { name: 'AI & Machine Learning Services',              roles: ['AI Engineer','Machine Learning Engineer','Deep Learning Engineer','NLP Engineer'] },
  'devops-engineering':                      { name: 'DevOps Engineering',                          roles: ['DevOps Engineer','Site Reliability Engineer (SRE)','Platform Engineer'] },
  'cloud-engineering':                       { name: 'Cloud Engineering',                           roles: ['Cloud Engineer','Cloud Architect','Cloud Administrator'] },
  'blockchain-development':                  { name: 'Blockchain Development',                      roles: ['Blockchain Developer','Smart Contract Developer','Web3 Developer'] },
  'ui-ux-design':                            { name: 'UI/UX Design',                                roles: ['UI/UX Designer','Product Designer','Interaction Designer'] },
  'graphic-design':                          { name: 'Graphic Design',                              roles: ['Graphic Designer','Brand Designer','Logo Designer','Print Designer'] },
  'motion-graphics-design':                  { name: 'Motion Graphics Design',                      roles: ['Motion Designer','Motion Graphics Artist'] },
  'illustration-animation':                  { name: 'Illustration & Animation',                    roles: ['Illustrator','2D Animator','3D Animator','Character Designer'] },
  'wordpress-development':                   { name: 'WordPress Development',                       roles: ['WordPress Developer','WordPress Designer','WooCommerce Developer'] },
  'data-analytics-business-intelligence':    { name: 'Data Analytics & Business Intelligence',      roles: ['Data Analyst','Business Intelligence Analyst','BI Developer'] },
  'data-science':                            { name: 'Data Science',                                roles: ['Data Scientist','Research Scientist'] },
  'data-engineering':                        { name: 'Data Engineering',                            roles: ['Data Engineer','ETL Developer','Big Data Engineer'] },
  'cybersecurity-services':                  { name: 'Cybersecurity Services',                      roles: ['Cybersecurity Analyst','Penetration Tester','Security Engineer','SOC Analyst','Ethical Hacker'] },
  'it-support-services':                     { name: 'IT Support Services',                         roles: ['IT Support Specialist','Help Desk Technician','System Administrator','Network Administrator'] },
  'digital-marketing':                       { name: 'Digital Marketing',                           roles: ['Digital Marketer','SEO Specialist','SEM Specialist','PPC Specialist','Email Marketer','Performance Marketer'] },
  'social-media-management':                 { name: 'Social Media Management',                     roles: ['Social Media Manager','Community Manager','Social Media Strategist'] },
  'content-creation':                        { name: 'Content Creation',                            roles: ['Content Creator','AI Content Creator','UGC Creator','Influencer'] },
  'writing-services':                        { name: 'Writing Services',                            roles: ['Copywriter','Content Writer','Technical Writer','Ghostwriter','Script Writer','Grant Writer','CV Writer'] },
  'video-audio-editing':                     { name: 'Video & Audio Editing',                       roles: ['Video Editor','Audio Editor','Podcast Editor'] },
  'virtual-assistance':                      { name: 'Virtual Assistance',                          roles: ['Virtual Assistant'] },
  'product-management':                      { name: 'Product Management',                          roles: ['Product Manager','Product Owner'] },
  'ai-automation-services':                  { name: 'AI Automation Services',                      roles: ['AI Automation Specialist','Prompt Engineer','AI Workflow Engineer','No-Code Automation Specialist','Automation Engineer'] },
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\nFetching vocational category images...')
const vocImages = await fetchAll(vocational)

console.log('\nFetching digital category images...')
const digImages = await fetchAll(digital)

const content = `/**
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
${buildCategories(vocational, vocImages, vocationalRoles)}
]

export const digitalCategories: ServiceCategory[] = [
${buildCategories(digital, digImages, digitalRoles)}
]

export const allCategories: ServiceCategory[] = [
  ...vocationalCategories,
  ...digitalCategories,
]

export const categoryBySlug = Object.fromEntries(
  allCategories.map((cat) => [cat.id, cat]),
)
`

fs.writeFileSync(OUT_FILE, content, 'utf8')
console.log(`\n✓ Done! Written to ${OUT_FILE}`)
