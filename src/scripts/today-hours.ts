/**
 * The hours table on /visit/: highlights today's row and says whether the
 * café is open right now, in Dhaka time. The table itself is plain HTML;
 * without JavaScript it simply shows every day.
 */
document.addEventListener('astro:page-load', () => {
  const table = document.querySelector<HTMLTableElement>('[data-hours]');
  if (!table) return;

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const part = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const weekday = part('weekday');
  const now = `${part('hour')}:${part('minute')}`;

  const row = table.querySelector<HTMLTableRowElement>(`tr[data-day="${weekday}"]`);
  if (!row) return;
  row.classList.add('is-today');
  row.setAttribute('aria-current', 'date');
  const label = row.querySelector('th');
  if (label && !label.querySelector('.today')) {
    const badge = document.createElement('span');
    badge.className = 'today';
    badge.textContent = 'Today';
    label.append(' ', badge);
  }

  const status = document.querySelector<HTMLElement>('[data-open-status]');
  if (status) {
    const open = row.dataset.open ?? '';
    const close = row.dataset.close ?? '';
    const isOpen = now >= open && now < close;
    status.textContent = isOpen ? `Open now, until ${row.dataset.closeLabel}.` : now < open ? `Closed now. Opens today at ${row.dataset.openLabel}.` : 'Closed now. See you tomorrow.';
    status.hidden = false;
  }
});
