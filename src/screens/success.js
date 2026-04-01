import { navigate } from '../router.js';
import { formatEventDateTime, buildGoogleCalendarUrl } from '../utils/format.js';
import { cafe } from '../data/cafe.js';

const STORAGE_KEY = 'kubilnya_booking_confirm';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderSuccess() {
  let data = null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) data = JSON.parse(raw);
  } catch {
    data = null;
  }

  if (!data) {
    return `
      <div class="layout">
        <main class="main-content main-content--padded screen-enter">
          <p>Немає даних бронювання.</p>
          <button type="button" class="btn btn--primary" data-home>На головну</button>
        </main>
      </div>
    `;
  }

  const calUrl = buildGoogleCalendarUrl({
    title: data.title,
    startsAt: data.startsAt,
    durationMinutes: 120,
    location: data.location || cafe.address,
    details: `Бронювання через Кубільню. Місць: ${data.seats}.`,
  });

  return `
    <div class="layout">
      <main class="main-content main-content--padded screen-enter">
        <div class="success-block">
          <div class="success-check" aria-hidden="true">
            <svg class="success-check__svg" viewBox="0 0 52 52" width="72" height="72">
              <circle class="success-check__circle" cx="26" cy="26" r="24" fill="none" />
              <path class="success-check__tick" fill="none" d="M14 27l8 8 16-16" />
            </svg>
          </div>
          <h1 class="success-block__title">Запис підтверджено</h1>
          <ul class="success-list">
            <li><strong>${escapeHtml(data.title)}</strong></li>
            <li>${formatEventDateTime(data.startsAt)}</li>
            <li>Місць: ${data.seats}</li>
            <li>Сума: ${data.total} грн</li>
          </ul>
          <a class="btn btn--secondary btn--block" href="${escapeHtml(calUrl)}" target="_blank" rel="noopener noreferrer">Додати в Google Календар</a>
          <button type="button" class="btn btn--primary btn--block" data-home>На головну</button>
        </div>
      </main>
    </div>
  `;
}

export function mountSuccess(root) {
  root.querySelector('[data-home]')?.addEventListener('click', () => {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate('#home');
  });
}
