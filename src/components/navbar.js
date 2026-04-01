import { navigate } from '../router.js';

export function renderNavbar(active) {
  const homeActive = active === 'home' ? ' is-active' : '';
  const aboutActive = active === 'about' ? ' is-active' : '';

  return `
    <nav class="tabbar" role="navigation" aria-label="Головна навігація">
      <button type="button" class="tabbar__btn${homeActive}" data-nav="#home" aria-current="${active === 'home' ? 'page' : 'false'}">
        <span class="tabbar__icon" aria-hidden="true">🎲</span>
        <span class="tabbar__label">Заходи</span>
      </button>
      <button type="button" class="tabbar__btn${aboutActive}" data-nav="#about" aria-current="${active === 'about' ? 'page' : 'false'}">
        <span class="tabbar__icon" aria-hidden="true">☕</span>
        <span class="tabbar__label">Про нас</span>
      </button>
    </nav>
  `;
}

export function bindNavbar(root) {
  root.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigate(btn.getAttribute('data-nav'));
    });
  });
}
