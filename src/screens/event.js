import { getEventById } from '../data/events.js';
import { renderProgressBar } from '../components/progressBar.js';
import { formatEventDateTime, remainingSeats } from '../utils/format.js';
import { navigate } from '../router.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderEvent(id) {
  const event = getEventById(id);
  if (!event) {
    return `
      <div class="layout">
        <main class="main-content main-content--padded screen-enter">
          <p>Подію не знайдено.</p>
          <button type="button" class="btn btn--primary" data-back-home>На головну</button>
        </main>
      </div>
    `;
  }

  const left = remainingSeats(event);
  const canBook = left > 0;
  const tagsHtml = (event.tags || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join('');

  return `
    <div class="layout">
      <header class="subheader">
        <button type="button" class="subheader__back" data-back aria-label="Назад до списку">← Назад</button>
      </header>
      <main class="main-content main-content--padded screen-enter">
        <div class="event-detail">
          <div class="event-detail__cover" aria-hidden="true">${event.coverEmoji}</div>
          <time class="event-detail__time" datetime="${event.startsAt}">${formatEventDateTime(event.startsAt)}</time>
          <h1 class="event-detail__title">${escapeHtml(event.title)}</h1>
          <div class="event-detail__tags">${tagsHtml}</div>
          <p class="event-detail__host">Ведучий: <strong>${escapeHtml(event.host)}</strong></p>
          <div class="event-detail__desc">${escapeHtml(event.description).replace(/\n/g, '<br/>')}</div>
          <p class="event-detail__price-label">Ціна за місце</p>
          <p class="event-detail__price">${event.pricePerSeat} грн</p>
          ${renderProgressBar(event)}
          <div class="event-detail__cta">
            ${
              canBook
                ? `<button type="button" class="btn btn--primary btn--block" data-book="${event.id}">Записатися</button>`
                : `<button type="button" class="btn btn--disabled btn--block" disabled>Місць немає</button>`
            }
          </div>
        </div>
      </main>
    </div>
  `;
}

export function mountEvent(root, id) {
  const back = () => navigate('#home');
  root.querySelector('[data-back]')?.addEventListener('click', back);
  root.querySelector('[data-back-home]')?.addEventListener('click', back);

  root.querySelector('[data-book]')?.addEventListener('click', (e) => {
    const bid = e.currentTarget.getAttribute('data-book');
    if (bid) navigate(`#booking/${encodeURIComponent(bid)}`);
  });
}
