"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "", label: "默认" },
  { value: "price-asc", label: "价格 低→高" },
  { value: "price-desc", label: "价格 高→低" },
  { value: "want-desc", label: "想要人数 多→少" },
];

export default function SortSelect() {
  const router = useRouter();
  const sp = useSearchParams();
  const current = sp.get("sort") ?? "";

  function onChange(value: string) {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set("sort", value);
    else next.delete("sort");
    router.push(`/search?${next.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
      排序
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
