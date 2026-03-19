import { motion } from 'framer-motion';
import { Clock3, Users } from 'lucide-react';
import clsx from 'clsx';

export default function MealCard({ meal, selected, onSelect, index }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={clsx(
        'min-h-[44px] w-full rounded-[28px] p-5 text-left transition-all duration-200',
        selected
          ? 'bg-brand-600 text-white shadow-[0_20px_50px_rgba(194,65,12,0.28)]'
          : 'bg-white text-slate-900 shadow-[0_18px_50px_rgba(120,53,15,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(120,53,15,0.12)]'
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]', selected ? 'bg-white/15 text-orange-100' : 'bg-cream-100 text-brand-600')}>
              {meal.category}
            </span>
            <span className={clsx('text-sm', selected ? 'text-orange-100/90' : 'text-slate-500')}>{meal.spiceLevel}</span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{meal.name}</h3>
          <p className={clsx('mt-2 text-base leading-relaxed', selected ? 'text-white/85' : 'text-slate-600')}>{meal.description}</p>
        </div>
        <div className="text-right">
          <p className={clsx('text-sm uppercase tracking-[0.18em]', selected ? 'text-orange-100/80' : 'text-slate-500')}>Starting at</p>
          <p className="mt-1 text-3xl font-extrabold">${meal.pricePerPerson}</p>
          <p className={clsx('text-sm', selected ? 'text-orange-100/80' : 'text-slate-500')}>per person</p>
        </div>
      </div>

      <div className={clsx('mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-5', selected ? 'text-orange-50' : 'text-slate-600')}>
        <div className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          {meal.prepTime}
        </div>
        <div className="inline-flex items-center gap-2">
          <Users className="h-4 w-4" />
          Best for {meal.serves}
        </div>
      </div>
    </motion.button>
  );
}
