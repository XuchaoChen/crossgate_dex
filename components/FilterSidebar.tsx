"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  categories: { name: string; count: number }[];
};

export default function FilterSidebar({ categories }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [sp]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const selected = useMemo(
    () => new Set(sp.getAll("category")),
    [sp],
  );
  const totalActive = selected.size;

  function toggleCategory(value: string, checked: boolean) {
    const next = new URLSearchParams(sp.toString());
    const current = next.getAll("category").filter((v) => v !== value);
    next.delete("category");
    for (const v of current) next.append("category", v);
    if (checked) next.append("category", value);
    router.push(`/search?${next.toString()}`);
  }

  function clearAll() {
    const next = new URLSearchParams();
    const q = sp.get("q");
    if (q) next.set("q", q);
    router.push(`/search?${next.toString()}`);
  }

  const panel = (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">筛选</span>
        <div className="flex items-center gap-3">
          {totalActive > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-[var(--muted)] hover:text-red-300"
            >
              清除 ({totalActive})
            </button>
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="md:hidden text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="关闭筛选"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="border-b border-[var(--border)] py-3 last:border-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          品类
        </div>
        <div className="mt-2 space-y-1">
          {categories.map((c) => (
            <label
              key={c.name}
              className="flex cursor-pointer items-center justify-between gap-2 py-0.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.has(c.name)}
                  onChange={(e) => toggleCategory(c.name, e.target.checked)}
                  className="accent-[var(--accent)]"
                />
                <span className="truncate">{c.name}</span>
              </span>
              <span className="shrink-0 text-xs text-[var(--muted)]">{c.count}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm hover:border-[var(--accent)]"
        >
          <span>筛选</span>
          {totalActive > 0 && (
            <span className="rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-semibold text-black">
              {totalActive}
            </span>
          )}
        </button>
        {drawerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-[85vw] max-w-xs overflow-y-auto bg-[var(--background)] p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {panel}
            </div>
          </div>
        )}
      </div>

      <aside className="hidden md:block w-full shrink-0 md:w-56">{panel}</aside>
    </>
  );
}
