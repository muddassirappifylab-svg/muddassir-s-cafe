/**
 * Booking and enquiry forms (/book/, /events/, /visit/). A static site cannot
 * receive a form, so a form with `data-mailto` turns into a ready-to-send
 * message instead: an email (the visitor's mail app opens) or, with the
 * "Send on WhatsApp" button, a WhatsApp chat. Nothing is stored anywhere.
 *
 * Without JavaScript the same form still works: it posts to `mailto:` as plain
 * text (`action` + `enctype` in the markup), and the WhatsApp button stays
 * hidden.
 *
 * Each field: `name` (plain words, used in the message), `id`, and an empty
 * `<p id="<id>-error" class="error">` the errors are written into.
 */
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function check(field: Field): string {
  const value = field.value.trim();
  if (field.required && !value) return field.dataset.required ?? 'Please fill this in.';
  if (!value) return '';
  if (field instanceof HTMLInputElement && field.type === 'number') {
    const n = Number(value);
    const min = Number(field.min || 1);
    const max = Number(field.max || 999);
    if (!Number.isInteger(n) || n < min || n > max) return `Enter a number from ${min} to ${max}.`;
  }
  if (field instanceof HTMLInputElement && field.type === 'date' && field.min && value < field.min) {
    return 'Choose today or a later date.';
  }
  if (field instanceof HTMLInputElement && field.type === 'tel' && value.replace(/\D/g, '').length < 7) {
    return 'Enter a phone number we can call or WhatsApp.';
  }
  return '';
}

function showError(field: Field, message: string) {
  const error = document.getElementById(`${field.id}-error`);
  if (error) error.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

document.addEventListener('astro:page-load', () => {
  const forms = document.querySelectorAll<HTMLFormElement>('form[data-mailto]');
  // The earliest date a visitor can pick: today, in Dhaka.
  const today = new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Dhaka'}).format(new Date());

  for (const form of forms) {
    if (form.dataset.ready) continue;
    form.dataset.ready = 'true';
    form.noValidate = true;
    form.querySelectorAll<HTMLElement>('[data-js-only]').forEach(el => (el.hidden = false));
    form.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach(input => (input.min = today));
    const fields = [...form.querySelectorAll<Field>('input[name], select[name], textarea[name]')];
    const status = form.querySelector<HTMLElement>('[role="status"]');

    // Clear a field's error as soon as it is fixed.
    for (const field of fields) {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true' && !check(field)) showError(field, '');
      });
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (status) status.textContent = '';
      let firstInvalid: Field | null = null;
      for (const field of fields) {
        const message = check(field);
        showError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const lines = fields.filter(f => f.value.trim()).map(f => `${f.name}: ${f.value.trim()}`);
      const name = form.querySelector<HTMLInputElement>('[data-sender]')?.value.trim();
      const subject = `${form.dataset.subject ?? 'Message from the website'}${name ? ` · ${name}` : ''}`;
      const body = `${lines.join('\n')}\n`;
      const via = (event as SubmitEvent).submitter?.getAttribute('value');

      if (via === 'whatsapp' && form.dataset.whatsapp) {
        const text = `${subject}\n\n${body}`;
        window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        if (status) status.textContent = 'WhatsApp should now be open with your message filled in. Press send there, and we’ll reply in the chat.';
      } else {
        window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        if (status) status.textContent = `Your email app should now be open with the message filled in. Press send there. Nothing opened? Email ${form.dataset.mailto} or call us.`;
      }
    });
  }
});
