import { useEffect, useState } from 'react';
import { CalendarCheck2, CheckCircle2, Send, TriangleAlert } from 'lucide-react';

const initialState = {
  customerName: '',
  email: '',
  city: '',
  guests: 2,
  eventDate: '',
  notes: '',
};

export default function BookingForm({ meal, onSubmit, submitting, success, error }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm((current) => ({ ...current, guests: current.guests || 2 }));
  }, [meal?.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!meal) return;

    await onSubmit({
      ...form,
      mealId: meal.id,
      guests: Number(form.guests),
    });

    setForm(initialState);
  };

  return (
    <section id="booking" className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(120,53,15,0.08)]">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
          <CalendarCheck2 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Book this meal</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{meal ? `Reserve ${meal.name}` : 'Select a meal to begin'}</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">Share your date, guest count, and city. I will confirm availability and final details after your request comes in.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" name="customerName" value={form.customerName} onChange={handleChange} placeholder="Jordan Lee" required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jordan@email.com" required />
          <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Brooklyn" required />
          <Field label="Guests" name="guests" type="number" min="1" max="12" value={form.guests} onChange={handleChange} required />
          <Field label="Event date" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required className="sm:col-span-2" />
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Notes</span>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Tell me about allergies, delivery timing, or the occasion."
            className="min-h-[120px] w-full rounded-2xl border border-brand-100 bg-cream-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          />
        </label>

        {success ? (
          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <p className="text-sm leading-relaxed">{success}</p>
          </div>
        ) : null}

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-rose-700">
            <TriangleAlert className="mt-0.5 h-5 w-5" />
            <p className="text-sm leading-relaxed">{error}</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!meal || submitting}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Send className="h-5 w-5" />
          {submitting ? 'Sending booking request...' : 'Book my meal'}
        </button>
      </form>
    </section>
  );
}

function Field({ label, className = '', ...props }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        {...props}
        className="min-h-[48px] w-full rounded-2xl border border-brand-100 bg-cream-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}
