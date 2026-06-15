import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "./SearchBar";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-[var(--accent)]">◆</span>
          <span>CrossGate Dex</span>
        </Link>
        <nav className="hidden gap-5 text-sm text-[var(--muted)] md:flex">
          <Link href="/search" className="hover:text-[var(--foreground)]">浏览</Link>
        </nav>
        <div className="ml-auto w-full max-w-md">
          <Suspense fallback={<div className="h-8 rounded-md border border-[var(--border)] bg-[var(--surface)]" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
