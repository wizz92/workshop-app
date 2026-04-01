import { getEventById } from '../data/events.js';
import { cafe } from '../data/cafe.js';
import { formatEventDateTime, remainingSeats, formatMoneyUAH } from '../utils/format.js';
import { navigate } from '../router.js';

const PHONE_RE = /^\+380\d{9}$/;
const STORAGE_KEY = 'kubilnya_booking_confirm';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderBooking(id) {
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

  const maxBookable = Math.min(6, remainingSeats(event));
  if (maxBookable < 1) {
    return `
      <div class="layout">
        <header class="subheader">
          <button type="button" class="subheader__back" data-back-event aria-label="Назад">← Назад</button>
        </header>
        <main class="main-content main-content--padded screen-enter">
          <p>Місць немає — оберіть іншу подію.</p>
          <button type="button" class="btn btn--primary" data-to-event>До події</button>
        </main>
      </div>
    `;
  }

  const defaultSeats = Math.min(1, maxBookable);

  return `
    <div class="layout">
      <header class="subheader">
        <button type="button" class="subheader__back" data-back aria-label="Назад">← Назад</button>
      </header>
      <main class="main-content main-content--padded screen-enter">
        <form class="booking-form" id="booking-form" novalidate>
          <div class="booking-summary">
            <h1 class="booking-summary__title">${escapeHtml(event.title)}</h1>
            <p class="booking-summary__meta">${formatEventDateTime(event.startsAt)}</p>
            <p class="booking-summary__price">${formatMoneyUAH(event.pricePerSeat)} за місце</p>
          </div>

          <div class="field">
            <label class="field__label" for="bf-name">Ім'я</label>
            <input class="field__input" id="bf-name" name="name" type="text" autocomplete="name" required minlength="2" placeholder="Ваше ім'я" />
            <p class="field__error" id="bf-name-err" hidden></p>
          </div>

          <div class="field">
            <label class="field__label" for="bf-phone">Телефон</label>
            <input class="field__input" id="bf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380501234567" />
            <p class="field__hint">Формат: +380 та 9 цифр номера</p>
            <p class="field__error" id="bf-phone-err" hidden></p>
          </div>

          <div class="field">
            <span class="field__label" id="bf-seats-label">Кількість місць</span>
            <div class="stepper" role="group" aria-labelledby="bf-seats-label">
              <button type="button" class="stepper__btn" id="bf-seats-minus" aria-label="Зменшити">−</button>
              <span class="stepper__value" id="bf-seats-val" aria-live="polite">${defaultSeats}</span>
              <button type="button" class="stepper__btn" id="bf-seats-plus" aria-label="Збільшити">+</button>
            </div>
            <input type="hidden" id="bf-seats" name="seats" value="${defaultSeats}" />
            <p class="field__error" id="bf-seats-err" hidden></p>
          </div>

          <div class="booking-total">
            <span>Разом</span>
            <strong id="bf-total">${formatMoneyUAH(defaultSeats * event.pricePerSeat)}</strong>
          </div>

          <button type="submit" class="btn btn--primary btn--block">Підтвердити</button>
        </form>
      </main>
    </div>
  `;
}

export function mountBooking(root, id) {
  const event = getEventById(id);
  if (!event) {
    root.querySelector('[data-back-home]')?.addEventListener('click', () => navigate('#home'));
    return;
  }

  const maxBookable = Math.min(6, remainingSeats(event));
  if (maxBookable < 1) {
    root.querySelector('[data-back-event]')?.addEventListener('click', () => {
      history.back();
    });
    root.querySelector('[data-to-event]')?.addEventListener('click', () => {
      navigate(`#event/${encodeURIComponent(id)}`);
    });
    return;
  }

  let seats = Math.min(1, maxBookable);

  const form = root.querySelector('#booking-form');
  const nameInput = root.querySelector('#bf-name');
  const phoneInput = root.querySelector('#bf-phone');
  const seatsInput = root.querySelector('#bf-seats');
  const seatsVal = root.querySelector('#bf-seats-val');
  const totalEl = root.querySelector('#bf-total');
  const errName = root.querySelector('#bf-name-err');
  const errPhone = root.querySelector('#bf-phone-err');
  const errSeats = root.querySelector('#bf-seats-err');

  function updateTotal() {
    const sum = seats * event.pricePerSeat;
    totalEl.textContent = formatMoneyUAH(sum);
    seatsInput.value = String(seats);
    seatsVal.textContent = String(seats);
  }

  root.querySelector('#bf-seats-minus')?.addEventListener('click', () => {
    seats = Math.max(1, seats - 1);
    updateTotal();
  });

  root.querySelector('#bf-seats-plus')?.addEventListener('click', () => {
    seats = Math.min(maxBookable, seats + 1);
    updateTotal();
  });

  root.querySelector('[data-back]')?.addEventListener('click', () => {
    history.back();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    errName.hidden = true;
    errPhone.hidden = true;
    errSeats.hidden = true;

    const name = nameInput.value.trim();
    let ok = true;
    if (name.length < 2) {
      errName.textContent = "Вкажіть ім'я (мінімум 2 символи).";
      errName.hidden = false;
      ok = false;
    }

    const phone = phoneInput.value.trim();
    if (!PHONE_RE.test(phone)) {
      errPhone.textContent = 'Телефон у форматі +380XXXXXXXXX.';
      errPhone.hidden = false;
      ok = false;
    }

    if (seats < 1 || seats > maxBookable) {
      errSeats.textContent = `Доступно місць: ${maxBookable}.`;
      errSeats.hidden = false;
      ok = false;
    }

    if (!ok) return;

    const payload = {
      eventId: event.id,
      title: event.title,
      startsAt: event.startsAt,
      name,
      phone,
      seats,
      total: seats * event.pricePerSeat,
      location: cafe.address,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    navigate('#success');
  });
}
