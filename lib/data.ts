// Single data integration point for CrossGate Dex.
// Currently reads a static snapshot of Goofish (闲鱼) "魔力宝贝" listings from
// data/items.json. Swap this file's loader to a live source later without
// touching the pages.

import itemsJson from "@/data/items.json";

export type Item = {
  id: string;
  title: string;
  shop: string; // 店铺/卖家名
  area?: string; // 卖家所在地
  price: number; // 售价 (CNY)
  link: string; // 闲鱼商品链接
  image: string; // 商品图片 URL
  category: string; // 品类
  wantCount?: number; // "想要" 人数
};

export type ItemData = {
  updatedAt: string;
  keyword: string;
  categories?: string[]; // canonical category order for the sidebar
  items: Item[];
};

const data = itemsJson as ItemData;

export function getAllItems(): Item[] {
  return data.items;
}

export function getMeta(): { updatedAt: string; keyword: string; total: number } {
  return { updatedAt: data.updatedAt, keyword: data.keyword, total: data.items.length };
}

// Ordered list of categories with counts, for the filter sidebar.
// Uses the canonical `categories` order from the data file when present so the
// taxonomy stays stable even if some categories are temporarily empty;
// any extra categories found in items are appended.
export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const it of data.items) {
    counts.set(it.category, (counts.get(it.category) ?? 0) + 1);
  }
  const ordered: string[] = [...(data.categories ?? [])];
  for (const name of counts.keys()) {
    if (!ordered.includes(name)) ordered.push(name);
  }
  return ordered.map((name) => ({ name, count: counts.get(name) ?? 0 }));
}

export type Filters = { q?: string; categories: string[]; sort?: string };

export function filterItems(filters: Filters): Item[] {
  let out = data.items;

  if (filters.categories.length > 0) {
    const set = new Set(filters.categories);
    out = out.filter((it) => set.has(it.category));
  }

  if (filters.q) {
    const q = filters.q.toLowerCase();
    out = out.filter(
      (it) =>
        it.title.toLowerCase().includes(q) || it.shop.toLowerCase().includes(q),
    );
  }

  out = [...out];
  switch (filters.sort) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "want-desc":
      out.sort((a, b) => (b.wantCount ?? 0) - (a.wantCount ?? 0));
      break;
    default:
      break;
  }
  return out;
}
