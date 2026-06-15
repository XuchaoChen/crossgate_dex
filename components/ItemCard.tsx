import type { Item } from "@/lib/data";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-lift block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-[var(--accent)]">
          {item.category}
        </span>
      </div>
      <div className="mt-2 px-1">
        <div className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight">
          {item.title}
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-[var(--muted)]" title={item.shop}>
            {item.shop}
          </span>
          <span className="shrink-0 font-semibold text-[var(--accent)]">
            ¥{item.price}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between text-[11px] text-[var(--muted)]">
          <span>{item.area || ""}</span>
          {item.wantCount != null && <span>{item.wantCount} 人想要</span>}
        </div>
      </div>
    </a>
  );
}
