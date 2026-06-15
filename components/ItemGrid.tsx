import type { Item } from "@/lib/data";
import ItemCard from "./ItemCard";

export default function ItemGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((it) => (
        <ItemCard key={it.id} item={it} />
      ))}
    </div>
  );
}
