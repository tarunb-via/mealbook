export default function StatusCard({ icon: Icon, title, description, actionLabel, onAction, compact = false }) {
  return (
    <div className={`rounded-[28px] bg-white ${compact ? 'p-4' : 'p-6'} shadow-[0_18px_50px_rgba(120,53,15,0.08)]`}>
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
