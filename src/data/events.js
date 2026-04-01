/** Статичні дані івентів (прототип). Схема з backlog.json */
export const events = [
  {
    id: 'evt_001',
    title: 'Детективна гра «Чорний лебідь»',
    description:
      'Командна детективна гра на 2 години: злочин у бібліотеці, підказки, ролі та фінальне голосування. Підходить для новачків — ведучий пояснить правила.',
    host: 'Олег',
    startsAt: '2026-04-12T18:00:00',
    pricePerSeat: 250,
    maxSeats: 12,
    bookedSeats: 7,
    coverEmoji: '🕵️',
    tags: ['детектив', '12+'],
  },
  {
    id: 'evt_002',
    title: 'Вечір настільних хітів',
    description:
      'Збираємо столи під Ticket to Ride, Splendor та Azul. Можна прийти одному — підберемо команду. Напої та снеки з меню окремо.',
    host: 'Марія',
    startsAt: '2026-04-15T19:30:00',
    pricePerSeat: 180,
    maxSeats: 20,
    bookedSeats: 14,
    coverEmoji: '🎲',
    tags: ['сімейне', 'хіти'],
  },
  {
    id: 'evt_003',
    title: 'MTG Draft',
    description:
      'Чернетка Magic: The Gathering. Принесіть колоди для вільної гри після драфту. Реєстрація до 18:45.',
    host: 'Андрій',
    startsAt: '2026-04-18T17:00:00',
    pricePerSeat: 350,
    maxSeats: 8,
    bookedSeats: 8,
    coverEmoji: '🃏',
    tags: ['MTG', '16+'],
  },
  {
    id: 'evt_004',
    title: 'Рольова сесія D&D (one-shot)',
    description:
      'Коротка пригода на 4 години, готові персонажі рівня 3. Потрібно лише бажання — кубики та аркуші на місці.',
    host: 'Катя',
    startsAt: '2026-04-22T16:00:00',
    pricePerSeat: 300,
    maxSeats: 5,
    bookedSeats: 2,
    coverEmoji: '🐉',
    tags: ['D&D', '16+'],
  },
  {
    id: 'evt_005',
    title: 'Кооперативний марафон',
    description:
      'Pandemic Legacy та Spirit Island — проходимо сценарії з паузами на каву. Реєстрація командою або поодинці.',
    host: 'Олег',
    startsAt: '2026-04-28T15:00:00',
    pricePerSeat: 220,
    maxSeats: 10,
    bookedSeats: 4,
    coverEmoji: '🌍',
    tags: ['кооп', '12+'],
  },
];

export function getEventById(id) {
  return events.find((e) => e.id === id);
}
