import './style.css';
import { initRouter, subscribe } from './router.js';
import { renderHome, mountHome } from './screens/home.js';
import { renderEvent, mountEvent } from './screens/event.js';
import { renderBooking, mountBooking } from './screens/booking.js';
import { renderSuccess, mountSuccess } from './screens/success.js';
import { renderAbout, mountAbout } from './screens/about.js';

const app = document.querySelector('#app');

function render(route) {
  if (!app) return;

  switch (route.screen) {
    case 'home':
      app.innerHTML = renderHome();
      mountHome(app);
      break;
    case 'about':
      app.innerHTML = renderAbout();
      mountAbout(app);
      break;
    case 'event':
      app.innerHTML = renderEvent(route.id);
      mountEvent(app, route.id);
      break;
    case 'booking':
      app.innerHTML = renderBooking(route.id);
      mountBooking(app, route.id);
      break;
    case 'success':
      app.innerHTML = renderSuccess();
      mountSuccess(app);
      break;
    default:
      app.innerHTML = renderHome();
      mountHome(app);
  }
}

subscribe((route) => render(route));
initRouter();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const url = new URL('./sw.js', window.location.href);
    navigator.serviceWorker.register(url).catch(() => {});
  });
}
