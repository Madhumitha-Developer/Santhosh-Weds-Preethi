// All editable invitation content lives here.

export const COUPLE = {
  groom: {
    name: 'Santhosh P',
    role: 'The Groom',
    bio: 'Filled with joy and faith, ready to embark on a beautiful lifelong journey of love, trust, and happiness.',
    photo: '/santhosh.jpg',
  },
  bride: {
    name: 'Preethi R',
    role: 'The Bride',
    bio: 'Stepping into this divine union with hope, grace, and prayers for a blissful future together.',
    photo: '/preethi.jpg',
  },
}

// Times are in IST (+05:30)
export const EVENTS = [
  {
    id: 'marriage',
    title: 'Holy Marriage',
    subtitle: 'Sacred Ceremony',
    badge: 'Morning',
    icon: 'ring',
    accent: 'border-l-gold',
    dateLabel: '07 / 12 / 2026 — Monday',
    timeLabel: '10:30 AM Onwards',
    startIso: '2026-12-07T10:30:00+05:30',
    venue: 'Muthumani Mahal',
    address:
      'RP2V+Q87, Thanjavur Rd, Cholan Nagar, North Kattur, Tiruchirappalli, Tamil Nadu 620019',
    calendarLocation: 'Muthumani Mahal, Tiruchirappalli',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Muthumani+Mahal+Thanjavur+Rd+Cholan+Nagar+North+Kattur+Tiruchirappalli+Tamil+Nadu+620019',
  },
  {
    id: 'reception',
    title: 'Grand Reception',
    subtitle: 'Evening Celebration',
    badge: 'Evening',
    icon: 'cheers',
    accent: 'border-l-sunset-500',
    dateLabel: '11 / 12 / 2026 — Friday',
    timeLabel: '6:00 PM Onwards',
    startIso: '2026-12-11T18:00:00+05:30',
    venue: 'Vani Palace',
    address:
      'Echankadu Junction HP Bunk, Thiruvin Nagar, Boopathy Nagar, Keelkattalai, Tambaram, Tamil Nadu 600117',
    calendarLocation: 'Vani Palace, Keelkattalai',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Vani+Palace+Echankadu+Junction+Keelkattalai+Tambaram+Tamil+Nadu+600117',
  },
]

// Countdown target = first event
export const WEDDING_DATE = EVENTS[0].startIso

export const GALLERY = [
  { id: 1, alt: 'Santhosh & Preethi — Engagement', thumb: '/gallery/photo3.jpg', full: '/gallery/photo3.jpg' },
  { id: 2, alt: 'Santhosh & Preethi — Together', thumb: '/gallery/photo1.jpg', full: '/gallery/photo1.jpg' },
  { id: 3, alt: 'Santhosh & Preethi — Candid', thumb: '/gallery/photo2.jpg', full: '/gallery/photo2.jpg' },
]

// Background song (YouTube video id from https://youtu.be/u-Mu8JVuFd0)
export const SONG_YOUTUBE_ID = 'u-Mu8JVuFd0'

// Shown only when Supabase isn't configured (local preview)
export const DEMO_WISHES = [
  {
    id: 'demo-1',
    name: 'Ramesh & Family',
    message: 'Wishing you both a lifetime of togetherness, endless happiness, and divine blessings!',
  },
  {
    id: 'demo-2',
    name: 'Dr. Kavitha S.',
    message: 'Heartiest congratulations Santhosh & Preethi! May your love grow stronger every passing day.',
  },
]
