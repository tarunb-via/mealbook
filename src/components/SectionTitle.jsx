export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
