export const themeConfig = {
  attribute: "class" as const,
  defaultTheme: "dark",
  themes: ["light", "dark"] as const,
  enableSystem: false,
  storageKey: "theme",
};
