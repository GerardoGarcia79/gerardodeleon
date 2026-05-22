import { hasLocale } from "next-intl";
import { routing } from "./routing";

/** Matches common locale codes (e.g. en, es, fr, zh-CN) but not arbitrary path segments like "about". */
const LOCALE_LIKE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

export function isInvalidLocaleSegment(segment: string) {
  return (
    LOCALE_LIKE_PATTERN.test(segment) &&
    !hasLocale(routing.locales, segment)
  );
}
