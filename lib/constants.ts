export const NAV_KEYS = [
  "about",
  "experience",
  "projects",
  "education",
  "stack",
  "contact",
] as const;

export type NavKey = (typeof NAV_KEYS)[number];

export const NAV_LABELS: Record<NavKey, string> = {
  about: "Sobre mí",
  experience: "Experiencia",
  projects: "Proyectos",
  education: "Educación",
  stack: "Stack",
  contact: "Contacto",
};

export const NAV_MENU = "Abrir menú";
export const NAV_CLOSE = "Cerrar menú";
