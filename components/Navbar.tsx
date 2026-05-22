"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { NAV_CLOSE, NAV_CTA, NAV_KEYS, NAV_LABELS, NAV_MENU } from "@/lib/nav";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 border-b ${scrolled ? "is-scrolled" : ""}`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        >
          <a
            href="#top"
            className="flex items-center gap-2"
            aria-label="Inicio"
          >
            <span className="font-mono text-lg font-bold tracking-tight text-gradient">
              GDLG
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="nav-link">
                  {NAV_LABELS[key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <LanguageToggle />
            <a href="#contact" className="btn-primary">
              {NAV_CTA}
            </a>
          </div>

          <button
            type="button"
            className="nav-menu-btn"
            aria-label={open ? NAV_CLOSE : NAV_MENU}
            aria-expanded={open}
            data-open={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav-hamburger" aria-hidden="true">
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
            </span>
          </button>
        </nav>
      </header>

      <div
        className={`nav-overlay md:hidden ${open ? "nav-overlay--open" : ""}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <ul className="flex flex-col gap-1 px-6">
          {NAV_KEYS.map((key, i) => (
            <li
              key={key}
              className="nav-menu-item"
              style={{ animationDelay: open ? `${50 * i}ms` : undefined }}
            >
              <a
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-4 text-2xl font-semibold text-foreground transition-colors hover:bg-surface"
              >
                {NAV_LABELS[key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle px-6 py-6">
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary h-11 px-5"
          >
            {NAV_CTA}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
