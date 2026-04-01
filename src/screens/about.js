import { cafe } from '../data/cafe.js';
import { renderNavbar, bindNavbar } from '../components/navbar.js';

const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(cafe.mapsQuery)}`;

export function renderAbout() {
  const hoursRows = cafe.hours
    .map((h) => `<tr><td>${h.day}</td><td>${h.time}</td></tr>`)
    .join('');

  const priceCards = cafe.pricing
    .map(
      (p) => `
      <div class="price-card">
        <h3 class="price-card__title">${p.title}</h3>
        <p class="price-card__price">${p.price}</p>
        <p class="price-card__note">${p.note}</p>
      </div>
    `
    )
    .join('');

  return `
    <div class="layout layout--with-tabbar">
      <header class="app-header">
        <h1 class="app-header__title">Про кафе</h1>
        <p class="app-header__subtitle">${cafe.name} — ${cafe.tagline}</p>
      </header>
      <main class="main-content about-page screen-enter">
        <section class="about-section">
          <div class="about-hero-placeholder" role="img" aria-label="Інтер'єр кафе">🪑🎲☕</div>
          <p class="about-lead">${cafe.description}</p>
        </section>

        <section class="about-section">
          <h2 class="section-title">Прайс</h2>
          <div class="price-grid">${priceCards}</div>
        </section>

        <section class="about-section">
          <h2 class="section-title">Режим роботи</h2>
          <table class="hours-table">
            <tbody>${hoursRows}</tbody>
          </table>
        </section>

        <section class="about-section about-contacts">
          <h2 class="section-title">Як нас знайти</h2>
          <p class="contact-line">
            <span class="contact-line__icon" aria-hidden="true">📍</span>
            <span>${cafe.address}</span>
          </p>
          <a class="btn btn--secondary btn--block contact-maps" href="${mapsUrl}" target="_blank" rel="noopener noreferrer">Відкрити карту</a>
          <p class="contact-line">
            <span class="contact-line__icon" aria-hidden="true">📞</span>
            <a href="tel:${cafe.phone.replace(/\s/g, '')}" class="contact-tel">${cafe.phone}</a>
          </p>
        </section>
      </main>
      ${renderNavbar('about')}
    </div>
  `;
}

export function mountAbout(root) {
  bindNavbar(root);
}
