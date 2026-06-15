"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Static export has no server, so do the redirect on the client. The <a>
// fallback keeps it usable without JS.
export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/search");
  }, [router]);

  return (
    <div className="text-sm text-[var(--muted)]">
      正在前往商品库…{" "}
      <a href="/search/" className="text-[var(--accent)] underline">
        点此进入
      </a>
    </div>
  );
}
