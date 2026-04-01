import { formatEventDateTime, remainingSeats } from '../utils/format.js';

/**
 * @param {object} event
 * @param {{ variant?: 'default'|'hero' }} opts
 */
export function renderEventCard(event, opts = {}) {
  const variant = opts.variant === 'hero' ? ' event-card--hero' : '';
  const left = remainingSeats(event);
  const dateStr = formatEventDateTime(event.startsAt);

  return `
    <article class="event-card${variant}" data-event-id="${event.id}" role="button" tabindex="0" aria-label="Відкрити: ${escapeHtml(event.title)}">
      <div class="event-card__cover" aria-hidden="true">${event.coverEmoji}</div>
      <div class="event-card__body">
        <time class="event-card__time" datetime="${event.startsAt}">${dateStr}</time>
        <h2 class="event-card__title">${escapeHtml(event.title)}</h2>
        <div class="event-card__meta">
          <span class="event-card__price">${event.pricePerSeat} грн</span>
          <span class="event-card__seats">${left} місць</span>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function bindEventCards(root, onSelect) {
  root.querySelectorAll('[data-event-id]').forEach((el) => {
    const id = el.getAttribute('data-event-id');
    const go = () => onSelect(id);
    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
}
