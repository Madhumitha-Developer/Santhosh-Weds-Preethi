const fmt = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')

export function openGoogleCalendar(event) {
  const start = new Date(event.startIso)
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} - Santhosh & Preethi`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: 'We cordially invite you to celebrate our special wedding occasion!',
    location: event.calendarLocation,
  })
  window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank', 'noopener')
}
