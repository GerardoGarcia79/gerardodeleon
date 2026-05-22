"use client";

import { useEffect, useState } from "react";

type Lang = "es" | "en";

const LanguageToggle = () => {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const next = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface/60 px-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Cambiar idioma a ${next === "es" ? "español" : "inglés"}`}
      onClick={() => setLang(next)}
    >
      {lang.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
