"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        router.push(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
      }}
      className="relative"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索商品标题或店铺（如 法师号、金币）"
        className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
      />
    </form>
  );
}
