import { Suspense } from "react";
import SearchView from "@/components/SearchView";

// Static shell; the interactive filtering lives in SearchView (a client
// component using useSearchParams), which must sit inside a Suspense boundary.
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-sm text-[var(--muted)]">加载中…</div>}>
      <SearchView />
    </Suspense>
  );
}
