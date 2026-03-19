import { motion } from 'framer-motion';
import { ArrowRight, Flame, HeartHandshake } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.35),_transparent_30%),linear-gradient(135deg,#7c2d12_0%,#431407_45%,#0f172a_100%)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur">
            <Flame className="h-4 w-4" />
            Home-cooked meals, booked in minutes
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Book a delicious meal I cook fresh just for you.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-orange-50/90 sm:text-lg">
            From slow-braised comfort food to elegant dinner-party favorites, MealBook lets your guests reserve handcrafted meals for delivery or pickup with a warm, personal touch.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:brightness-110 active:scale-[0.98]">
              Reserve a meal
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-base font-medium text-white/90">
              <HeartHandshake className="h-5 w-5 text-amber-300" />
              Personal menus for 1 to 12 guests
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
          <div className="rounded-[32px] bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <div className="rounded-[28px] bg-gradient-to-br from-amber-100 via-orange-50 to-white p-6 text-slate-900">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Signature lasagna', 'Layered with slow-simmered beef ragù and basil ricotta'],
                  ['Coconut curry feast', 'Fragrant jasmine rice, charred vegetables, and naan'],
                  ['Sunday roast chicken', 'Herb jus, garlic potatoes, and market greens'],
                  ['Lemon tart finish', 'Silky citrus custard with toasted meringue'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">Chef special</p>
                    <h2 className="mt-2 text-lg font-bold tracking-tight">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
