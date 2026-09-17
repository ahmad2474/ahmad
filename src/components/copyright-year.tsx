"use client";

import { useEffect, useState } from "react";

export function CopyrightYear({ initialYear }: { initialYear: number }) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => {
    const refresh = () => setYear(new Date().getFullYear());
    refresh();
    const timer = window.setInterval(refresh, 60 * 60 * 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return <>{year}</>;
}
