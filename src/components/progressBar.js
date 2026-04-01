/**
 * @param {{ bookedSeats: number, maxSeats: number }} event
 */
export function renderProgressBar(event) {
  const pct = event.maxSeats > 0 ? Math.round((event.bookedSeats / event.maxSeats) * 100) : 0;
  return `
    <div class="progress-block">
      <div class="progress-block__label">${event.bookedSeats} з ${event.maxSeats} місць</div>
      <div class="progress-bar" role="progressbar" aria-valuenow="${event.bookedSeats}" aria-valuemin="0" aria-valuemax="${event.maxSeats}">
        <div class="progress-bar__fill" style="width: ${pct}%"></div>
      </div>
    </div>
  `;
}
