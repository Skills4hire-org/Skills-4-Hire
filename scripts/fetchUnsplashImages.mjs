/**
 * One-time script: fetches the best Unsplash image URL for every service
 * and writes the result into src/data/staticServices.ts
 *
 * Run with:  node scripts/fetchUnsplashImages.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ACCESS_KEY = 'IDzeFUdycwh_82dhKI5DFaQ2lHeQKGHWUknPvsVXmjg'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_FILE = path.resolve(__dirname, '../src/data/staticServices.ts')

// ─── All services ─────────────────────────────────────────────────────────────

const vocationalServices = [
  // Electrical
  'Electrician', 'Residential Electrician', 'Commercial Electrician',
  'Industrial Electrician', 'Maintenance Electrician',
  // Plumbing
  'Plumber',
  // Carpentry
  'Carpenter', 'Furniture Carpenter',
  // Welding
  'Welder', 'Fabricator', 'Aluminum Welder',
  // Tiling
  'Tiler',
  // POP Ceiling
  'POP Ceiling Installer',
  // Painting
  'Painter',
  // Roofing
  'Roofer', 'Roof Installer',
  // Borehole
  'Borehole Driller', 'Borehole Technician', 'Water Treatment Technician', 'Pump Installer',
  // CCTV
  'CCTV Installer', 'Security Systems Technician', 'Access Control Installer',
  // Solar
  'Solar Installer', 'Solar Technician', 'Solar System Designer',
  // Generator
  'Generator Technician', 'Generator Installer', 'Generator Maintenance Technician',
  // HVAC
  'HVAC Technician', 'Air Conditioner Technician', 'Refrigerator Technician',
  // Auto
  'Auto Mechanic', 'Auto Electrician', 'Panel Beater', 'Auto Painter',
  // Cleaning
  'Residential Cleaner', 'Commercial Cleaner', 'Deep Cleaning Specialist',
  // Laundry
  'Laundry Specialist', 'Dry Cleaner',
  // Fumigation
  'Pest Control Technician', 'Fumigation Specialist',
  // Barbering
  'Barber', 'Hair Grooming Specialist',
  // Beauty
  'Hair Stylist', 'Makeup Artist', 'Nail Technician', 'Lash Technician', 'Gele Artist',
  // Spa
  'Massage Therapist', 'Spa Therapist', 'Skincare Specialist', 'Esthetician',
  // Fashion
  'Fashion Designer', 'Tailor', 'Pattern Maker', 'Garment Maker',
  // Shoe Making
  'Shoemaker', 'Cobbler', 'Leather Craftsman',
  // Photography
  'Photographer', 'Event Photographer', 'Product Photographer',
  'Videographer', 'Drone Operator', 'Cinematographer',
  // Electronics
  'Electronics Technician', 'TV Repair Technician', 'Phone Repair Technician',
  'Laptop Repair Technician', 'Appliance Repair Technician',
  // Art
  'Artist', 'Sculptor', 'Portrait Artist',
]

const digitalServices = [
  // Software Dev
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Web Developer',
  // Mobile
  'Mobile Developer', 'Android Developer', 'iOS Developer', 'Flutter Developer', 'React Native Developer',
  // AI & ML
  'AI Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer', 'NLP Engineer',
  // DevOps
  'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer',
  // Cloud
  'Cloud Engineer', 'Cloud Architect', 'Cloud Administrator',
  // Blockchain
  'Blockchain Developer', 'Smart Contract Developer', 'Web3 Developer',
  // UI/UX
  'UI UX Designer', 'Product Designer', 'Interaction Designer',
  // Graphic Design
  'Graphic Designer', 'Brand Designer', 'Logo Designer', 'Print Designer',
  // Motion Graphics
  'Motion Designer', 'Motion Graphics Artist',
  // Illustration
  'Illustrator', '2D Animator', '3D Animator', 'Character Designer',
  // WordPress
  'WordPress Developer', 'WordPress Designer', 'WooCommerce Developer',
  // Data Analytics
  'Data Analyst', 'Business Intelligence Analyst', 'BI Developer',
  // Data Science
  'Data Scientist', 'Research Scientist',
  // Data Engineering
  'Data Engineer', 'ETL Developer', 'Big Data Engineer',
  // Cybersecurity
  'Cybersecurity Analyst', 'Penetration Tester', 'Security Engineer', 'SOC Analyst', 'Ethical Hacker',
  // IT Support
  'IT Support Specialist', 'Help Desk Technician', 'System Administrator', 'Network Administrator',
  // Digital Marketing
  'Digital Marketer', 'SEO Specialist', 'SEM Specialist', 'PPC Specialist', 'Email Marketer', 'Performance Marketer',
  // Social Media
  'Social Media Manager', 'Community Manager', 'Social Media Strategist',
  // Content Creation
  'Content Creator', 'AI Content Creator', 'UGC Creator', 'Influencer',
  // Writing
  'Copywriter', 'Content Writer', 'Technical Writer', 'Ghostwriter', 'Script Writer', 'Grant Writer', 'CV Writer',
  // Video & Audio
  'Video Editor', 'Audio Editor', 'Podcast Editor',
  // Virtual Assistance
  'Virtual Assistant',
  // Product Management
  'Product Manager', 'Product Owner',
  // AI Automation
  'AI Automation Specialist', 'Prompt Engineer', 'AI Workflow Engineer',
  'No-Code Automation Specialist', 'Automation Engineer',
]

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchImageUrl(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=squarish`
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  })
  if (!res.ok) {
    console.warn(`  ⚠ Failed for "${query}": ${res.status}`)
    return null
  }
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}

// Rate-limit: 50 req/hr on demo apps — add a small delay between requests
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchAll(names) {
  const results = {}
  for (const name of names) {
    process.stdout.write(`  Fetching: ${name} ... `)
    const url = await fetchImageUrl(name)
    results[name] = url ?? ''
    console.log(url ? '✓' : '✗ (no result)')
    await sleep(300) // ~3 req/s — well within limits
  }
  return results
}

// ─── Code generation ──────────────────────────────────────────────────────────

function makeId(name) {
  return 'static-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
}

function buildServiceBlock(names, urls) {
  return names
    .map((name) => {
      const id = makeId(name)
      const url = urls[name] || ''
      return `  { service_id: '${id}', name: '${name}', localImage: '${url}' },`
    })
    .join('\n')
}

function generateFile(vocationalUrls, digitalUrls) {
  return `/**
 * Static services list with Unsplash image URLs.
 * AUTO-GENERATED by scripts/fetchUnsplashImages.mjs — do not edit manually.
 */

import type { Service } from '@/types/services.types'

export const staticVocationalServices: Service[] = [
${buildServiceBlock(vocationalServices, vocationalUrls)}
]

export const staticDigitalServices: Service[] = [
${buildServiceBlock(digitalServices, digitalUrls)}
]
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\\nFetching vocational service images...')
const vocationalUrls = await fetchAll(vocationalServices)

console.log('\\nFetching digital service images...')
const digitalUrls = await fetchAll(digitalServices)

console.log('\\nWriting staticServices.ts...')
fs.writeFileSync(OUT_FILE, generateFile(vocationalUrls, digitalUrls), 'utf8')
console.log(`Done! Written to ${OUT_FILE}`)
