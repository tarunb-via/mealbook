import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CalendarDays, ChefHat, Clock3, MapPin, Sparkles, Star, UtensilsCrossed } from 'lucide-react';
import clsx from 'clsx';
import HeroSection from './components/HeroSection';
import MealCard from './components/MealCard';
import BookingForm from './components/BookingForm';
import SectionTitle from './components/SectionTitle';
import StatusCard from './components/StatusCard';

const container = 'mx-auto w-full max-w-6xl px-4 sm:px-5';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [mealsResponse, bookingsResponse] = await Promise.all([
        axios.get('/api/meals'),
        axios.get('/api/bookings'),
      ]);
      setMeals(mealsResponse.data);
      setBookings(bookingsResponse.data);
      if (!selectedMealId && mealsResponse.data.length > 0) {
        setSelectedMealId(mealsResponse.data[0].id);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load meals right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedMeal = useMemo(
    () => meals.find((meal) => meal.id === selectedMealId) || meals[0],
    [meals, selectedMealId]
  );

  const handleBooking = async (payload) => {
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      await axios.post('/api/bookings', payload);
      setSuccess('Your meal has been booked. I will reach out shortly to confirm the details.');
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please review your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pb-16 text-slate-900">
      <HeroSection />

      <section className={clsx(container, 'mt-8 grid gap-6 md:mt-12 md:grid-cols-[1.15fr_0.85fr]')}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: ChefHat, label: 'Chef-crafted menus', value: '12 signature dishes' },
              { icon: Clock3, label: 'Lead time', value: 'Book 24 hours ahead' },
              { icon: MapPin, label: 'Service area', value: 'Delivered across your city' },
            ].map((item, index) => (
              <div key={item.label} className="rounded-3xl bg-white p-5 shadow-[0_18px_50px_rgba(120,53,15,0.08)]">
                <item.icon className="mb-3 h-8 w-8 text-brand-600" />
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <SectionTitle
              eyebrow="Choose your meal"
              title="Fresh menus made for cozy dinners, family tables, and special nights in"
              description="Pick a dish, choose your date, and I will cook it fresh for you. Every meal includes thoughtful sides and plating instructions."
            />

            {loading ? (
              <StatusCard icon={Sparkles} title="Loading the kitchen" description="Pulling together today’s available meals for you." />
            ) : error && meals.length === 0 ? (
              <StatusCard icon={UtensilsCrossed} title="Kitchen is temporarily unavailable" description={error} actionLabel="Try again" onAction={loadData} />
            ) : (
              <div className="mt-6 grid gap-4">
                {meals.map((meal, index) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    index={index}
                    selected={meal.id === selectedMeal?.id}
                    onSelect={() => setSelectedMealId(meal.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="space-y-6">
          <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
            <div className="flex items-center gap-2 text-amber-300">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
            </div>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-white/95">
              “MealBook made dinner feel like a private chef experience. The food arrived beautifully packed and tasted incredible.”
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/60">Loved by repeat guests and busy families</p>
          </div>

          <BookingForm meal={selectedMeal} onSubmit={handleBooking} submitting={submitting} success={success} error={error && meals.length > 0 ? error : ''} />

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_50px_rgba(120,53,15,0.08)]">
            <SectionTitle
              eyebrow="Recent bookings"
              title="What people are reserving"
              description="A quick look at the latest meal requests coming into the kitchen."
            />
            <div className="mt-5 space-y-4">
              {bookings.length === 0 ? (
                <StatusCard icon={CalendarDays} title="No bookings yet" description="Your first reservation will appear here once someone books a meal." compact />
              ) : (
                bookings.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="rounded-2xl bg-cream-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{booking.customerName}</p>
                        <p className="text-sm text-slate-600">{booking.meal.name}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                        {booking.guests} guests
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{booking.eventDateLabel} · {booking.city}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
