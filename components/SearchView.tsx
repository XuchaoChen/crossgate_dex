"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ItemGrid from "@/components/ItemGrid";
import SortSelect from "@/components/SortSelect";
import { filterItems, getCategories, getMeta } from "@/lib/data";

// All filtering runs in the browser against the bundled static snapshot, so the
// page works as a fully static export while keeping the URL (q / category / sort)
// as the single source of truth.
export default function SearchView() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? undefined;
  const categories = sp.getAll("category");
  const sort = sp.get("sort") ?? undefined;

  // Price comparison is the core use case: when the user searches a specific
  // item (e.g. "10级紫宝石") default to cheapest-first so the lowest offer
  // across shops is on top.
  const effectiveSort = sort ?? (q ? "price-asc" : undefined);

  const meta = useMemo(() => getMeta(), []);
  const allCategories = useMemo(() => getCategories(), []);
  const items = useMemo(
    () => filterItems({ q, categories, sort: effectiveSort }),
    [q, categories, effectiveSort],
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <FilterSidebar categories={allCategories} />

      <div className="min-w-0 flex-1 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">
              {q ? (
                <>
                  搜索 <span className="text-[var(--accent)]">{q}</span>
                </>
              ) : (
                "浏览魔力宝贝商品"
              )}
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              共 {items.length} 件
              {categories.length > 0 && <>（已筛选 {categories.join("、")}）</>} · 数据更新于{" "}
              {meta.updatedAt} · 关键词「{meta.keyword}」
            </p>
          </div>
          <SortSelect />
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
            没有匹配的商品，试试减少筛选条件。
          </div>
        ) : (
          <ItemGrid items={items} />
        )}
      </div>
    </div>
  );
}
