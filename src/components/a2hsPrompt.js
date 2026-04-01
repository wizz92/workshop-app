const STORAGE_KEY = 'a2hs_dismissed';
const DELAY_MS = 10_000;

let deferredPrompt = null;

export function initA2HS(container) {
  if (!container) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    scheduleBanner(container);
  });

  window.addEventListener('appinstalled', () => {
    container.innerHTML = '';
    deferredPrompt = null;
  });
}

function scheduleBanner(container) {
  if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
  if (window.matchMedia('(display-mode: standalone)').matches) return;

  setTimeout(() => {
    if (!deferredPrompt) return;
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    container.innerHTML = `
      <div class="a2hs-banner" role="region" aria-label="Встановити застосунок">
        <div class="a2hs-banner__text">
          <strong>Кубільня</strong> — додайте на головний екран для швидкого доступу до розкладу.
        </div>
        <div class="a2hs-banner__actions">
          <button type="button" class="btn btn--primary btn--sm" id="a2hs-install">Встановити</button>
          <button type="button" class="btn btn--ghost btn--sm" id="a2hs-later">Пізніше</button>
        </div>
      </div>
    `;

    container.querySelector('#a2hs-install')?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      container.innerHTML = '';
    });

    container.querySelector('#a2hs-later')?.addEventListener('click', () => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      container.innerHTML = '';
    });
  }, DELAY_MS);
}
