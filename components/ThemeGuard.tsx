"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect, type ReactNode } from "react";
import { themeConfig } from "@/lib/theme";

function applyThemeFromStorage() {
  const root = document.documentElement;
  let theme = themeConfig.defaultTheme;

  try {
    const stored = localStorage.getItem(themeConfig.storageKey);
    if (stored === "light" || stored === "dark") {
      theme = stored;
    }
  } catch {
    // keep default
  }

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme === "light" ? "light" : "dark";
}

type Props = {
  children: ReactNode;
};

/** Re-applies theme class before paint when the locale segment changes. */
export function ThemeGuard({ children }: Props) {
  const locale = useLocale();

  useLayoutEffect(() => {
    applyThemeFromStorage();
    document.documentElement.lang = locale;
  }, [locale]);

  return children;
}
