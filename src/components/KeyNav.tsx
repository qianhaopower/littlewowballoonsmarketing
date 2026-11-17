"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Left and right arrow keys step through the collection. */
export function KeyNav({ previous, next }: { previous: string; next: string }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (document.querySelector("dialog[open]")) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT|VIDEO)$/.test(target.tagName)) return;
      if (event.key === "ArrowLeft") router.push(previous);
      if (event.key === "ArrowRight") router.push(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, previous, next]);

  return null;
}
