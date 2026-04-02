import { events } from '../data/events.js';
import { renderEventCard, bindEventCards } from '../components/eventCard.js';
import { renderNavbar, bindNavbar } from '../components/navbar.js';
import { navigate } from '../router.js';

function upcomingSorted() {
  const now = Date.now();
  return events
    .filter((e) => new Date(e.startsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}

export function renderHome() {
  const list = upcomingSorted();
  const hero = list[0];
  const rest = list.slice(1);

  const heroHtml = hero
    ? `
      <section class="hero-section screen-enter" aria-labelledby="hero-title">
        <p class="hero-section__eyebrow">Найближча подія 111</p>
        ${renderEventCard(hero, { variant: 'hero' })}
      </section>
    `
    : `
      <section class="empty-state screen-enter">
        <p>Наразі немає майбутніх подій — загляньте пізніше.</p>
      </section>
    `;

  const listHtml =
    rest.length > 0
      ? `
      <section class="feed-section screen-enter screen-enter--delay" aria-labelledby="feed-title">
        <h2 id="feed-title" class="section-title">Усі заходи</h2>
        <div class="feed-list">
          ${rest.map((e) => renderEventCard(e)).join('')}
        </div>
      </section>
    `
      : '';

  return `
    <div class="layout layout--with-tabbar">
      <header class="app-header">
        <h1 class="app-header__title">Кубільня</h1>
        <p class="app-header__subtitle">Розклад подій та бронювання</p>
      </header>
      <main class="main-content" id="main-content">
        ${heroHtml}
        ${listHtml}
      </main>
      <div id="a2hs-root"></div>
      ${renderNavbar('home')}
    </div>
  `;
}

export function mountHome(root) {
  bindNavbar(root);
  bindEventCards(root, (id) => navigate(`#event/${encodeURIComponent(id)}`));

  const a2hsRoot = root.querySelector('#a2hs-root');
  if (a2hsRoot) {
    import('../components/a2hsPrompt.js').then(({ initA2HS }) => initA2HS(a2hsRoot));
  }
}
