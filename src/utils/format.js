const ukMonths = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
];

const ukWeekdays = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export function formatEventDateTime(iso) {
  const d = new Date(iso);
  const wd = ukWeekdays[d.getDay()];
  const day = d.getDate();
  const month = ukMonths[d.getMonth()];
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${wd}, ${day} ${month}, ${h}:${m}`;
}

export function remainingSeats(event) {
  return Math.max(0, event.maxSeats - event.bookedSeats);
}

export function formatMoneyUAH(n) {
  return `${n} грн`;
}

/** Google Calendar URL (all-day style uses date; here timed event) */
export function buildGoogleCalendarUrl({ title, startsAt, durationMinutes = 120, location, details }) {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const fmt = (dt) =>
    dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: details || '',
    location: location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
