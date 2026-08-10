'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, MessageCircle, Phone } from 'lucide-react';
import {
  business,
  telLink,
  whatsappLink,
  whatsappMessages,
} from '@/config/business';
import { consultationServices } from '@/config/content';
import { cn } from '@/lib/utils';

interface FormValues {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

/** "2026-09-15" → "15 September 2026", falling back to the raw value. */
function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "16:30" → "4:30 PM", falling back to the raw value. */
function formatTime(value: string): string {
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

const emptyForm: FormValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  service: consultationServices[0],
  message: '',
};

/**
 * Appointment form with inline validation and a polished success state.
 *
 * ⚠️  DEMO: there is no backend, so nothing is transmitted or stored — the
 * submission is summarised locally and handed to WhatsApp. To connect a real
 * service (Formspree, Basin, Google Apps Script, an API route), replace the
 * body of `submitBooking` below; the rest of the component needs no changes.
 */
async function submitBooking(values: FormValues): Promise<void> {
  // Example of a real integration:
  //   await fetch('https://formspree.io/f/XXXX', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(values),
  //   });
  await new Promise((resolve) => setTimeout(resolve, 650));
}

export default function ConsultationForm() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    // Deliberately permissive: spaces, dashes and country codes are all fine.
    if (!/^[+\d][\d\s-]{7,17}$/.test(values.phone.trim())) {
      next.phone = 'Please enter a phone number we can reach you on.';
    }
    if (!values.date) next.date = 'Please choose a preferred date.';
    if (!values.time) next.time = 'Please choose a preferred time.';
    return next;
  };

  const bookingSummary = () =>
    [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Preferred date: ${formatDate(values.date)}`,
      `Preferred time: ${formatTime(values.time)}`,
      `Service: ${values.service}`,
      values.message.trim() ? `Message: ${values.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document.getElementById(`booking-${firstField}`)?.focus();
      return;
    }

    setStatus('submitting');
    await submitBooking(values);
    setStatus('success');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="border border-ink/10 bg-paper p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="py-6 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <Check className="h-7 w-7 text-gold" strokeWidth={1.5} />
            </span>
            <h3 className="heading-md mt-7">Request noted, {values.name.split(' ')[0]}</h3>
            <p className="body-lg mx-auto mt-4 max-w-md">
              Send it through on WhatsApp or give us a call and we will confirm your slot for{' '}
              <span className="text-ink">{formatDate(values.date)}</span> at{' '}
              <span className="text-ink">{formatTime(values.time)}</span>.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(whatsappMessages.booking(bookingSummary()))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                Confirm on WhatsApp
              </a>
              <a href={telLink} className="btn-outline">
                <Phone className="h-4 w-4" strokeWidth={1.6} />
                Call {business.phoneDisplay}
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setValues(emptyForm);
                setStatus('idle');
              }}
              className="mt-7 text-[10px] uppercase tracking-wide2 text-ink/60 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Book another appointment
            </button>

            <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-ink/55">
              This demo form has no backend — your details stayed in your browser and were not
              transmitted anywhere.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Field
              id="booking-name"
              label="Name"
              error={errors.name}
              className="sm:col-span-2"
            >
              <input
                id="booking-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'booking-name-error' : undefined}
                className={inputClass(Boolean(errors.name))}
              />
            </Field>

            <Field id="booking-phone" label="Phone" error={errors.phone}>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                placeholder="+91 90000 00000"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                className={inputClass(Boolean(errors.phone))}
              />
            </Field>

            <Field id="booking-service" label="Service">
              <select
                id="booking-service"
                name="service"
                value={values.service}
                onChange={(event) => update('service', event.target.value)}
                className={cn(inputClass(false), 'appearance-none bg-[length:0] pr-10')}
              >
                {consultationServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="booking-date" label="Preferred Date" error={errors.date}>
              <input
                id="booking-date"
                name="date"
                type="date"
                min={today}
                value={values.date}
                onChange={(event) => update('date', event.target.value)}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'booking-date-error' : undefined}
                className={inputClass(Boolean(errors.date))}
              />
            </Field>

            <Field id="booking-time" label="Preferred Time" error={errors.time}>
              <input
                id="booking-time"
                name="time"
                type="time"
                value={values.time}
                onChange={(event) => update('time', event.target.value)}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? 'booking-time-error' : undefined}
                className={inputClass(Boolean(errors.time))}
              />
            </Field>

            <Field id="booking-message" label="Message" hint="Optional" className="sm:col-span-2">
              <textarea
                id="booking-message"
                name="message"
                rows={4}
                value={values.message}
                onChange={(event) => update('message', event.target.value)}
                placeholder="Anything we should know before you arrive — a prescription in hand, a style you have in mind, or who is coming with you."
                className={cn(inputClass(false), 'resize-y')}
              />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'submitting' ? 'Booking…' : 'Book Consultation'}
              </button>
              <p className="mt-4 text-xs leading-relaxed text-ink/60">
                Demo form — no details are transmitted or stored. Connect it to your preferred form
                service to receive real bookings.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full border bg-paper-warm px-4 py-3.5 text-sm text-ink transition-colors duration-300',
    'placeholder:text-ink/60 focus:border-gold focus:outline-none focus:ring-0',
    hasError ? 'border-red-700/70' : 'border-ink/15 hover:border-ink/30'
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-[10px] uppercase tracking-wide2 text-ink/60">
        {label}
        {hint && <span className="normal-case tracking-normal text-ink/60">({hint})</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs text-red-700"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
          {error}
        </p>
      )}
    </div>
  );
}
