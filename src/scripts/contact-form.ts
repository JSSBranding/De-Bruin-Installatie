/**
 * Progressieve verbetering van het contactformulier:
 * validatie met Nederlandse foutmeldingen, foutoverzicht, verzenden via fetch
 * en een succesmelding uitsluitend na een geaccepteerde aanvraag.
 */

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(field: Field): string {
  const value = field.value.trim();
  const d = field.dataset;
  if (field.required && !value) return d.errorRequired ?? 'Dit veld is verplicht.';
  if (!value) return '';
  if (field.type === 'email' && !EMAIL_RE.test(value)) return d.errorInvalid ?? 'Ongeldige invoer.';
  if (field.type === 'tel') {
    const digits = value.replace(/\D/g, '');
    if (!/^[0-9+()\-\s]+$/.test(value) || digits.length < 10 || digits.length > 15) return d.errorInvalid ?? 'Ongeldige invoer.';
  }
  if (field instanceof HTMLTextAreaElement && field.minLength > 0 && value.length < field.minLength) {
    return d.errorShort ?? 'Te kort.';
  }
  return '';
}

function showError(form: HTMLFormElement, field: Field, message: string) {
  const el = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
  if (el) el.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function labelText(form: HTMLFormElement, field: Field): string {
  const label = form.querySelector(`label[for="${field.id}"]`);
  return (label?.childNodes[0]?.textContent ?? field.name).trim();
}

export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';
    form.noValidate = true;

    const wrap = form.closest<HTMLElement>('[data-contact-form-wrap]')!;
    const endpoint = form.dataset.endpoint ?? '';
    const summary = form.querySelector<HTMLElement>('[data-error-summary]')!;
    const summaryList = form.querySelector<HTMLElement>('[data-error-list]')!;
    const status = form.querySelector<HTMLElement>('[data-status]')!;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
    const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
    const success = wrap.querySelector<HTMLElement>('[data-success]')!;
    const fields = Array.from(form.querySelectorAll<Field>('input:not([name="_gotcha"]), select, textarea'));

    // Voorselectie via ?onderwerp=badkamer
    const select = form.querySelector<HTMLSelectElement>('[data-preselect-from-url]');
    const wanted = new URLSearchParams(location.search).get('onderwerp');
    if (select && wanted && Array.from(select.options).some((o) => o.value === wanted)) select.value = wanted;

    // Na een eerste fout: direct bijwerken tijdens typen
    fields.forEach((field) => {
      const update = () => {
        if (field.hasAttribute('aria-invalid')) showError(form, field, validate(field));
      };
      field.addEventListener('input', update);
      field.addEventListener('change', update);
      field.addEventListener('blur', () => {
        if (field.value.trim()) showError(form, field, validate(field));
      });
    });

    const setStatus = (html: string | null) => {
      status.hidden = !html;
      status.innerHTML = html ?? '';
    };

    const fallbackContact = () => {
      const mail = document.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
      const tel = document.querySelector<HTMLAnchorElement>('a[href^="tel:"]');
      const parts = [
        mail ? `mail naar <a href="${mail.href}">${mail.href.replace('mailto:', '')}</a>` : '',
        tel ? `bel <a href="${tel.href}">${tel.textContent?.replace(/^\s*Bel\s*/i, '').trim()}</a>` : '',
      ].filter(Boolean);
      return parts.length ? ` Je kunt ons ook ${parts.join(' of ')}.` : '';
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setStatus(null);

      // Validatie
      const errors: { field: Field; message: string }[] = [];
      fields.forEach((field) => {
        const message = validate(field);
        showError(form, field, message);
        if (message) errors.push({ field, message });
      });

      if (errors.length) {
        summaryList.innerHTML = '';
        errors.forEach(({ field, message }) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${field.id}`;
          a.textContent = `${labelText(form, field)}: ${message}`;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            field.focus();
          });
          li.append(a);
          summaryList.append(li);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;

      // Spam-val ingevuld: niets versturen
      const trap = form.querySelector<HTMLInputElement>('[name="_gotcha"]');
      if (trap?.value) return;

      if (!endpoint) {
        setStatus(
          '<strong>Je bericht is niet verstuurd.</strong> De verzendkoppeling van dit formulier is nog niet ingesteld.' +
            fallbackContact(),
        );
        return;
      }

      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      const original = submitLabel.textContent;
      submitLabel.textContent = 'Bezig met versturen…';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        let accepted = response.ok;
        if (accepted) {
          const body = await response.json().catch(() => ({}));
          if (body && (body.ok === false || body.success === false || body.errors)) accepted = false;
        }
        if (!accepted) throw new Error(`Status ${response.status}`);

        form.hidden = true;
        success.hidden = false;
        success.setAttribute('role', 'status');
        success.focus();
      } catch {
        setStatus('<strong>Je bericht kon niet worden verstuurd.</strong> Probeer het later opnieuw.' + fallbackContact());
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        submitLabel.textContent = original;
      }
    });
  });
}
