import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavKey } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (navKey: NavKey) => {
  const element = document.getElementById(navKey);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
