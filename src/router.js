/**
 * Hash Router: #home, #about, #event/:id, #booking/:id, #success
 */
export function parseHash() {
  const raw = window.location.hash || '#home';
  const h = raw === '#' || raw === '' ? '#home' : raw;

  if (h === '#home') return { screen: 'home' };
  if (h === '#about') return { screen: 'about' };
  if (h === '#success') return { screen: 'success' };

  const mEvent = h.match(/^#event\/([^/]+)$/);
  if (mEvent) return { screen: 'event', id: decodeURIComponent(mEvent[1]) };

  const mBook = h.match(/^#booking\/([^/]+)$/);
  if (mBook) return { screen: 'booking', id: decodeURIComponent(mBook[1]) };

  return { screen: 'home' };
}

export function navigate(hash) {
  window.location.hash = hash.startsWith('#') ? hash : `#${hash}`;
}

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => fn(parseHash()));
}

export function initRouter() {
  window.addEventListener('hashchange', notify);
  notify();
}

export function getRoute() {
  return parseHash();
}
